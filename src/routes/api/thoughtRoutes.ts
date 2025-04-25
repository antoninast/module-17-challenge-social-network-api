import { Router } from 'express';
import { addReaction, createThought, deleteReaction, deleteThought, getSingleThought, getThoughts, updateThought } from '../../controllers/thoughtController.js';

const router = Router();

// /api/thoughts
router
  .route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

export default router;
