import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [remember, setRemember] = useState(false);
  const { fetchUser, setIsLoggedIn } = useAppContext();
  const baseUrl = "http://localhost:5000/api";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/login`, { email, password }, { withCredentials: true });
      console.log(res.data);
      setLoading(false);
      setSuccess(true);
      setIsLoggedIn(true);
      fetchUser();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">

      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200 dark:bg-orange-900 rounded-full opacity-40 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 dark:bg-red-950 rounded-full opacity-50 translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 dark:bg-amber-700 rounded-full opacity-30 blur-sm" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-orange-100 dark:border-slate-700 transition-colors">

        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 px-8 pt-10 pb-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4 relative">
            <span className="text-4xl">🍔</span>
          </div>

          <h1 className="text-white text-3xl font-black tracking-tight leading-none">
            Mr. Food
          </h1>
          <p className="text-orange-100 text-sm mt-2 font-medium">
            Sign in to order your favourites
          </p>
        </div>

        {/* Curved overlap */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 h-6 relative">
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-slate-900 rounded-t-3xl" />
        </div>

        {/* Form */}
        <div className="px-8 pb-8 -mt-1">
          {success ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-gray-800 dark:text-slate-100 text-2xl font-black">Welcome back!</p>
              <p className="text-gray-400 dark:text-slate-350 text-sm mt-2">Loading your menu...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-gray-700 dark:text-slate-250 text-sm font-semibold mb-1.5">
                  Email address
                </label>
                <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50 dark:bg-slate-800 ${
                  activeField === "email"
                    ? "border-orange-400 bg-orange-50 dark:bg-slate-800 shadow-sm shadow-orange-100 dark:shadow-none"
                    : "border-gray-200 dark:border-slate-600 hover:border-gray-300"
                }`}>
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    placeholder="you@example.com"
                    className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none placeholder-gray-400 dark:placeholder-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-gray-700 dark:text-slate-250 text-sm font-semibold">Password</label>
                  <button type="button" className="text-orange-500 dark:text-orange-400 text-xs font-semibold hover:text-orange-600 dark:hover:text-orange-355 transition-colors">
                    Forgot password?
                  </button>
                </div>
                <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50 dark:bg-slate-800 ${
                  activeField === "password"
                    ? "border-orange-400 bg-orange-50 dark:bg-slate-800 shadow-sm shadow-orange-100 dark:shadow-none"
                    : "border-gray-200 dark:border-slate-600 hover:border-gray-300"
                }`}>
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveField("password")}
                    onBlur={() => setActiveField(null)}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent text-gray-800 dark:text-slate-100 text-sm outline-none placeholder-gray-400 dark:placeholder-slate-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 dark:text-slate-400 transition-colors shrink-0"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                    remember ? "bg-orange-500 border-orange-500" : "border-gray-300 dark:border-slate-650 hover:border-orange-400"
                  }`}
                >
                  {remember && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className="text-gray-500 dark:text-slate-350 text-sm font-medium">Remember me for 30 days</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-70 text-white font-black text-base rounded-xl py-3.5 mt-2 transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 dark:shadow-none hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span>🍔</span>
                  </>
                )}
              </button>

              {/* Sign up link */}
              <p className="text-center text-gray-500 dark:text-slate-350 text-sm pt-1">
                New to Mr. Food?{" "}
                <button type="button" className="text-orange-500 dark:text-orange-400 font-bold hover:text-orange-600 dark:hover:text-orange-300 transition-colors" onClick={() => navigate("/signup")}>
                  Create an account
                </button>
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
