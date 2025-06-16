
import dotenv from "dotenv";
dotenv.config();

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const XLSX = require('xlsx');

import { generatePreSignedUrl } from '../../src/controllers/Media';
import { SerialDateToISOString } from '../../src/utils';

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
    row.issue_date
  );
}

// API endpoint
const API_URL = 'http://localhost:8000/certificate/add';


export const uploadFileToPresignedUrl = async (
  presignedUrl: string,
  filePath: string,
  fileType: string
): Promise<boolean> => {
  try {
    const fileData = fs.readFileSync(filePath);
    const response = await axios.put(presignedUrl, fileData, {
      headers: {
        'Content-Type': fileType,
      }
    });
    return true;
  } catch (error) {
    console.log(`Error uploading file to presigned URL: ${error}`);
    return false;
  }
};


async function seedCertificates() {
  console.log(`Starting seeding process...\n`);

  for (const row of data) {
    if (!isValid(row)) {
      const msg = `Invalid row skipped: ${JSON.stringify(row)}`;
      console.log(msg);
      continue;
    }

    console.log(`Processing row no. ${data.indexOf(row) + 1} ...`);

    try {
      const imagePath = row.url;
      const metadata = {
        email: row.email,
        mobile: String(row.mobile),
        event_id: row.event_id,
        certificate_id: row.certificate_id,
        recipient_name: row.recipient_name,
        issue_date: SerialDateToISOString(row.issue_date),
        url: ''
      };

      let filePath, fileName, fileType, fileUrl;

      if (imagePath) {
        filePath = path.join(__dirname, 'assets', imagePath);

        if (fs.existsSync(filePath)) {
          const ext = path.extname(imagePath).toLowerCase();
          fileName = `${row.certificate_id}${ext}`;
          fileType =
            ext === '.png'
              ? 'image/png'
              : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.pdf'
              ? 'application/pdf'
              : 'application/octet-stream';

          // 1. Get presigned URL for upload
          const presignedUrl = await generatePreSignedUrl(fileName, fileType);
          console.log(`Generated presigned URL for file ${fileName} ...`);

          // 2. Upload file to presigned URL
          await uploadFileToPresignedUrl(presignedUrl as string, filePath, fileType);
          console.log(`File uploaded successfully ...`);

          // 3. Set file URL in metadata (assuming public URL follows a pattern)
          fileUrl = `${process.env.CLOUDFLARE_R2_BUCKET_URL}/${fileName}`;
          metadata.url = fileUrl;
          
        } else {
          filePath = null;
        }
      }

      // 4. Send metadata to /add endpoint
      const res = await axios.post(API_URL, metadata, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 200) {
        console.log(`Row processed successfully\n`);
        console.log(res.data);
      } else {
        console.log(`Failed to process row: ${JSON.stringify(row)}`);
      }
    } catch (err : any) {
      console.log(err)
      process.exit(1);
    } finally {
      console.log(`\n------------------------------------------------------------------------\n`);
    }
  }

  console.log(`Seeding process completed.`);
}


seedCertificates();