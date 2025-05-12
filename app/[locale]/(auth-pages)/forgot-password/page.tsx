import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { forgotPasswordAction } from "@/app/[locale]/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@mui/material";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-4">
        <form className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Reset Password
          </h1>
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
            <SubmitButton
              formAction={forgotPasswordAction}
              className="bg-primary hover:bg-primary/90 mt-2 w-full rounded-md px-4 py-2 font-medium text-white"
            >
              Reset Password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
      <SmtpMessage />
    </>
  );
}
