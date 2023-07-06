import express from 'express';
import {
  createAccount,
  updateAccount,
  deleteAccount,
  getAccount,
  convertToRomanNumeral,
  memoizeFunction
} from '../controllers/AccountController';

const router = express.Router();

router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.get('/', getAccount);

router.get('/convert/:number', convertToRomanNumeral);
router.post('/memoize', memoizeFunction);

export default router;
