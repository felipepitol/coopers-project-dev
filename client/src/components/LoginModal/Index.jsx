// src/components/LoginModal/Index.jsx
import { useState, useRef, useEffect } from "react";
import { XIcon } from "@phosphor-icons/react";
import { useAuth } from "../../contexts/AuthContext";
import formImage from "../../assets/form-image.png";

export function LoginModal({ isOpen, onClose }) {
  const { signIn, signUp } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInfoMessage("");
    setErrorMessage("");

    const fn = isSignup ? signUp : signIn;
    const { data, error } = await fn(email, password);

    if (error) {
      setErrorMessage(error.message);
    } else if (isSignup) {
        setInfoMessage("Account created successfully! Please check your email for confirmation.");
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
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
            <h2 className="text-2xl font-bold">
              {isSignup ? "Register" : "Sign in"}
            </h2>
            <p className="text-green-500">
              {isSignup ? "create your account" : "access your list"}
            </p>
          </div>
        </div>

        {/* feedback messages */}
        {errorMessage && (
          <div className="mb-4 text-red-600">{errorMessage}</div>
        )}
        {infoMessage && (
          <div className="mb-4 text-green-600">{infoMessage}</div>
        )}

        {!infoMessage && (
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
        )}
        <p className="text-center text-sm mt-4">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setErrorMessage("");
                  setInfoMessage("");
                  setIsSignup(false);
                }}
                className="text-green-500 hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setErrorMessage("");
                  setInfoMessage("");
                  setIsSignup(true);
                }}
                className="text-green-500 hover:underline"
              >
                Register
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
