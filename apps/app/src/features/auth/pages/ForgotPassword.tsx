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
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { AuthHeader } from "./AuthHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const baseURL = import.meta.env.VITE_API_ROUTE;

const ForgotPassword = () => {
  usePageTitle("Forgot Password");

  const [form, setForm] = useState({
    email: "",
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

    if (!form.email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const forgot = await axios.post(`${baseURL}/auth/forgot-password`, form);

      toast.success(forgot.data.message);
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred";
      toast.error(message);
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
            <h1>Forgot your password?</h1>
          </CardTitle>

          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <Field>
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
                  Send reset link <ArrowRight />
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

export default ForgotPassword;
