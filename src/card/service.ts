import ICard from './interface'
import { cardSchema } from './schema'
import { model, connect } from 'mongoose'
import UIDGenerator from 'uid-generator'

export default class Service {

    Card = model<ICard>('Card', cardSchema);

    private async generateToken() {
        const uidGen = new UIDGenerator(96, UIDGenerator.BASE62);
        let token = await uidGen.generate();
        token = token.slice(0, 16);
        return token;
    }
    private async buildCard(card: ICard) {
        card.token = await this.generateToken();
        card.saveDate = new Date();
        return card;
    }
    private castCard(cardDb:any){
        const card:ICard=({email: cardDb.email,
            card_number: cardDb.card_number,
            expiration_year: cardDb.expiration_year,
            expiration_month: cardDb.expiration_month})
            return card;
     
    }
    private datedCheck(cardDb:any){
        const now = new Date();
        console.log(cardDb.saveDate);
        const difference = now.getTime()-cardDb.saveDate!.getTime();
        const minutes = (difference/1000)/60;
        console.log(`minutes ${minutes}`)
        if(minutes>15){
            return true;
        }
        return false;
    }

    async saveCard(card: ICard) {
        console.log("save card");
        card = await this.buildCard(card);
        console.log("card : ")
        console.log(card)
        const newCard = new this.Card(card);
        await connect(process.env.MONGO_URI!);
        const saved = await newCard.save();
        if (saved) {
            return card.token
        }
        return false;
    }
    async getCard(token: string) {
        await connect(process.env.MONGO_URI!);
        const card = await this.Card.find({ token: token });
        console.log(card);
        if (card) {
            const responseCard = this.castCard(card[0]);
            
            const dated = this.datedCheck(card[0]);
            if(dated)return '498'
            return responseCard;
        }
        return '404';
    }
}