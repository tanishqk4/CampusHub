export default function FilterBar({ filters, setFilters, departments, tags }) {
  return (
    <div className="glass-panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="font-display text-xl font-bold">Advanced Filters</p>
        <p className="text-sm text-ink/65">Hide or show campus content by department, category, and date direction.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
          value={filters.department}
          onChange={(event) => setFilters((current) => ({ ...current, department: event.target.value }))}
        >
          <option value="all">All departments</option>
          {departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>

        <select
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
          value={filters.tag}
          onChange={(event) => setFilters((current) => ({ ...current, tag: event.target.value }))}
        >
          <option value="all">All categories</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>

        <select
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
          value={filters.lostFoundStatus}
          onChange={(event) => setFilters((current) => ({ ...current, lostFoundStatus: event.target.value }))}
        >
          <option value="all">All item status</option>
          <option value="lost">Lost only</option>
          <option value="found">Found only</option>
        </select>

        <input
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
          placeholder="Search updates, events, resources..."
        />
      </div>
    </div>
  );
}
