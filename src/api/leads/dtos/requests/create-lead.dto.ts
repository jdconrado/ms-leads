import { AutoMap } from '@automapper/classes';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsISO8601,
  ValidateNested,
} from 'class-validator';
import { CreateContactInfoDto } from './create-lead-contact-info.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { LeadSourceCd } from '@domain/enums';

export class CreateLeadDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lead First Name' })
  firstName: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Lead Second Name' })
  secondName?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lead Last Name' })
  lastName: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Lead Second Last Name' })
  secondLastName?: string;

  @AutoMap()
  @IsBoolean()
  @ApiProperty({ description: 'Represents Organization' })
  representsOrganization: boolean;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Lead Organization Name' })
  organizationName?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Lead Job Title' })
  jobTitle?: string;

  @AutoMap(() => [CreateContactInfoDto])
  @Type(() => CreateContactInfoDto)
  @ApiProperty({
    description: 'Lead Contact Information',
    type: [CreateContactInfoDto],
  })
  @ValidateNested({ each: true })
  contactData: CreateContactInfoDto[] = [];

  @AutoMap()
  @IsEnum(LeadSourceCd)
  @ApiProperty({ description: 'Lead Source Code', enum: LeadSourceCd })
  sourceCd: LeadSourceCd;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Assigned To' })
  assignedTo?: string;

  @AutoMap()
  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional({
    description: 'Assigned DateTime',
    type: String,
    format: 'date-time',
  })
  assignedAt?: Date;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Company Id' })
  companyId: string;
}
