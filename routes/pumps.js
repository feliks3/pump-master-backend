import express from 'express';
import {
  getAllPumps,
  getPumpById,
  createPump,
  updatePump,
  deletePump
} from '../controllers/pumpsController.js';

const router = express.Router();

router.get('/', getAllPumps);
router.get('/:id', getPumpById);
router.post('/', createPump);
router.put('/:id', updatePump);
router.delete('/:id', deletePump);

export default router;
