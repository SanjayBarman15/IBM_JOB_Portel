# TalentSpot Job Portal

TalentSpot is a full-stack job portal for connecting job seekers with recruiters. The project was created as a separate React/Vite frontend and Node.js/Express backend, with MongoDB used for application data and Cloudinary used for uploaded company and profile images.

## What The Project Provides

### For students

- Create an account and choose the student role.
- Browse the latest available jobs.
- Search jobs by keywords such as title, description, location, job type, or requirements.
- Filter jobs by location, industry, and salary from the frontend.
- Open a detailed job description and apply once to a job.
- View applied jobs and update profile information, skills, bio, resume, and profile photo.

### For recruiters

- Create an account and choose the recruiter role.
- Register and manage companies belonging to the recruiter.
- Add company description, website, location, and logo.
- Create job postings for a company.
- View jobs posted by the recruiter.
- View applicants for each job and update application status.

## How It Was Created

The project was built in two independently runnable applications:

1. The frontend was scaffolded with Vite and React. React Router provides page navigation, Redux Toolkit manages application state, and Redux Persist keeps selected state in browser storage.
2. The backend was created with Node.js and Express using ES modules. It exposes REST endpoints grouped by users, companies, jobs, and applications.
3. Mongoose models define the MongoDB relationships between users, companies, jobs, and applications.
4. JWT is used for authentication. After login, the backend stores the token in an HTTP-only `token` cookie, and protected requests validate that cookie through the authentication middleware.
5. Multer processes image and resume uploads. Cloudinary stores uploaded media and returns URLs that are saved with the relevant user or company record.
6. Tailwind CSS and reusable UI components provide the interface styling. Radix UI primitives, Lucide icons, Framer Motion, Embla Carousel, and Sonner are used for controls, animation, carousels, icons, and notifications.

## Project Structure

```text
IBM_JOB_Portel/
|-- backend/
|   |-- controllers/       Business logic for users, companies, jobs, applications
|   |-- middlewares/       Authentication and multipart upload middleware
|   |-- models/            Mongoose schemas
|   |-- routes/            REST route definitions
|   |-- utils/             Database, Cloudinary, and data URI helpers
|   `-- index.js            Express application entry point
|-- frontend/
|   |-- src/components/    Pages, shared components, admin screens, and UI primitives
|   |-- src/hooks/          Data-fetching hooks
|   |-- src/redux/          Auth, job, company, and application state
|   |-- src/utils/          API endpoint constants
|   |-- src/App.jsx         Client-side route configuration
|   `-- src/main.jsx        React and Redux application entry point
`-- README.md
```

## Technology Stack

### Frontend

- React 18
- Vite
- React Router DOM
- Redux Toolkit, React Redux, and Redux Persist
- Axios
- Tailwind CSS
- Radix UI components
- Framer Motion, Embla Carousel, Lucide React, and Sonner

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JSON Web Tokens and HTTP-only cookies
- bcrypt/bcryptjs for password hashing
- Multer for multipart uploads
- Cloudinary for media storage
- dotenv, CORS, cookie-parser, and Nodemon

## Requirements

- Node.js 18 or newer
- npm
- A MongoDB database, local or hosted
- A Cloudinary account for image and resume uploads

## Installation And Setup

Clone the repository and install each application separately:

```bash
git clone <repository-url>
cd IBM_JOB_Portel

cd backend
npm install

cd ../frontend
npm install
```

Create `backend/.env` with the following values:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/talentspot
JWT_SECRET=replace-with-a-long-random-secret
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
```

`MONGODB_URI` is also accepted as an alternative to `MONGO_URI`. Keep the Cloudinary credentials and JWT secret private, and do not commit the `.env` file.

## Running The Project

Open two terminals from the project root.

Start the backend:

```bash
cd backend
npm start
```

The API runs on `http://localhost:8000` by default. `npm start` uses Nodemon, so the server restarts when backend files change.

Start the frontend:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in a browser. The frontend is configured to call the backend at `http://localhost:8000/api/v1` and to send credentials with Axios requests.

## Backend API

All routes below are prefixed with `http://localhost:8000/api/v1`. Routes marked as protected require the authentication cookie.

| Area | Method | Endpoint | Purpose |
| --- | --- | --- | --- |
| User | POST | `/user/register` | Register a student or recruiter |
| User | POST | `/user/login` | Authenticate and set the JWT cookie |
| User | GET | `/user/logout` | Clear the authentication cookie |
| User | GET | `/user/profile` | Get the authenticated user's profile |
| User | POST | `/user/profile/update` | Update profile data and uploaded files |
| Company | POST | `/company/register` | Create a company for the recruiter |
| Company | GET | `/company/get` | List the recruiter's companies |
| Company | GET | `/company/get/:id` | Get one company |
| Company | PUT | `/company/update/:id` | Update company details and logo |
| Job | POST | `/job/post` | Create a job posting |
| Job | GET | `/job/get` | Search and list jobs |
| Job | GET | `/job/get/:id` | Get one job with company information |
| Job | GET | `/job/getadminjobs` | List jobs created by the recruiter |
| Application | GET | `/application/apply/:id` | Apply to a job |
| Application | GET | `/application/get` | List the current user's applications |
| Application | GET | `/application/:id/applicants` | View applicants for a job |
| Application | POST | `/application/status/:id/update` | Update an application status |

## Request Flow

1. A user registers or logs in through the React authentication pages.
2. The backend validates the credentials, hashes passwords with bcrypt when registering, and sets a JWT cookie after login.
3. Protected Express routes use `isAuthenticated` to verify the cookie and place the authenticated user ID on `req.id`.
4. React hooks request jobs, companies, or applications through Axios and dispatch the responses into Redux slices.
5. Recruiters create companies and job postings. Students browse those postings and create applications.
6. When a student applies, the application is linked to both the student and the job. Recruiters can then inspect applicants and update their statuses.

## Frontend Routes

| Route | Screen |
| --- | --- |
| `/` | Home page with hero section, categories, and latest jobs |
| `/login` | Login |
| `/signup` | Registration |
| `/jobs` | Job listings |
| `/browse` | Search results |
| `/description/:id` | Job details and apply action |
| `/profile` | Student profile and applied jobs |
| `/admin/companies` | Recruiter company management |
| `/admin/companies/create` | Create a company |
| `/admin/companies/:id` | Edit company details |
| `/admin/jobs` | Recruiter job management |
| `/admin/jobs/create` | Post a job |
| `/admin/jobs/:id/applicants` | Review applicants |

Recruiter-only screens are wrapped with `ProtectedRoute`, which redirects non-recruiters to the home page.

## Useful Commands

From `frontend/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

From `backend/`:

```bash
npm start         # Start Express with Nodemon
```

## Notes For Deployment

- Update the frontend API constants in `frontend/src/utils/constant.js` to use the deployed backend URL.
- Update the backend CORS origin in `backend/index.js` to the deployed frontend URL.
- Use secure, environment-specific values for `JWT_SECRET`, MongoDB, and Cloudinary credentials.
- Configure cookies for the deployment environment, especially when frontend and backend are hosted on different domains.
