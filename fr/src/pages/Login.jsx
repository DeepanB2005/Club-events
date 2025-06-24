import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    rollNo: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    year: "",
    department: "",
    phoneNo: ""
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login form data:", loginForm);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (signupForm.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(signupForm.phoneNo)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      console.log("Sending signup data:", signupForm);
      
      const response = await fetch("http://127.0.0.1:5000/api/users", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || error.message || "Signup failed");
        console.error("Signup error response:", error);
        return;
      }

      const result = await response.json();
      alert("Signup successful!");
      
      // Reset form and switch to login tab
      setActiveTab("login");
      setSignupForm({
        username: "",
        rollNo: "",
        email: "",
        password: "",
        gender: "",
        dob: "",
        year: "",
        department: "",
        phoneNo: ""
      });
      setShowPassword(false);
      
    } catch (err) {
      console.error("Signup error:", err);
      console.log("Signup error details:", { signupForm });
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 relative overflow-hidden flex items-center justify-center">
      <div className="flex flex-col lg:flex-row min-h-[80vh] w-full max-w-6xl z-10 shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Login/Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-5 py-5 bg-white bg-opacity-90">
          <div className="w-full max-w-md space-y-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">WELCOME BACK</h1>
              <p className="text-gray-600">Welcome back! Please enter your details.</p>
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1 mb-2">
              <button
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-red-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab("login");
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                type="button"
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-red-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab("signup");
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                type="button"
              >
                Sign Up
              </button>
            </div>
            {activeTab === "login" ? (
              <LoginForm
                loginForm={loginForm}
                handleLoginChange={handleLoginChange}
                handleLoginSubmit={handleLoginSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setActiveTab={setActiveTab}
              />
            ) : (
              <SignupForm
                signupForm={signupForm}
                handleSignupChange={handleSignupChange}
                handleSignupSubmit={handleSignupSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
        {/* Right Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100"></div>
          <div className="absolute top-10 right-10 text-9xl font-black text-gray-200 opacity-20 select-none">
            Go
          </div>
          <div className="absolute top-1/2 left-10 space-y-4">
            <div className="w-16 h-1 bg-red-300 rounded opacity-60 animate-pulse"></div>
            <div className="w-12 h-1 bg-red-300 rounded opacity-40"></div>
            <div className="w-8 h-1 bg-red-300 rounded opacity-20"></div>
          </div>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-red-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;