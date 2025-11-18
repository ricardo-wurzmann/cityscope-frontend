import Link from "next/link";

const HomePage = () => (
  <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-12 px-6 py-24">
    <section className="space-y-6 text-center md:text-left">
      <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600 shadow-sm">
        CityScope
      </p>
      <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
        Understand your city with real-time civic intelligence.
      </h1>
      <p className="text-lg text-slate-500 md:text-xl">
        CityScope visualizes key trends across infrastructure, safety, and quality-of-life so
        you can champion the changes your community needs.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
        <Link
          href="/signup"
          className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-brand-100 bg-white px-6 py-3 text-sm font-semibold text-brand-600 shadow-sm transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
        >
          Sign in
        </Link>
      </div>
    </section>

    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:grid-cols-3">
      <article className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800">Compare cities instantly</h2>
        <p className="text-sm text-slate-500">
          Analyze peer cities side-by-side to surface best practices and identify opportunity
          gaps.
        </p>
      </article>
      <article className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800">Track civic KPIs</h2>
        <p className="text-sm text-slate-500">
          Monitor infrastructure, public safety, housing, and sustainability metrics with live
          updates.
        </p>
      </article>
      <article className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800">Share insights securely</h2>
        <p className="text-sm text-slate-500">
          Collaborate with officials and residents through tailored dashboards and curated
          reports.
        </p>
      </article>
    </section>
  </main>
);

export default HomePage;
