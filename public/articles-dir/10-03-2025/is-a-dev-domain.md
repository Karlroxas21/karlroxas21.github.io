# How to Set Up an .is-a.dev Domain with GitHub Pages
###### *Karl Marx Roxas Octoboer 3, 2025*
---

So, you've hosted your personal website on GitHub Pages, but as a broke dev, buying a custom domain isn't an option. Don't worry! I'll show you how to get a free .is-a.dev domain. It's not only a cool, memorable domain, but immediately signals the visitors that you are a developer!

---
#### Step 1: Create the Subdomain Registration File

First, you need to create a JSON file for your desired subdomain.
1. Create a new file named with your desired subdomain and the `.json` extension.
    - Example: `karlroxas.json`
2. Copy and paste the following content into the file. **Be sure to replace the placeholder values** with your information.

subdomain.json:
```
{
  "owner": {
    "username": "your-github-username",
    "email": "email-you-are-using-in-github"
  },
  "records": {
    "CNAME": "yourcurrenturl.github.io"
  }
}
``` 
- Note: Remember to include the comma after the username line in JSON structure.

#### Step 2: Submit the Registration File to is-a.dev repo
Now, you'll submit this file to the official **is-a.dev** repository to register your subdomain.
1. Navigate to the registration repository: `https://github.com/is-a-dev/register`.
2. Click the **Add file** dropdown, then select **Create new file**.
3. In the file name field, type for subdomain (e.g., `karlroxas.json` will reflect as karlroxas.is-a.dev)
4. Copy and paste the content of the `.json` file you created in Step 1 into the editor.
5. Commit the new file. This action will auto initiate a Pull Request.
6. Carefully read any requirements in the PR description and ensure to add your website link for the website preview section.

#### Step 3: Wait for Approval
Your registration is not yet complete. You must now wait for a maintainer to review and approve your request.
    - This process can take up to **48 hours**.

#### Step 4: Configure GitHub Pages
Once you receive an email confirming that your PR has been merged into main branch, you can set up your custom domain in GitHub Pages.
1. Go to your website's repository on GitHub.
2. Click **Settings** -> **Pages**(located on the left sidear).
3. Under the **Custom Domain** section, enter your new domain name (The file name of step #2, e.g., karlroxas.is-a.dev).
4. Click enforce HTTPS
5. Click **Save**.

Wait for a minute then access your new, customized URL!