// app/sign-up/page.tsx
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Mail, Lock } from "lucide-react";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="flex items-center justify-center min-h-screen  px-4">
        <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8">
          <FormMessage message={searchParams} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <form className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-neutral-400 mt-2">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-neutral-400">Email</Label>
            <div className="relative mt-1">
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-neutral-400">Password</Label>
            <div className="relative mt-1">
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                required
                minLength={6}
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
            </div>
          </div>
        </div>

        <SubmitButton
          formAction={signUpAction}
          pendingText="Creating account..."
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-semibold"
        >
          Sign Up
        </SubmitButton>

        <FormMessage message={searchParams} />
        <div className="text-sm text-center text-neutral-400 mt-2">
          <SmtpMessage />
        </div>
      </form>
    </div>
  );
}
