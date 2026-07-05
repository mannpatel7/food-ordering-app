// import { useState } from "react";
 
// const STATUS_ORDER = {
//   new: {
//     label: "New Order",
//     bg: "bg-blue-50",
//     border: "border-blue-200",
//     dot: "bg-blue-500",
//     text: "text-blue-600",
//     next: "preparing",
//     nextLabel: "Accept & Prepare",
//     nextColor: "bg-blue-500 hover:bg-blue-600",
//   },
//   preparing: {
//     label: "Preparing",
//     bg: "bg-orange-50",
//     border: "border-orange-200",
//     dot: "bg-orange-500",
//     text: "text-orange-600",
//     next: "ready",
//     nextLabel: "Mark Ready",
//     nextColor: "bg-orange-500 hover:bg-orange-600",
//   },
//   ready: {
//     label: "Ready for Pickup",
//     bg: "bg-green-50",
//     border: "border-green-200",
//     dot: "bg-green-500",
//     text: "text-green-600",
//     next: "delivered",
//     nextLabel: "Mark Delivered",
//     nextColor: "bg-green-500 hover:bg-green-600",
//   },
//   delivered: {
//     label: "Delivered",
//     bg: "bg-gray-50",
//     border: "border-gray-200",
//     dot: "bg-gray-400",
//     text: "text-gray-500",
//     next: null,
//     nextLabel: null,
//     nextColor: "",
//   },
// };
 
// const FILTER_LABELS = {
//   all: "All",
//   new: "New",
//   preparing: "Preparing",
//   ready: "Ready",
//   delivered: "Delivered",
// };
 
// export default function OrdersPage({ orders = [], setOrders }) {
//   const [filterStatus, setFilterStatus] = useState("all");
 
//   const advanceOrder = (id) => {
//     setOrders(prev =>
//       prev.map(o => {
//         if (o.id !== id) return o;
//         const next = STATUS_ORDER[o.status]?.next;
//         return next ? { ...o, status: next } : o;
//       })
//     );
//   };
 
//   const filteredOrders =
//     filterStatus === "all"
//       ? orders
//       : orders.filter(o => o.status === filterStatus);
 
//   const newCount = orders.filter(o => o.status === "new").length;
 
//   return (
//     <div className="min-h-screen bg-orange-50 pb-10">
 
//       {/* Summary strip */}
//       <div className="px-5 pt-5 grid grid-cols-3 gap-3">
//         {[
//           { label: "Active",    value: orders.filter(o => o.status !== "delivered").length, icon: "🔥", color: "text-orange-500" },
//           { label: "New",       value: newCount,                                             icon: "🆕", color: "text-blue-500" },
//           { label: "Delivered", value: orders.filter(o => o.status === "delivered").length,  icon: "✅", color: "text-green-600" },
//         ].map(s => (
//           <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
//             <div className="text-lg mb-0.5">{s.icon}</div>
//             <div className={`font-black text-xl leading-none ${s.color}`}>{s.value}</div>
//             <div className="text-gray-400 text-xs mt-1">{s.label}</div>
//           </div>
//         ))}
//       </div>
 
//       {/* Header */}
//       <div className="px-5 mt-6 mb-3 flex items-center justify-between">
//         <h2 className="text-gray-800 font-black text-lg">
//           Manage Orders
//           {newCount > 0 && (
//             <span className="ml-2 text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5 align-middle">
//               {newCount} new
//             </span>
//           )}
//         </h2>
//         <span className="text-xs text-gray-400">{orders.length} total</span>
//       </div>
 
//       {/* Filter chips */}
//       <div className="flex gap-2 px-5 overflow-x-auto pb-1 mb-4">
//         {Object.entries(FILTER_LABELS).map(([key, label]) => {
//           const count = key === "all"
//             ? orders.length
//             : orders.filter(o => o.status === key).length;
//           const isActive = filterStatus === key;
//           return (
//             <button
//               key={key}
//               onClick={() => setFilterStatus(key)}
//               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all
//                 ${isActive
//                   ? "bg-orange-500 border-orange-500 text-white shadow-sm"
//                   : "bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"}`}
//             >
//               {label}
//               <span className={`text-xs font-black px-1.5 py-0.5 rounded-lg
//                 ${isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-400"}`}>
//                 {count}
//               </span>
//             </button>
//           );
//         })}
//       </div>
 
//       {/* Empty state */}
//       {filteredOrders.length === 0 && (
//         <div className="mx-5 bg-white rounded-2xl border border-gray-100 p-10 text-center">
//           <div className="text-4xl mb-2">📭</div>
//           <p className="text-gray-700 font-bold">No orders here</p>
//           <p className="text-gray-400 text-sm mt-1">
//             {filterStatus === "all"
//               ? "New orders will appear here."
//               : `No "${FILTER_LABELS[filterStatus]}" orders right now.`}
//           </p>
//         </div>
//       )}
 
