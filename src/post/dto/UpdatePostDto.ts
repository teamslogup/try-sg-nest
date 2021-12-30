import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePostDto } from './CreatePostDto';

export class UpdatePostDto extends PickType(CreatePostDto, ['title', 'contents', 'images'] as const) {}
