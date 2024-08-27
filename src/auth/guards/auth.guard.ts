import { Injectable, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private configService: ConfigService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isSecurityEnabled = this.configService.get<boolean>('api.securityEnabled');

        if (!isSecurityEnabled) {
            return true; // Bypass authentication if security is disabled
        }

        // Proceed with JWT authentication if security is enabled
        return (await super.canActivate(context)) as boolean;
    }

    getRequest(context: ExecutionContext): Request {
        return context.switchToHttp().getRequest();
    }
}
