'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">

      {/* Background Blobs */}
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
            Privacy Policy
          </h1>

          <div className="space-y-12 text-gray-400 leading-relaxed">

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Introduction
                </h2>

                <p className="mb-4">
                TechKidyy values your privacy and is committed to protecting
                personal information shared through our platform. This Privacy
                Policy explains how we collect, use, store, and protect your
                information when you access our services, websites, applications,
                and digital platforms.
                </p>

                <p>
                By accessing or using TechKidyy, you agree to the practices
                described in this Privacy Policy. We encourage users to read
                this policy carefully to understand how their data is managed.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Information We Collect
                </h2>

                <p className="mb-4">
                We may collect personal information including names,
                email addresses, contact information, business details,
                and project requirements when users communicate with us
                or use our services.
                </p>

                <p className="mb-4">
                Technical information such as IP address, browser type,
                device information, pages visited, session duration,
                and analytics data may also be collected automatically
                to improve user experience and platform performance.
                </p>

                <p>
                We may also collect information submitted through forms,
                consultation requests, newsletter subscriptions, and
                customer support interactions.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                How We Use Your Information
                </h2>

                <p className="mb-4">
                Information collected through TechKidyy is used to provide,
                maintain, and improve our services. This includes project
                communication, website development services, AI integrations,
                technical support, SEO optimization, and customer engagement.
                </p>

                <p className="mb-4">
                We may use analytics data to better understand user behavior,
                optimize website performance, enhance security, and improve
                content relevance across our platform.
                </p>

                <p>
                Your information may also be used to send service updates,
                security notifications, important announcements, and marketing
                communications where permitted by applicable laws.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Cookies and Tracking Technologies
                </h2>

                <p className="mb-4">
                TechKidyy uses cookies and similar technologies to enhance
                functionality, analyze traffic, remember preferences,
                and improve overall user experience.
                </p>

                <p className="mb-4">
                Third-party analytics services such as Google Analytics
                may collect usage information to help us understand visitor
                interactions and website performance metrics.
                </p>

                <p>
                Users may choose to disable cookies through browser settings,
                though certain website features and functionality may become limited.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Data Security
                </h2>

                <p className="mb-4">
                We implement modern security practices and technical safeguards
                to protect personal information from unauthorized access,
                disclosure, alteration, or destruction.
                </p>

                <p className="mb-4">
                While we strive to use commercially acceptable methods to
                secure information, no online transmission or storage system
                can be guaranteed to be completely secure.
                </p>

                <p>
                Users are encouraged to maintain the confidentiality of their
                account credentials and notify us immediately of any suspected
                unauthorized access.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Third-Party Services
                </h2>

                <p className="mb-4">
                TechKidyy may integrate with third-party services including
                analytics providers, payment gateways, cloud platforms,
                communication tools, and external APIs.
                </p>

                <p>
                These third-party services may have their own privacy policies
                and practices. We recommend reviewing their policies before
                interacting with such services.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                User Rights
                </h2>

                <p className="mb-4">
                Depending on applicable laws and regulations, users may have
                the right to access, update, correct, or request deletion of
                their personal information.
                </p>

                <p>
                Users may also opt out of marketing communications or request
                clarification regarding data usage practices by contacting us directly.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Policy Updates
                </h2>

                <p className="mb-4">
                TechKidyy reserves the right to update or modify this Privacy
                Policy at any time to reflect service improvements, legal changes,
                or operational updates.
                </p>

                <p>
                Continued use of our platform after policy changes indicates
                acceptance of the updated Privacy Policy.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Contact Information
                </h2>

                <p>
                For questions, concerns, or requests related to this Privacy
                Policy, users may contact TechKidyy through our official
                website communication channels.
                </p>
            </section>
            </div>
        </motion.div>
        </div>
    </div>
  );
}