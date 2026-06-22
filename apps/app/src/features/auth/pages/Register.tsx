import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth.store";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Send,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import GoogleLoginButton from "./GoogleLoginButton";
import { usePageTitle } from "@/hooks/usePageTitle";

const baseURL = import.meta.env.VITE_API_ROUTE;

const Register = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  usePageTitle("Register");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${baseURL}/auth/register`, form);

      const { token, name, email, avatar, onboarded } = res.data;

      login({ token, name, email, avatar, onboarded });
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3F3F3] flex items-center justify-center p-6">
      <div className="container flex items-center justify-around">
        <Card className="flex flex-col justify-center w-full max-w-[500px] border-0 shadow-none rounded-none bg-transparent">
          <CardHeader>
            <CardTitle className="font-semibold">
              <Send className="w-8 h-8 mb-3" />
              <h1 className="text-xl">Get started with UniPath</h1>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* SOCIAL LOGIN */}
            <GoogleLoginButton />

            <p className="text-center py-4 text-muted-foreground">
              or using email and password
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ash Brian"
                      className="py-5 pl-10 bg-white transition-colors hover:bg-gray-50"
                    />
                  </div>
                </FieldContent>
              </Field>

              <Field className="mt-4">
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="me@mywebsite.com"
                      className="py-5 pl-10 bg-white transition-colors hover:bg-gray-50"
                    />
                  </div>
                </FieldContent>
              </Field>

              <Field className="mt-4">
                <FieldLabel>Password</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="********"
                      className="py-5 pl-10 pr-10 bg-white transition-colors hover:bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-gray-100 hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FieldContent>
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-6 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account
                  </>
                ) : (
                  <>
                    Sign Up <ArrowRight />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-3 text-muted-foreground text-xs">
              By signing up, you agree to the Terms & Conditions and Privacy
              Policy.
            </p>

            <CardDescription className="mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Sign In
              </Link>
            </CardDescription>
          </CardContent>
        </Card>

        <div
          className="hidden lg:block w-[600px] bg-tr h-[90vh] rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url('/auth-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        >
          <div className="w-full h-full bg-black/20 p-8 flex flex-col justify-end gap-4">
            <div className="bg-black/80 rounded-lg text-white p-4 py-6 pt-12 flex flex-col gap-4">
              <h2 className="text-xl font-medium">Welcome to UniPath</h2>
              <p className="text-sm text-gray-200">
                UniPath helps students to study abroad through AI by shortlisting
                universities, help in write essays, sop, and make a proper action
                plan. Join us and start building your application today.
              </p>
              <p className="text-sm text-gray-200">
                More than 10k students joined us, its your turn
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default Register;
