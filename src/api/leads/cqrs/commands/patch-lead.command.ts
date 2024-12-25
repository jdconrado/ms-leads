import { ILead } from '@domain/primitives';

export class PatchLeadCommand {
  constructor(
    public id: string,
    public lead: Partial<ILead>,
  ) {}
}
