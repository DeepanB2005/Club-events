import React from "react";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = ({
  signupForm,
  handleSignupChange,
  handleSignupSubmit,
  showPassword,
  setShowPassword,
  setActiveTab,
}) => (
  <form className="space-y-2" onSubmit={handleSignupSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={signupForm.username}
          onChange={handleSignupChange}
          placeholder="Enter username"
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
        <input
          type="text"
          name="rollNo"
          value={signupForm.rollNo}
          onChange={handleSignupChange}
          placeholder="Enter roll number"
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={signupForm.email}
        onChange={handleSignupChange}
        placeholder="Enter your email"
        required
        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={signupForm.password}
          onChange={handleSignupChange}
          placeholder="Create a password"
          required
          className="w-full px-3 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          name="gender"
          value={signupForm.gender}
          onChange={handleSignupChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={signupForm.dob}
          onChange={handleSignupChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <select
          name="year"
          value={signupForm.year}
          onChange={handleSignupChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        >
          <option value="">Select year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <select
          name="department"
          value={signupForm.department}
          onChange={handleSignupChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
        >
          <option value="">Select department</option>
          <option value="Computer Science">Artificial Intelligence</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics">Electronics</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
          <option value="Electrical">Electrical</option>
          <option value="Chemical">Chemical</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
      <input
        type="tel"
        name="phoneNo"
        value={signupForm.phoneNo}
        onChange={handleSignupChange}
        placeholder="Enter phone number"
        required
        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gre-500"
    >
      Create Account
    </button>

    <button
      type="button"
      className="w-full border border-gray-300 hover:border-green-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-green-50"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span>Sign up with Google</span>
    </button>

    
  </form>
);

export default SignupForm;