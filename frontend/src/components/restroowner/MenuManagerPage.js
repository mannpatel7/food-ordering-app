import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Leaf, LoaderCircle, Plus, Trash2, Utensils } from "lucide-react";

const API = "/api";
const EMPTY = { name: "", category: "", price: "", isVeg: true, image: "" };

export default function MenuManagerPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState("");

  const load = async () => {
    try {
      const [restaurantsResult, menuResult] = await Promise.allSettled([
        axios.get(`${API}/res/getrestrobyuser`, { withCredentials: true }),
        axios.get(`${API}/restaurant/${id}/menu`),
      ]);
      if (restaurantsResult.status === "fulfilled") {
        setRestaurant(restaurantsResult.value.data.find((item) => item._id === id));
      }
      if (menuResult.status === "fulfilled") setItems(menuResult.value.data.menue || []);
      else if (menuResult.reason?.response?.status !== 404) throw menuResult.reason;
    } catch (error) { toast.error(error.response?.data?.message || "Could not load menu"); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [id]);
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const addItem = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.price || +form.price <= 0) {
      return toast.error("Add a dish name, category and valid price");
    }
    setSaving(true);
    try {
      const { data } = await axios.post(`${API}/menu/addmenue`,
        { ...form, price: Number(form.price), restaurantId: id }, { withCredentials: true });
      setItems((current) => [...current, data.menue]);
      setForm(EMPTY);
      toast.success(data.message);
    } catch (error) { toast.error(error.response?.data?.message || "Could not add item"); }
    finally { setSaving(false); }
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Remove "${item.name}" from the menu?`)) return;
    setRemoving(item._id);
    try {
      const { data } = await axios.delete(`${API}/menu/${item._id}`, { withCredentials: true });
      setItems((current) => current.filter((entry) => entry._id !== item._id));
      toast.success(data.message);
    } catch (error) { toast.error(error.response?.data?.message || "Could not remove item"); }
    finally { setRemoving(""); }
  };

  if (loading) return <div className="flex min-h-96 items-center justify-center"><LoaderCircle className="animate-spin text-orange-500" /></div>;

  return <main className="px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
    <Link to="/owner/restaurants" className="inline-flex items-center gap-2 text-sm font-bold !text-stone-500 dark:!text-stone-400"><ArrowLeft size={17} /> My restaurants</Link>
    <header className="mt-5 mb-7"><p className="text-xs font-black uppercase tracking-[.18em] text-orange-500">Menu studio</p>
      <h1 className="mt-2 text-3xl font-black text-[#321b13] dark:text-orange-100">{restaurant?.name || "Restaurant menu"}</h1>
      <p className="mt-2 text-sm text-stone-500 dark:text-stone-450">Add dishes customers can order and remove items no longer available.</p></header>

    <div className="grid gap-6 xl:grid-cols-[380px,1fr]">
      <form onSubmit={addItem} className="h-fit rounded-3xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3"><div className="rounded-xl bg-orange-100 dark:bg-orange-950/40 p-2.5 text-orange-600 dark:text-orange-400"><Plus size={20} /></div>
          <div><h2 className="font-black text-stone-800 dark:text-slate-100">Add menu item</h2><p className="text-xs text-stone-400 dark:text-stone-500">Fill in the dish details</p></div></div>
        <div className="space-y-3">
          <Field value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Dish name" />
          <Field value={form.category} onChange={(e) => setField("category", e.target.value)} placeholder="Category" />
          <Field type="number" min="1" value={form.price} onChange={(e) => setField("price", e.target.value)} placeholder="Price ₹" />
          <Field value={form.image} onChange={(e) => setField("image", e.target.value)} placeholder="Image URL (optional)" />
          <div className="grid grid-cols-2 gap-2">{[[true,"Vegetarian"],[false,"Non-veg"]].map(([value,label]) =>
            <button key={label} type="button" onClick={() => setField("isVeg", value)} className={`rounded-xl border px-3 py-2.5 text-xs font-black transition-all ${form.isVeg === value ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400" : "border-stone-200 dark:border-slate-700 text-stone-400 dark:text-stone-550 bg-transparent"}`}>{label}</button>)}</div>
          <button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-black text-white disabled:opacity-60">
            {saving ? <LoaderCircle className="animate-spin" size={17} /> : <Plus size={17} />} {saving ? "Adding..." : "Add to menu"}
          </button>
        </div>
      </form>

      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black text-[#321b13] dark:text-orange-100">Current menu</h2><span className="rounded-full bg-orange-100 dark:bg-orange-950/40 px-3 py-1 text-xs font-black text-orange-700 dark:text-orange-300">{items.length} items</span></div>
        {items.length === 0 ? <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-orange-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center"><Utensils size={35} className="text-orange-300 dark:text-orange-400" /><h3 className="mt-3 font-black text-stone-800 dark:text-slate-100">Your menu is empty</h3><p className="mt-1 text-sm text-stone-400 dark:text-stone-500">Add the first dish using the form.</p></div>
          : <div className="grid gap-4 md:grid-cols-2">{items.map((item) => <article key={item._id} className="overflow-hidden rounded-2xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="h-36 bg-stone-100 dark:bg-slate-800">{item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-stone-300 dark:text-stone-600"><Utensils size={32} /></div>}</div>
            <div className="p-4"><div className="flex justify-between gap-3"><div><h3 className="font-black text-stone-800 dark:text-slate-100">{item.name}</h3><p className="text-xs text-stone-400 dark:text-stone-500">{item.category}</p></div><p className="font-black text-orange-600 dark:text-orange-400">₹{item.price}</p></div>
              <div className="mt-4 flex items-center justify-between"><span className={`flex items-center gap-1 text-xs font-bold ${item.isVeg ? "text-emerald-600" : "text-red-500"}`}><Leaf size={13} />{item.isVeg ? "Vegetarian" : "Non-veg"}</span>
                <button onClick={() => removeItem(item)} disabled={removing === item._id} className="flex items-center gap-1.5 rounded-lg bg-red-50 dark:bg-red-950/20 px-3 py-2 text-xs font-bold text-red-500 dark:text-red-400 disabled:opacity-60">{removing === item._id ? <LoaderCircle className="animate-spin" size={14} /> : <Trash2 size={14} />} Remove</button></div></div>
          </article>)}</div>}
      </section>
    </div>
  </main>;
}

function Field(props) { return <input {...props} className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-850 px-4 py-3 text-sm text-stone-800 dark:text-slate-100 outline-none focus:border-orange-400 focus:bg-orange-50 dark:focus:bg-orange-950/20" />; }
