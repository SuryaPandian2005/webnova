export default function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold mb-10">
          Client Testimonials
        </h2>

        <div className="space-y-8">

          <div>
            <h3 className="text-2xl font-semibold">
              Startup Founder
            </h3>

            <p className="text-gray-400">
              TechKidyy created an amazing responsive
              website for our business with modern UI
              and excellent performance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">
              Ecommerce Brand
            </h3>

            <p className="text-gray-400">
              Their SEO optimization and website speed
              improvements helped increase our traffic.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}