# Life Membership form → Google Sheets

The Life Membership "Apply Online" form on `/membership` submits directly
from the visitor's browser to a Google Apps Script Web App (not through the
Next.js server, since file uploads can be larger than most hosting
platforms allow in a single serverless request). The script appends a row
to a Google Sheet and saves the uploaded documents to Drive.

The same Web App's `doGet` also serves the public Life Members list shown
on `/membership` — it reads the `LM LIST` sheet (a separate, already
curated membership registry, not the form-response sheet above) and
returns only each member's first and last name.

This is a **standalone** Apps Script (not bound to the spreadsheet) — it
targets the sheet/folder via the IDs in the `CONFIG` object at the top of
`Code.gs`, so it can be deployed from any Google account with access to
those resources.

## Setup

1. Go to [script.google.com](https://script.google.com) and create a new
   standalone project (or open the existing one already deployed at the
   `/exec` URL in `NEXT_PUBLIC_MEMBERSHIP_RESPONSE_FORM`).
2. Replace the project's `Code.gs` contents with this folder's `Code.gs`.
3. Update the `CONFIG` object at the top if the target spreadsheet, sheet
   tab, or Drive folder ever changes:
   - `SPREADSHEET_ID` — the response spreadsheet's ID
   - `SHEET_NAME` — the exact tab name (currently `Website Form Response`)
   - `DRIVE_FOLDER_ID` — the Drive folder uploaded documents are saved into
   - `LM_LIST_SHEET_NAME` — the tab name for the Life Members registry
     (currently `LM LIST`), read by `doGet`
4. Make sure the sheet named in `SHEET_NAME` exists. If it's empty, the
   script writes the header row from the `HEADERS` array automatically on
   first submission.
5. Deploy the script:
   - **Deploy → New deployment** (or **Manage deployments → Edit → New
     version** if updating an existing deployment)
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and authorize the script when prompted.
6. Copy the deployment's **Web app URL** (ends in `/exec`).
7. Set it as `NEXT_PUBLIC_MEMBERSHIP_RESPONSE_FORM` in `.env.local` (and in
   your hosting provider's environment variables for production), then
   redeploy the site. It must use the `NEXT_PUBLIC_` prefix because the
   form submits directly from the browser, not through the Next.js server.

## Notes

- The script creates one subfolder per submission inside the
  `DRIVE_FOLDER_ID` folder, named `<Full name> - <timestamp>`. Uploaded
  files are **not** made publicly link-shareable, since some of them
  (citizenship, NEC license) are sensitive personal documents — share the
  Drive folder directly with committee members who need access instead of
  loosening file-level sharing.
- The row layout in `doPost` and the `HEADERS` array must stay in the same
  order. If you add/remove a field on the form, update both together.
- Whenever you edit `Code.gs` in the Apps Script editor, you must create a
  **new deployment** (or "Manage deployments → Edit → New version") for the
  changes to take effect on the existing `/exec` URL — saving the file
  alone does not update what's live.
- The form fields this script expects (see `membership-application-form.tsx`):
  text — `fullName`, `permanentAddress`, `recentAddress`, `email`,
  `email2`, `phone`, `bloodGroup`, `company`, `referredBy`; files —
  `photo`, `paymentVoucher`, `citizenship`, `necCertificate`.
- `doGet` expects the `LM_LIST_SHEET_NAME` sheet to have a header row
  somewhere in the sheet containing `S. No.`, `ID`, and `First Name`
  columns (it's found automatically, so rows above it can hold titles or
  notes), plus a `Sur Name` column. Only `First Name` and `Sur Name` are
  ever returned — no other column in that sheet is exposed publicly, so
  it's safe to keep contact details, addresses, or other member info in
  further columns.
