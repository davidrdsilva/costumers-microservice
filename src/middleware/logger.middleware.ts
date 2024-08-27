import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        const { method, originalUrl } = req;
        const start = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const elapsed = Date.now() - start;
            let logLevel = 'log';

            // If the request takes more than 500ms, log information as WARN
            if (elapsed > 500) {
                logLevel = 'warn';
            }

            this.logger[logLevel](`${method} ${originalUrl} ${statusCode} - ${elapsed}ms`);
        });

        next();
    }
}
