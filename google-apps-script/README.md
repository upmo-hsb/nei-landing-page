# Google Apps Script Setup

## Steps

1. Create a new Google Sheet
2. Add header row: `Timestamp | Team Name | School | Email | Phone | Members | Project Idea | Category`
3. Go to **Extensions > Apps Script**
4. Paste the contents of `Code.gs` into the editor
5. Click **Deploy > New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** and copy the deployment URL
7. Paste the URL into `src/pages/Register/Register.jsx` as the value of `APPS_SCRIPT_URL`
