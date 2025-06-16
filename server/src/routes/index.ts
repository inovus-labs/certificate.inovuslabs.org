
import { Router } from 'express';
const router = Router();

import { authenticate, authorize } from '../middleware';
import { addManager, removeManager } from '../controllers/User';
import { getTransactionByHash } from '../controllers/Transaction';
import { addCertificate, verifyCertificate, revokeCertificate, getCertificateById, searchCertificates } from '../controllers/Certificate';



const certificateRouter = Router();
const transactionRouter = Router();
const userRouter = Router();


// Certificate Router
certificateRouter.post('/add', authenticate, authorize(['admin', 'issuer']), addCertificate);
certificateRouter.post('/revoke', authenticate, authorize(['admin', 'issuer']), revokeCertificate);
certificateRouter.get('/:id', getCertificateById);
certificateRouter.get('/verify/:hash', verifyCertificate);
certificateRouter.get('/', searchCertificates);


// Transaction Router
transactionRouter.get('/:txHash', getTransactionByHash);


// User Router
userRouter.post('/add-mgr', addManager);
userRouter.post('/revoke-mgr', removeManager);


router.use('/certificate', certificateRouter);
router.use('/transaction', transactionRouter);
router.use('/user', userRouter);


router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is healthy'
    });
});


router.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Not Found'
    });
});


export default router;
