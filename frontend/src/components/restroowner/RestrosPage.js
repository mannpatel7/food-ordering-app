import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowRight, CheckCircle2, Clock3, IndianRupee,
  LoaderCircle, Plus, Search, Store, Utensils,
} from "lucide-react";

const API = "/api";

export default function RestrosPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get(`${API}/res/getrestrobyuser`, { withCredentials: true })
      .then(({ data }) => setRestaurants(Array.isArray(data) ? data : []))
      .catch((error) => toast.error(error.response?.data?.message || "Could not load restaurants"))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return restaurants.filter((restaurant) =>
      !term || [restaurant.name, restaurant.cuisine]
        .filter(Boolean).some((value) => value.toLowerCase().includes(term)),
    );
  }, [restaurants, query]);

  const approved = restaurants.filter((item) => item.isApproved).length;

  return (
    <main className="px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">Your storefronts</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#321b13] dark:text-orange-100">My restaurants</h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-455">Track approval and manage each restaurant menu.</p>
        </div>
        <Link to="/owner/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black !text-white shadow-lg shadow-orange-200 dark:shadow-none">
          <Plus size={18} /> Add restaurant
        </Link>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-3">
        <Summary icon={Store} label="Total restaurants" value={restaurants.length} />
        <Summary icon={CheckCircle2} label="Approved and live" value={approved} />
      </section>

      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
        <Search size={18} className="text-stone-400 dark:text-stone-500" />
        <input value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your restaurants..."
          className="w-full bg-transparent text-sm text-stone-800 dark:text-slate-100 outline-none placeholder:text-stone-400 dark:placeholder:text-stone-550" />
      </div>

      {loading ? (
        <div className="flex min-h-72 items-center justify-center rounded-3xl bg-white dark:bg-slate-900">
          <LoaderCircle className="animate-spin text-orange-500" size={28} />
        </div>
      ) : visible.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-orange-200 dark:border-slate-850 bg-white dark:bg-slate-900 px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/20 text-orange-500 dark:text-orange-400"><Store /></div>
          <h2 className="text-lg font-black text-stone-800 dark:text-slate-100">No restaurants found</h2>
          <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">Add your first restaurant to start receiving orders.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((restaurant) => (
            <article key={restaurant._id} className="overflow-hidden rounded-3xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="relative h-44 bg-stone-200 dark:bg-slate-800">
                {restaurant.image
                  ? <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
                  : <div className="flex h-full items-center justify-center text-stone-400 dark:text-stone-600"><Store size={42} /></div>}
                <span className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black ${
                  restaurant.isApproved ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300"
                }`}>
                  {restaurant.isApproved ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
                  {restaurant.isApproved ? "LIVE" : "PENDING APPROVAL"}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-black text-[#321b13] dark:text-slate-100">{restaurant.name}</h2>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{restaurant.cuisine || "Cuisine not added"}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-stone-600 dark:text-stone-300">
                  <IndianRupee size={16} className="text-orange-500" />
                  ₹{restaurant.costForTwo || "—"} for two
                </div>
                {restaurant.isApproved ? (
                  <Link to={`/owner/restaurants/${restaurant._id}/menu`}
                    className="mt-5 flex items-center justify-between rounded-xl bg-[#321b13] dark:bg-slate-800 px-4 py-3 text-sm font-black !text-white transition-colors hover:bg-[#25140e] dark:hover:bg-slate-700">
                    <span className="flex items-center gap-2"><Utensils size={17} /> Manage menu</span>
                    <ArrowRight size={17} />
                  </Link>
                ) : (
                  <div className="mt-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-xs font-semibold leading-5 text-amber-700 dark:text-amber-300">
                    Menu tools unlock after admin approval.
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function Summary({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-stone-400 dark:text-stone-500">{label}</p>
        <Icon size={18} className="text-orange-500" />
      </div>
      <p className="mt-3 text-3xl font-black text-[#321b13] dark:text-orange-100">{value}</p>
    </div>
  );
}
