import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Store, UtensilsCrossed } from "lucide-react";

const links = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/approve", label: "Restaurant requests", icon: Store },
];

export default function AdminLayout() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f7f8f4] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-[80px] hidden h-[calc(100vh-80px)] w-72 shrink-0 bg-[#102d26] px-5 py-7 overflow-y-auto lg:block">
          <div className="mb-9 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8ff70] text-[#102d26]">
              <UtensilsCrossed size={22} strokeWidth={2.4} />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight text-white">Mr. Food</p>
              <p className="text-xs font-medium text-emerald-100/60">Admin workspace</p>
            </div>
          </div>

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100/40">
            Management
          </p>
          <nav className="space-y-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white text-[#102d26] shadow-lg shadow-black/10"
                      : "text-emerald-50/65 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8ff70] text-lg">✨</div>
            <p className="text-sm font-bold text-white">Keep quality high</p>
            <p className="mt-1 text-xs leading-5 text-emerald-50/55">
              Review restaurant details before making them visible to customers.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 lg:hidden">
            <nav className="flex gap-2 overflow-x-auto">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold ${
                      isActive ? "bg-[#102d26] dark:bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-350"
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
