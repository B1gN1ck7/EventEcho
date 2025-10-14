# How to Create a GitHub Personal Access Token

## 🎯 Step-by-Step Guide

### Step 1: Go to GitHub Settings
1. **Open your web browser** and go to [GitHub.com](https://github.com)
2. **Log in** to your GitHub account (B1gN1ck7)
3. **Click your profile picture** in the top-right corner
4. **Click "Settings"** from the dropdown menu

### Step 2: Navigate to Developer Settings
1. **Scroll down** the left sidebar until you see "Developer settings"
2. **Click "Developer settings"** (it's near the bottom)

### Step 3: Access Personal Access Tokens
1. In the new page, you'll see "Personal access tokens" in the left sidebar
2. **Click "Personal access tokens"**
3. **Click "Tokens (classic)"** (not the newer fine-grained tokens)

### Step 4: Generate New Token
1. **Click the "Generate new token" button**
2. **Click "Generate new token (classic)"** from the dropdown

### Step 5: Configure Your Token
1. **Note:** Give it a descriptive name like "EventEcho Development" or "Local Development"

2. **Expiration:** Choose how long you want it to last:
   - **30 days** (recommended for testing)
   - **60 days**
   - **90 days**
   - **Custom** (you can set a specific date)
   - **No expiration** (not recommended for security)

3. **Select scopes:** Check the boxes for permissions you need:
   - ✅ **repo** (Full control of private repositories)
     - This includes: repo:status, repo_deployment, public_repo, repo:invite, security_events
   - ✅ **workflow** (Update GitHub Action workflows) - Optional
   - ✅ **write:packages** (Upload packages to GitHub Package Registry) - Optional
   - ✅ **delete:packages** (Delete packages from GitHub Package Registry) - Optional

   **Minimum required:** Just check **"repo"** for full repository access

### Step 6: Generate and Copy Token
1. **Scroll to the bottom** and click **"Generate token"**
2. **IMPORTANT:** GitHub will show your token only ONCE
3. **Copy the token immediately** (it looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
4. **Save it somewhere safe** (like a text file on your computer)

### Step 7: Use Your Token

#### Method 1: Update Git Remote URL (Easiest)
Open Command Prompt or PowerShell in your EventEcho folder and run:

```bash
git remote set-url origin https://B1gN1ck7:YOUR_TOKEN_HERE@github.com/B1gN1ck7/EventEcho.git
```

Replace `YOUR_TOKEN_HERE` with the token you just copied.

#### Method 2: Use When Prompted
When you run `git push`, it will ask for:
- **Username:** B1gN1ck7
- **Password:** Paste your token (NOT your GitHub password)

## 🔒 Security Tips

### Keep Your Token Safe
- ✅ **Don't share it** with anyone
- ✅ **Don't commit it** to your code
- ✅ **Store it securely** (password manager, encrypted file)
- ✅ **Revoke it** if you think it's compromised

### If You Lose Your Token
1. Go back to GitHub Settings → Developer settings → Personal access tokens
2. Find your token in the list
3. Click the **trash can icon** to delete it
4. Create a new one following the same steps

## 🎯 Quick Commands After Getting Token

Once you have your token, run these commands:

```bash
# Navigate to your project
cd C:\EventEcho

# Update remote URL with your token
git remote set-url origin https://B1gN1ck7:YOUR_TOKEN_HERE@github.com/B1gN1ck7/EventEcho.git

# Push your changes
git push origin master
```

## 🆘 Troubleshooting

### "Token not found" or "Invalid token"
- Make sure you copied the entire token
- Check that there are no extra spaces
- Verify the token hasn't expired

### "Permission denied"
- Make sure you selected the "repo" scope
- Check that your GitHub username is correct (B1gN1ck7)
- Verify the repository name is correct (EventEcho)

### "Repository not found"
- Make sure the repository exists at https://github.com/B1gN1ck7/EventEcho
- Check that you're the owner or have push access

## 📱 Visual Guide

Here's what the GitHub interface looks like:

```
GitHub.com → Profile Picture → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token (classic)
```

## ✅ After You Get Your Token

1. **Test it works:**
   ```bash
   git push origin master
   ```

2. **Use the easy scripts:**
   - Double-click `upload-to-github.bat` to upload changes
   - Double-click `pull-from-github.bat` to pull updates

3. **You're all set!** Your GitHub integration is now complete.

---

**Need help?** If you run into any issues, just let me know and I can help troubleshoot!
