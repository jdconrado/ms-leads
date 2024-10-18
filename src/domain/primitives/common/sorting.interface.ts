import { SortDirectionEnum } from '@domain/enums/common/sorting-direction.enum';

export interface ISorting<T = string> {
  orderField?: T;
  orderDirection?: SortDirectionEnum;
}
