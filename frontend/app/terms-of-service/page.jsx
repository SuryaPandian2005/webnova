'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
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
            Terms of Service
          </h1>

            <div className="space-y-12 text-gray-400 leading-relaxed">

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Introduction
                </h2>

                <p className="mb-4">
                Welcome to TechKidyy. These Terms of Service govern your
                access to and use of our website, digital platforms,
                applications, and services. By accessing or using our
                platform, you agree to comply with these terms and conditions.
                </p>

                <p>
                TechKidyy provides professional website development,
                AI-powered solutions, SEO optimization, branding,
                and digital services for businesses, creators,
                startups, and organizations.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Acceptance of Terms
                </h2>

                <p className="mb-4">
                By using TechKidyy, users acknowledge that they have read,
                understood, and agreed to these Terms of Service and all
                applicable policies associated with our platform.
                </p>

                <p>
                If you do not agree with these terms, you should discontinue
                the use of our services immediately.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Services Provided
                </h2>

                <p className="mb-4">
                TechKidyy offers website development services,
                AI integrations, responsive design solutions,
                ecommerce development, dashboard systems,
                SEO optimization, and other digital services.
                </p>

                <p className="mb-4">
                Services may evolve over time as we improve our platform,
                technologies, and service offerings.
                </p>

                <p>
                We reserve the right to modify, suspend, or discontinue
                any aspect of our services without prior notice when necessary.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                User Responsibilities
                </h2>

                <p className="mb-4">
                Users are responsible for providing accurate information
                during registration, communication, and project discussions.
                </p>

                <p className="mb-4">
                Users agree not to misuse the platform, attempt unauthorized
                access, distribute harmful software, or engage in activities
                that may negatively impact platform security or functionality.
                </p>

                <p>
                Users are also responsible for maintaining the confidentiality
                of account credentials and any information associated with
                their accounts.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Payments and Pricing
                </h2>

                <p className="mb-4">
                Certain TechKidyy services may require payment depending
                on project scope, features, integrations, and development requirements.
                </p>

                <p className="mb-4">
                Pricing details, timelines, and deliverables will be
                communicated before project execution whenever applicable.
                </p>

                <p>
                Failure to complete payments for agreed services may result
                in project suspension or termination.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Intellectual Property
                </h2>

                <p className="mb-4">
                All branding, content, source code, graphics, logos,
                designs, and platform assets associated with TechKidyy
                remain protected under applicable intellectual property laws.
                </p>

                <p>
                Users may not reproduce, redistribute, or commercially
                exploit platform materials without prior written permission.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Third-Party Services
                </h2>

                <p className="mb-4">
                TechKidyy may integrate with third-party services,
                APIs, cloud providers, payment processors, analytics tools,
                and external platforms to enhance functionality.
                </p>

                <p>
                We are not responsible for the policies, availability,
                or practices of third-party services outside our control.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Limitation of Liability
                </h2>

                <p className="mb-4">
                TechKidyy shall not be held liable for indirect,
                incidental, or consequential damages resulting from
                the use or inability to use our services.
                </p>

                <p>
                While we strive to maintain platform reliability and security,
                we cannot guarantee uninterrupted or error-free operation
                at all times.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Termination
                </h2>

                <p className="mb-4">
                We reserve the right to suspend or terminate access
                to our platform or services if users violate these
                Terms of Service or engage in prohibited activities.
                </p>

                <p>
                Users may also discontinue the use of our services
                at any time.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Updates to Terms
                </h2>

                <p className="mb-4">
                TechKidyy may revise or update these Terms of Service
                periodically to reflect service changes, legal requirements,
                or operational improvements.
                </p>

                <p>
                Continued use of the platform after updates constitutes
                acceptance of the revised terms.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                Contact Information
                </h2>

                <p>
                For questions regarding these Terms of Service,
                users may contact TechKidyy through our official
                communication channels available on the website.
                </p>
            </section>

            </div>

        </motion.div>
      </div>
    </div>
  );
}