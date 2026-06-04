interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function Skeleton({ className = "", width, height }: SkeletonProps) {
  return (
    <div
      className={`skeleton rounded ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-panel border border-panel-3 p-6 space-y-3 ${className}`}>
      <Skeleton height="12px" width="40%" />
      <Skeleton height="28px" width="60%" />
      <Skeleton height="10px" width="90%" />
      <Skeleton height="10px" width="75%" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  const widths = ["100%", "85%", "70%", "90%", "60%"];
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height="12px" width={widths[i % widths.length]} />
      ))}
    </div>
  );
}
