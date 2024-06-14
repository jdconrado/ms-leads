import { AutoMap } from '@automapper/classes';
import { Column } from 'typeorm';
import { BaseSubEntity } from './base-sub.entity';
import { ContactTypeCd } from '@domain/enums';

export class ContactInfoEntity extends BaseSubEntity {
  @AutoMap()
  @Column({ type: 'enum', enum: ContactTypeCd })
  typeCd: ContactTypeCd;

  @AutoMap()
  @Column()
  value: string;

  @AutoMap()
  @Column()
  isPrimary: boolean;
}
