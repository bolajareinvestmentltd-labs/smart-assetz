export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0610]">
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#621063]/25 blur-[120px]" />
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-2 border-[#621063]/30 border-t-[#e79e23] animate-spin" />
        <div className="absolute h-3 w-3 rounded-full bg-[#e79e23] shadow-[0_0_12px_#e79e23] animate-ping" />
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.25em] text-[#e79e23] uppercase">Smart Assetz</span>
      </div>
    </div>
  );
}
