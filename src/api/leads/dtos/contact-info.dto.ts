import { AutoMap } from '@automapper/classes';
import { ContactTypeCd } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class ContactInfoDto {
  @AutoMap()
  @ApiProperty({ description: 'ContactInfo Id' })
  id: string;

  @AutoMap()
  @ApiProperty({ description: 'ContactInfo Type', enum: ContactTypeCd })
  typeCd: ContactTypeCd;

  @AutoMap()
  @ApiProperty({ description: 'ContactInfo Value' })
  value: string;

  @AutoMap()
  @ApiProperty({ description: 'Is Primary ContactInfo' })
  isPrimary: boolean;

  @AutoMap()
  @ApiProperty({
    description: 'Created DateTime',
    type: String,
    format: 'date-time',
  })
  createdAt: string;
}
