import { AutoMap } from '@automapper/classes';
import { ISubModel } from '@domain/primitives';

export class BaseSubModel implements ISubModel {
  @AutoMap()
  id: string;
  @AutoMap()
  createdAt: Date;
}
