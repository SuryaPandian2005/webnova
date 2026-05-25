export default function FaqSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">

          <div>
            <h3 className="text-2xl font-semibold mb-2">
              What services does TechKidyy provide?
            </h3>

            <p className="text-gray-400">
              We provide website development,
              AI integrations, SEO optimization,
              dashboard development, and branding solutions.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">
              Do you build ecommerce websites?
            </h3>

            <p className="text-gray-400">
              Yes. We build scalable ecommerce websites
              using modern technologies and responsive design.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}