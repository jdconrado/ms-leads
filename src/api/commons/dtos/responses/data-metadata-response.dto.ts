import { ApiProperty } from '@nestjs/swagger';
import { DataResponseDto } from './data-response.dto';
import { MetadataResponseDto } from './metadata-response.dto';

export class DataMetadataResponseDto<
  TData,
  TFilter,
> extends DataResponseDto<TData> {
  @ApiProperty({ description: 'Metadata info', type: MetadataResponseDto })
  metadata: MetadataResponseDto<TFilter>;

  constructor(data?: TData, metadata?: MetadataResponseDto<TFilter>) {
    super(data);
    this.metadata = metadata;
  }
}
