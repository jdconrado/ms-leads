import { AutoMap } from '@automapper/classes';
import { SortDirectionEnum } from '@domain/enums';
import { ISorting } from '@domain/primitives';

export class Sorting<T = string> implements ISorting<T> {
  @AutoMap()
  orderField?: T;
  @AutoMap()
  orderDirection?: SortDirectionEnum;

  constructor(orderField?: T, orderDirection?: SortDirectionEnum) {
    this.orderField = orderField;
    this.orderDirection = orderDirection;
  }
}
