import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsDefined, ValidateNested } from 'class-validator';
import { PatchLeadDto } from './patch-lead.dto';

export class PatchLeadRequestDto {
  @AutoMap(() => PatchLeadDto)
  @Type(() => PatchLeadDto)
  @IsNotEmpty()
  @IsDefined()
  @ValidateNested()
  @ApiProperty({ description: 'Lead', type: PatchLeadDto })
  lead: PatchLeadDto;
}
