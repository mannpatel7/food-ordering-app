import { useState } from "react";
import { useAppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home 🏠", address: user?.address || "123 Main Street, Apt 4B, Cityville", isDefault: true },
    { id: 2, label: "Work 💼", address: "Tech Hub Tower, Floor 12, Business District", isDefault: false }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newAddr, setNewAddr] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newLabel || !newAddr) return;
    setAddresses([
      ...addresses,
      { id: Date.now(), label: newLabel, address: newAddr, isDefault: false }
    ]);
    setNewLabel("");
    setNewAddr("");
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-900 pb-16 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 pt-12 pb-20 px-6 relative">
        <button 
          onClick={() => navigate("/profile")}
          className="absolute left-6 top-12 text-white font-bold flex items-center gap-1.5 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-white text-2xl font-black text-center">
          Saved Addresses
        </h1>
      </div>

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-5 -mt-12">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 transition-all duration-300 border border-orange-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">Delivery Locations</h2>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="text-orange-500 dark:text-orange-400 font-bold hover:text-orange-655 text-sm transition"
            >
              {showAdd ? "Cancel" : "+ Add New"}
            </button>
          </div>

          {/* Add form */}
          {showAdd && (
            <form onSubmit={handleAdd} className="mb-6 p-4 border border-orange-100 dark:border-slate-700 rounded-2xl bg-orange-50/20 dark:bg-slate-900/40 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Address Label</label>
                <input
                  type="text"
                  placeholder="e.g. Gym, Friend's House"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Detailed Address</label>
                <textarea
                  placeholder="Street name, landmark, building, apartment..."
                  value={newAddr}
                  onChange={(e) => setNewAddr(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 transition-all text-sm h-20 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-xl hover:bg-orange-600 transition text-sm shadow-md"
              >
                Save Location
              </button>
            </form>
          )}

          {/* Address List */}
          <div className="space-y-4">
            {addresses.map((item) => (
              <div
                key={item.id}
                className="border border-gray-100 dark:border-slate-750 p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 flex items-start gap-3 justify-between hover:shadow-md transition duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-slate-800 dark:text-white">{item.label}</span>
                    {item.isDefault && (
                      <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-550 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-slate-350 text-xs leading-relaxed">
                    {item.address}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-400 hover:text-red-500 transition text-sm self-start"
                  title="Delete address"
                >
                  🗑️
                </button>
              </div>
            ))}
            {addresses.length === 0 && (
              <p className="text-center text-gray-450 dark:text-slate-400 text-sm py-6">No saved addresses. Add a location to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
