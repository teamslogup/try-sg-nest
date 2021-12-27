import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// TODO: LocalStrategy 수행하는 Guard
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
