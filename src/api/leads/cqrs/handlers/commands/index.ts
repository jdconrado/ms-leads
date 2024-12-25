import { CreateLeadCommandHandler } from './create-lead-command.hanlder';
import { DeleteLeadCommandHandler } from './delete-lead-command.handler';
import { PatchLeadCommandHandler } from './patch-lead-command.handler';
import { ReplaceLeadCommandHandler } from './replace-lead-command.handler';

export * from './create-lead-command.hanlder';

export const CommandHandlers = [
  CreateLeadCommandHandler,
  PatchLeadCommandHandler,
  ReplaceLeadCommandHandler,
  DeleteLeadCommandHandler,
];
