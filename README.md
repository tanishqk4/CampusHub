# CampusHub

CampusHub is a full-stack student communication platform built with React, Tailwind CSS, Django REST Framework, PostgreSQL-ready settings, and JWT authentication.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide React
- Backend: Django, Django REST Framework, Simple JWT, django-cors-headers
- Database: PostgreSQL via environment variables

## Product Areas

- Bento dashboard for official announcements, upcoming events, and academic resources
- Smart feed with campus tags such as `#Placements`, `#Exams`, and `#Fest`
- Lost & Found visual board with modal-based contact details
- Campus resource vault for syllabus documents and previous year papers
- Dynamic filters by department, tag, search term, and lost/found status

## Project Structure

```text
frontend/
  src/
    components/
    data/
    lib/
backend/
  accounts/
  campus/
  config/
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Optional environment variable:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Backend Setup

Create a `.env` file inside `backend/` based on `.env.example`.

Example PostgreSQL configuration:

```bash
POSTGRES_DB=campushub
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

Install backend packages if needed:

```bash
cd backend
pip install -r requirements.txt
```

Run the backend:

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py seed_campushub
python manage.py runserver
```

Seeded demo admin credentials:

```text
username: campusadmin
password: CampusHub123
```

## Auth Endpoints

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `GET /api/auth/me/`

## Campus API Endpoints

- `/api/departments/`
- `/api/tags/`
- `/api/announcements/`
- `/api/events/`
- `/api/resources/`
- `/api/lost-found/`
- `/api/reminders/`

## Notes

- The backend is configured to use PostgreSQL when `POSTGRES_DB` is present.
- If PostgreSQL is disabled, Django uses SQLite by default.
- In this workspace, SQLite is stored in your local app-data folder by default instead of the OneDrive project folder, which avoids Windows `disk I/O` issues.
