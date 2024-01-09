import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    if(!req.headers.authorization){
      // throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    
    next();
  }
}
