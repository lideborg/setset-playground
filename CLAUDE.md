# Setset Playground

## Development Server

Always start the server on port 8000:

```bash
node server/index.js
```

Access the app at: http://localhost:8000

## Project Structure

- `/server` - Node.js backend (API proxy)
- `/tools` - Individual tool HTML pages
- `/shared` - Shared CSS and JS libraries

## Git Workflow

**Branch strategy:** Feature branches → PR to main → Delete branch after merge

**Use PR for:**
- New features
- Significant changes (multiple files, new functionality)
- Anything that might need reverting

**Commit directly to main for:**
- Typo fixes
- Small bug fixes (1-2 lines)
- Config tweaks
- README/docs updates

**Rule of thumb:** If it touches logic or multiple files, PR it. If it's a tiny safe fix, commit to main.

**When to prompt user:**
- After completing a feature → offer to create PR
- After small fix on main → offer to push
- Before switching to unrelated work → remind to commit/PR
- If uncommitted changes pile up → remind to commit

**PR checklist:**
1. Push current branch
2. Create PR to main with summary
3. Merge and delete branch
