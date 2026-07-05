import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Help = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketName, setTicketName] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");

  const faqs = [
    { q: "How can I track my active orders?", a: "Go to 'My Orders' in your profile to view order status updates in real-time." },
    { q: "What forms of payment are accepted?", a: "We accept all major credit/debit cards (Visa, Mastercard), net banking, and digital UPI wallets." },
    { q: "Can I cancel my order after placing it?", a: "Orders can only be canceled before the restaurant accepts them. Please call customer support for assistance." },
    { q: "How do I edit my partner restaurant details?", a: "Go to your Restaurant Manager dashboard from the sidebar layout and click 'Edit Restaurant'." }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Support ticket created. We will email you shortly!");
    setTicketName("");
    setTicketMsg("");
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
          Help & Support
        </h1>
      </div>

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-5 -mt-12 space-y-6">
        {/* FAQs */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 border border-orange-100 dark:border-slate-700 transition-all duration-300">
          <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 dark:border-slate-750 pb-3">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-2 font-bold text-sm text-slate-800 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition"
                >
                  <span>{faq.q}</span>
                  <span>{openFaq === idx ? "▲" : "▼"}</span>
                </button>
                {openFaq === idx && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-slate-350 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 border border-orange-100 dark:border-slate-700 transition-all duration-300">
          <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4">Contact Support</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Daksh Patel"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-400 mb-1">Issue/Message</label>
              <textarea
                placeholder="Describe your issue or write your question here..."
                value={ticketMsg}
                onChange={(e) => setTicketMsg(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-gray-400 rounded-xl outline-none focus:border-orange-500 text-sm h-28 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition text-sm shadow-md"
            >
              Submit Support Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;
