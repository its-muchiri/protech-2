'use client';

export default function NewsletterCTA() {
  return (
    <section className="my-16 rounded-xl bg-gray-900 p-8 md:p-12 text-center">
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
        Stay Updated with ProTech Insights
      </h3>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        Get the latest guides, industry insights, and project updates delivered to your inbox.
      </p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
