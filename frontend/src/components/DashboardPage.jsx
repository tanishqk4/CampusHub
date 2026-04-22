import { CalendarDays, FolderOpen, Megaphone, Search, Siren, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import TagPill from "./TagPill";

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function matchesFilters(item, filters, tagExtractor = () => []) {
  const matchesSearch = !filters.search || JSON.stringify(item).toLowerCase().includes(filters.search.toLowerCase());
  const matchesDepartment = filters.department === "all" || item.department_name === filters.department;
  const tags = tagExtractor(item);
  const matchesTag = filters.tag === "all" || tags.includes(filters.tag);
  return matchesSearch && matchesDepartment && matchesTag;
}

export default function DashboardPage({
  data,
  filters,
  onInterested,
  onRemindMe,
  onOpenPostModal,
  onOpenLostFoundModal,
  isInterested,
  isReminded
}) {
  const filteredAnnouncements = data.announcements.filter((item) =>
    matchesFilters(item, filters, (announcement) => announcement.tags_detail?.map((tag) => tag.name) || [])
  );

  const filteredEvents = data.events.filter((item) =>
    matchesFilters(item, filters, (event) => event.tags_detail?.map((tag) => tag.name) || [])
  );

  const filteredResources = data.resources.filter((item) => matchesFilters(item, filters));

  return (
    <div className="space-y-6">
      <section className="glass-panel relative overflow-hidden p-6 lg:p-8">
        <div className="grid-wash absolute inset-0 opacity-70" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-4">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-ink/60">Unified Student Command Center</p>
            <h1 className="max-w-[12ch] font-display text-4xl font-bold leading-none text-ink lg:text-6xl">
              CampusHub brings signal back to student life.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-ink/70">
              A single source of truth for announcements, events, academic resources, and lost-and-found activity, designed
              to cut through noisy chat groups and scattered notices.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white" onClick={onOpenPostModal}>
                Add Post
              </button>
              <button
                className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink"
                onClick={onOpenLostFoundModal}
              >
                Report Item
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/80 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink/70">
                <Siren size={16} />
                Urgent Alerts
              </div>
              <p className="font-display text-3xl font-bold">{data.announcements.filter((item) => item.is_urgent).length}</p>
              <p className="mt-2 text-sm text-ink/60">Academic warnings surfaced first.</p>
            </div>
            <div className="rounded-[24px] bg-pine p-5 text-white">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/70">
                <Sparkles size={16} />
                Smart Feed
              </div>
              <p className="font-display text-3xl font-bold">{data.announcements.length + data.events.length}</p>
              <p className="mt-2 text-sm text-white/70">Unified updates across campus life.</p>
            </div>
            <div className="rounded-[24px] bg-white/80 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink/70">
                <FolderOpen size={16} />
                Resource Vault
              </div>
              <p className="font-display text-3xl font-bold">{data.resources.length}</p>
              <p className="mt-2 text-sm text-ink/60">Syllabus, PYQs, notes, and guides.</p>
            </div>
            <div className="rounded-[24px] bg-gold/20 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink/70">
                <Search size={16} />
                Fast Lookup
              </div>
              <p className="font-display text-3xl font-bold">3s</p>
              <p className="mt-2 text-sm text-ink/60">Target time to find what matters.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_1fr_1fr]">
        <div className="glass-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ink/50">Bento</p>
              <h2 className="font-display text-2xl font-bold">Official Announcements</h2>
            </div>
            <Megaphone className="text-ember" />
          </div>
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <motion.article
                key={announcement.id}
                layout
                className="rounded-[24px] border border-ink/10 bg-white/80 p-4"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {announcement.is_urgent && <TagPill tone="urgent">Urgent</TagPill>}
                  {(announcement.tags_detail || []).map((tag) => (
                    <TagPill key={tag.slug}>{`#${tag.name}`}</TagPill>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold">{announcement.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{announcement.body}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-ink/55">
                  <span>{announcement.department_name || "General"}</span>
                  <span>{formatDate(announcement.published_at)}</span>
                </div>
                {isReminded(`announcement-${announcement.id}`) && (
                  <div className="mt-3 text-sm font-semibold text-pine">Reminder already set</div>
                )}
                <button
                  className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold ${
                    isReminded(`announcement-${announcement.id}`)
                      ? "cursor-not-allowed border border-pine/20 bg-pine/10 text-pine"
                      : "border border-ink/10"
                  }`}
                  onClick={() => onRemindMe({ announcement: announcement.id })}
                  disabled={isReminded(`announcement-${announcement.id}`)}
                >
                  {isReminded(`announcement-${announcement.id}`) ? "Reminder Added" : "Remind Me"}
                </button>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ink/50">Bento</p>
              <h2 className="font-display text-2xl font-bold">Upcoming Events</h2>
            </div>
            <CalendarDays className="text-pine" />
          </div>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <article key={event.id} className="rounded-[24px] border border-ink/10 bg-pine p-5 text-white">
                <div className="mb-3 flex flex-wrap gap-2">
                  {(event.tags_detail || []).map((tag) => (
                    <TagPill key={tag.slug}>{`#${tag.name}`}</TagPill>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold">{event.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{event.description}</p>
                <div className="mt-4 space-y-1 text-sm text-white/70">
                  <p>{event.location}</p>
                  <p>{formatDate(event.start_at)}</p>
                  <p>{event.interested_count || 0} interested</p>
                </div>
                {isInterested(event.id) && <p className="text-sm font-semibold text-white">You already marked interest</p>}
                <div className="mt-4 flex gap-3">
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      isInterested(event.id) ? "cursor-not-allowed bg-white/70 text-pine/80" : "bg-white text-pine"
                    }`}
                    onClick={() => onInterested(event.id)}
                    disabled={isInterested(event.id)}
                  >
                    {isInterested(event.id) ? "Interested Already" : "Interested"}
                  </button>
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      isReminded(`event-${event.id}`)
                        ? "cursor-not-allowed border border-white/10 bg-white/15 text-white/80"
                        : "border border-white/20 text-white"
                    }`}
                    onClick={() => onRemindMe({ event: event.id })}
                    disabled={isReminded(`event-${event.id}`)}
                  >
                    {isReminded(`event-${event.id}`) ? "Reminder Added" : "Remind Me"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ink/50">Bento</p>
              <h2 className="font-display text-2xl font-bold">Academic Resources</h2>
            </div>
            <FolderOpen className="text-gold" />
          </div>
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <article key={resource.id} className="rounded-[24px] border border-ink/10 bg-white/80 p-4">
                <TagPill>{resource.resource_type}</TagPill>
                <h3 className="mt-3 font-display text-xl font-bold">{resource.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{resource.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-ink/55">
                  <span>{resource.department_name || "General"}</span>
                  <span>Semester {resource.semester}</span>
                </div>
                <a
                  className="mt-4 inline-flex rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold"
                  href={resource.file_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Resource
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
