import Bidder from '../models/bidding.model';
import { Product } from '../models/products.model';

class BidderService {
  async placeBid(userId: number, productId: number, bidAmount: number): Promise<void> {
    try {
      await Bidder.create({ user_id: userId, product_id: productId, bid_amount: bidAmount });
    } catch (error){
      console.log("hello")
      throw new Error('Error placing bid');
    }
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

   async  getAllBids(page: number, pageSize: number): Promise<Bidder[]> {
    const allBids = await Bidder.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return allBids;
  }
  
}

export default BidderService;
