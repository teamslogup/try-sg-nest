import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('account/sessions/me')
	// @Headers('x-auth-token', 'accessToken')
	async login(@Body() user) {
		return this.authService.login(user);
	}

	// @UseGuards(JwtAuthGuard)
	// @Get('account/sessions/me')
	// getProfile(@Req() req) {
	// 	return req.user;
	// }
}
