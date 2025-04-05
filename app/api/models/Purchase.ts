import mongoose, { Schema, Document } from "mongoose";

interface iPurchase extends Document {
    _id: string;
    userId: string;
    store: 'Walmart' | 'Dillons' | string;
    orderId?: string;
    items: iPurchasedItem[];
    totalAmount?: number;
    purchaseDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface iPurchasedItem {
    name: string;
    category?: string;
    quantity: number;
    unit?: string;
    pricePerUnit?: number;
    totalPrice?: number;
    brand?: string;
    nutrition?: iNutritionInfo;
}

interface iNutritionInfo {
    calories?: number;
    protein?: number;
    sugar?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
}

const PurchaseSchema = new Schema<iPurchase>(
    {
        userId: {
            type: String,
            required: true,
        },
        store: {
            type: String,
            enum: ['Walmart', 'Dillons'],
            required: true,
        },
        orderId: {
            type: String,
            unique: true,
        },
        items: [
            {
                name: { type: String, required: true },
                category: { type: String },
                quantity: { type: Number, required: true },
                unit: { type: String },
                pricePerUnit: { type: Number },
                totalPrice: { type: Number },
                brand: { type: String },
                nutrition: {
                    calories: { type: Number },
                    protein: { type: Number },
                    sugar: { type: Number },
                    fat: { type: Number },
                    fiber: { type: Number },
                    sodium: { type: Number },
                }
            }
        ],
        totalAmount: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

const Purchase = mongoose.models.Purchase || mongoose.model<iPurchase>("Purchase", PurchaseSchema);

export default Purchase;
export type { iPurchase, iPurchasedItem, iNutritionInfo };