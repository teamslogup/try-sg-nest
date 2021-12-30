import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// TODO: LocalStrategy 수행하는 Guard
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const can = await super.canActivate(context);
		if (can) {
			const request = context.switchToHttp().getRequest();
			console.log('login for cookie');
			await super.logIn(request);
		}
		return true;
	}
}
