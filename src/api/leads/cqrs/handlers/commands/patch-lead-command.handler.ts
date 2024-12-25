import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchLeadCommand } from '@api/leads/cqrs/commands';
import { Logger, NotFoundException } from '@nestjs/common';
import { LeadService } from '@services/lead.service';
import { ILead } from '@domain/primitives';

@CommandHandler(PatchLeadCommand)
export class PatchLeadCommandHandler
  implements ICommandHandler<PatchLeadCommand>
{
  private readonly logger = new Logger(PatchLeadCommandHandler.name);
  constructor(private readonly leadService: LeadService) {}

  async execute(command: PatchLeadCommand): Promise<ILead> {
    this.logger.debug('execute command');
    const lead = await this.leadService.patch(command.id, command.lead);
    this.logger.debug('lead patched: {lead}', { lead });

    if (!lead) {
      throw new NotFoundException(`Lead with id ${command.id} not found`);
    }

    return lead;
  }
}
