import Topbar from "./Topbar";
import logo from "/src/assets/Nyotalogo.png";

/**
 * Full-page loader matching the site's actual theme (white background,
 * Topbar, real logo, green-700 accents). Use this between steps, e.g.
 * while validating a page before moving to the next one:
 *
 *   {isLoading ? <PageLoader message="Checking your details..." /> : <NextStep />}
 */
export function PageLoader({
  message = "Just a moment",
  subtext = "We're getting your next step ready.",
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Topbar />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-green-100 border-t-green-700" />
          <img
            src={logo}
            alt="Nyota Logo"
            className="h-9 w-9 animate-pulse object-contain"
          />
        </div>

        <h2 className="mt-6 font-serif text-lg font-semibold text-black">
          {message}
        </h2>
        <p className="mt-1 text-sm text-stone-500">{subtext}</p>

        <div className="mt-8 w-full max-w-xs space-y-3">
          <SkeletonBar width="w-full" />
          <SkeletonBar width="w-5/6" />
          <SkeletonBar width="w-2/3" />
        </div>

        <p className="mt-16 text-center text-xs text-stone-400">
          The Official Website | Copyright © 2026. National Youth Opportunities
          Towards Advancement (NYOTA) Project.
        </p>
      </div>
    </div>
  );
}

/** A single greyed-out placeholder bar. */
export function SkeletonBar({ width = "w-full", height = "h-3" }) {
  return (
    <div
      className={`${width} ${height} animate-pulse rounded-full bg-stone-200`}
    />
  );
}

/** A greyed-out option tile, matching the purpose-selector buttons. */
function SkeletonTile() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-4">
      <div className="h-5 w-5 animate-pulse rounded-full bg-stone-200" />
      <div className="h-2.5 w-12 animate-pulse rounded-full bg-stone-200" />
    </div>
  );
}

/**
 * Full skeleton mock of the Grant/Loan Purpose page — same Topbar, logo,
 * heading, option grid, and button shape, all greyed out. Use this while
 * the real page's content or config is being fetched.
 *
 *   <PurposePageSkeleton />
 */
export function PurposePageSkeleton() {
  return (
    <div className="min-h-screen bg-white text-stone-900 sm:py-16">
      <Topbar />

      <img src={logo} alt="Nyota Logo" />

      <div className="mx-auto max-w-2xl px-5">
        <div>
          <div className="ml-4 mt-2 h-6 w-40 animate-pulse rounded-full bg-stone-200" />

          <div className="space-y-6 px-6 py-8 sm:px-10">
            <div>
              <div className="mb-4 h-2.5 w-48 animate-pulse rounded-full bg-stone-200" />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonTile key={i} />
                ))}
              </div>
            </div>

            <div className="h-12 w-full animate-pulse rounded-full bg-stone-200" />

            <p className="text-center text-xs text-stone-400">
              The Official Website | Copyright © 2026. National Youth
              Opportunities Towards Advancement (NYOTA) Project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo default export.
export default function LoaderDemo() {
  return <PageLoader />;
}