//       {/* Order cards */}
//       <div className="px-5 space-y-3">
//         {filteredOrders.map(order => {
//           const s = STATUS_ORDER[order.status];
//           if (!s) return null;
//           return (
//             <div
//               key={order.id}
//               className={`bg-white rounded-2xl border ${s.border} shadow-sm overflow-hidden`}
//             >
//               {/* Card header */}
//               <div className={`${s.bg} px-4 py-2.5 flex items-center justify-between`}>
//                 <div className="flex items-center gap-2">
//                   <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot} ${order.status === "new" ? "animate-pulse" : ""}`} />
//                   <span className={`text-xs font-bold ${s.text}`}>{s.label}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-400 text-xs">{order.time}</span>
//                   <span className="text-gray-500 text-xs font-semibold">#{order.id}</span>
//                 </div>
//               </div>
 
//               {/* Card body */}
//               <div className="px-4 py-3">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-gray-800 font-bold text-sm">{order.customer}</p>
//                     <div className="flex flex-wrap gap-1 mt-1.5">
//                       {order.items.map((item, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-gray-50 border border-gray-200 text-gray-500 rounded-lg px-2 py-0.5"
//                         >
//                           {item}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <p className="text-orange-500 font-black text-lg shrink-0">₹{order.total}</p>
//                 </div>
 
//                 {/* Action */}
//                 {s.next ? (
//                   <button
//                     onClick={() => advanceOrder(order.id)}
//                     className={`w-full mt-3 py-2.5 rounded-xl text-white text-xs font-black transition-all active:scale-95 ${s.nextColor}`}
//                   >
//                     {s.nextLabel} →
//                   </button>
//                 ) : (
//                   <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
//                     <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//                     </svg>
//                     Order completed
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//     nextColor: "bg-blue-500 hover:bg-blue-600",
//   },
//   preparing: {
//     label: "Preparing",
//     bg: "bg-orange-50",
//     border: "border-orange-200",
//     dot: "bg-orange-500",
//     text: "text-orange-600",
//     next: "ready",
//     nextLabel: "Mark Ready",
//     nextColor: "bg-orange-500 hover:bg-orange-600",
//   },
//   ready: {
//     label: "Ready for Pickup",
//     bg: "bg-green-50",
//     border: "border-green-200",
//     dot: "bg-green-500",
//     text: "text-green-600",
//     next: "delivered",
//     nextLabel: "Mark Delivered",
//     nextColor: "bg-green-500 hover:bg-green-600",
//   },
//   delivered: {
//     label: "Delivered",
//     bg: "bg-gray-50",
//     border: "border-gray-200",
//     dot: "bg-gray-400",
//     text: "text-gray-500",
//     next: null,
//     nextLabel: null,
//     nextColor: "",
//   },
// };
 
// const FILTER_LABELS = {
//   all: "All",
//   new: "New",
//   preparing: "Preparing",
//   ready: "Ready",
//   delivered: "Delivered",
// };
 
// export default function OrdersPage({ orders = [], setOrders }) {
//   const [filterStatus, setFilterStatus] = useState("all");
 
//   const advanceOrder = (id) => {
//     setOrders(prev =>
//       prev.map(o => {
//         if (o.id !== id) return o;
//         const next = STATUS_ORDER[o.status]?.next;
//         return next ? { ...o, status: next } : o;
//       })
//     );
//   };
 
//   const filteredOrders =
//     filterStatus === "all"
//       ? orders
//       : orders.filter(o => o.status === filterStatus);
 
//   const newCount = orders.filter(o => o.status === "new").length;
 
//   return (
//     <div className="min-h-screen bg-orange-50 pb-10">
 
//       {/* Summary strip */}
//       <div className="px-5 pt-5 grid grid-cols-3 gap-3">
//         {[
//           { label: "Active",    value: orders.filter(o => o.status !== "delivered").length, icon: "🔥", color: "text-orange-500" },
//           { label: "New",       value: newCount,                                             icon: "🆕", color: "text-blue-500" },
//           { label: "Delivered", value: orders.filter(o => o.status === "delivered").length,  icon: "✅", color: "text-green-600" },
//         ].map(s => (
//           <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
//             <div className="text-lg mb-0.5">{s.icon}</div>
//             <div className={`font-black text-xl leading-none ${s.color}`}>{s.value}</div>
//             <div className="text-gray-400 text-xs mt-1">{s.label}</div>
//           </div>
//         ))}
//       </div>
 
//       {/* Header */}
//       <div className="px-5 mt-6 mb-3 flex items-center justify-between">
//         <h2 className="text-gray-800 font-black text-lg">
//           Manage Orders
//           {newCount > 0 && (
//             <span className="ml-2 text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5 align-middle">
//               {newCount} new
//             </span>
//           )}
//         </h2>
//         <span className="text-xs text-gray-400">{orders.length} total</span>
//       </div>
 
