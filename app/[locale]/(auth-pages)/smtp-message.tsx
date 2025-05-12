import Link from "next/link";
import { CgArrowUpR, CgInfo } from "react-icons/cg";

export function SmtpMessage() {
  return (
    <div className="bg-muted/50 flex gap-4 rounded-md border px-5 py-3">
      <CgInfo size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-secondary-foreground text-sm">
          <strong> Note:</strong> Emails are rate limited. Enable Custom SMTP to
          increase the rate limit.
        </small>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center gap-1 text-sm"
          >
            Learn more <CgArrowUpR size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
