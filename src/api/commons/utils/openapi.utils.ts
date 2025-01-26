import { Type } from '@nestjs/common';
import { getSchemaPath } from '@nestjs/swagger';
import { OffsetPaginationDto, SortingDto } from '@api/commons/dtos';

/**
 * Helper to generate an OpenAPI schema for DataResponse<T>
 *
 * @param modelClass a single DTO class or an array of exactly one DTO class
 *                  (which indicates the `data` is an array of that DTO)
 */
export function dataResponseSchema(
  modelClass: Type<unknown> | [Type<unknown>],
): Record<string, any> {
  const isArray = Array.isArray(modelClass);
  // if it's an array like [LeadDto], we'll treat `data` as an array
  const refClass = isArray ? modelClass[0] : modelClass;

  return {
    type: 'object',
    properties: {
      data: isArray
        ? {
            type: 'array',
            items: { $ref: getSchemaPath(refClass) },
          }
        : { $ref: getSchemaPath(refClass) },
    },
    required: ['data'],
  };
}

/**
 * Helper to generate an OpenAPI schema for DataMetadataResponseDto<TData, TFilter>.
 *
 * @param modelClass       A single DTO class or an array `[Class]`
 *                         indicating the `data` is an array of that DTO
 * @param filterClass      The class used for the `filter` property
 */
export function dataMetadataResponseSchema(
  modelClass: Type<unknown> | [Type<unknown>],
  filterClass: Type<unknown>,
): Record<string, any> {
  const isArray = Array.isArray(modelClass);
  const refClass = isArray ? modelClass[0] : modelClass;

  return {
    type: 'object',
    properties: {
      data: isArray
        ? {
            type: 'array',
            items: { $ref: getSchemaPath(refClass) },
          }
        : { $ref: getSchemaPath(refClass) },
      metadata: {
        type: 'object',
        properties: {
          pagination: { $ref: getSchemaPath(OffsetPaginationDto) },
          sort: { $ref: getSchemaPath(SortingDto) },
          filter: { $ref: getSchemaPath(filterClass) },
          projection: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
    required: ['data', 'metadata'],
  };
}
