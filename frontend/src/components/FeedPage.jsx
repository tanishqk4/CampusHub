import TagPill from "./TagPill";

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export default function FeedPage({ data, filters, onInterested, onRemindMe, onOpenPostModal, isInterested, isReminded }) {
  const feedItems = [
    ...data.announcements.map((item) => ({ ...item, type: "announcement", date: item.published_at })),
    ...data.events.map((item) => ({ ...item, type: "event", date: item.start_at }))
  ]
    .filter((item) => {
      const blob = JSON.stringify(item).toLowerCase();
      const matchesSearch = !filters.search || blob.includes(filters.search.toLowerCase());
      const matchesDepartment = filters.department === "all" || item.department_name === filters.department;
      const matchesTag =
        filters.tag === "all" || (item.tags_detail || []).some((tag) => tag.name === filters.tag);
      return matchesSearch && matchesDepartment && matchesTag;
    })
    .sort((left, right) => new Date(right.date) - new Date(left.date));

  return (
    <section className="glass-panel p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-ink/50">Feed</p>
          <h1 className="font-display text-3xl font-bold">Campus updates</h1>
        </div>
        <button className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white" onClick={onOpenPostModal}>Add Post</button>
      </div>

      <div className="space-y-4">
        {feedItems.map((item) => (
          <article key={`${item.type}-${item.id}`} className="rounded-[24px] border border-ink/10 bg-white/80 p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <TagPill>{item.type === "event" ? "Event" : "Announcement"}</TagPill>
              {(item.tags_detail || []).map((tag) => (
                <TagPill key={tag.slug}>{`#${tag.name}`}</TagPill>
              ))}
              {item.is_urgent && <TagPill tone="urgent">Urgent</TagPill>}
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold">{item.title}</h2>
                <p className="text-sm leading-7 text-ink/70">{item.body || item.description}</p>
                <p className="text-sm text-ink/55">{item.department_name || "General"} • {formatDate(item.date)}</p>
              </div>

              <div className="flex gap-3">
                <button
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    isReminded(`${item.type}-${item.id}`)
                      ? "cursor-not-allowed border border-pine/20 bg-pine/10 text-pine"
                      : "border border-ink/10"
                  }`}
                  onClick={() => onRemindMe(item.type === "announcement" ? { announcement: item.id } : { event: item.id })}
                  disabled={isReminded(`${item.type}-${item.id}`)}
                >
                  {isReminded(`${item.type}-${item.id}`) ? "Reminder Added" : "Remind Me"}
                </button>
                {item.type === "event" && (
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      isInterested(item.id) ? "cursor-not-allowed bg-pine/60 text-white/85" : "bg-pine text-white"
                    }`}
                    onClick={() => onInterested(item.id)}
                    disabled={isInterested(item.id)}
                  >
                    {isInterested(item.id) ? "Interested Already" : "Interested"}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
