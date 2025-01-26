import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';

export class EntityDto {
  @AutoMap()
  @ApiProperty({ description: 'Entity Id' })
  id: string;

  @AutoMap()
  @IsISO8601()
  @ApiProperty({ description: 'Created DateTime' })
  createdAt: string;

  @AutoMap()
  @IsISO8601()
  @ApiProperty({ description: 'Updated DateTime' })
  updatedAt: string;

  @AutoMap()
  @IsISO8601()
  @ApiProperty({ description: 'Deleted DateTime' })
  deletedAt?: string;
}
