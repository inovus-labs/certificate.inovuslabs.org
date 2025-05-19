
import { Router } from 'express';
import { addCertificate, verifyCertificate, getCertificateById, getTransactionByHash } from '../controllers/certificate';

const router = Router();

router.post('/add', addCertificate);
router.get('/verify/:hash', verifyCertificate);
router.get('/certificate/:id', getCertificateById);
router.get('/transaction/:txHash', getTransactionByHash);

export default router;