//       {/* Filter chips */}
//       <div className="flex gap-2 px-5 overflow-x-auto pb-1 mb-4">
//         {Object.entries(FILTER_LABELS).map(([key, label]) => {
//           const count = key === "all"
//             ? orders.length
//             : orders.filter(o => o.status === key).length;
//           const isActive = filterStatus === key;
//           return (
//             <button
//               key={key}
//               onClick={() => setFilterStatus(key)}
//               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all
//                 ${isActive
//                   ? "bg-orange-500 border-orange-500 text-white shadow-sm"
//                   : "bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"}`}
//             >
//               {label}
//               <span className={`text-xs font-black px-1.5 py-0.5 rounded-lg
//                 ${isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-400"}`}>
//                 {count}
//               </span>
//             </button>
//           );
//         })}
//       </div>
 
//       {/* Empty state */}
//       {filteredOrders.length === 0 && (
//         <div className="mx-5 bg-white rounded-2xl border border-gray-100 p-10 text-center">
//           <div className="text-4xl mb-2">📭</div>
//           <p className="text-gray-700 font-bold">No orders here</p>
//           <p className="text-gray-400 text-sm mt-1">
//             {filterStatus === "all"
//               ? "New orders will appear here."
//               : `No "${FILTER_LABELS[filterStatus]}" orders right now.`}
//           </p>
//         </div>
//       )}
 
//       {/* Order cards */}
//       <div className="px-5 space-y-3">
//         {filteredOrders.map(order => {
//           const s = STATUS_ORDER[order.status];
//           if (!s) return null;
//           return (
//             <div
//               key={order.id}
//               className={`bg-white rounded-2xl border ${s.border} shadow-sm overflow-hidden`}
//             >
//               {/* Card header */}
//               <div className={`${s.bg} px-4 py-2.5 flex items-center justify-between`}>
//                 <div className="flex items-center gap-2">
//                   <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot} ${order.status === "new" ? "animate-pulse" : ""}`} />
//                   <span className={`text-xs font-bold ${s.text}`}>{s.label}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-400 text-xs">{order.time}</span>
//                   <span className="text-gray-500 text-xs font-semibold">#{order.id}</span>
//                 </div>
//               </div>
 
//               {/* Card body */}
//               <div className="px-4 py-3">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-gray-800 font-bold text-sm">{order.customer}</p>
//                     <div className="flex flex-wrap gap-1 mt-1.5">
//                       {order.items.map((item, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-gray-50 border border-gray-200 text-gray-500 rounded-lg px-2 py-0.5"
//                         >
//                           {item}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <p className="text-orange-500 font-black text-lg shrink-0">₹{order.total}</p>
//                 </div>
 
//                 {/* Action */}
//                 {s.next ? (
//                   <button
//                     onClick={() => advanceOrder(order.id)}
//                     className={`w-full mt-3 py-2.5 rounded-xl text-white text-xs font-black transition-all active:scale-95 ${s.nextColor}`}
//                   >
//                     {s.nextLabel} →
//                   </button>
//                 ) : (
//                   <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
//                     <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//                     </svg>
//                     Order completed
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle2, LoaderCircle, MapPin, PackageCheck } from "lucide-react";

