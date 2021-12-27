import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// @UseGuards(LocalAuthGuard)
	// @Post('account/sessions/me')
	// @Header('x-auth-token', 'accessToken')
	// async login(@Body() user) {
	// 	// req 대체 필요
	// 	return this.authService.login(user);
	// }

	// @UseGuards(JwtAuthGuard)
	// @Get('account/sessions/me')
	// getProfile(@Req() req) {
	// 	return req.user;
	// }
}
