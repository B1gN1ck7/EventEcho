# GitHub Authentication Setup

## 🚨 Current Issue
You're getting a "Permission denied" error because GitHub doesn't recognize your authentication.

## ✅ Quick Fix - Use Personal Access Token

### Step 1: Create Personal Access Token
1. Go to [GitHub.com](https://github.com)
2. Click your profile picture → **Settings**
3. Scroll down → **Developer settings** (left sidebar)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give it a name: "EventEcho Development"
7. Select scopes: Check **repo** (full control of private repositories)
8. Click **Generate token**
9. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Use Token for Authentication

#### Method A: Update Remote URL (Recommended)
Run these commands in your terminal:

```bash
cd C:\EventEcho
git remote set-url origin https://B1gN1ck7:YOUR_TOKEN_HERE@github.com/B1gN1ck7/EventEcho.git
```

Replace `YOUR_TOKEN_HERE` with the token you just created.

#### Method B: Use Credential Manager
1. When prompted for username: enter `B1gN1ck7`
2. When prompted for password: enter your Personal Access Token (NOT your GitHub password)

### Step 3: Push to GitHub
```bash
git push origin master
```

## 🔄 Alternative: SSH Setup (More Secure)

### Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Add to GitHub
1. Copy your public key: `type %USERPROFILE%\.ssh\id_ed25519.pub`
2. Go to GitHub → Settings → SSH and GPG keys
3. Click "New SSH key"
4. Paste your public key

### Update Remote URL
```bash
git remote set-url origin git@github.com:B1gN1ck7/EventEcho.git
```

## 🎯 Quick Commands Summary

After setting up authentication, you can use:

```bash
# Upload changes
git add .
git commit -m "Your message here"
git push origin master

# Pull updates
git pull origin master
```

Or use the batch scripts:
- `upload-to-github.bat`
- `pull-from-github.bat`

## 🆘 Still Having Issues?

1. **Check repository ownership**: Make sure you're the owner of `B1gN1ck7/EventEcho`
2. **Verify username**: Your GitHub username should be `B1gN1ck7`
3. **Token permissions**: Make sure your token has "repo" scope
4. **Repository visibility**: Check if the repository is private and you have access

## 📞 Need Help?
- GitHub Docs: https://docs.github.com/en/authentication
- Personal Access Tokens: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
