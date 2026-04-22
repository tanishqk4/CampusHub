export default function TagPill({ children, tone = "default" }) {
  const toneClasses = {
    default: "bg-ink/5 text-ink/80",
    urgent: "bg-ember text-white",
    found: "bg-mint text-pine",
    lost: "bg-red-100 text-red-700"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
