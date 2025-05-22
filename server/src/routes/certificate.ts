
import { Router } from 'express';
const router = Router();

import {
    addCertificate,
    verifyCertificate,
    getCertificateById,
    getTransactionByHash,
    searchCertificates
} from '../controllers/certificate';


router.post('/add', addCertificate);
router.get('/verify/:hash', verifyCertificate);
router.get('/certificate/:id', getCertificateById);
router.get('/transaction/:txHash', getTransactionByHash);
router.get('/search', searchCertificates);

export default router;
