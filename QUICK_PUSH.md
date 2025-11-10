# Quick Push to GitHub

## Method 1: Use Batch File (Recommended)

Double-click to run:
```
push-to-github.bat
```

Or run in PowerShell:
```powershell
.\push-to-github.bat
```

## Method 2: Manual Commands

### Step 1: Create Repository on GitHub

1. Visit: https://github.com/new
2. Repository name: `student-management-system` (or your preferred name)
3. **Do NOT** check "Initialize this repository with a README"
4. Click "Create repository"

### Step 2: Add Remote and Push

Run in PowerShell (replace YOUR_USERNAME and YOUR_REPO_NAME):

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

**Example**:
```powershell
git remote add origin https://github.com/john/student-management-system.git
git push -u origin main
```

### Step 3: Authentication

If prompted for authentication:

1. **Get Personal Access Token**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select `repo` permission
   - Generate and copy the token

2. **Use when pushing**
   - Username: Your GitHub username
   - Password: Paste the token you just copied

## Verify Push Success

After successful push, visit your GitHub repository and you should see all files!

## Next Steps

After pushing, follow [QUICK_START.md](./QUICK_START.md) to deploy to Vercel.

## Troubleshooting

- **Remote already exists**: 
  ```powershell
  git remote remove origin
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
  ```

- **Push rejected**: Make sure the repository is created and not initialized with README

- **Authentication failed**: Use Personal Access Token, not GitHub password

## Related Documents

- [PUSH_TO_GITHUB.md](./PUSH_TO_GITHUB.md) - Detailed instructions
- [QUICK_START.md](./QUICK_START.md) - Quick deployment guide
- [NEXT_STEPS.md](./NEXT_STEPS.md) - Complete steps

