import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    role: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:5000/api";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/signup`, form);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-slate-955 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-100 dark:border-slate-700 transition-colors">

        <h2 className="text-3xl font-black text-center text-[#321b13] dark:text-orange-100 mb-6">
          Create Account 🍔
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 dark:text-slate-250 text-sm font-semibold mb-1.5">
              Full name
            </label>
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:border-gray-350 focus-within:border-orange-400 focus-within:bg-orange-50/20 transition-all duration-200">
              <span className="text-gray-400 shrink-0 text-sm">👤</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none placeholder-gray-400 dark:placeholder-slate-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-slate-250 text-sm font-semibold mb-1.5">
              Email address
            </label>
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:border-gray-350 focus-within:border-orange-400 focus-within:bg-orange-50/20 transition-all duration-200">
              <span className="text-gray-400 shrink-0 text-sm">✉️</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none placeholder-gray-400 dark:placeholder-slate-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-slate-250 text-sm font-semibold mb-1.5">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:border-gray-350 focus-within:border-orange-400 focus-within:bg-orange-50/20 transition-all duration-200">
              <span className="text-gray-400 shrink-0 text-sm">🔒</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none placeholder-gray-400 dark:placeholder-slate-500"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 dark:text-slate-250 text-sm font-semibold mb-1.5">
              Phone number
            </label>
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:border-gray-350 focus-within:border-orange-400 focus-within:bg-orange-50/20 transition-all duration-200">
              <span className="text-gray-400 shrink-0 text-sm">📞</span>
              <input
                type="text"
                name="phoneNo"
                value={form.phoneNo}
                onChange={handleChange}
                placeholder="e.g. +91 9988776655"
                className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none placeholder-gray-400 dark:placeholder-slate-500"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 dark:text-slate-250 text-sm font-semibold mb-1.5">
              Address
            </label>
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:border-gray-350 focus-within:border-orange-400 focus-within:bg-orange-50/20 transition-all duration-200">
              <span className="text-gray-400 shrink-0 text-sm">📍</span>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="e.g. 123 Street, City"
                className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none placeholder-gray-400 dark:placeholder-slate-500"
                required
              />
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-gray-700 dark:text-slate-250 text-sm font-semibold mb-1.5">
              Select your role
            </label>
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:border-gray-355 focus-within:border-orange-400 focus-within:bg-orange-50/20 transition-all duration-200">
              <span className="text-gray-400 shrink-0 text-sm">💼</span>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none cursor-pointer"
                required
              >
                <option value="" className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">Select Role</option>
                <option value="user" className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">User (Customer)</option>
                <option value="owner" className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">Owner (Partner)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white p-3.5 rounded-xl font-bold hover:bg-orange-600 transition duration-200 mt-2"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600 dark:text-slate-350">{message}</p>
          )}

          <p className="text-center text-sm text-gray-700 dark:text-slate-350 pt-1">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 cursor-pointer font-semibold transition-colors"
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signup;
