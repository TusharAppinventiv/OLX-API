import { Request, Response } from 'express';
import BidderService from '../services/bid.service';

const bidderService = new BidderService();

export async function placeBid(req: Request, res: Response): Promise<void> {
  try {
    const { userId, productId, bidAmount } = req.body;
    await bidderService.placeBid(userId, productId, bidAmount);
    res.status(201).json({ message: 'Bid placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place bid' });
  }
}

export async function sellToHighestBidder(req: Request, res: Response): Promise<void> {
  try {
    const { productId } = req.body;
    const highestBidderUserId = await bidderService.sellToHighestBidder(Number(productId));
    if (highestBidderUserId !== null) {
      res.status(200).json({ message: 'Sold to the highest bidder', highestBidderUserId });
    } else {
      res.status(404).json({ message: 'No highest bidder found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to sell to the highest bidder' });
  }
}

export async function getBidsForProduct(req: Request, res: Response): Promise<void> {
  try {
    const { productId } = req.params;
    const bids = await bidderService.getBidsForProduct(Number(productId));
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bids for the product' });
  }
}

export async function getHighestBidForProduct(req: Request, res: Response): Promise<void> {
  try {
    const { productId } = req.params;
    const highestBid = await bidderService.getHighestBidForProduct(Number(productId));
    res.status(200).json(highestBid);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the highest bid for the product' });
  }
}

export async function getAllBids(req: Request, res: Response): Promise<void> {
  try {
    const allBids = await bidderService.getAllBids();
    res.status(200).json(allBids);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all bids' });
  }
}
