import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ContactTypeCd } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactInfoDto {
  @AutoMap()
  @IsEnum(ContactTypeCd)
  @IsNotEmpty()
  @ApiProperty({ description: 'ContactInfo Type', enum: ContactTypeCd })
  typeCd: ContactTypeCd;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ContactInfo Value' })
  value: string;

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Is Primary ContactInfo' })
  isPrimary: boolean;
}
