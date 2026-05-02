import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Flunio",
  description:
    "Terms of Service for Flunio. Learn the rules for using the platform, accounts, subscriptions, payments, and Premium access.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-white/55">
          Last updated: May 2, 2026
        </p>

        <section className="mt-8 space-y-4 text-white/75">
          <p>
            These Terms of Service govern your use of Flunio, an online language
            learning platform. By creating an account, using the platform, or
            purchasing a subscription, you agree to these terms.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            1. About Flunio
          </h2>
          <p className="text-white/75">
            Flunio provides online language learning materials, including
            lessons, vocabulary, grammar explanations, practice exercises,
            audio, progress tracking, and Premium features.
          </p>
          <p className="text-white/75">
            We may update, improve, remove, or change parts of the platform over
            time to make the service better and more stable.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. Account registration
          </h2>
          <p className="text-white/75">
            To use certain features, you may need to create an account. You are
            responsible for providing accurate information and keeping your
            login details secure.
          </p>
          <p className="text-white/75">
            You must not share your account with others, use another person’s
            account without permission, or use Flunio for abusive, illegal, or
            harmful purposes.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            3. Free and Premium access
          </h2>
          <p className="text-white/75">
            Flunio may offer free access to selected content and features.
            Premium access may unlock additional lessons, levels, practice
            modes, audio, or other paid features depending on the current
            product structure.
          </p>
          <p className="text-white/75">
            The exact Premium benefits may change over time as we develop and
            improve the platform. We will try to communicate important changes
            clearly.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Payments and subscriptions
          </h2>
          <p className="text-white/75">
            Payments are processed securely by Stripe. Flunio does not store
            your full payment card details.
          </p>
          <p className="text-white/75">
            If you purchase a subscription, it may renew automatically depending
            on the plan selected during checkout. The price, billing interval,
            and currency are shown before payment.
          </p>
          <p className="text-white/75">
            You are responsible for ensuring that your payment information is
            valid and that you understand the subscription terms before
            completing a purchase.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            5. Cancellations and refunds
          </h2>
          <p className="text-white/75">
            You may request cancellation of your subscription or ask questions
            about your payment by contacting us.
          </p>
          <p className="text-white/75">
            Refunds are handled case by case. If there was a technical issue,
            duplicate payment, or other reasonable problem, contact us and we
            will review the situation.
          </p>
          <p className="text-white/75">
            If your subscription is cancelled, you may keep Premium access until
            the end of the paid period unless otherwise required by law or
            payment provider rules.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            6. Learning content
          </h2>
          <p className="text-white/75">
            Flunio aims to provide useful and accurate language learning
            materials, but we cannot guarantee that every translation,
            explanation, audio file, or exercise will always be perfect or
            error-free.
          </p>
          <p className="text-white/75">
            The platform is intended for educational purposes. Users should use
            their own judgment and may report mistakes so we can improve the
            content.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            7. User conduct
          </h2>
          <p className="text-white/75">
            You agree not to misuse Flunio, attempt to break or overload the
            service, access data that does not belong to you, copy the platform
            in an unauthorized way, or use the service for illegal or harmful
            activity.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            8. Intellectual property
          </h2>
          <p className="text-white/75">
            Flunio, including its design, structure, text, exercises, learning
            materials, branding, and software, is protected by intellectual
            property rights. You may use the platform for personal learning, but
            you may not copy, resell, redistribute, or reproduce substantial
            parts of the service without permission.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            9. Availability and changes
          </h2>
          <p className="text-white/75">
            We try to keep Flunio available and working properly, but we do not
            guarantee uninterrupted access. The service may be temporarily
            unavailable because of maintenance, technical issues, updates, or
            third-party provider problems.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            10. Limitation of liability
          </h2>
          <p className="text-white/75">
            To the maximum extent permitted by law, Flunio is provided “as is”.
            We are not responsible for indirect losses, loss of data, loss of
            profit, or problems caused by third-party services, payment
            providers, hosting providers, user devices, or internet connection
            issues.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            11. Privacy
          </h2>
          <p className="text-white/75">
            Your use of Flunio is also governed by our{" "}
            <Link
              href="/privacy"
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              Privacy Policy
            </Link>
            , which explains how we collect and use personal data.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            12. Changes to these terms
          </h2>
          <p className="text-white/75">
            We may update these Terms of Service from time to time. If we make
            important changes, we will update the date on this page. Continued
            use of Flunio after changes means you accept the updated terms.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-white">
            13. Contact
          </h2>
          <p className="text-white/75">
            If you have questions about these Terms, subscriptions, payments, or
            your account, contact us at{" "}
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