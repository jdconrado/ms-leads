import { ISorting } from './sorting.interface';
import { IOffsetPagination } from './offset-pagination.interface';

export interface ISearchMetadata<SortingFields = string> {
  pagination?: IOffsetPagination;
  sorting?: ISorting<SortingFields>;
}
