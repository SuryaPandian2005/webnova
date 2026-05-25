'use client';

import { motion } from 'framer-motion';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">

      <div className="blob blob-indigo w-[500px] h-[500px] -left-48 top-20 opacity-10" />
      <div className="blob blob-purple w-[400px] h-[400px] right-0 top-40 opacity-10" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-card"
        >

          <h1 className="text-5xl font-bold mb-8">
            Cookie Policy
          </h1>

            <div className="space-y-12 text-gray-400 leading-relaxed">

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Introduction
                </h2>

                <p className="mb-4">
                This Cookie Policy explains how TechKidyy uses cookies
                and similar tracking technologies when users visit
                our website and digital platforms.
                </p>

                <p>
                By continuing to use our website, you consent to the
                use of cookies in accordance with this policy.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                What Are Cookies?
                </h2>

                <p className="mb-4">
                Cookies are small text files stored on your device
                that help websites remember user preferences,
                improve functionality, and enhance browsing experiences.
                </p>

                <p>
                Cookies may contain anonymous identifiers and usage
                information that support analytics and performance optimization.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                How TechKidyy Uses Cookies
                </h2>

                <p className="mb-4">
                TechKidyy uses cookies to improve website performance,
                analyze traffic, remember user preferences,
                enhance security, and optimize digital experiences.
                </p>

                <p className="mb-4">
                Cookies may also be used to personalize content,
                improve navigation, and understand how users interact
                with various sections of our platform.
                </p>

                <p>
                These technologies help us maintain high-quality
                services and improve overall usability.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Analytics and Performance Cookies
                </h2>

                <p className="mb-4">
                We use analytics services such as Google Analytics
                to measure visitor activity, page performance,
                engagement metrics, and traffic sources.
                </p>

                <p>
                This information helps us improve SEO strategies,
                website speed, content quality, and user experience.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Third-Party Cookies
                </h2>

                <p className="mb-4">
                Certain third-party services integrated into TechKidyy
                may place cookies on user devices for analytics,
                security, embedded content, or service functionality.
                </p>

                <p>
                These third-party providers may have independent
                privacy and cookie policies that govern their usage practices.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Managing Cookies
                </h2>

                <p className="mb-4">
                Users can manage, block, or delete cookies through
                browser settings and device preferences.
                </p>

                <p>
                Disabling cookies may affect certain features,
                personalization options, or platform functionality.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Security and Data Protection
                </h2>

                <p className="mb-4">
                TechKidyy implements security measures to protect
                data collected through cookies and tracking technologies.
                </p>

                <p>
                We continuously improve our systems and practices
                to maintain platform security and reliability.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Updates to This Policy
                </h2>

                <p className="mb-4">
                We may update this Cookie Policy periodically
                to reflect legal changes, service improvements,
                or technology updates.
                </p>

                <p>
                Continued use of our website after updates indicates
                acceptance of the revised policy.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Contact Information
                </h2>

                <p>
                For questions regarding this Cookie Policy,
                users may contact TechKidyy through the official
                communication channels available on our platform.
                </p>
            </section>

            </div>

        </motion.div>
      </div>
    </div>
  );
}