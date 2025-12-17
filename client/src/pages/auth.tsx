import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthPage() {
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [step, setStep] = useState<"enter" | "verify">("enter");
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setError(null);

    // Simulate sending OTP via SMS for demo purposes
    setTimeout(() => {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(code);
      setStep("verify");
      setLoading(false);
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedOtp) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const isValid = otp.trim() === generatedOtp;
      setLoading(false);

      if (!isValid) {
        setError("Invalid code. Please check the OTP and try again.");
        return;
      }

      const success = login(identifier.toLowerCase());
      if (success) {
        setLocation("/dashboard");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in zoom-in-95 duration-500 fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-slate-900">
            Sign in with OTP
          </h1>
          <p className="text-slate-500 mt-2">
            Use your phone number or email to receive a one-time code.
          </p>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardHeader>
            <CardTitle>Secure Sign In</CardTitle>
            <CardDescription>
              We&apos;ll send a 6-digit code to verify it&apos;s really you.
            </CardDescription>
          </CardHeader>
          {error && (
            <p className="px-6 pt-2 text-sm text-red-500">{error}</p>
          )}
          {step === "enter" && (
            <form onSubmit={handleRequestOtp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identifier">Phone number or email</Label>
                  <Input
                    id="identifier"
                    placeholder="+91 98765 43210 or you@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full h-11 text-base"
                  disabled={loading}
                >
                  {loading ? "Sending code..." : "Send OTP"}
                </Button>
              </CardFooter>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifyOtp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-digit code</Label>
                  <Input
                    id="otp"
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-11 tracking-[0.5em] text-center"
                    maxLength={6}
                    required
                  />
                  {generatedOtp && (
                    <p className="text-xs text-slate-400">
                      For this preview, use code{" "}
                      <span className="font-mono font-semibold">
                        {generatedOtp}
                      </span>
                      .
                    </p>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  We&apos;ve sent a one-time code to{" "}
                  <span className="font-medium">{identifier}</span>. It expires
                  in a few minutes.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full h-11 text-base"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </Button>
                <button
                  type="button"
                  className="text-xs text-slate-500 hover:text-slate-700 underline-offset-4 hover:underline"
                  onClick={() => {
                    setStep("enter");
                    setOtp("");
                    setGeneratedOtp(null);
                  }}
                >
                  Didn&apos;t get a code? Try again.
                </button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
