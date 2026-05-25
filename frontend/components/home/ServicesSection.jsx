export default function ServicesSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Website Development
            </h3>

            <p className="text-gray-400">
              Modern responsive websites using Next.js,
              React, Tailwind CSS, and advanced UI/UX.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              AI Solutions
            </h3>

            <p className="text-gray-400">
              AI-powered applications, automations,
              dashboards, and smart integrations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}