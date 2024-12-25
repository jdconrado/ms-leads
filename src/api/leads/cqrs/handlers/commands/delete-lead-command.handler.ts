import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLeadCommand } from '@api/leads/cqrs/commands';
import { ILead } from '@domain/primitives';
import { Logger, NotFoundException } from '@nestjs/common';
import { LeadService } from '@services/lead.service';

@CommandHandler(DeleteLeadCommand)
export class DeleteLeadCommandHandler
  implements ICommandHandler<DeleteLeadCommand>
{
  private readonly logger = new Logger(DeleteLeadCommandHandler.name);
  constructor(private readonly leadService: LeadService) {}

  async execute(command: DeleteLeadCommand): Promise<ILead> {
    this.logger.debug('execute command');
    const lead = await this.leadService.delete(command.id);
    this.logger.debug('lead replaced: {lead}', { lead });

    if (!lead) {
      throw new NotFoundException(`Lead with id ${command.id} not found`);
    }
    return lead;
  }
}
