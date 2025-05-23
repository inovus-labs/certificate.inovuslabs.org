
import { Router } from 'express';
const router = Router();

import {
    addCertificate,
    verifyCertificate,
    getCertificateById,
    getTransactionByHash,
    searchCertificates
} from '../controllers/certificate';


router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is healthy'
    });
});


router.post('/add', addCertificate);
router.get('/verify/:hash', verifyCertificate);
router.get('/certificate/:id', getCertificateById);
router.get('/transaction/:txHash', getTransactionByHash);
router.get('/search', searchCertificates);


router.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Not Found'
    });
});

export default router;
