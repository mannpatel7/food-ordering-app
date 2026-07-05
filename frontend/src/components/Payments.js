import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    { id: 1, type: "Visa", number: "•••• •••• •••• 4321", holder: "Daksh Patel", expiry: "12/29", color: "from-purple-600 to-indigo-700" },
    { id: 2, type: "Mastercard", number: "•••• •••• •••• 8877", holder: "Daksh Patel", expiry: "06/28", color: "from-orange-500 to-amber-600" }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [number, setNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!number || !holder || !expiry) return;
    const cleanNum = number.replace(/\s/g, "");
    const formattedNum = `•••• •••• •••• ${cleanNum.slice(-4) || "0000"}`;
    const colors = [
      "from-purple-600 to-indigo-700",
      "from-orange-500 to-amber-600",
      "from-teal-500 to-emerald-600",
      "from-blue-600 to-cyan-700"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCards([
      ...cards,
      {
        id: Date.now(),
        type: cleanNum.startsWith("4") ? "Visa" : "Mastercard",
        number: formattedNum,
        holder,
        expiry,
        color: randomColor
      }
    ]);
    setNumber("");
    setHolder("");
    setExpiry("");
    setCvv("");
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    setCards(cards.filter(c => c.id !== id));
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
          Payment Methods
        </h1>
      </div>

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-5 -mt-12">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 border border-orange-100 dark:border-slate-700 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">Saved Cards</h2>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="text-orange-500 dark:text-orange-400 font-bold hover:text-orange-655 text-sm transition"
            >
              {showAdd ? "Cancel" : "+ Add Card"}
            </button>
          </div>

          {/* Add form */}
          {showAdd && (
            <form onSubmit={handleAdd} className="mb-6 p-4 border border-orange-100 dark:border-slate-700 rounded-2xl bg-orange-50/20 dark:bg-slate-900/40 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Card Holder Name</label>
                <input
                  type="text"
                  placeholder="e.g. Daksh Patel"
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4111 2222 3333 4444"
                  maxLength="19"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 text-sm"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-xl hover:bg-orange-600 transition text-sm shadow-md"
              >
                Add Saved Card
              </button>
            </form>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`bg-gradient-to-r ${card.color} text-white p-5 rounded-2xl shadow-lg relative flex flex-col justify-between h-40 overflow-hidden`}
              >
                {/* Glossmorphic details */}
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Credit Card</p>
                    <p className="text-lg font-bold mt-1">{card.type}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-white/70 hover:text-white transition text-lg bg-black/10 hover:bg-black/25 w-7 h-7 rounded-full flex items-center justify-center"
                    title="Delete card"
                  >
                    🗑️
                  </button>
                </div>

                <div className="text-xl font-bold tracking-widest my-2">
                  {card.number}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-75">Card Holder</p>
                    <p className="text-sm font-semibold">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase font-bold opacity-75">Expires</p>
                    <p className="text-sm font-semibold">{card.expiry}</p>
                  </div>
                </div>
              </div>
            ))}
            {cards.length === 0 && (
              <p className="text-center text-gray-450 dark:text-slate-400 text-sm py-6">No saved payment methods. Add a card to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
