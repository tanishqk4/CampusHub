export const departments = [
  { id: 1, name: "Computer Science", code: "CSE" },
  { id: 2, name: "Electronics", code: "ECE" },
  { id: 3, name: "Management", code: "MBA" }
];

export const tags = [
  { id: 1, name: "Placements", slug: "placements" },
  { id: 2, name: "Exams", slug: "exams" },
  { id: 3, name: "Fest", slug: "fest" }
];

export const announcements = [
  {
    id: 1,
    title: "Mid-Sem Form Deadline Extended",
    body: "Students can complete their exam form submission until Friday 5 PM through the academic portal.",
    department_name: "Computer Science",
    is_urgent: true,
    published_at: "2026-04-22T08:00:00+05:30",
    tags_detail: [{ slug: "exams", name: "Exams" }]
  },
  {
    id: 2,
    title: "Placement Drive Orientation",
    body: "Mandatory orientation for final-year students participating in the placement cycle this semester.",
    department_name: "Computer Science",
    is_urgent: false,
    published_at: "2026-04-23T10:30:00+05:30",
    tags_detail: [{ slug: "placements", name: "Placements" }]
  }
];

export const events = [
  {
    id: 1,
    title: "Spring Placement Readiness Bootcamp",
    description: "Resume review, aptitude prep, and mock interviews in one focused session.",
    location: "Innovation Hall",
    start_at: "2026-04-24T10:00:00+05:30",
    end_at: "2026-04-24T13:00:00+05:30",
    department_name: "Computer Science",
    interested_count: 142,
    tags_detail: [{ slug: "placements", name: "Placements" }]
  },
  {
    id: 2,
    title: "Campus Fest Night",
    description: "Music, food stalls, performances, and club showcases on the main lawn.",
    location: "Main Quadrangle",
    start_at: "2026-04-27T17:30:00+05:30",
    end_at: "2026-04-27T21:00:00+05:30",
    department_name: "Electronics",
    interested_count: 312,
    tags_detail: [{ slug: "fest", name: "Fest" }]
  }
];

export const resources = [
  {
    id: 1,
    title: "DBMS Syllabus 2026",
    description: "Official syllabus document for semester 4.",
    department_name: "Computer Science",
    semester: 4,
    resource_type: "syllabus",
    file_url: "https://example.com/resources/dbms-syllabus.pdf"
  },
  {
    id: 2,
    title: "Signals and Systems PYQ Set",
    description: "Previous year paper collection with answer hints.",
    department_name: "Electronics",
    semester: 3,
    resource_type: "paper",
    file_url: "https://example.com/resources/signals-pyq.pdf"
  }
];

export const lostFoundItems = [
  {
    id: 1,
    item_name: "Blue Water Bottle",
    description: "Found near the library discussion zone.",
    status: "found",
    category: "Accessories",
    location: "Central Library",
    image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    contact_name: "Riya",
    contact_email: "riya@example.com"
  },
  {
    id: 2,
    item_name: "Student ID Card",
    description: "Lost around the Mechanical Block parking area.",
    status: "lost",
    category: "Documents",
    location: "Mechanical Block",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    contact_name: "Arjun",
    contact_email: "arjun@example.com"
  }
];
