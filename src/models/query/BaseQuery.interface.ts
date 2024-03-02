import type { ParsedUrlQueryInput } from 'node:querystring';

import type { NumRange } from '../NumRange.type';

export interface BaseQuery extends ParsedUrlQueryInput {
  skip?: number;
  take?: NumRange<1, 101>;
}
