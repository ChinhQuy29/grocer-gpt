import type { NextApiRequest, NextApiResponse } from 'next';
import Purchase, { iPurchase } from '../models/Purchase';
import { connectToDB } from '@/app/api/lib/dbConnect';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectToDB();

    try {
        switch (req.method) {
            case 'GET':
                return handleGet(req, res);
            case 'POST':
                return handlePost(req, res);
            case 'PUT':
                return handlePut(req, res);
            case 'DELETE':
                return handleDelete(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// GET /api/purchases - Get all purchases or filter by userId
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    const filter = userId ? { userId } : {};
    const purchases = await Purchase.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(purchases);
}

// POST /api/purchases - Create a new purchase
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const purchaseData: iPurchase = req.body;

    // Basic validation
    if (!purchaseData.userId || !purchaseData.store || !purchaseData.items) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPurchase = await Purchase.create(purchaseData);
    return res.status(201).json(newPurchase);
}

// PUT /api/purchases - Update an existing purchase
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { _id, ...updateData } = req.body;

    if (!_id) {
        return res.status(400).json({ error: 'Missing purchase _id' });
    }

    const updatedPurchase = await Purchase.findByIdAndUpdate(_id, updateData, {
        new: true,
        runValidators: true
    });

    if (!updatedPurchase) {
        return res.status(404).json({ error: 'Purchase not found' });
    }

    return res.status(200).json(updatedPurchase);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).json({ error: 'Missing purchase _id' });
    }

    const deletedPurchase = await Purchase.findByIdAndDelete(_id);

    if (!deletedPurchase) {
        return res.status(404).json({ error: 'Purchase not found' });
    }

    return res.status(200).json({ message: 'Purchase deleted successfully' });
}