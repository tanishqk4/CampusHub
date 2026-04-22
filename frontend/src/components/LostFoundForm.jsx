import { useState } from "react";

export default function LostFoundForm({ onSubmit }) {
  const [formState, setFormState] = useState({
    item_name: "",
    description: "",
    status: "lost",
    category: "",
    location: "",
    image_url: "",
    contact_name: "",
    contact_email: ""
  });

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formState);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          placeholder="Item name"
          value={formState.item_name}
          onChange={(event) => setFormState((current) => ({ ...current, item_name: event.target.value }))}
        />
        <select
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          value={formState.status}
          onChange={(event) => setFormState((current) => ({ ...current, status: event.target.value }))}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <textarea
        className="min-h-36 rounded-2xl border border-ink/10 bg-white px-4 py-3"
        placeholder="Describe the item and any useful identifying details"
        value={formState.description}
        onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          placeholder="Category"
          value={formState.category}
          onChange={(event) => setFormState((current) => ({ ...current, category: event.target.value }))}
        />
        <input
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          placeholder="Location"
          value={formState.location}
          onChange={(event) => setFormState((current) => ({ ...current, location: event.target.value }))}
        />
      </div>
      <input
        className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
        placeholder="Image URL"
        value={formState.image_url}
        onChange={(event) => setFormState((current) => ({ ...current, image_url: event.target.value }))}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          placeholder="Contact name"
          value={formState.contact_name}
          onChange={(event) => setFormState((current) => ({ ...current, contact_name: event.target.value }))}
        />
        <input
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
          placeholder="Contact email"
          type="email"
          value={formState.contact_email}
          onChange={(event) => setFormState((current) => ({ ...current, contact_email: event.target.value }))}
        />
      </div>
      <button className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white">Submit Report</button>
    </form>
  );
}
