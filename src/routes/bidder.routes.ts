import express from 'express';
import {
  placeBid,
  sellToHighestBidder,
  getBidsForProduct,
  getHighestBidForProduct,
  getAllBids,
} from '../controllers/bid.controller';
import authMiddleware from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/bid', authMiddleware, placeBid);
router.post('/sell-to-highest-bidder', sellToHighestBidder);
router.get('/bids/:productId', getBidsForProduct);
router.get('/highest-bid/:productId', getHighestBidForProduct);
router.get('/all-bids', getAllBids);

export default router;
