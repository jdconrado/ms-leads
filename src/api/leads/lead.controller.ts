import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
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
  CreateUpdateLeadResponseDto,
  PatchLeadRequestDto,
} from '@api/leads/dtos';

import { OffsetPagination, Lead, LeadFilter } from '@domain/models';
import {
  CreateLeadCommand,
  DeleteLeadCommand,
  PatchLeadCommand,
  ReplaceLeadCommand,
} from '@api/leads/cqrs/commands';
import { LeadDto } from '@api/leads/dtos/lead.dto';
import { GetLeadQuery, SearchLeadsQuery } from '@api/leads/cqrs/queries';
import {
  DataMetadataResponseDto,
  DataResponse,
  MetadataResponseDto,
  OffsetPaginationDto,
} from '@api/commons/dtos';

import { ISearchMetadata } from '@domain/primitives';
import { ApiOperation } from '@nestjs/swagger';

@Controller({ path: routePaths.leads.system })
export class LeadController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a lead' })
  async createLead(
    @Body() body: CreateLeadRequestDto,
  ): Promise<DataResponse<CreateUpdateLeadResponseDto>> {
    const lead = this.mapper.map(body.lead, CreateLeadDto, Lead);
    const command = new CreateLeadCommand(lead);

    const result = await this.commandBus.execute<CreateLeadCommand, Lead>(
      command,
    );

    const response = new CreateUpdateLeadResponseDto();
    response.lead = this.mapper.map(result, Lead, LeadDto);

    return new DataResponse(response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search leads' })
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
  @ApiOperation({ summary: 'Get a lead by id' })
  async getLead(@Param('leadId') id: string): Promise<DataResponse<LeadDto>> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    const query = new GetLeadQuery(id);

    const result = await this.queryBus.execute(query);

    const response = this.mapper.map(result, Lead, LeadDto);

    return new DataResponse(response);
  }

  @Patch('/:leadId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Patch a lead' })
  async patchLead(
    @Param('leadId') id: string,
    @Body() body: PatchLeadRequestDto,
  ): Promise<DataResponse<CreateUpdateLeadResponseDto>> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    const lead = this.mapper.map(body.lead, PatchLeadRequestDto, Lead);
    const command = new PatchLeadCommand(id, lead);

    const result = await this.commandBus.execute<PatchLeadCommand, Lead>(
      command,
    );

    const response = new CreateUpdateLeadResponseDto();
    response.lead = this.mapper.map(result, Lead, LeadDto);

    return new DataResponse(response);
  }

  @Put('/:leadId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Patch a lead' })
  async replaceLead(
    @Param('leadId') id: string,
    @Body() body: CreateLeadRequestDto,
  ): Promise<DataResponse<CreateUpdateLeadResponseDto>> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    const lead = this.mapper.map(body.lead, CreateLeadDto, Lead);
    const command = new ReplaceLeadCommand(id, lead);

    const result = await this.commandBus.execute<ReplaceLeadCommand, Lead>(
      command,
    );

    const response = new CreateUpdateLeadResponseDto();
    response.lead = this.mapper.map(result, Lead, LeadDto);

    return new DataResponse(response);
  }

  @Delete('/:leadId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a lead' })
  async deleteLead(@Param('leadId') id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    const command = new DeleteLeadCommand(id);

    await this.commandBus.execute<DeleteLeadCommand, Lead>(command);
  }
}
