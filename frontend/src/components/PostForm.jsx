import { useState } from "react";

export default function PostForm({ departments, tags, onSubmit }) {
  const [formState, setFormState] = useState({
    title: "",
    body: "",
    department: departments[0]?.name || "",
    tag: tags[0]?.name || "",
    urgent: false
  });

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formState);
      }}
    >
      <input
        className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
        placeholder="Post title"
        value={formState.title}
        onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
      />
      <textarea
        className="min-h-36 rounded-2xl border border-ink/10 bg-white px-4 py-3"
        placeholder="Announcement details"
        value={formState.body}
        onChange={(event) => setFormState((current) => ({ ...current, body: event.target.value }))}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          value={formState.department}
          onChange={(event) => setFormState((current) => ({ ...current, department: event.target.value }))}
        >
          {departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          value={formState.tag}
          onChange={(event) => setFormState((current) => ({ ...current, tag: event.target.value }))}
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-3 text-sm font-semibold text-ink/70">
        <input
          type="checkbox"
          checked={formState.urgent}
          onChange={(event) => setFormState((current) => ({ ...current, urgent: event.target.checked }))}
        />
        Mark as urgent academic alert
      </label>
      <button className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white">Publish Post</button>
    </form>
  );
}
