import { AutoMap } from '@automapper/classes';
import { Column } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export class BaseSubEntity {
  @AutoMap()
  @Column({ type: 'uuid' })
  id: string = uuidV4();

  @AutoMap()
  @Column()
  createdAt: Date = new Date();

  public update(input?: object) {
    console.log('update', input);
    throw new Error('Method not implemented.');
  }
}
