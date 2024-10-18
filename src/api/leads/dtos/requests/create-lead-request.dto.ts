import { AutoMap } from '@automapper/classes';
import { CreateLeadDto } from './create-lead.dto';
import { IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadRequestDto {
  @AutoMap(() => CreateLeadDto)
  @Type(() => CreateLeadDto)
  @IsNotEmpty()
  @IsDefined()
  @ValidateNested()
  @ApiProperty({ description: 'Lead', type: CreateLeadDto })
  lead: CreateLeadDto;
}
