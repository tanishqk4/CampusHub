const jobs = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Pulse Commerce",
    source: "LinkedIn",
    location: "Bengaluru, India",
    workMode: "hybrid",
    experience: "mid",
    salaryLpa: 22,
    postedAt: "2026-04-16T09:10:00+05:30",
    skills: ["React", "TypeScript", "Design Systems", "Accessibility"],
    applyUrl: "https://www.linkedin.com/jobs/",
    summary: "Build polished commerce interfaces and collaborate with product designers."
  },
  {
    id: 2,
    title: "UI Developer",
    company: "Northstar Labs",
    source: "Naukri",
    location: "Gurugram, India",
    workMode: "onsite",
    experience: "mid",
    salaryLpa: 16,
    postedAt: "2026-04-15T18:30:00+05:30",
    skills: ["JavaScript", "React", "Redux", "CSS"],
    applyUrl: "https://www.naukri.com/",
    summary: "Own reusable UI components and improve frontend performance for enterprise apps."
  },
  {
    id: 3,
    title: "Founding Product Engineer",
    company: "OrbitPilot",
    source: "Wellfound",
    location: "Remote",
    workMode: "remote",
    experience: "senior",
    salaryLpa: 34,
    postedAt: "2026-04-14T14:00:00+05:30",
    skills: ["React", "TypeScript", "Node.js", "Product Thinking"],
    applyUrl: "https://wellfound.com/jobs",
    summary: "Shape the first user experience and move quickly across product and engineering."
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "BrightLayer",
    source: "Instahyre",
    location: "Pune, India",
    workMode: "hybrid",
    experience: "mid",
    salaryLpa: 18,
    postedAt: "2026-04-13T11:15:00+05:30",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    applyUrl: "https://www.instahyre.com/",
    summary: "Create customer-facing dashboards and design system building blocks."
  },
  {
    id: 5,
    title: "Design Engineer",
    company: "Cobalt Pay",
    source: "Career Page",
    location: "Remote",
    workMode: "remote",
    experience: "mid",
    salaryLpa: 28,
    postedAt: "2026-04-16T07:45:00+05:30",
    skills: ["Design Systems", "React", "Figma", "Motion"],
    applyUrl: "https://example.com/careers",
    summary: "Bridge design and engineering to ship fast, expressive product experiences."
  },
  {
    id: 6,
    title: "Software Engineer - Frontend",
    company: "Maple Health",
    source: "Indeed",
    location: "Hyderabad, India",
    workMode: "hybrid",
    experience: "mid",
    salaryLpa: 20,
    postedAt: "2026-04-12T10:30:00+05:30",
    skills: ["React", "TypeScript", "Testing Library", "GraphQL"],
    applyUrl: "https://in.indeed.com/",
    summary: "Build patient-facing flows with a strong emphasis on testing and reliability."
  },
  {
    id: 7,
    title: "Frontend Engineer II",
    company: "BluePeak AI",
    source: "LinkedIn",
    location: "Remote",
    workMode: "remote",
    experience: "senior",
    salaryLpa: 31,
    postedAt: "2026-04-16T12:10:00+05:30",
    skills: ["React", "TypeScript", "Data Visualization", "D3"],
    applyUrl: "https://www.linkedin.com/jobs/",
    summary: "Ship analytics-heavy product surfaces and interactive charting experiences."
  },
  {
    id: 8,
    title: "Web Experience Engineer",
    company: "Studio Mint",
    source: "Wellfound",
    location: "Mumbai, India",
    workMode: "hybrid",
    experience: "entry",
    salaryLpa: 12,
    postedAt: "2026-04-11T15:50:00+05:30",
    skills: ["HTML", "CSS", "JavaScript", "Framer Motion"],
    applyUrl: "https://wellfound.com/jobs",
    summary: "Craft marketing and product web experiences with strong visual polish."
  },
  {
    id: 9,
    title: "Product Designer",
    company: "Granite Cloud",
    source: "Naukri",
    location: "Remote",
    workMode: "remote",
    experience: "mid",
    salaryLpa: 19,
    postedAt: "2026-04-15T09:20:00+05:30",
    skills: ["Figma", "Design Systems", "UX Research", "Prototyping"],
    applyUrl: "https://www.naukri.com/",
    summary: "Own product design across dashboards, workflows, and usability improvements."
  },
  {
    id: 10,
    title: "Senior Frontend Developer",
    company: "Arclight Systems",
    source: "Career Page",
    location: "Chennai, India",
    workMode: "onsite",
    experience: "senior",
    salaryLpa: 27,
    postedAt: "2026-04-14T08:40:00+05:30",
    skills: ["React", "TypeScript", "Micro Frontends", "Performance"],
    applyUrl: "https://example.com/engineering-careers",
    summary: "Lead frontend architecture for a large-scale enterprise platform."
  },
  {
    id: 11,
    title: "UX Engineer",
    company: "Harbor Notes",
    source: "Instahyre",
    location: "Remote",
    workMode: "remote",
    experience: "mid",
    salaryLpa: 24,
    postedAt: "2026-04-16T06:20:00+05:30",
    skills: ["React", "Design Systems", "Accessibility", "Figma"],
    applyUrl: "https://www.instahyre.com/",
    summary: "Improve interaction quality and accessibility across a collaborative product suite."
  },
  {
    id: 12,
    title: "Frontend Intern",
    company: "NovaSpring",
    source: "Internshala",
    location: "Remote",
    workMode: "remote",
    experience: "entry",
    salaryLpa: 4,
    postedAt: "2026-04-15T13:10:00+05:30",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    applyUrl: "https://internshala.com/",
    summary: "Support dashboard features, bug fixes, and component implementation."
  }
];

