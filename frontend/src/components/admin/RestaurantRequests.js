import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Check, CheckCircle2, Clock3, IndianRupee, LoaderCircle,
  Mail, MapPin, Search, Store, Trash2, UserRound,
} from "lucide-react";
import { useAppContext } from "../../context/appcontext.js";

const API = "http://localhost:5000/api";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    .format(new Date(date));

export default function RestaurantRequests() {
  const { fetchRestro } = useAppContext();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState("");
  const [removing, setRemoving] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    axios.get(`${API}/res/requests`, { withCredentials: true })
      .then(({ data }) => setRestaurants(Array.isArray(data) ? data : []))
      .catch((error) => toast.error(error.response?.data?.message || "Could not load requests"))
      .finally(() => setLoading(false));
  }, []);

  const approveRestaurant = async (id) => {
    setApproving(id);
    try {
      const { data } = await axios.put(
        `${API}/res/approved/${id}`, {}, { withCredentials: true },
      );
      setRestaurants((items) => items.map((item) =>
        item._id === id ? { ...item, ...data, owner: item.owner } : item
      ));
      await fetchRestro();
      toast.success(`${data.name} is now approved`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    } finally {
      setApproving("");
    }
  };

  const removeRestaurant = async (restaurant) => {
    const confirmed = window.confirm(
      `Remove "${restaurant.name}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setRemoving(restaurant._id);
    try {
      const { data } = await axios.delete(`${API}/res/${restaurant._id}`, {
        withCredentials: true,
      });
      setRestaurants((items) =>
        items.filter((item) => item._id !== restaurant._id),
      );
      toast.success(data.message || `${restaurant.name} removed`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not remove restaurant");
    } finally {
      setRemoving("");
    }
  };

  const counts = useMemo(() => ({
    all: restaurants.length,
    pending: restaurants.filter((item) => !item.isApproved).length,
    approved: restaurants.filter((item) => item.isApproved).length,
  }), [restaurants]);

  const visibleRestaurants = useMemo(() => {
    const term = query.trim().toLowerCase();
    return restaurants.filter((item) => {
      const statusMatches = filter === "all" ||
        (filter === "approved" ? item.isApproved : !item.isApproved);
      const searchMatches = !term ||
        [item.name, item.cuisine, item.owner?.name, item.owner?.email]
          .filter(Boolean).some((value) => value.toLowerCase().includes(term));
      return statusMatches && searchMatches;
    });
  }, [restaurants, query, filter]);

  return (
    <main className="px-4 py-7 sm:px-7 lg:px-10 lg:py-9">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-[#9bcf31]" /> Partner onboarding
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#142d27] dark:text-emerald-450 sm:text-4xl">Restaurant requests</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Review partner details and approve restaurants before they appear in the app.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Waiting for review</p>
          <p className="mt-0.5 text-2xl font-black text-[#143d32] dark:text-emerald-300">{counts.pending}</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-3 gap-3">
        {[
          { key: "all", label: "Total", value: counts.all, icon: Store },
          { key: "pending", label: "Pending", value: counts.pending, icon: Clock3 },
          { key: "approved", label: "Approved", value: counts.approved, icon: CheckCircle2 },
        ].map(({ key, label, value, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-2xl border p-3 text-left transition sm:p-5 ${
              filter === key
                ? "border-[#163b31] bg-[#163b31] text-white shadow-lg shadow-emerald-950/10"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-emerald-300 dark:hover:border-emerald-400"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className={`text-xs font-bold ${filter === key ? "text-white/65" : "text-slate-400 dark:text-slate-500"}`}>{label}</span>
              <Icon size={17} className={filter === key ? "text-[#d8ff70]" : "text-emerald-600"} />
            </div>
            <p className="text-2xl font-black sm:text-3xl">{value}</p>
          </button>
        ))}
      </section>

      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
        <Search size={19} className="shrink-0 text-slate-400 dark:text-slate-500" />
        <input value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="Search restaurant, cuisine or owner..."
          className="w-full bg-transparent text-sm text-slate-700 dark:text-slate-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-550" />
      </div>

      {loading ? (
        <div className="flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <LoaderCircle className="animate-spin text-emerald-700" size={28} />
        </div>
      ) : visibleRestaurants.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 size={27} />
          </div>
          <h2 className="text-lg font-black text-[#173c32] dark:text-emerald-350 font-bold">Nothing to review here</h2>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">New restaurant requests will show up in this queue.</p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {visibleRestaurants.map((restaurant) => (
            <article key={restaurant._id}
              className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="relative h-48 bg-emerald-950">
                {restaurant.image ? (
                  <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/40"><Store size={44} /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <span className={`absolute left-5 top-4 rounded-full px-3 py-1.5 text-[11px] font-black ${
                  restaurant.isApproved ? "bg-emerald-400 text-emerald-950" : "bg-amber-300 text-amber-950"
                }`}>
                  {restaurant.isApproved ? "✓ APPROVED" : "● PENDING REVIEW"}
                </span>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-2xl font-black tracking-tight">{restaurant.name}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-white/75">
                    <span>{restaurant.cuisine || "Cuisine not added"}</span><span>•</span>
                    <span>Applied {formatDate(restaurant.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Info icon={UserRound} label="Owner" value={restaurant.owner?.name || "Unknown owner"} />
                  <Info icon={IndianRupee} label="Cost for two" value={`₹${restaurant.costForTwo || "—"}`} />
                </div>
                <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-2"><Mail size={14} /> {restaurant.owner?.email || "Email unavailable"}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> {restaurant.mapEmbed ? "Location details submitted" : "Location not submitted"}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="hidden text-xs font-medium text-slate-400 dark:text-slate-550 sm:block">ID: {restaurant._id.slice(-7).toUpperCase()}</p>
                  <div className="ml-auto flex flex-wrap justify-end gap-2">
                    <button
                      onClick={() => removeRestaurant(restaurant)}
                      disabled={removing === restaurant._id}
                      className="flex items-center gap-2 rounded-xl border border-red-200 dark:border-red-950 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 transition hover:border-red-300 hover:bg-red-100 dark:hover:bg-red-900/20 disabled:cursor-wait disabled:opacity-60"
                    >
                      {removing === restaurant._id
                        ? <LoaderCircle className="animate-spin" size={17} />
                        : <Trash2 size={17} />}
                      {removing === restaurant._id ? "Removing..." : "Remove"}
                    </button>
                    {restaurant.isApproved ? (
                      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 size={17} /> Live on Mr. Food
                      </div>
                    ) : (
                      <button onClick={() => approveRestaurant(restaurant._id)}
                        disabled={approving === restaurant._id}
                        className="flex items-center gap-2 rounded-xl bg-[#d8ff70] px-5 py-2.5 text-sm font-black text-[#14372e] transition hover:bg-[#c8ef61] disabled:opacity-60">
                        {approving === restaurant._id
                          ? <LoaderCircle className="animate-spin" size={17} />
                          : <Check size={17} strokeWidth={3} />}
                        {approving === restaurant._id ? "Approving..." : "Approve restaurant"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</p>
        <p className="truncate text-sm font-bold text-slate-700 dark:text-slate-200">{value}</p>
      </div>
    </div>
  );
}



