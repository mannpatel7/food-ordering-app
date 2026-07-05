import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CUISINE_OPTIONS = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "American",
  "Japanese",
  "Thai",
  "Mediterranean",
  "Fast Food",
  "Desserts",
];

const Field = ({ label, hint, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-350">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    {!error && hint && <p className="text-xs text-gray-400 dark:text-slate-500">{hint}</p>}
  </div>
);

const inputCls = (err) =>
  `w-full bg-gray-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-slate-100 outline-none placeholder-gray-400 dark:placeholder-gray-550 transition-all
   ${
     err
       ? "border-red-400 focus:border-red-400 focus:bg-red-50 dark:focus:bg-red-950/20"
       : "border-gray-200 dark:border-slate-800 focus:border-orange-400 focus:bg-orange-50 dark:focus:bg-orange-950/20"
   }`;

export default function AddRestaurantPage({ setRestaurants, setActiveTab }) {
  const baseUrl = "/api";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    cuisine: "",
    image: "",
    costfortwo: "",
    mapEmbed: "",
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const setF = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const addMenuItem = () => setMenuItems((items) => [
    ...items,
    { name: "", category: "", price: "", isVeg: true, image: "" },
  ]);
  const updateMenuItem = (index, key, value) => setMenuItems((items) =>
    items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item)
  );
  const removeMenuItem = (index) => setMenuItems((items) =>
    items.filter((_, itemIndex) => itemIndex !== index)
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Restaurant name is required";
    if (!form.cuisine) e.cuisine = "Select a cuisine type";
    if (!form.image.trim()) e.image = "Image URL is required";
    if (!form.costfortwo || isNaN(form.costfortwo) || +form.costfortwo <= 0)
      e.costfortwo = "Enter a valid amount";
    if (!form.mapEmbed.trim()) e.mapEmbed = "Map embed URL is required";
    menuItems.forEach((item, index) => {
      if (!item.name.trim() || !item.category.trim() || !item.price || +item.price <= 0) {
        e[`menu-${index}`] = "Add dish name, category and a valid price";
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const { name, cuisine, image, costfortwo, mapEmbed } = form;
      const { data } = await axios.post(
        `${baseUrl}/res/addrestro`,
        { name, cuisine, image, costfortwo, mapEmbed, menuItems },
        { withCredentials: true },
      );
      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("SERVER ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleReset = () => {
    setForm({ name: "", cuisine: "", image: "", costfortwo: "", mapEmbed: "" });
    setPreview("");
    setErrors({});
    setSubmitted(false);
    setMenuItems([]);
  };

  /* ── Success screen ── */
  if (submitted)
    return (
      <div className="px-5 py-8 flex flex-col items-center text-center gap-5">
        {preview && (
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-orange-100 dark:border-slate-800">
            <img
              src={preview}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        <div className="w-16 h-16 bg-green-100 dark:bg-green-950/40 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-gray-800 dark:text-slate-100 text-2xl font-black mb-1">
            Request Sent!
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm">
            <span className="font-bold text-orange-500">{form.name}</span> has
            been submitted for admin review.
          </p>
          {menuItems.length > 0 && (
            <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {menuItems.length} menu item{menuItems.length === 1 ? "" : "s"} added successfully.
            </p>
          )}
        </div>

        <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/40 rounded-xl px-4 py-2.5 text-sm text-yellow-700 dark:text-yellow-350 font-semibold">
          ⏳ Pending Admin Approval
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 font-bold text-sm hover:border-orange-300 hover:text-orange-500 transition-all"
          >
            Add Another
          </button>
          <button
            onClick={() => {
              handleReset();
              navigate("/owner/restaurants");
            }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-sm"
          >
            My Restros →
          </button>
        </div>
      </div>
    );

  /* ── Form ── */
  return (
    <div className="px-5 py-6">
      <div className="mb-6">
        <h2 className="text-gray-800 dark:text-slate-100 font-black text-xl">Add New Restaurant</h2>
        <p className="text-gray-400 dark:text-slate-500 text-sm mt-1">
          Fill in the details — we'll review and approve within 24 hrs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <Field label="Restaurant Name" error={errors.name}>
          <div
            className={`flex items-center gap-2.5 ${inputCls(errors.name)} !py-0 !px-0`}
            style={{ padding: 0 }}
          >
            <span className="pl-4 text-lg shrink-0">🍽️</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setF("name", e.target.value)}
              placeholder="e.g. Spice Garden"
              className="flex-1 bg-transparent text-sm text-gray-800 dark:text-slate-100 outline-none placeholder-gray-400 dark:placeholder-gray-550 py-3 pr-4"
            />
          </div>
        </Field>

        {/* Image URL */}
        <Field label="Restaurant Image URL" error={errors.image}>
          <div
            className={`flex items-center gap-2.5 ${inputCls(errors.image)} !py-0 !px-0`}
            style={{ padding: 0 }}
          >
            <span className="pl-4 text-lg shrink-0">🖼️</span>
            <input
              type="url"
              value={form.image}
              onChange={(e) => {
                setF("image", e.target.value);
                setPreview(e.target.value);
              }}
              placeholder="https://example.com/photo.jpg"
              className="flex-1 bg-transparent text-sm text-gray-800 dark:text-slate-100 outline-none placeholder-gray-400 dark:placeholder-gray-550 py-3 pr-4"
            />
          </div>
          {preview && (
            <div className="mt-2 w-full h-36 rounded-2xl overflow-hidden border border-orange-100 dark:border-slate-800">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </Field>

        {/* Cuisine — single select */}
        <Field label="Cuisine Type" error={errors.cuisine}>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {CUISINE_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setF("cuisine", form.cuisine === c ? "" : c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all
                  ${
                    form.cuisine === c
                      ? "bg-orange-500 border-orange-500 text-white shadow-sm shadow-orange-200/50 dark:shadow-none"
                      : "bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-350 hover:border-orange-300 dark:hover:border-orange-550 hover:text-orange-500 dark:hover:text-orange-400"
                  }`}
              >
                {form.cuisine === c && <span className="mr-1">✓</span>}
                {c}
              </button>
            ))}
          </div>
          {form.cuisine && (
            <p className="text-xs text-orange-500 font-medium mt-1.5">
              Selected: <span className="font-bold">{form.cuisine}</span>
              <button
                type="button"
                onClick={() => setF("cuisine", "")}
                className="ml-2 text-gray-400 dark:text-slate-500 hover:text-red-400 transition-colors"
              >
                ✕ clear
              </button>
            </p>
          )}
        </Field>

        {/* Cost for two */}
        <Field label="Cost for Two" error={errors.costfortwo}>
          <div
            className={`flex items-center gap-2.5 ${inputCls(errors.costfortwo)} !py-0 !px-0`}
            style={{ padding: 0 }}
          >
            <span className="pl-4 text-sm font-bold text-gray-400 dark:text-slate-500 shrink-0">
              ₹
            </span>
            <input
              type="number"
              value={form.costfortwo}
              onChange={(e) => setF("costfortwo", e.target.value)}
              placeholder="e.g. 400"
              min="0"
              className="flex-1 bg-transparent text-sm text-gray-800 dark:text-slate-100 outline-none placeholder-gray-400 dark:placeholder-gray-550 py-3 pr-4"
            />
          </div>
        </Field>

        {/* Map Embed */}
        <Field
          label="Google Maps Embed URL"
          error={errors.mapEmbed}
          hint="Maps → Share → Embed a map → copy the src URL"
        >
          <div
            className={`flex items-start gap-2.5 ${inputCls(errors.mapEmbed)} !py-0 !px-0`}
            style={{ padding: 0 }}
          >
            <span className="pl-4 pt-3 text-lg shrink-0">📍</span>
            <textarea
              rows={2}
              value={form.mapEmbed}
              onChange={(e) => setF("mapEmbed", e.target.value)}
              placeholder="Paste embed URL here..."
              className="flex-1 bg-transparent text-sm text-gray-800 dark:text-slate-100 outline-none placeholder-gray-400 dark:placeholder-gray-550 py-3 pr-4 resize-none"
            />
          </div>
        </Field>

        {/* Optional starter menu */}
        <section className="rounded-2xl border border-orange-100 dark:border-slate-800 bg-orange-50/50 dark:bg-slate-900/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-black text-gray-800 dark:text-slate-100">Starter menu</h3>
              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-slate-400">
                Optional — add dishes now and they will be ready when your restaurant is approved.
              </p>
            </div>
            <button type="button" onClick={addMenuItem}
              className="shrink-0 rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white">
              + Add dish
            </button>
          </div>

          {menuItems.length === 0 ? (
            <button type="button" onClick={addMenuItem}
              className="mt-4 w-full rounded-xl border border-dashed border-orange-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-5 text-sm font-bold text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20">
              Add your first menu item
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              {menuItems.map((item, index) => (
                <div key={index} className="rounded-2xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-wider text-orange-500 dark:text-orange-400">Dish {index + 1}</p>
                    <button type="button" onClick={() => removeMenuItem(index)}
                      className="rounded-lg bg-red-50 dark:bg-red-950/20 px-2.5 py-1.5 text-xs font-bold text-red-500 dark:text-red-400">
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input value={item.name} onChange={(e) => updateMenuItem(index, "name", e.target.value)}
                      placeholder="Dish name" className={inputCls(errors[`menu-${index}`])} />
                    <input value={item.category} onChange={(e) => updateMenuItem(index, "category", e.target.value)}
                      placeholder="Category e.g. Main course" className={inputCls(errors[`menu-${index}`])} />
                    <input type="number" min="1" value={item.price}
                      onChange={(e) => updateMenuItem(index, "price", e.target.value)}
                      placeholder="Price ₹" className={inputCls(errors[`menu-${index}`])} />
                    <select value={item.isVeg ? "veg" : "nonveg"}
                      onChange={(e) => updateMenuItem(index, "isVeg", e.target.value === "veg")}
                      className={inputCls(false)}>
                      <option value="veg">Vegetarian</option>
                      <option value="nonveg">Non-vegetarian</option>
                    </select>
                  </div>
                  <input value={item.image} onChange={(e) => updateMenuItem(index, "image", e.target.value)}
                    placeholder="Dish image URL (optional)" className={`${inputCls(false)} mt-3`} />
                  {errors[`menu-${index}`] && (
                    <p className="mt-2 text-xs font-semibold text-red-500">{errors[`menu-${index}`]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Progress indicator */}
        {(() => {
          const filled = [
            form.name,
            form.cuisine,
            form.image,
            form.costfortwo,
            form.mapEmbed,
          ].filter(Boolean).length;
          const pct = Math.round((filled / 5) * 100);
          return (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 font-medium">
                <span>Form completion</span>
                <span>{pct}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })()}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-base shadow-lg shadow-orange-200 dark:shadow-none hover:shadow-orange-300 dark:hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
        >
          Submit for Approval 🚀
        </button>
      </form>
    </div>
  );
}