const elements = {
  roleInput: document.querySelector("#preferred-role"),
  skillsInput: document.querySelector("#preferred-skills"),
  experienceSelect: document.querySelector("#experience-level"),
  sourceSelect: document.querySelector("#source-platform"),
  modeSelect: document.querySelector("#work-mode"),
  sortSelect: document.querySelector("#sort-order"),
  jobsList: document.querySelector("#jobs-list"),
  resultsMeta: document.querySelector("#results-meta"),
  statTotal: document.querySelector("#stat-total"),
  statFresh: document.querySelector("#stat-fresh"),
  statSource: document.querySelector("#stat-source"),
  statMatch: document.querySelector("#stat-match"),
  sourceBreakdown: document.querySelector("#source-breakdown"),
  template: document.querySelector("#job-card-template"),
  heroRole: document.querySelector("#hero-role"),
  heroSkills: document.querySelector("#hero-skills")
};

const uniqueSources = [...new Set(jobs.map((job) => job.source))];

uniqueSources.forEach((source) => {
  const option = document.createElement("option");
  option.value = source;
  option.textContent = source;
  elements.sourceSelect.append(option);
});

function normalizeText(text) {
  return text.trim().toLowerCase();
}

function parseSkills(input) {
  return input
    .split(",")
    .map((skill) => normalizeText(skill))
    .filter(Boolean);
}

function getAgeInHours(postedAt) {
  const now = new Date();
  const postedDate = new Date(postedAt);
  return Math.max(0, (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60));
}

function getRecencyScore(postedAt) {
  const ageInHours = getAgeInHours(postedAt);
  if (ageInHours <= 24) return 40;
  if (ageInHours <= 72) return 28;
  if (ageInHours <= 168) return 18;
  return 8;
}

function getRoleScore(title, preferredRole) {
  const normalizedTitle = normalizeText(title);
  const normalizedRole = normalizeText(preferredRole);
  if (!normalizedRole) return 10;
  if (normalizedTitle === normalizedRole) return 35;
  if (normalizedTitle.includes(normalizedRole) || normalizedRole.includes(normalizedTitle)) return 28;

  const roleTerms = normalizedRole.split(/\s+/).filter(Boolean);
  const overlap = roleTerms.filter((term) => normalizedTitle.includes(term)).length;
  return overlap ? Math.min(24, overlap * 8) : 6;
}

function getSkillScore(jobSkills, selectedSkills) {
  if (!selectedSkills.length) return 10;
  const normalizedJobSkills = jobSkills.map(normalizeText);
  const matches = selectedSkills.filter((skill) => normalizedJobSkills.includes(skill)).length;
  const ratio = matches / selectedSkills.length;
  return Math.round(ratio * 35);
}

function scoreJob(job, preferences) {
  const recency = getRecencyScore(job.postedAt);
  const role = getRoleScore(job.title, preferences.role);
  const skill = getSkillScore(job.skills, preferences.skills);
  const experience = preferences.experience === "all" || preferences.experience === job.experience ? 10 : 0;
  return recency + role + skill + experience;
}

