// ============================================================
//  NEI 2026 — Google Apps Script
//  Tài khoản: upmo@hsb.edu.vn
//
//  Hướng dẫn setup:
//  1. Mở script.google.com → New Project
//  2. Paste toàn bộ file này vào
//  3. Điền SHEET_ID và FOLDER_ID bên dưới
//  4. Deploy → Web App → Anyone → Copy URL
//  5. Paste URL vào Register.jsx (APPS_SCRIPT_URL)
// ============================================================

const SHEET_ID  = 'YOUR_GOOGLE_SHEET_ID';   // ID của Google Sheet
const FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID'; // ID của folder Drive

// Tên các cột trong Sheet
const HEADERS = [
  'Thời gian đăng ký',
  'Tên đội',
  'Trường',
  'Email liên hệ',
  'Số điện thoại',
  'Thành viên',
  'Lĩnh vực',
  'Mô tả ý tưởng',
  'File dự án (Drive link)',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Upload file lên Drive (nếu có)
    let fileLink = '';
    if (data.file && data.fileName) {
      const folder = DriveApp.getFolderById(FOLDER_ID);
      const decoded = Utilities.base64Decode(data.file);
      const blob = Utilities.newBlob(decoded, data.fileType || 'application/octet-stream', data.fileName);
      const uploaded = folder.createFile(blob);
      uploaded.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileLink = uploaded.getUrl();
    }

    // 2. Ghi vào Google Sheets
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Tạo header nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0b131c').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.teamName   || '',
      data.school     || '',
      data.email      || '',
      data.phone      || '',
      data.members    || '',
      data.category   || '',
      data.idea       || '',
      fileLink,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test thủ công từ editor (không cần gọi từ web)
function testSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Rows: ' + sheet.getLastRow());
}
