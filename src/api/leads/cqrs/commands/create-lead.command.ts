import { Lead } from '@domain/models';

export class CreateLeadCommand {
  constructor(public lead: Lead) {}
}
