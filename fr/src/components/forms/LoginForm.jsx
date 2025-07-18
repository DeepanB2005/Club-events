import React from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({
  loginForm,
  handleLoginChange,
  handleLoginSubmit,
  showPassword,
  setShowPassword,
  setActiveTab,
}) => (
  <form className="space-y-6" onSubmit={handleLoginSubmit}>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={loginForm.email}
        onChange={handleLoginChange}
        placeholder="Enter your email"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={loginForm.password}
          onChange={handleLoginChange}
          placeholder="••••••••••"
          required
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4 text-red-500 border-2 border-gray-300 rounded focus:ring-red-500"
        />
        <span className="ml-2 text-sm text-gray-600">Remember me</span>
      </label>
      <a href="#" className="text-sm text-red-500 hover:text-red-600 transition-colors">
        Forgot password?
      </a>
    </div>
    <button
      type="submit"
      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
    >
      Sign in
    </button>
    <button
      type="button"
      className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-gray-50"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span>Sign in with Google</span>
    </button>
    <p className="text-center text-sm text-gray-600">
      Don't have an account?{" "}
      <button
        type="button"
        className="text-red-500 hover:text-red-600 font-medium transition-colors"
        onClick={() => setActiveTab("signup")}
      >
        Sign up for free!
      </button>
    </p>
  </form>
);

export default LoginForm;