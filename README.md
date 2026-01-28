# Sa3ed Masr - ساعد مصر

Mentorship platform connecting mentors with entrepreneurs in Egypt.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn-ui
- Supabase (Database + Auth)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Daamah-Digital-Solutions/sa3ed-masr.git

# Navigate to project directory
cd sa3ed-masr

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run preview` - Preview production build

## Database Setup

Run the SQL migrations in `supabase/migrations/` in your Supabase SQL Editor to set up the database schema.
