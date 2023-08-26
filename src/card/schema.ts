import ICard from './interface'
import { Schema } from 'mongoose'

export const cardSchema = new Schema<ICard>({
    email: { type: String, required: true },
    card_number: { type: Number, required: true },
    cvv: { type: Number, required: true },
    expiration_year: { type: String, required: true },
    expiration_month: { type: String, required: true },
    token: { type: String, required: true },
    saveDate: { type: Date, required: true }
})