export default function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4">
      <div className="glass-panel w-full max-w-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-ink/50">{subtitle}</p>
            <h2 className="mt-2 font-display text-3xl font-bold">{title}</h2>
          </div>
          <button className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
