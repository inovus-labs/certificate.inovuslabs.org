
import dotenv from 'dotenv';
dotenv.config();

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";


const {
    CLOUDFLARE_R2_REGION,
    CLOUDFLARE_R2_ENDPOINT,
    CLOUDFLARE_R2_ACCESS_KEY_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    CLOUDFLARE_R2_BUCKET_NAME
} = process.env;

if (!CLOUDFLARE_R2_REGION || !CLOUDFLARE_R2_ENDPOINT || !CLOUDFLARE_R2_ACCESS_KEY_ID || !CLOUDFLARE_R2_SECRET_ACCESS_KEY || !CLOUDFLARE_R2_BUCKET_NAME) {
    throw new Error("Missing required environment variables for Cloudflare R2 configuration");
}



// Get signed URL for media upload
export const generatePreSignedUrl = async (name: string, type: string) => {
    return new Promise((resolve, reject) => {

        const s3Client = new S3Client({
            region: CLOUDFLARE_R2_REGION,
            endpoint: CLOUDFLARE_R2_ENDPOINT,
            credentials: {
                accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
                secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY
            }
        });

        const command = new PutObjectCommand({
            Bucket: CLOUDFLARE_R2_BUCKET_NAME,
            Key: name,
            ContentType: type
        });

        const url = getSignedUrl(s3Client, command, { expiresIn: 60 });

        resolve(url);
    });
};
