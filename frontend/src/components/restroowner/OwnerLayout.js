import { NavLink, Outlet } from "react-router-dom";
import { ClipboardList, PlusCircle, Store, UtensilsCrossed } from "lucide-react";
import { useAppContext } from "../../context/appcontext";

const links = [
  { to: "/owner/orders", label: "Orders", icon: ClipboardList },
  { to: "/owner/restaurants", label: "Restaurants", icon: Store },
  { to: "/owner/add", label: "Add restaurant", icon: PlusCircle },
];

export default function OwnerLayout() {
  const { user } = useAppContext();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fffaf3] dark:bg-slate-950">
      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-[80px] hidden h-[calc(100vh-80px)] w-72 shrink-0 bg-[#2c1810] px-5 py-7 overflow-y-auto lg:block">
          <div className="mb-9 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <UtensilsCrossed size={22} />
            </div>
            <div>
              <p className="text-lg font-black text-white">Mr. Food</p>
              <p className="text-xs text-orange-100/50">Partner workspace</p>
            </div>
          </div>

          <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-semibold text-orange-200/60">Signed in as</p>
            <p className="mt-1 truncate font-black text-white">{user?.name || "Restaurant owner"}</p>
            <p className="mt-0.5 truncate text-xs text-white/40">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-950/30"
                      : "text-orange-50/55 hover:bg-white/10 hover:text-white"
                  }`
                }>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 rounded-2xl bg-orange-500/10 p-4">
            <p className="text-sm font-bold text-orange-100">Partner tip</p>
            <p className="mt-1 text-xs leading-5 text-orange-100/45">
              Keep order statuses current so customers always know what is happening.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-40 border-b border-orange-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 py-3 backdrop-blur lg:hidden">
            <nav className="flex gap-2 overflow-x-auto">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold ${
                      isActive ? "bg-orange-500 text-white" : "bg-orange-50 dark:bg-slate-800 text-orange-800 dark:text-orange-200"
                    }`
                  }>
                  <Icon size={16} /> {label}
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
