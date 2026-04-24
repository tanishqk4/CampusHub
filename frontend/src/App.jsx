import { BellRing, FolderKanban, Home, LogIn, SearchSlash, ShieldCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/DashboardPage";
import FeedPage from "./components/FeedPage";
import FilterBar from "./components/FilterBar";
import LostFoundForm from "./components/LostFoundForm";
import LostFoundPage from "./components/LostFoundPage";
import Modal from "./components/Modal";
import PostForm from "./components/PostForm";
import ResourceVaultPage from "./components/ResourceVaultPage";
import Toast from "./components/Toast";
import { createReminder, fetchDashboardData, fetchProfile, login, logout, markInterested, register } from "./lib/api";

const baseNavItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/feed", label: "Smart Feed", icon: BellRing },
  { to: "/lost-found", label: "Lost & Found", icon: SearchSlash },
  { to: "/resources", label: "Resource Vault", icon: FolderKanban }
];

export default function App() {
  const [data, setData] = useState({
    announcements: [],
    events: [],
    resources: [],
    lostFoundItems: [],
    departments: [],
    tags: [],
    offline: false
  });
  const [filters, setFilters] = useState({
    department: "all",
    tag: "all",
    lostFoundStatus: "all",
    search: ""
  });
  const [toast, setToast] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [interestedEventIds, setInterestedEventIds] = useState(() => {
    const saved = localStorage.getItem("campushub_interested_events");
    return saved ? JSON.parse(saved) : [];
  });
  const [reminderKeys, setReminderKeys] = useState(() => {
    const saved = localStorage.getItem("campushub_reminders");
    return saved ? JSON.parse(saved) : [];
  });
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = profile
    ? baseNavItems
    : [
        ...baseNavItems,
        { to: "/login", label: "Login", icon: LogIn },
        { to: "/register", label: "Register", icon: UserPlus }
      ];

  useEffect(() => {
    const timer = toast ? setTimeout(() => setToast(null), 2600) : null;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [toast]);

  useEffect(() => {
    localStorage.setItem("campushub_interested_events", JSON.stringify(interestedEventIds));
  }, [interestedEventIds]);

  useEffect(() => {
    localStorage.setItem("campushub_reminders", JSON.stringify(reminderKeys));
  }, [reminderKeys]);

  useEffect(() => {
    fetchDashboardData().then(setData);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("campushub_access")) {
      fetchProfile().then(setProfile).catch(() => setProfile(null));
    }
  }, []);

  function showToast(title, message, tone = "info") {
    setToast({ title, message, tone });
  }

  async function handleLogin(credentials) {
    try {
      const result = await login(credentials);
      setProfile(result.user || null);
      showToast("Login successful", "You can now use protected actions.", "success");
      navigate("/");
    } catch (error) {
      showToast("Login failed", "Check your username and password.", "error");
    }
  }

  async function handleRegister(payload) {
    try {
      await register(payload);
      showToast("Registration successful", "Your account is ready. Login now.", "success");
      navigate("/login");
    } catch (error) {
      showToast("Registration failed", "Please verify the form and try again.", "error");
    }
  }

  function handleLogout() {
    logout();
    setProfile(null);
    showToast("Logged out", "You have been signed out successfully.", "success");
    navigate("/login");
  }

  async function handleInterested(eventId) {
    if (interestedEventIds.includes(eventId)) {
      showToast("Already marked", "You already marked this event as interested.", "info");
      return;
    }

    try {
      await markInterested(eventId);
      setInterestedEventIds((current) => [...current, eventId]);
      setData((current) => ({
        ...current,
        events: current.events.map((event) =>
          event.id === eventId ? { ...event, interested_count: (event.interested_count || 0) + 1 } : event
        )
      }));
      showToast("Interest saved", "This event is now in your interested list.", "success");
    } catch (error) {
      if (profile) {
        setInterestedEventIds((current) => [...current, eventId]);
        setData((current) => ({
          ...current,
          events: current.events.map((event) =>
            event.id === eventId ? { ...event, interested_count: (event.interested_count || 0) + 1 } : event
          )
        }));
        showToast("Interest saved locally", "Backend sync failed, but the UI remembered your choice.", "info");
      } else {
        showToast("Login required", "Login first to save interest on an event.", "error");
      }
    }
  }

  async function handleRemindMe(payload) {
    const reminderKey = payload.announcement ? `announcement-${payload.announcement}` : `event-${payload.event}`;
    if (reminderKeys.includes(reminderKey)) {
      showToast("Reminder already added", "You already set a reminder for this item.", "info");
      return;
    }

    const remindAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    try {
      await createReminder({ ...payload, remind_at: remindAt });
      setReminderKeys((current) => [...current, reminderKey]);
      showToast("Reminder saved", "You will see this marked as reminded from now on.", "success");
    } catch (error) {
      if (profile) {
        setReminderKeys((current) => [...current, reminderKey]);
        showToast("Reminder stored locally", "Backend sync failed, but your reminder state is saved in the UI.", "info");
      } else {
        showToast("Login required", "Login first to save reminders.", "error");
      }
    }
  }

  function handleCreatePost(formState) {
    const selectedTag = data.tags.find((tag) => tag.name === formState.tag);
    const newPost = {
      id: Date.now(),
      title: formState.title,
      body: formState.body,
      department_name: formState.department,
      is_urgent: formState.urgent,
      published_at: new Date().toISOString(),
      tags_detail: selectedTag ? [{ slug: selectedTag.slug, name: selectedTag.name }] : []
    };

    setData((current) => ({
      ...current,
      announcements: [newPost, ...current.announcements]
    }));
    setActiveModal(null);
    showToast("Post added", "Your campus post has been added to the feed.", "success");
  }

  function handleReportItem(formState) {
    const newItem = {
      id: Date.now(),
      ...formState,
      image_url:
        formState.image_url ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
    };

    setData((current) => ({
      ...current,
      lostFoundItems: [newItem, ...current.lostFoundItems]
    }));
    setActiveModal(null);
    showToast("Item reported", "Your lost or found item is now visible on the board.", "success");
  }

  function isInterested(eventId) {
    return interestedEventIds.includes(eventId);
  }

  function isReminded(key) {
    return reminderKeys.includes(key);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1500px] gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
        <aside className="glass-panel h-fit p-5 lg:sticky lg:top-6">
          <div className="mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ember font-display text-xl font-bold text-white">
              CH
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold">CampusHub</h1>
            <p className="mt-2 text-sm leading-7 text-ink/70">The unified student command center for campus updates, resources, and community help.</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active ? "bg-pine text-white" : "bg-white/70 text-ink hover:bg-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[24px] bg-ink p-5 text-white">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/70">
              <ShieldCheck size={16} />
              Auth State
            </div>
            <p className="font-display text-2xl font-bold">{profile ? profile.username : "Guest"}</p>
            <p className="mt-2 text-sm text-white/70">
              {profile ? "Protected actions are enabled with JWT." : "Login to use reminders and interested actions."}
            </p>
            {profile && (
              <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </aside>

        <main className="space-y-6">
          {data.offline && (
            <div className="glass-panel border border-gold/30 bg-gold/20 p-4 text-sm text-ink/80">
              Backend is currently unreachable, so the UI is showing mock campus data. Start Django to see live API data.
            </div>
          )}

          <FilterBar filters={filters} setFilters={setFilters} departments={data.departments} tags={data.tags} />

          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  data={data}
                  filters={filters}
                  onInterested={handleInterested}
                  onRemindMe={handleRemindMe}
                  onOpenPostModal={() => setActiveModal("post")}
                  onOpenLostFoundModal={() => setActiveModal("lost-found")}
                  isInterested={isInterested}
                  isReminded={isReminded}
                />
              }
            />
            <Route
              path="/feed"
              element={
                <FeedPage
                  data={data}
                  filters={filters}
                  onInterested={handleInterested}
                  onRemindMe={handleRemindMe}
                  onOpenPostModal={() => setActiveModal("post")}
                  isInterested={isInterested}
                  isReminded={isReminded}
                />
              }
            />
            <Route
              path="/lost-found"
              element={<LostFoundPage items={data.lostFoundItems} filters={filters} onOpenLostFoundModal={() => setActiveModal("lost-found")} />}
            />
            <Route path="/resources" element={<ResourceVaultPage resources={data.resources} filters={filters} />} />
            <Route path="/login" element={<AuthPage mode="login" onSubmit={handleLogin} />} />
            <Route path="/register" element={<AuthPage mode="register" onSubmit={handleRegister} />} />
          </Routes>
        </main>
      </div>
      {activeModal === "post" && (
        <Modal title="Add Campus Post" subtitle="Quick Publish" onClose={() => setActiveModal(null)}>
          <PostForm departments={data.departments} tags={data.tags} onSubmit={handleCreatePost} />
        </Modal>
      )}
      {activeModal === "lost-found" && (
        <Modal title="Report Lost or Found Item" subtitle="Community Board" onClose={() => setActiveModal(null)}>
          <LostFoundForm onSubmit={handleReportItem} />
        </Modal>
      )}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
