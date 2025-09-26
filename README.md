# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/85721bbf-497c-475e-abc0-46c9353cb8fa

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/85721bbf-497c-475e-abc0-46c9353cb8fa) and start prompting.

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

This repository is set up for container-based deploys and automated CI/CD.

### Local build & run (Docker)

```sh
docker build -t myapp:local .
docker run --rm -p 8080:80 myapp:local
```

### CI/CD (GitHub Actions + GHCR + EasyPanel)

Workflows included:

- `.github/workflows/deploy.yml` — builds and pushes `ghcr.io/<owner>/<repo>` and triggers EasyPanel redeploy on push to `main`.
- `.github/workflows/auto-merge.yml` — auto-merges PRs labeled `automerge` once checks are green.
- `.github/workflows/auto-label.yml` — adds `automerge` label when PR author is trusted (list in `TRUSTED_AUTO_LABEL_AUTHORS`).

Required repository secrets:

- `EASYPANEL_DEPLOY_HOOK_URL` — EasyPanel deploy webhook URL.
- `TRUSTED_AUTO_LABEL_AUTHORS` — comma-separated GitHub usernames allowed to auto-label PRs.

EasyPanel setup:

1. Create a Docker Image app.
2. Set image to `ghcr.io/<owner>/<repo>:main` (or a tag).
3. Expose container port `80` and attach a domain.
4. Create a Deploy Hook and paste the URL as `EASYPANEL_DEPLOY_HOOK_URL` secret in GitHub.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
