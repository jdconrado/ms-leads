export interface ISubModel {
  id: string;
  createdAt: Date;
}

export type ExcludedFromSubModelCreate = 'id' | 'createdAt';

export type ExcludedFromSubModelUpdate = ExcludedFromSubModelCreate;
