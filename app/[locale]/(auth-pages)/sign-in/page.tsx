import { signInAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@mui/material";

import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Sign in</h1>
        <p className="mb-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            className="text-primary hover:text-primary/80 font-medium"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                className="text-primary hover:text-primary/80 text-xs"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
              className="rounded-md border-gray-300"
            />
          </div>
          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            className="bg-primary hover:bg-primary/90 mt-2 w-full rounded-md px-4 py-2 font-medium text-white"
          >
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
