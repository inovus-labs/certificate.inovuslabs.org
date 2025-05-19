
import { Router } from 'express';
import { addCertificate, verifyCertificate, getCertificateById } from '../controllers/certificate';

const router = Router();

router.post('/add', addCertificate);
router.get('/verify/:hash', verifyCertificate);
router.get('/certificate/:id', getCertificateById);

export default router;
