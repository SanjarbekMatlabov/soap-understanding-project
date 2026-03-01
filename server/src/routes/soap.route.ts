import express from 'express';
import { pipeline } from '../soap/pipeline.ts';

const router = express.Router();
router.post('/', pipeline)


export default router
