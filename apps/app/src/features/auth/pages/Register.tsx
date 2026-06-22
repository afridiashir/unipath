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
import { useAuthStore } from "@/stores/auth.store";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import GoogleLoginButton from "./GoogleLoginButton";
import { AuthHeader } from "./AuthHeader";
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

      const { token, name, email, avatar } = res.data;

      login({ token, name, email, avatar });
      navigate("/home");
    } catch(err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center bg-background justify-center">
      <AuthHeader />
      <Card className="w-[400px] py-6">
        <CardHeader>
          <CardTitle className="font-semibold">
            <h1>Get Started with UniPath</h1>
          </CardTitle>

          <CardDescription>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </CardDescription>
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
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ash Brian"
                  className="py-5"
                />
              </FieldContent>
            </Field>

            <Field className="mt-4">
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="me@mywebsite.com"
                  className="py-5"
                />
              </FieldContent>
            </Field>

            <Field className="mt-4">
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="py-5"
                />
              </FieldContent>
            </Field>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-6 bg-blue-500"
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
        </CardContent>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
};

export default Register;
