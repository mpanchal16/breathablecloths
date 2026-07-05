# LinenCotton Yoga Co.

Pure Comfort for Every Move.

## Development

```bash
bun install
bun run dev.
```

## Build & lint

```bash
bun run build
bun run lint
```

## GitHub Actions setup

This project is configured to build, lint, and deploy a Cloudflare Pages preview on every push and pull request.

### 1. Connect the project to GitHub

In the Lovable editor:

1. Click the **Plus (+) menu** in the chat input.
2. Select **GitHub** → **Connect project**.
3. Authorize the Lovable GitHub App.
4. Choose the account/organization and click **Create Repository**.

Once connected, the workflows in `.github/workflows` will sync to GitHub and run automatically.

### 2. Configure Cloudflare Pages secrets

After the GitHub repository is created, add these secrets in **Settings → Secrets and variables → Actions**:

| Secret                    | How to get it                                                                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`    | Cloudflare dashboard → **My Profile** → **API Tokens** → **Create Token** → use the **Cloudflare Pages** template. Grant `Zone:Read`, `Account:Read`, and `Cloudflare Pages:Edit` permissions. |
| `CLOUDFLARE_ACCOUNT_ID`   | Cloudflare dashboard → **Workers & Pages** → copy the **Account ID** from the right sidebar.                                                                                                   |
| `CLOUDFLARE_PROJECT_NAME` | The name of the Cloudflare Pages project you create (or plan to create) for this app.                                                                                                          |

### 3. Create the Cloudflare Pages project

1. In the Cloudflare dashboard, go to **Workers & Pages** → **Create** → **Pages**.
2. Choose **Direct upload** as the source.
3. Note the project name and set it as `CLOUDFLARE_PROJECT_NAME` in GitHub secrets.

### 4. What the workflows do

- **CI** (`ci.yml`): Runs `bun run lint` and `bun run build` on every push and pull request to `main`/`master`. It also uploads the static build as an artifact.
- **Deploy Preview** (`deploy-preview.yml`): Builds the app and deploys the `dist/client` folder to Cloudflare Pages. Pushes to `main`/`master` become the production deployment; pull requests become preview deployments.

### Notes

- The project is a TanStack Start app that also produces a Cloudflare Worker bundle in `dist/server/` for full-stack server functions. The GitHub Actions workflow deploys only the static client output (`dist/client`) to Cloudflare Pages, which is enough for a preview of the site. For the full-stack deployment that includes server functions, continue to publish through Lovable or deploy the `dist/server` Worker bundle via Wrangler.
