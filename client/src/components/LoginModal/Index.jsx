import { useState } from "react";
import formImage from "../../assets/form-image.png";
import { XIcon } from "@phosphor-icons/react";

export function LoginModal({ isOpen, onClose, onSubmit }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password, type: isSignup ? "signup" : "login" });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 z-30">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-sm text-gray-500 hover:text-black">
          <XIcon size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img src={formImage} alt="Login Graphic" className="w-20 h-20" />
          <div>
          <h2 className="text-3xl font-bold">{isSignup ? "Register" : "Sign in"}</h2>
            <p className="text-green-500 text-lg">
              to {isSignup ? "create your account" : "access your list"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-semibold"
          >
            {isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button onClick={() => setIsSignup(false)} className="text-green-500 hover:underline">
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button onClick={() => setIsSignup(true)} className="text-green-500 hover:underline">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
