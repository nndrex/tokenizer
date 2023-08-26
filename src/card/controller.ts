import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middleware from '../commons/validation'
import authenticationMiddleware from '../commons/authMiddleware'
import Service from './service';

async function lambdahandler (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult> {
    console.log("Controller card")
    const token = JSON.parse(event.body!).token;
    const service = new Service()
    const card = await service.getCard(token);

    switch (card) {
        case '498':
            return {
                statusCode: 498,
                body: 'outdated token'
            };
        case '404':
            return {
                statusCode: 404,
                body: 'not finded'
            };
    
        default:
            return {
                statusCode: 200,
                body: JSON.stringify(card)
            };
    }

}
const handler = middy(lambdahandler)
.use(authenticationMiddleware())
.use(middleware('token'))

export {handler}

