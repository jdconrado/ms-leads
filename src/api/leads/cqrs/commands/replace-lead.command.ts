import { ILead } from '@domain/primitives';

export class ReplaceLeadCommand {
  constructor(
    public readonly id: string,
    public readonly lead: ILead,
  ) {}
}
