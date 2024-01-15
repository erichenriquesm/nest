import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const decodedData = this.jwtService.decode(req.headers.authorization);
    if (!decodedData) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
