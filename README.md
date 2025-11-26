# Al-Furqan Foundation Website

A modern web application for managing humanitarian activities including orphan support, water projects, and community outreach programs.

## Project info

**URL**: https://lovable.dev/projects/c4caf0e1-7570-43c5-8653-8c40d23dd4dd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c4caf0e1-7570-43c5-8653-8c40d23dd4dd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c4caf0e1-7570-43c5-8653-8c40d23dd4dd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

## Deploying with External Supabase

### Prerequisites

- Node.js & npm installed
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) installed
- A Supabase account ([sign up here](https://supabase.com))

### Step 1: Set Up External Supabase Project

1. **Create a Supabase Project**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Click "New Project"
   - Choose organization, project name, database password, and region
   - Wait for project to be provisioned

2. **Get Your Supabase Credentials**
   - Go to Project Settings > API
   - Copy these values:
     - Project URL
     - `anon` public key
     - `service_role` secret key (keep this secure!)

### Step 2: Configure Environment Variables

1. **Update `.env` file** in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
VITE_SUPABASE_PROJECT_ID=your_project_id_here
```

### Step 3: Set Up Database

1. **Link Your Supabase Project**

```bash
npx supabase login
npx supabase link --project-ref your_project_id
```

2. **Run Database Migrations**

```bash
npx supabase db push
```

This will create:
- `profiles` table (user profiles)
- `user_roles` table (role-based access control)
- `orphans` table (orphan support records)
- `boreholes` table (water project records)
- `outreach_activities` table (community outreach records)
- `user_preferences` table (user settings)

3. **Configure Auth Trigger** (manually in Supabase Dashboard SQL Editor):

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Step 4: Deploy Edge Function

```bash
npx supabase functions deploy admin-manage-users
```

Set required secrets:

```bash
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 5: Configure Storage Buckets

In Supabase Dashboard > Storage:

1. Create three public buckets:
   - `orphans`
   - `boreholes`
   - `outreach`

2. Set policies for each bucket to allow authenticated uploads

---

## Deployment to Render

### Prerequisites

- GitHub account
- Render account ([sign up here](https://render.com))
- External Supabase project set up (see above)

### Steps

1. **Push Code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your_github_repo_url
git push -u origin main
```

2. **Create New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" > "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `alfurqan-foundation`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run preview` or use a static site host
     - **Branch**: `main`

3. **Add Environment Variables**
   - In Render dashboard, go to Environment
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_PROJECT_ID`

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Your app will be live at `https://your-app-name.onrender.com`

### For Static Site (Recommended)

Instead of Web Service, use **Static Site**:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

This is more cost-effective for frontend-only deployments.

---

## Deployment to cPanel

### Prerequisites

- cPanel hosting account with Node.js support
- External Supabase project set up (see above)
- SSH access (recommended) or File Manager access

### Method 1: Using cPanel File Manager

1. **Build the Project Locally**

```bash
npm install
npm run build
```

This creates a `dist` folder with production files.

2. **Upload to cPanel**
   - Log into cPanel
   - Open File Manager
   - Navigate to `public_html` (or your domain's root directory)
   - Upload all files from the `dist` folder
   - Create `.htaccess` file:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

3. **Configure Environment Variables**
   - Create a `.env` file in root (if your host supports it)
   - Or hardcode values in the built files (not recommended for secrets)
   - Better: Use Supabase Edge Functions for sensitive operations

### Method 2: Using SSH & Git (Recommended)

1. **SSH into Your Server**

```bash
ssh username@your-server-ip
```

2. **Clone Repository**

```bash
cd public_html
git clone your_github_repo_url .
```

3. **Install Dependencies & Build**

```bash
npm install
npm run build
```

4. **Move Build Files to Root**

```bash
cp -r dist/* .
rm -rf dist node_modules src
```

5. **Set Up Environment Variables**
   - Use cPanel's environment variables feature if available
   - Or create `.env` file (check with hosting provider)

### Method 3: Using cPanel Node.js App (if supported)

1. **Create Node.js App in cPanel**
   - Go to Software > Setup Node.js App
   - Click "Create Application"
   - Configure:
     - Node.js version: 18+
     - Application mode: Production
     - Application root: `public_html/alfurqan`
     - Application URL: your domain
     - Application startup file: leave empty (static site)

2. **Deploy via Git**
   - Use cPanel's Git Version Control
   - Or upload files manually

---

## Post-Deployment Checklist

- [ ] Verify all environment variables are set correctly
- [ ] Test user authentication (signup/login)
- [ ] Test database connections (create/read/update/delete)
- [ ] Test file uploads to storage buckets
- [ ] Verify edge function is working (`admin-manage-users`)
- [ ] Check that RLS policies are enforced
- [ ] Test on mobile and desktop browsers
- [ ] Set up custom domain (if applicable)
- [ ] Enable SSL/HTTPS
- [ ] Configure email settings in Supabase Auth

---

## Troubleshooting

### "Failed to fetch" errors
- Check that environment variables are correctly set
- Verify Supabase project URL is accessible
- Check CORS settings in Supabase if needed

### Authentication not working
- Verify `VITE_SUPABASE_PUBLISHABLE_KEY` is correct
- Check that auth trigger is set up in Supabase
- Confirm email confirmation is disabled in Supabase Auth settings (for development)

### 404 on page refresh (cPanel/Render)
- Ensure `.htaccess` file is present (cPanel)
- Configure redirect rules in Render dashboard
- Set up proper routing for single-page applications

### Database queries failing
- Verify RLS policies are correct
- Check that user has proper role assigned
- Confirm migrations ran successfully

---

## Support

For issues related to:
- **Lovable Platform**: [Lovable Docs](https://docs.lovable.dev/)
- **Supabase**: [Supabase Docs](https://supabase.com/docs)
- **Render**: [Render Docs](https://render.com/docs)

For project-specific issues, check the GitHub Issues or contact the development team.
