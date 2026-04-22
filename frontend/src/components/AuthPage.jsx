import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage({ mode, onSubmit }) {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: ""
  });
  const isRegister = mode === "register";

  return (
    <section className="mx-auto max-w-2xl">
      <div className="glass-panel p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-ink/50">{isRegister ? "Create account" : "Welcome back"}</p>
        <h1 className="mt-2 font-display text-4xl font-bold">{isRegister ? "Register for CampusHub" : "Login to CampusHub"}</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-ink/70">
          Use JWT-based authentication to manage announcements, reminders, and lost-and-found reports securely.
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(formState);
          }}
        >
          {isRegister && (
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
                placeholder="First name"
                value={formState.first_name}
                onChange={(event) => setFormState((current) => ({ ...current, first_name: event.target.value }))}
              />
              <input
                className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
                placeholder="Last name"
                value={formState.last_name}
                onChange={(event) => setFormState((current) => ({ ...current, last_name: event.target.value }))}
              />
            </div>
          )}

          <input
            className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
            placeholder="Username"
            value={formState.username}
            onChange={(event) => setFormState((current) => ({ ...current, username: event.target.value }))}
          />

          {isRegister && (
            <input
              className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
              placeholder="Email"
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            />
          )}

          <input
            className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
            placeholder="Password"
            type="password"
            value={formState.password}
            onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
          />

          <button className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white">
            {isRegister ? "Create account" : "Login"}
          </button>
        </form>

        <p className="mt-5 text-sm text-ink/65">
          {isRegister ? "Already have an account?" : "Need an account?"}{" "}
          <Link className="font-semibold text-pine" to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Login here" : "Create one here"}
          </Link>
        </p>
      </div>
    </section>
  );
}
