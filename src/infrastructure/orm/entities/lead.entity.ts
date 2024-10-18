import { AutoMap } from '@automapper/classes';
import { Entity, Column, BeforeUpdate } from 'typeorm';
import { ContactInfoEntity } from './contact-info.entity';
import { BaseEntity } from './base.entity';
import { LeadSourceCd, LeadStatusCd } from '@domain/enums';

@Entity()
export class LeadEntity extends BaseEntity {
  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column({ nullable: true })
  secondName?: string;

  @AutoMap()
  @Column()
  lastName: string;

  @AutoMap()
  @Column({ nullable: true })
  secondLastName?: string;

  @AutoMap()
  @Column()
  fullName: string;

  @AutoMap()
  @Column()
  representsOrganization: boolean;

  @AutoMap()
  @Column({ nullable: true })
  organizationName?: string;

  @AutoMap()
  @Column({ nullable: true })
  jobTitle?: string;

  @AutoMap(() => [ContactInfoEntity])
  @Column(() => ContactInfoEntity)
  contactData: ContactInfoEntity[];

  @AutoMap()
  @Column({ type: 'enum', enum: LeadStatusCd, default: LeadStatusCd.NEW })
  statusCd: LeadStatusCd;

  @AutoMap()
  @Column({ type: 'enum', enum: LeadSourceCd })
  sourceCd: LeadSourceCd;

  @AutoMap()
  @Column({ nullable: true })
  assignedTo?: string;

  @AutoMap()
  @Column({ nullable: true })
  assignedAt?: Date;

  @AutoMap()
  @Column({ nullable: true })
  companyId: string;

  override update(input?: object): void {
    if (!input) {
      return;
    }
    const optionalKeys = [
      'secondName',
      'secondLastName',
      'organizationName',
      'jobTitle',
      'assignedTo',
      'assignedAt',
    ];
    for (const key in input) {
      if (
        Object.prototype.hasOwnProperty.call(this, key) ||
        optionalKeys.includes(key)
      ) {
        this[key] = input[key];
      }
    }
  }

  @BeforeUpdate()
  updateSecondLastName() {
    const fields = [
      this.firstName,
      this.secondName,
      this.lastName,
      this.secondLastName,
    ];
    this.fullName = fields
      .filter((field) => field !== undefined && field.trim() !== '')
      .map((field) => field.trim())
      .join(' ');
  }
}
