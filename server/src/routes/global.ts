import { Router } from 'express';

import { fetchCountryAll, fetchGenderAll } from '../controllers/global';

const router = Router();

router.get('/country', fetchCountryAll);
router.get('/gender', fetchGenderAll);

module.exports = router;
