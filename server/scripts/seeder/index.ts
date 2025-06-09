
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const XLSX = require('xlsx');

// Path to your Excel file and log file
const excelPath = path.join(__dirname, 'certificates.xlsx');
const logPath = path.join(__dirname, 'seeder.log');


// Read Excel file
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Validation function
function isValid(row : any): boolean {
  return (
    row.email &&
    row.mobile &&
    row.event_id &&
    row.certificate_id &&
    row.recipient_name &&
    row.event_name &&
    row.event_type &&
    row.event_date &&
    row.issue_date &&
    row.location
  );
}

// API endpoint
const API_URL = 'http://localhost:8000/certificate/add';


function logToFile(message : string) {
  fs.appendFileSync(logPath, message + '\n');
}

async function uploadFileToPresignedUrl(
  presignedUrl: any,
  filePath: any,
  fileType: any
): Promise<void> {
  const fileData = fs.readFileSync(filePath);
  await axios.put(presignedUrl, fileData, {
    headers: {
      'Content-Type': fileType,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
}

async function seedCertificates() {
  for (const row of data) {
    if (!isValid(row)) {
      const msg = `Invalid row skipped: ${JSON.stringify(row)}`;
      console.log(msg);
      logToFile(msg);
      continue;
    }

    try {
      // Prepare metadata for /add endpoint
      const metadata = { ...row };

      // If image_path is present, add fileName and fileType
      let filePath, fileName, fileType;
      if (row.image_path) {
        filePath = path.join(__dirname, 'assets', row.image_path);
        if (fs.existsSync(filePath)) {
          fileName = path.basename(filePath);
          // Guess file type from extension (simple, for demo)
          const ext = path.extname(fileName).toLowerCase();
          fileType =
            ext === '.png'
              ? 'image/png'
              : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.pdf'
              ? 'application/pdf'
              : 'application/octet-stream';
          metadata.fileName = fileName;
          metadata.fileType = fileType;
        } else {
          filePath = null;
        }
      }

      // 1. Send metadata to /add endpoint
      const res = await axios.post(API_URL, metadata, {
        headers: { 'Content-Type': 'application/json' },
      });

      // 2. If presignedUrl is returned and file exists, upload the file
      if (res.data.presignedUrl && filePath) {
        await uploadFileToPresignedUrl(res.data.presignedUrl, filePath, fileType);
        const msg = `Success: ${row.certificate_id} (file uploaded)`;
        console.log(msg);
        logToFile(msg);
      } else {
        const msg = `Success: ${row.certificate_id} (no file uploaded)`;
        console.log(msg);
        logToFile(msg);
      }
    } catch (err : any) {
      const msg = `Error for ${row.certificate_id}: ${err.response?.data?.error || err.message}`;
      console.error(msg);
      logToFile(msg);
    }
  }
}

seedCertificates();