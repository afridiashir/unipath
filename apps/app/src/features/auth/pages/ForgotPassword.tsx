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
import { ArrowLeft, ArrowRight, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
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
    <div className="relative min-h-screen overflow-hidden bg-[#F3F3F3] flex items-center justify-center p-6">
      <Card className="w-full max-w-[450px] border-0 shadow-none rounded-none bg-transparent">
        <CardHeader>
          <CardTitle className="font-semibold">
            <Send className="w-8 h-8 mb-3" />
            <h1 className="text-xl">Forgot your password?</h1>
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-6 cursor-pointer"
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

          <Link
            to="/login"
            className="mt-4 flex w-fit items-center gap-1 text-sm text-primary font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </CardContent>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
};

export default ForgotPassword;
