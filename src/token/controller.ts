import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middleware from '../commons/validation'
import authenticationMiddleware from '../commons/authMiddleware'
import ICard from '../card/interface';
import Service from '../card/service';

async function lambdahandler (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult> {
    console.log("controller token")
    const card:ICard = JSON.parse(event.body!);
    const service = new Service()
    const saved = await service.saveCard(card);
    if(saved){
        return {
            statusCode: 200,
            body: JSON.stringify({ token: saved })
        };
    }
    return {
        statusCode:500,
        body:'error'
    }

}
const handler = middy(lambdahandler)
.use(authenticationMiddleware())
.use(middleware('card'))

export {handler}

