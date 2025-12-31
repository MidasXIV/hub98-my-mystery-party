export default function NoiseBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[85%] z-0"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
      }}
    >
      {/* Soft corner glows */}
      <div className="absolute -top-[18%] -left-[12%] h-[36vh] w-[36vh] rounded-full bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-[-12%] right-[-10%] h-[34vh] w-[34vh] rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 blur-3xl" />
      {/* Subtle dotted texture (visible on light & dark) */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.09]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          color: "rgba(0,0,0,0.7)",
          mixBlendMode: "overlay",
        }}
      />
      {/* Vertical fade to preserve contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/15 to-background/30" />
    </div>
  );
}
