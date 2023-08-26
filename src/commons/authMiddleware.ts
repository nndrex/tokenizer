import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'


const authenticationMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
      request
    ): Promise<void | APIGatewayProxyResult> => {
      console.log("authenticationMiddleware")
      const auth = request.event.headers.authorization;
      console.log(auth);
      if(auth=== undefined){
        return {statusCode:401,body:''}
      }
      //TODO validation format 
      const token = request.event.headers.authorization?.split(' ')[1];
      

    }  

  
    return {
      before
    }
  }
  
  export default authenticationMiddleware;
