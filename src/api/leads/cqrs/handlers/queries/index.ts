import { SearchLeadsQueryHandler } from './search-leads-query.handler';
import { GetLeadQueryHandler } from './get-lead-query.handler';

export * from './get-lead-query.handler';
export * from './search-leads-query.handler';

export const QueryHandlers = [GetLeadQueryHandler, SearchLeadsQueryHandler];
