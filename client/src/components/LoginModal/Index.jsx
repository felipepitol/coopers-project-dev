// src/components/LoginModal/Index.jsx
import { useState, useRef, useEffect } from "react";
import formImage from "../../assets/form-image.png";
import { XIcon } from "@phosphor-icons/react";

export function LoginModal({ isOpen, onClose, onSubmit }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const previouslyFocused = document.activeElement;
      dialogRef.current?.focus();
      return () => previouslyFocused?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, type: isSignup ? "signup" : "login" });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-heading"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <XIcon size={24} />
        </button>

        <div className="flex items-center mb-6">
          <img src={formImage} alt="" aria-hidden="true" className="w-16 h-16" />
          <div className="ml-4">
            <h2 id="login-heading" className="text-2xl font-bold">
              {isSignup ? "Register" : "Sign in"}
            </h2>
            <p className="text-green-500">
              {isSignup ? "create your account" : "access your list"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition"
          >
            {isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-green-500 hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="text-green-500 hover:underline"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
