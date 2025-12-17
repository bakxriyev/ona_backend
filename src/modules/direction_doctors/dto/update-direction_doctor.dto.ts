import { PartialType } from '@nestjs/swagger';
import { CreateDirectionDoctorDto } from './create-direction_doctor.dto';

export class UpdateDirectionDoctorDto extends PartialType(CreateDirectionDoctorDto) {}
