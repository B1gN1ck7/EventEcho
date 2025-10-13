# GitHub Commands for EventEcho

This document contains all the GitHub commands you'll need to upload and pull your code.

## 🚀 Quick Start (Easiest Method)

### Option 1: Use the Batch Scripts (Recommended)
1. **First time setup**: Run `setup-github.bat`
2. **Upload changes**: Run `upload-to-github.bat`
3. **Pull updates**: Run `pull-from-github.bat`

### Option 2: Manual Commands
Follow the commands below step by step.

## 📋 Manual GitHub Commands

### Initial Setup (First Time Only)

#### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository" (green button)
3. Name it `EventEcho` (or your preferred name)
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"

#### 2. Connect Your Local Project to GitHub

```bash
# Navigate to your project directory
cd C:\EventEcho

# Initialize Git (if not already done)
git init

# Add all files to Git
git add .

# Create initial commit
git commit -m "Initial commit: EventEcho project setup"

# Set default branch to main
git branch -M main

# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/EventEcho.git

# Push to GitHub
git push -u origin main
```

### Daily Commands

#### Upload Changes to GitHub

```bash
# Navigate to project directory
cd C:\EventEcho

# Check what files have changed
git status

# Add all changes
git add .

# Commit changes with a message
git commit -m "Your commit message here"

# Push to GitHub
git push origin main
```

#### Pull Updates from GitHub

```bash
# Navigate to project directory
cd C:\EventEcho

# Check for remote changes
git fetch origin

# Pull latest changes
git pull origin main
```

#### If You Have Local Changes When Pulling

```bash
# Option 1: Stash your changes, pull, then apply them back
git stash
git pull origin main
git stash pop

# Option 2: Commit your changes first, then pull
git add .
git commit -m "WIP: saving before pull"
git pull origin main
```

## 🔧 Advanced Commands

### Check Repository Status
```bash
# See what files have changed
git status

# See detailed changes
git diff

# See commit history
git log --oneline
```

### Undo Changes
```bash
# Undo changes to a specific file
git checkout -- filename

# Undo all uncommitted changes
git reset --hard HEAD

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

### Branch Management
```bash
# Create a new branch
git checkout -b feature-branch-name

# Switch between branches
git checkout main
git checkout feature-branch-name

# Merge branch into main
git checkout main
git merge feature-branch-name
```

## 🔐 Authentication

### GitHub Personal Access Token (Recommended)
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with "repo" permissions
3. Use token as password when prompted

### SSH Keys (Alternative)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub account (copy public key)
cat ~/.ssh/id_ed25519.pub
```

## 📁 File Structure
Your project structure after Git setup:
```
C:\EventEcho\
├── .git\                    # Git repository data
├── .gitignore              # Files to ignore
├── Backend\
│   └── app.py
├── Frontend\
│   ├── css\
│   ├── js\
│   ├── index.html
│   └── server.py
├── SETUP.md
├── GITHUB_COMMANDS.md      # This file
├── setup-github.bat        # Setup script
├── upload-to-github.bat    # Upload script
└── pull-from-github.bat    # Pull script
```

## 🆘 Troubleshooting

### Common Issues

#### "Repository not found"
- Check your GitHub username and repository name
- Make sure the repository exists on GitHub
- Verify your authentication

#### "Authentication failed"
- Use GitHub Personal Access Token instead of password
- Check if token has correct permissions
- Regenerate token if expired

#### "Merge conflicts"
- Git will mark conflicts in files with `<<<<<<<`, `=======`, `>>>>>>>`
- Edit files to resolve conflicts
- Run `git add .` then `git commit` to complete merge

#### "Permission denied"
- Check if you have write access to the repository
- Verify you're the owner or have collaborator access

### Getting Help
- Run `git help` for general Git help
- Run `git help <command>` for specific command help
- Check GitHub documentation: https://docs.github.com

## 📝 Best Practices

1. **Commit often** with descriptive messages
2. **Pull before pushing** to avoid conflicts
3. **Use meaningful commit messages** like "Add user login feature"
4. **Don't commit sensitive data** (passwords, API keys)
5. **Use branches** for new features
6. **Keep .gitignore updated** to exclude unnecessary files

---

## 🎯 Quick Reference

| Action | Command |
|--------|---------|
| Upload changes | `upload-to-github.bat` |
| Pull updates | `pull-from-github.bat` |
| Check status | `git status` |
| See changes | `git diff` |
| Undo changes | `git checkout -- filename` |
| View history | `git log --oneline` |

**Happy coding! 🚀**
