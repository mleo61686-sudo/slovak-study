import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Flunio",
  description:
    "Privacy Policy for Flunio. Learn what data we collect, how we use it, and how payments are handled.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur md:p-10">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
        >
          ← Back to Flunio
        </Link>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-white/55">
          Last updated: May 2, 2026
        </p>

        <section className="mt-8 space-y-4 text-white/75">
          <p>
            Flunio is an online language learning platform. This Privacy Policy
            explains what information we collect, how we use it, and what rights
            you have regarding your data.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            1. Information we collect
          </h2>
          <p className="text-white/75">
            When you create an account or use Flunio, we may collect information
            such as your name, email address, selected language, learning
            progress, practice statistics, subscription status, and support
            messages.
          </p>
          <p className="text-white/75">
            We may also process basic technical information such as your browser,
            device type, IP address, and pages visited, mainly for security,
            support, analytics, and improving the service.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. How we use your information
          </h2>
          <p className="text-white/75">
            We use your information to provide your account, save your learning
            progress, manage Premium access, improve Flunio, respond to support
            requests, prevent abuse, and maintain the security of the service.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            3. Payments
          </h2>
          <p className="text-white/75">
            Payments are processed by Stripe. Flunio does not store your full
            payment card details. Stripe may process payment information,
            billing details, and transaction data according to its own privacy
            and security practices.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Cookies and local storage
          </h2>
          <p className="text-white/75">
            Flunio may use cookies and local storage to keep you signed in,
            remember preferences such as language or course selection, save
            learning progress, and improve the user experience.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            5. Data sharing
          </h2>
          <p className="text-white/75">
            We do not sell your personal data. We may share limited data with
            trusted service providers that help us operate Flunio, such as
            hosting, database, authentication, email, analytics, and payment
            providers.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            6. Data retention
          </h2>
          <p className="text-white/75">
            We keep your information for as long as needed to provide the
            service, comply with legal obligations, resolve disputes, prevent
            abuse, and maintain business records. You may request deletion of
            your account data by contacting us.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            7. Your rights
          </h2>
          <p className="text-white/75">
            Depending on your location, you may have the right to access,
            correct, delete, restrict, or export your personal data. You can
            contact us to request changes or deletion of your account data.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            8. Children
          </h2>
          <p className="text-white/75">
            Flunio is not intended for children under the age required by
            applicable law to use online services without parental consent. If
            you believe a child has provided us with personal data, please
            contact us.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            9. Changes to this policy
          </h2>
          <p className="text-white/75">
            We may update this Privacy Policy from time to time. If we make
            important changes, we will update the date on this page.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            10. Contact
          </h2>
          <p className="text-white/75">
            If you have questions about this Privacy Policy or your data, you
            can contact us at{" "}
            <a
              href="mailto:flunio.com@gmail.com"
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              flunio.com@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}