import { style } from '@vanilla-extract/css';

export const createUniqueIdentifier = (debugId?: string) =>
  style({}, debugId ?? 'identifier');
