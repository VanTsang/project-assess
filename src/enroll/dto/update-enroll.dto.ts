import { PartialType } from '@nestjs/swagger';
import { CreateEnrollDto } from './create-enroll.dto';

export class UpdateEnrollDto extends PartialType(CreateEnrollDto) {}
