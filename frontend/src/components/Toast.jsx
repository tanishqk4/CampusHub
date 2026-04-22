export default function Toast({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  const toneClasses = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-red-200 bg-red-50 text-red-900",
    info: "border-ink/10 bg-white text-ink"
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className={`pointer-events-auto w-full max-w-md rounded-[24px] border p-4 shadow-card ${toneClasses[toast.tone || "info"]}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold">{toast.title}</p>
            <p className="mt-1 text-sm opacity-80">{toast.message}</p>
          </div>
          <button className="rounded-full border border-current/15 px-3 py-1 text-xs font-semibold" onClick={onClose}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
