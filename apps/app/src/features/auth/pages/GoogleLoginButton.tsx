import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_ROUTE;

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const GoogleLoginButton = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (tokenResponse: { access_token: string }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/auth/google`, {
        token: tokenResponse.access_token,
      });

      const { token, name, email, avatar } = res.data;

      login({ token, name, email, avatar });
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: handleGoogleLogin,
    onError: () => toast.error("Google login failed"),
  });

  return (
    <div className="flex gap-4">
      <Button
        onClick={() => googleLogin()}
        disabled={loading}
        variant="outline"
        className="w-full bg-white hover:bg-gray-100 p-4 py-5 rounded-md flex items-center gap-3 justify-center cursor-pointer"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
        {loading ? "Connecting..." : "Continue with Google"}
      </Button>
    </div>
  );
};

export default GoogleLoginButton;
