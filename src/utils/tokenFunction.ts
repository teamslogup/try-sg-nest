import { sign, verify } from 'jsonwebtoken';

export class TokenFunction {
	async generateAccessToken(data) {
		return sign(data, process.env['JWT_SECRET'], { expiresIn: '120s' });
	}

	async isAuthorized(req) {
		const accessToken = req.headers['x-auth-token'];
		if (!accessToken) {
			return null;
		}
		return { userInfo: verify(accessToken, process.env['JWT_SECRET']), accessToken: accessToken };
	}
}
