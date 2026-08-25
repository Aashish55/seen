/**
 * SEEN Life Membership application intake.
 *
 * Deployed as a standalone Google Apps Script Web App. Receives JSON from
 * the "Apply Online" form (Life Membership) on the website, appends a row
 * to the response spreadsheet, and uploads the attached documents to a
 * Drive folder. See README.md in this folder for deployment steps.
 */

const CONFIG = {
  // Google Spreadsheet ID
  SPREADSHEET_ID: "1a99_Yd5aFZMlGPPKv7Iz_soIc1TyZCprzZVhDzw6LVI",

  // Exact sheet/tab name
  SHEET_NAME: "Website Form Response",

  // Google Drive folder ID where uploaded files will be stored
  DRIVE_FOLDER_ID: "1q5Zai0vAeLYLvE0exihHZlUAYfHWriMw",

  // Exact sheet/tab name for the published Life Members registry (doGet)
  LM_LIST_SHEET_NAME: "LM LIST",
};

// Column order the sheet is expected to have. If the sheet is empty, the
// header row is created to match.
const HEADERS = [
  "Timestamp",
  "Full name",
  "Permanent Address",
  "Recent Address",
  "Email Address",
  "Email-02 (Optional)",
  "Phone Number",
  "Blood Group",
  "Company Associated with",
  "Referred By (SEEN LIFE Member Name)",
  "Recent Passport/Stamp Size photo",
  "Payment Voucher/Slip (NPR 3,100)",
  "Citizenship",
  "NEC registration certificate/council License",
  "Status",
  "Notes",
];

/**
 * GET
 *
 * Returns the published Life Members list (first/last name only) from the
 * LM_LIST_SHEET_NAME sheet, for display on the public /membership page.
 *
 * Response:
 * { "success": true, "count": 1532, "members": [{ "firstName": "...", "lastName": "..." }, ...] }
 */
function doGet() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  const sheet = spreadsheet.getSheetByName(CONFIG.LM_LIST_SHEET_NAME);

  if (!sheet) {
    return jsonResponse({
      success: false,
      error: 'Sheet "' + CONFIG.LM_LIST_SHEET_NAME + '" not found',
    });
  }

  const data = sheet.getDataRange().getValues();

  // Find the table header row automatically
  const headerRowIndex = data.findIndex(function (row) {
    return row.includes("S. No.") && row.includes("ID") && row.includes("First Name");
  });

  if (headerRowIndex === -1) {
    return jsonResponse({
      success: false,
      error: "Table header row not found",
    });
  }

  const headers = data[headerRowIndex];

  const firstNameIndex = headers.indexOf("First Name");
  const lastNameIndex = headers.indexOf("Sur Name");

  if (firstNameIndex === -1 || lastNameIndex === -1) {
    return jsonResponse({
      success: false,
      error: "First Name or Sur Name column not found",
    });
  }

  const members = data
    .slice(headerRowIndex + 1)
    .filter(function (row) {
      return row.some(function (cell) {
        return cell !== "";
      });
    })
    .map(function (row) {
      return {
        firstName: row[firstNameIndex] || "",
        lastName: row[lastNameIndex] || "",
      };
    });

  return jsonResponse({
    success: true,
    count: members.length,
    members: members,
  });
}

/**
 * POST
 *
 * Receives Life Membership form data from Next.js.
 *
 * Expected request:
 *
 * {
 *   "fullName": "Om Sagar Banjara",
 *   "permanentAddress": "Kushadevi Road",
 *   "recentAddress": "Kharibot",
 *   "email": "vaidyutaom@gmail.com",
 *   "email2": "",
 *   "phone": "9843374143",
 *   "bloodGroup": "O+",
 *   "company": "...",
 *   "referredBy": "...",
 *
 *   "files": [
 *     { "field": "photo", "fileName": "...", "mimeType": "image/jpeg", "base64": "..." },
 *     { "field": "paymentVoucher", "fileName": "...", "mimeType": "image/jpeg", "base64": "..." },
 *     { "field": "citizenship", "fileName": "...", "mimeType": "image/jpeg", "base64": "..." },
 *     { "field": "necCertificate", "fileName": "...", "mimeType": "image/jpeg", "base64": "..." }
 *   ]
 * }
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        success: false,
        error: "No request body received",
      });
    }

    const data = JSON.parse(e.postData.contents);

    // -----------------------------------------
    // Validate required fields
    // -----------------------------------------

    if (!data.fullName) {
      return jsonResponse({
        success: false,
        error: "Full name is required",
      });
    }

    if (!data.email) {
      return jsonResponse({
        success: false,
        error: "Email is required",
      });
    }

    // -----------------------------------------
    // Open Google Drive folder
    // -----------------------------------------

    const parentFolder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);

    // -----------------------------------------
    // Create a folder for this application
    // -----------------------------------------

    const applicationFolderName = data.fullName + " - " + new Date().getTime();

    const applicationFolder = parentFolder.createFolder(applicationFolderName);

    // -----------------------------------------
    // Upload files
    // -----------------------------------------

    const uploadedFiles = {};

    if (Array.isArray(data.files)) {
      data.files.forEach(function (file) {
        if (!file || !file.base64 || !file.fileName) {
          return;
        }

        const bytes = Utilities.base64Decode(file.base64);

        const blob = Utilities.newBlob(
          bytes,
          file.mimeType || "application/octet-stream",
          file.fileName
        );

        const driveFile = applicationFolder.createFile(blob);

        const fileId = driveFile.getId();

        const fileUrl = "https://drive.google.com/open?id=" + fileId;

        uploadedFiles[file.field] = {
          id: fileId,
          name: driveFile.getName(),
          url: fileUrl,
        };
      });
    }

    // -----------------------------------------
    // Open Spreadsheet
    // -----------------------------------------

    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

    const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + CONFIG.SHEET_NAME + '" was not found.');
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    // -----------------------------------------
    // Create spreadsheet row
    // -----------------------------------------

    const row = [
      new Date(),

      data.fullName || "",
      data.permanentAddress || "",
      data.recentAddress || "",
      data.email || "",
      data.email2 || "",
      data.phone || "",
      data.bloodGroup || "",
      data.company || "",
      data.referredBy || "",

      getFileUrl(uploadedFiles, "photo"),
      getFileUrl(uploadedFiles, "paymentVoucher"),
      getFileUrl(uploadedFiles, "citizenship"),
      getFileUrl(uploadedFiles, "necCertificate"),

      "", // Status
      "", // Notes
    ];

    // -----------------------------------------
    // Save row to Google Sheet
    // -----------------------------------------

    sheet.appendRow(row);

    // -----------------------------------------
    // Return success
    // -----------------------------------------

    return jsonResponse({
      success: true,
      message: "Application submitted successfully",

      files: uploadedFiles,

      applicationFolder: {
        id: applicationFolder.getId(),
        url: "https://drive.google.com/drive/folders/" + applicationFolder.getId(),
      },
    });
  } catch (error) {
    console.error(error);

    return jsonResponse({
      success: false,
      error: error.message || String(error),
    });
  }
}

/**
 * Get uploaded file URL.
 */
function getFileUrl(files, field) {
  if (!files[field]) {
    return "";
  }

  return files[field].url;
}

/**
 * Return JSON response.
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
