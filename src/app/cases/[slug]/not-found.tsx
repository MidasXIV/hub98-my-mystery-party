import Link from "next/link";

export default function CaseNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-primary p-8 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Case File Not Found</h1>
        <p className="text-text-secondary mb-8 max-w-md">
          The cold case you&apos;re looking for doesn&apos;t exist or may have been archived.
          Please return to the homepage to explore other mysteries.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
