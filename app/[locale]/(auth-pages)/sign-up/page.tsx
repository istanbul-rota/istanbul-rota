import { signUpAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";

import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Input } from "@mui/material";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col items-center justify-center p-4">
      <form className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Sign up</h1>
        <p className="mb-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-primary hover:text-primary/80 font-medium"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              name="name"
              placeholder="John Doe"
              required
              className="rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <Input
              name="username"
              placeholder="johndoe"
              required
              className="rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number (optional)
            </label>
            <Input
              name="phone"
              type="tel"
              placeholder="+90 555 555 55 55"
              className="rounded-md border-gray-300"
            />
          </div>
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
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
              className="rounded-md border-gray-300"
            />
          </div>
          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="bg-primary hover:bg-primary/90 mt-2 w-full rounded-md px-4 py-2 font-medium text-white"
          >
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </div>
  );
}
