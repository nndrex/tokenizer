import Joi from "joi";
import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const now = new Date().getFullYear();
const validateCreateTokeDataSchema = Joi.object().keys({
    email: Joi.string()
    .max(100)
    .min(5)
    .regex(RegExp("^[A-Za-z0-9._%+-]+(@testdomain.com$|@gmail.com)"))
    .required(),
    card_number: Joi.string().creditCard().min(13).max(16).required(),
    cvv: Joi.string().max(4).min(3).allow("123","4532").required(),
    expiration_month:Joi.number().max(12).min(1).required(),
    expiration_year:Joi.number().min(now).max(now+5).required()
});
const validateGetCardDataSchema = Joi.object().keys({
  token:Joi.string().alphanum().required()
})

const middleware = (module:string): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
      request
    ): Promise<void | APIGatewayProxyResult> => {
        console.log("middy validation")
        let error;
        switch (module) {
          case 'card':
            error = validateCreateTokeDataSchema.validate(JSON.parse(request.event.body!)).error;
            break;
          case 'token':
            error = validateGetCardDataSchema.validate(JSON.parse(request.event.body!)).error;
        }
        
        console.log(`error ${error}`)
        if(error) return {statusCode :400 , body:error.message};
    }  

  
    return {
      before
    }
  }
  
  export default middleware;
