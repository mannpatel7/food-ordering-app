import { useAppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {

const [showEdit, setShowEdit] = useState(false);
  const { user, setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();

  const baseUrl = "http://localhost:5000/api";

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "MF";

  const stats = [
    { label: "Orders", value: user?.orders ?? 0, emoji: "📦" }
  ];

  const menuItems = [
    { label: "My Orders", emoji: "📦", desc: "Track and reorder", path: "/order" },
    { label: "Saved Addresses", emoji: "📍", desc: "Manage delivery spots", path: "/addresses" },
    { label: "Payment Methods", emoji: "💳", desc: "Cards & wallets", path: "/payments" },
    { label: "Help & Support", emoji: "🤝", desc: "We're here for you", path: "/help" },
  ];

  const handleLogout = async () => {
    try {

      await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });

      setIsLoggedIn(false);

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-900 pb-16">

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 pt-12 pb-20 px-6">
        <h1 className="text-white text-xl font-black text-center">
          My Profile
        </h1>
      </div>

      {/* Profile Card */}
      <div className="px-5 -mt-12">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 flex flex-col items-center gap-3">

          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl"/>
            ) : (
              <span className="text-white text-3xl font-black">{initials}</span>
            )}
          </div>

          <div className="text-center">
            <h2 className="text-gray-800 dark:text-white text-xl font-black">
              {user?.name ?? "Mr. Food User"}
            </h2>

            <p className="text-gray-400 text-sm">
              {user?.email ?? "user@mrfood.com"}
            </p>
            {user?.phoneNo && (
              <p className="text-gray-500 dark:text-gray-350 text-xs font-semibold mt-1">
                📞 {user.phoneNo}
              </p>
            )}
            <button
              onClick={() => setShowEdit(true)}
              className="mt-3 px-5 py-2 rounded-xl border-2 border-orange-400 text-orange-500 font-bold hover:bg-orange-50 dark:hover:bg-slate-700/50 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 mt-6 space-y-3">

        {menuItems.map((item) => (

          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full bg-white dark:bg-slate-800 rounded-2xl px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all"
          >

            <div className="w-11 h-11 bg-orange-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-xl">
              {item.emoji}
            </div>

            <div className="flex-1 text-left">
              <p className="text-gray-800 dark:text-white font-bold text-sm">
                {item.label}
              </p>

              <p className="text-gray-400 text-xs">
                {item.desc}
              </p>
            </div>

          </button>

        ))}

      </div>

      {/* Logout */}
      <div className="px-5 mt-6">

        <button
          onClick={handleLogout}
          className="w-full bg-red-50 dark:bg-red-900/20 rounded-2xl px-5 py-4 flex items-center gap-4"
        >

          <div className="w-11 h-11 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-xl">
            🚪
          </div>

          <div className="flex-1 text-left">
            <p className="text-red-500 font-bold text-sm">
              Log Out
            </p>
          </div>

        </button>

      </div>
      {showEdit && (
  <EditProfileModal
    user={user}
    onClose={() => setShowEdit(false)}
  />
)}

    </div>
  );
};
const EditProfileModal = ({ user, onClose }) => {

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo || "");
  const { fetchUser } = useAppContext();

  const baseUrl = "http://localhost:5000/api";

  const handleUpdate = async () => {
  try {

    await axios.put(
      `${baseUrl}/updateuser`,
      { name, email, phoneNo },
      { withCredentials: true }
    );

    await fetchUser();
    toast.success("Profile updated");
    
    onClose();

  } catch (error) {
    console.log(error);
    toast.error("Update failed");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl w-96 border border-orange-100 dark:border-slate-700">
        <h2 className="text-xl font-black mb-4 text-gray-800 dark:text-white">
          Edit Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 focus:bg-orange-50/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 focus:bg-orange-50/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNo}
              onChange={(e)=>setPhoneNo(e.target.value)}
              placeholder="Phone"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 focus:bg-orange-50/20 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
export default Profile;
