// app/sign-in/page.tsx
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <form className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-neutral-400 mt-2">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">Sign up</Link>
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
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-neutral-400">Password</Label>
              <Link href="/forgot-password" className="text-xs text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
            </div>
          </div>
        </div>

        <SubmitButton
          pendingText="Signing in..."
          formAction={signInAction}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-semibold"
        >
          Sign In
        </SubmitButton>

        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
