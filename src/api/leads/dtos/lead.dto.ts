import { EntityDto } from './entity.dto';
import { AutoMap } from '@automapper/classes';
import { ContactInfoDto } from './contact-info.dto';
import { Type } from 'class-transformer';
import { LeadSourceCd, LeadStatusCd } from '@domain/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeadDto extends EntityDto {
  @AutoMap()
  @ApiProperty({ description: 'Lead First Name' })
  firstName: string;

  @AutoMap()
  @ApiPropertyOptional({ description: 'Lead Second Name' })
  secondName?: string;

  @AutoMap()
  @ApiProperty({ description: 'Lead Last Name' })
  lastName: string;

  @AutoMap()
  @ApiPropertyOptional({ description: 'Lead Second Last Name' })
  secondLastName?: string;

  @AutoMap()
  @ApiProperty({ description: 'Lead Full Name' })
  fullName: string;

  @AutoMap()
  @ApiProperty({ description: 'Represents Organization' })
  representsOrganization: boolean;

  @AutoMap()
  @ApiPropertyOptional({ description: 'Lead Organization Name' })
  organizationName?: string;

  @AutoMap()
  @ApiPropertyOptional({ description: 'Lead Job Title' })
  jobTitle?: string;

  @AutoMap(() => [ContactInfoDto])
  @Type(() => ContactInfoDto)
  @ApiProperty({
    description: 'Lead Contact Information',
    type: [ContactInfoDto],
  })
  contactData: ContactInfoDto[];

  @AutoMap()
  @ApiProperty({ description: 'Lead Status Code', enum: LeadStatusCd })
  statusCd: LeadStatusCd;

  @AutoMap()
  @ApiProperty({ description: 'Lead Source Code', enum: LeadSourceCd })
  sourceCd: LeadSourceCd;

  @AutoMap()
  @ApiPropertyOptional({ description: 'Assigned To' })
  assignedTo?: string;

  @AutoMap()
  @ApiPropertyOptional({
    description: 'Assigned DateTime',
    type: String,
    format: 'date-time',
  })
  assignedAt?: string;

  @AutoMap()
  @ApiProperty({ description: 'Company Id' })
  companyId: string;
}
