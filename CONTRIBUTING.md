# Contributing to EcoXchange

Welcome to the team! This guide covers everything you need to start contributing.

---

## Getting Access

Once you're invited to the **EcoXchange-Pvt-Ltd** GitHub organization and added to your team, you'll have `Write` access to this repo — meaning you can push branches and open Pull Requests.

> ⚠️ **You cannot push directly to `main`.** All changes must go through a Pull Request.

---

## Workflow

### 1. Clone the repo (first time only)
```bash
git clone https://github.com/EcoXchange-Pvt-Ltd/ecoxchange-main.git
cd ecoxchange-main
```

### 2. Create a branch for your work
Name your branch clearly so everyone knows what it's for:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
# or
git checkout -b task/your-name-task-description
```

**Examples:**
- `feature/login-page`
- `fix/navbar-overflow`
- `task/parv-setup-github`

### 3. Make your changes, then commit
Write clear, specific commit messages:
```bash
git add .
git commit -m "Add login form with email validation"
```

**Good commit messages:**
- `Add carbon calculator component`
- `Fix broken API endpoint for user profile`
- `Update README with setup instructions`

**Avoid:**
- `fix stuff`
- `changes`
- `wip`

### 4. Push your branch
```bash
git push origin feature/your-feature-name
```

### 5. Open a Pull Request
- Go to the repo on GitHub
- Click **"Compare & pull request"**
- Fill in the PR template (title, what you did, how to test it)
- Request a review from a lead or the founder

### 6. Address review comments, then merge
Once approved, your PR will be merged into `main`.

---

## Branch Naming Quick Reference

| Type | Format | Example |
|------|--------|---------|
| New feature | `feature/description` | `feature/dashboard-charts` |
| Bug fix | `fix/description` | `fix/login-redirect` |
| Task / misc | `task/name-description` | `task/parv-env-setup` |

---

## Do's and Don'ts

✅ Always branch off from the latest `main`  
✅ Keep PRs small and focused, one thing at a time  
✅ Test your changes before opening a PR  
✅ Add a clear PR description  

❌ Never force-push to `main`  
❌ Don't commit `.env` files or secrets  
❌ Don't merge your own PR without a review  
