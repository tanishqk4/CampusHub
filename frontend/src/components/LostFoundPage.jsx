import { useState } from "react";

import TagPill from "./TagPill";

export default function LostFoundPage({ items, filters, onOpenLostFoundModal }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = !filters.search || JSON.stringify(item).toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.lostFoundStatus === "all" || item.status === filters.lostFoundStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <section className="glass-panel p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-ink/50">Visual Board</p>
            <h1 className="font-display text-3xl font-bold">Lost & Found</h1>
          </div>
          <button className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white" onClick={onOpenLostFoundModal}>Report Item</button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[24px] border border-ink/10 bg-white/85">
              <img className="h-52 w-full object-cover" src={item.image_url} alt={item.item_name} />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <TagPill tone={item.status === "found" ? "found" : "lost"}>
                    {item.status === "found" ? "Found" : "Lost"}
                  </TagPill>
                  <span className="text-sm text-ink/55">{item.category}</span>
                </div>
                <h2 className="font-display text-2xl font-bold">{item.item_name}</h2>
                <p className="text-sm leading-7 text-ink/70">{item.description}</p>
                <p className="text-sm text-ink/55">{item.location}</p>
                <button
                  className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold"
                  onClick={() => setSelectedItem(item)}
                >
                  Contact Finder
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-4">
          <div className="glass-panel w-full max-w-lg p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-ink/50">Contact Details</p>
            <h2 className="mt-2 font-display text-3xl font-bold">{selectedItem.item_name}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/70">
              Reach out to coordinate handoff or confirm ownership.
            </p>
            <div className="mt-5 space-y-2 rounded-[24px] bg-white/80 p-4">
              <p><span className="font-semibold">Name:</span> {selectedItem.contact_name}</p>
              <p><span className="font-semibold">Email:</span> {selectedItem.contact_email}</p>
              <p><span className="font-semibold">Location:</span> {selectedItem.location}</p>
            </div>
            <button className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" onClick={() => setSelectedItem(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
