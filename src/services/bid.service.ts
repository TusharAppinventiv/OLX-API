import Bidder from '../models/bidding.model';
import { Product } from '../models/products.model';

class BidderService {
  async placeBid(userId: number, productId: number, bidAmount: number): Promise<void> {
    await Bidder.create({ user_id: userId, product_id: productId, bid_amount: bidAmount });
  }

  async sellToHighestBidder(productId: number): Promise<number | null> {
    const highestBidder = await Bidder.findOne({
      where: { product_id: productId },
      order: [['bid_amount', 'DESC']],
    });

    if (highestBidder) {
      const highestBidderUserId = highestBidder.user_id;

      const product = await Product.findByPk(productId);

      if (product) {
        product.sold = true;
        product.buyer_id = highestBidderUserId;
        await product.save();
      }
      return highestBidderUserId;
    }

    return null;
  }

  async getBidsForProduct(productId: number): Promise<Bidder[]> {
    const bids = await Bidder.findAll({ where: { product_id: productId } });
    return bids;
  }

  async getHighestBidForProduct(productId: number): Promise<Bidder | null> {
    const highestBid = await Bidder.findOne({
      where: { product_id: productId },
      order: [['bid_amount', 'DESC']],
    });
    return highestBid;
  }

  async getAllBids(): Promise<Bidder[]> {
    const allBids = await Bidder.findAll();
    return allBids;
  }
}

export default BidderService;
