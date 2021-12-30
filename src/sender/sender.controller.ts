import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SenderService } from './sender.service';

@ApiTags('Sender')
@UseInterceptors()
@Controller('sender')
export class SenderController {
	constructor(private SenderService: SenderService) {}

	@Post('/message-auth-tokens')
	async sendAuthMessage(@Body() body) {
		await this.SenderService.sendAuthMessage(body);
	}

	@Post('/message-auth-tokens/:authCode/verification')
	async sendAuthToken(@Body() body, @Param() param) {
		await this.SenderService.sendAuthToken(body, param.authCode);
	}
}
