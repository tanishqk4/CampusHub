import TagPill from "./TagPill";

export default function ResourceVaultPage({ resources, filters }) {
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = !filters.search || JSON.stringify(resource).toLowerCase().includes(filters.search.toLowerCase());
    const matchesDepartment = filters.department === "all" || resource.department_name === filters.department;
    return matchesSearch && matchesDepartment;
  });

  return (
    <section className="glass-panel p-6">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.24em] text-ink/50">Campus Resource Vault</p>
        <h1 className="font-display text-3xl font-bold">Find documents in under 3 seconds</h1>
      </div>

      <div className="grid gap-4">
        {filteredResources.map((resource) => (
          <article key={resource.id} className="flex flex-col gap-4 rounded-[24px] border border-ink/10 bg-white/85 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <TagPill>{resource.resource_type}</TagPill>
                <TagPill>{resource.department_name || "General"}</TagPill>
                <TagPill>{`Semester ${resource.semester}`}</TagPill>
              </div>
              <h2 className="font-display text-2xl font-bold">{resource.title}</h2>
              <p className="text-sm leading-7 text-ink/70">{resource.description}</p>
            </div>

            <a
              href={resource.file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white"
            >
              Open Folder
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
