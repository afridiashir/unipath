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
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { AuthHeader } from "./AuthHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const baseURL = import.meta.env.VITE_API_ROUTE;

const ResetPassword = () => {
  const navigate = useNavigate();

  usePageTitle("Reset Password");

  const { token } = useParams<{ token: string }>();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
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

    if (!form.password || !form.confirmPassword) {
      toast.error("Password and confirm password are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const reset = await axios.post(`${baseURL}/auth/reset-password`, {
        newPassword: form.password,
        token: token,
      });

      toast.success(reset.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      toast.error("Invalid token or token expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center bg-background justify-center">
      <AuthHeader />
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="font-semibold">
            <h1>Reset Password</h1>
          </CardTitle>

          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>

        <CardContent>
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <FieldContent>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="py-5"
                />
              </FieldContent>
            </Field>

            <Field className="mt-4">
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="py-5"
                />
              </FieldContent>
            </Field>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Reset <ArrowRight />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
};

export default ResetPassword;
