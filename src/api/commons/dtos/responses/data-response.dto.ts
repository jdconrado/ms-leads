import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class DataResponseDto<T> {
  @AutoMap()
  @ApiProperty({ description: 'Data info' })
  data: T;

  constructor(data?: T) {
    this.data = data;
  }
}
