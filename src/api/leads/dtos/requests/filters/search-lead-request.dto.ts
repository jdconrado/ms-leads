import { AutoMap } from '@automapper/classes';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { LeadSourceCd, LeadStatusCd } from '@domain/enums';
import { OffsetPaginationDto } from '@api/commons/dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchLeadRequestDto extends OffsetPaginationDto {
  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Lead Full Name' })
  fullName?: string;

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Represents Organization' })
  representsOrganization?: string;

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

  @AutoMap()
  @IsOptional()
  @IsArray()
  @IsEnum(LeadStatusCd, { each: true })
  @ApiPropertyOptional({
    description: 'Lead Status Code',
    enum: LeadStatusCd,
    isArray: true,
  })
  statusCd?: LeadStatusCd[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @IsEnum(LeadStatusCd, { each: true })
  @ApiPropertyOptional({
    description: 'Lead Source Code',
    enum: LeadStatusCd,
    isArray: true,
  })
  sourceCd?: LeadSourceCd[];

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Assigned To' })
  assignedTo?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Company Id' })
  companyId?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Lead Email' })
  email?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Lead Phone' })
  phone?: string;
}
