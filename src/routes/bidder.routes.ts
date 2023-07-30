import express from 'express';
import {
  placeBid,
  sellToHighestBidder,
  getBidsForProduct,
  getHighestBidForProduct,
  getAllBids,
} from '../controllers/bid.controller';

const router = express.Router();

router.post('/place-bid', placeBid);
router.post('/sell-to-highest-bidder', sellToHighestBidder);
router.get('/bids/:productId', getBidsForProduct);
router.get('/highest-bid/:productId', getHighestBidForProduct);
router.get('/all-bids', getAllBids);

export default router;
