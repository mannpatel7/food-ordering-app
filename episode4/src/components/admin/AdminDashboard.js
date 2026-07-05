import { ArrowRight, CheckCircle2, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <main className="px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="overflow-hidden rounded-[2rem] bg-[#163b31] p-7 text-white shadow-xl shadow-emerald-950/10 sm:p-10">
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#d8ff70]">
          ADMIN CONTROL CENTER
        </span>
        <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
          Good food starts with good partners.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-50/65">
          Review incoming applications, verify partner information, and publish approved restaurants.
        </p>
        <Link
          to="/admin/approve"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d8ff70] px-5 py-3 text-sm font-black !text-[#14372e] hover:!text-[#14372e]"
        >
          Review restaurant requests <ArrowRight size={17} />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          [Store, "Partner requests", "See pending and approved restaurant applications in one clear queue."],
          [CheckCircle2, "One-click approval", "Approved restaurants become available to customers immediately."],
        ].map(([Icon, title, copy]) => (
          <div key={title} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <Icon className="text-emerald-700 dark:text-emerald-500" />
            <h2 className="mt-5 text-xl font-black text-[#173c32] dark:text-emerald-400">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