function formatPostedDate(postedAt) {
  const hours = getAgeInHours(postedAt);
  if (hours < 24) return `${Math.max(1, Math.round(hours))}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function formatExperience(value) {
  if (value === "entry") return "Entry";
  if (value === "mid") return "Mid";
  if (value === "senior") return "Senior";
  return value;
}

function getPreferences() {
  return {
    role: elements.roleInput.value,
    skills: parseSkills(elements.skillsInput.value),
    experience: elements.experienceSelect.value,
    source: elements.sourceSelect.value,
    mode: elements.modeSelect.value,
    sort: elements.sortSelect.value
  };
}

function filterJobs(preferences) {
  return jobs.filter((job) => {
    const matchesExperience = preferences.experience === "all" || job.experience === preferences.experience;
    const matchesSource = preferences.source === "all" || job.source === preferences.source;
    const matchesMode = preferences.mode === "all" || job.workMode === preferences.mode;
    return matchesExperience && matchesSource && matchesMode;
  });
}

function sortJobs(filteredJobs, preferences) {
  const rankedJobs = filteredJobs.map((job) => ({
    ...job,
    score: scoreJob(job, preferences)
  }));

  rankedJobs.sort((left, right) => {
    if (preferences.sort === "date") {
      return new Date(right.postedAt) - new Date(left.postedAt);
    }

    if (preferences.sort === "salary") {
      return right.salaryLpa - left.salaryLpa;
    }

    if (right.score !== left.score) {
      return right.score - left.score;
    }

    return new Date(right.postedAt) - new Date(left.postedAt);
  });

  return rankedJobs;
}

function renderJobs(rankedJobs) {
  elements.jobsList.innerHTML = "";

  if (!rankedJobs.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No openings match the current filters. Try widening the platform, role, or work mode.";
    elements.jobsList.append(emptyState);
    return;
  }

  rankedJobs.forEach((job) => {
    const fragment = elements.template.content.cloneNode(true);
    fragment.querySelector(".platform-pill").textContent = job.source;
    fragment.querySelector(".date-pill").textContent = formatPostedDate(job.postedAt);
    fragment.querySelector(".job-title").textContent = job.title;
    fragment.querySelector(".job-company").textContent = `${job.company} • ${job.location}`;
    fragment.querySelector(".match-badge").textContent = `${Math.min(job.score, 100)}% fit`;

    const details = fragment.querySelector(".job-details");
    [
      `${formatExperience(job.experience)} level`,
      job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1),
      `₹${job.salaryLpa} LPA`,
      job.summary
    ].forEach((detail) => {
      const pill = document.createElement("span");
      pill.className = "detail-pill";
      pill.textContent = detail;
      details.append(pill);
    });

    const tags = fragment.querySelector(".skill-tags");
    job.skills.forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.textContent = skill;
      tags.append(tag);
    });

    const applyLink = fragment.querySelector(".apply-link");
    applyLink.href = job.applyUrl;
    applyLink.textContent = `Apply via ${job.source}`;

    elements.jobsList.append(fragment);
  });
}

function renderStats(rankedJobs) {
  elements.statTotal.textContent = rankedJobs.length;
  elements.statFresh.textContent = rankedJobs.filter((job) => getAgeInHours(job.postedAt) <= 72).length;

  const sourceCounts = rankedJobs.reduce((accumulator, job) => {
    accumulator[job.source] = (accumulator[job.source] || 0) + 1;
    return accumulator;
  }, {});

  const topSourceEntry = Object.entries(sourceCounts).sort((left, right) => right[1] - left[1])[0];
  elements.statSource.textContent = topSourceEntry ? topSourceEntry[0] : "-";

  const averageMatch = rankedJobs.length
    ? Math.round(rankedJobs.reduce((sum, job) => sum + Math.min(job.score, 100), 0) / rankedJobs.length)
    : 0;
  elements.statMatch.textContent = `${averageMatch}%`;

  elements.sourceBreakdown.innerHTML = "";
  if (!Object.keys(sourceCounts).length) {
    const emptyBreakdown = document.createElement("div");
    emptyBreakdown.className = "empty-state";
    emptyBreakdown.textContent = "Source insights will appear here once jobs match your current filters.";
    elements.sourceBreakdown.append(emptyBreakdown);
    return;
  }

  Object.entries(sourceCounts)
    .sort((left, right) => right[1] - left[1])
    .forEach(([source, count]) => {
      const item = document.createElement("div");
      item.className = "source-item";
      item.innerHTML = `<span>${source}</span><strong>${count} jobs</strong>`;
      elements.sourceBreakdown.append(item);
    });
}

function renderMeta(rankedJobs, preferences) {
  const skillsLine = preferences.skills.length ? preferences.skills.join(", ") : "No skills selected";
  elements.resultsMeta.textContent = `${rankedJobs.length} jobs ranked for ${preferences.role || "all roles"} using ${skillsLine}.`;
  elements.heroRole.textContent = preferences.role || "Open to multiple roles";
  elements.heroSkills.textContent = skillsLine;
}

function updateDashboard() {
  const preferences = getPreferences();
  const rankedJobs = sortJobs(filterJobs(preferences), preferences);
  renderMeta(rankedJobs, preferences);
  renderStats(rankedJobs);
  renderJobs(rankedJobs);
}

[
  elements.roleInput,
  elements.skillsInput,
  elements.experienceSelect,
  elements.sourceSelect,
  elements.modeSelect,
  elements.sortSelect
].forEach((field) => {
  field.addEventListener("input", updateDashboard);
  field.addEventListener("change", updateDashboard);
});

updateDashboard();
