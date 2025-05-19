
import { Router } from 'express';
import { addCertificate, verifyCertificate } from '../controllers/certificate';

const router = Router();

router.post('/add', addCertificate);
router.get('/verify/:hash', verifyCertificate);

export default router;