const API = "http://localhost:5000/api";
const STATUS = {
  Pending: ["Confirmed", "Confirm order", "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"],
  Confirmed: ["Preparing", "Start preparing", "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"],
  Preparing: ["Out for Delivery", "Send for delivery", "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"],
  "Out for Delivery": ["Delivered", "Mark delivered", "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"],
  Delivered: [null, null, "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"],
  Cancelled: [null, null, "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"],
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const [filter, setFilter] = useState("Active");
  const [restaurant, setRestaurant] = useState("all");

  useEffect(() => {
    axios.get(`${API}/owner/orders`, { withCredentials: true })
      .then(({ data }) => { setOrders(data.orders || []); setRestaurants(data.restaurants || []); })
      .catch((error) => toast.error(error.response?.data?.message || "Could not load orders"))
      .finally(() => setLoading(false));
  }, []);

  const restaurantIds = useMemo(() => new Set(restaurants.map((item) => item._id)), [restaurants]);
  const visible = orders.filter((order) => {
    const statusMatch = filter === "All" || (filter === "Active"
      ? !["Delivered", "Cancelled"].includes(order.status) : order.status === filter);
    const restaurantMatch = restaurant === "all" || order.items.some((item) =>
      (item.restaurantId?._id || item.restaurantId) === restaurant);
    return statusMatch && restaurantMatch;
  });

  const updateStatus = async (order, status) => {
    setUpdating(order._id);
    try {
      const { data } = await axios.put(`${API}/owner/orders/${order._id}/status`, { status }, { withCredentials: true });
      setOrders((items) => items.map((item) => item._id === order._id ? data.order : item));
      toast.success(`Order marked ${status.toLowerCase()}`);
    } catch (error) { toast.error(error.response?.data?.message || "Could not update order"); }
    finally { setUpdating(""); }
  };

  const active = orders.filter((item) => !["Delivered", "Cancelled"].includes(item.status)).length;
  const delivered = orders.filter((item) => item.status === "Delivered").length;

  return <main className="px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
    <header className="mb-7"><p className="text-xs font-black uppercase tracking-[.18em] text-orange-500">Live operations</p>
      <h1 className="mt-2 text-3xl font-black text-[#321b13] dark:text-orange-100">Restaurant orders</h1>
      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">Move orders from confirmation through delivery.</p></header>

    <section className="mb-6 grid grid-cols-3 gap-3">
      {[["Active",active],["Delivered",delivered],["Total",orders.length]].map(([label,value]) =>
        <div key={label} className="rounded-2xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"><PackageCheck size={18} className="text-orange-500" />
          <p className="mt-3 text-2xl font-black text-[#321b13] dark:text-orange-100">{value}</p><p className="text-xs font-bold text-stone-400 dark:text-stone-500">{label}</p></div>)}
    </section>

    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:flex-row">
      <div className="flex flex-1 gap-2 overflow-x-auto">{["Active","All","Pending","Preparing","Out for Delivery","Delivered"].map((status) =>
        <button key={status} onClick={() => setFilter(status)} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-black ${filter === status ? "bg-orange-500 text-white" : "bg-orange-50 dark:bg-slate-800 text-orange-800 dark:text-orange-200"}`}>{status}</button>)}</div>
      <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)} className="rounded-xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-bold text-stone-600 dark:text-slate-300 outline-none">
        <option value="all">All restaurants</option>{restaurants.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
      </select>
    </div>

    {loading ? <Empty><LoaderCircle className="animate-spin text-orange-500" /></Empty>
      : visible.length === 0 ? <Empty><PackageCheck className="text-orange-300 dark:text-orange-400" size={34} /><h2 className="mt-3 font-black text-stone-850 dark:text-slate-100">No orders in this view</h2></Empty>
      : <div className="grid gap-4 xl:grid-cols-2">{visible.map((order) => {
        const ownerItems = order.items.filter((item) => restaurantIds.has(item.restaurantId?._id || item.restaurantId));
        const subtotal = ownerItems.reduce((sum,item) => sum + item.priceAtOrderTime * item.quantity, 0);
        const meta = STATUS[order.status] || STATUS.Pending;
        return <article key={order._id} className="rounded-3xl border border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex justify-between gap-3"><div><p className="text-xs font-bold text-stone-400 dark:text-stone-500">ORDER #{order._id.slice(-7).toUpperCase()}</p>
            <h2 className="mt-1 text-lg font-black text-[#321b13] dark:text-slate-100">{order.user?.name || "Customer"}</h2><p className="text-xs text-stone-400 dark:text-stone-500">{new Date(order.createdAt).toLocaleString("en-IN")}</p></div>
            <span className={`h-fit rounded-full px-3 py-1.5 text-xs font-black ${meta[2]}`}>{order.status}</span></div>
          <div className="mt-4 space-y-2">{ownerItems.map((item) => <div key={item._id} className="flex justify-between rounded-xl bg-orange-50/60 dark:bg-slate-850 px-3 py-2.5 text-sm text-stone-800 dark:text-slate-100">
            <div><b>{item.quantity}×</b> {item.menuItem?.name || "Menu item"}<p className="text-[11px] text-stone-400 dark:text-stone-500">{item.restaurantId?.name}</p></div><b>₹{item.priceAtOrderTime * item.quantity}</b></div>)}</div>
          <p className="mt-4 flex gap-2 text-xs text-stone-500 dark:text-stone-400"><MapPin size={14} className="shrink-0 text-orange-500" />{order.deliveryAddress}</p>
          <div className="mt-4 flex items-center justify-between border-t border-orange-50 dark:border-slate-800 pt-4"><div><p className="text-[10px] font-bold uppercase text-stone-400 dark:text-stone-500">Your subtotal</p><p className="text-xl font-black text-[#321b13] dark:text-slate-100">₹{subtotal}</p></div>
            {meta[0] ? <button onClick={() => updateStatus(order, meta[0])} disabled={updating === order._id} className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-black text-white disabled:opacity-60">{updating === order._id ? "Updating..." : meta[1]}</button>
              : <span className="flex items-center gap-1 text-sm font-bold text-emerald-600"><CheckCircle2 size={17} /> Complete</span>}</div>
        </article>;
      })}</div>}
  </main>;
}

function Empty({ children }) { return <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-orange-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">{children}</div>; }
