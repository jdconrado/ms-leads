import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { LeadDto } from '@api/leads/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadResponseDto {
  @AutoMap(() => LeadDto)
  @Type(() => LeadDto)
  @ApiProperty({ description: 'Lead', type: LeadDto })
  lead: LeadDto;
}
