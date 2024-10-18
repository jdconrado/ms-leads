import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { routePaths } from '@api/commons/route-paths';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  CreateLeadDto,
  CreateLeadRequestDto,
  SearchLeadRequestDto,
  CreateLeadResponseDto,
} from '@api/leads/dtos';

import { OffsetPagination, Lead, LeadFilter } from '@domain/models';
import { CreateLeadCommand } from '@api/leads/cqrs/commands';
import { LeadDto } from '@api/leads/dtos/lead.dto';
import { GetLeadQuery, SearchLeadsQuery } from '@api/leads/cqrs/queries';
import {
  DataMetadataResponseDto,
  DataResponse,
  MetadataResponseDto,
  OffsetPaginationDto,
} from '@api/commons/dtos';

import { ISearchMetadata } from '@domain/primitives';

@Controller({ path: routePaths.leads.system })
export class LeadController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createLead(
    @Body() body: CreateLeadRequestDto,
  ): Promise<DataResponse<CreateLeadResponseDto>> {
    const lead = this.mapper.map(body.lead, CreateLeadDto, Lead);
    const command = new CreateLeadCommand(lead);

    const result = await this.commandBus.execute<CreateLeadCommand, Lead>(
      command,
    );

    const response = new CreateLeadResponseDto();
    response.lead = this.mapper.map(result, Lead, LeadDto);

    return new DataResponse(response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async searchLeads(
    @Query() filter: SearchLeadRequestDto,
  ): Promise<DataMetadataResponseDto<LeadDto[], SearchLeadRequestDto>> {
    const leadFilter = this.mapper.map(
      filter,
      SearchLeadRequestDto,
      LeadFilter,
    );
    const pagination = this.mapper.map(
      filter,
      OffsetPaginationDto,
      OffsetPagination,
    );
    const query = new SearchLeadsQuery(leadFilter, pagination);

    const result = await this.queryBus.execute<
      SearchLeadsQuery,
      [Lead[], ISearchMetadata]
    >(query);

    const metadata = new MetadataResponseDto(
      result[1].pagination,
      result[1].sorting,
      filter,
    );

    const leads = this.mapper.mapArray(result[0], Lead, LeadDto);

    return new DataMetadataResponseDto<LeadDto[], SearchLeadRequestDto>(
      leads,
      metadata,
    );
  }

  @Get('/:leadId')
  @HttpCode(HttpStatus.OK)
  async getLead(@Param('leadId') id: string): Promise<DataResponse<LeadDto>> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    const query = new GetLeadQuery(id);

    const result = await this.queryBus.execute(query);

    const response = this.mapper.map(result, Lead, LeadDto);

    return new DataResponse(response);
  }
}
