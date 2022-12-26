import { Expand } from '../lib/types';
import { convertPxToRem } from '../lib/utils/transformValues/convertPxToRem';

type SizeVal = number | string;

type Min = {
  min: SizeVal;
};

type Ideal = {
  ideal: SizeVal;
};

type Max = {
  max: SizeVal;
};

type MinProp = Min & Ideal;
type MaxProp = Max & Ideal;
type MinMaxProp = Min & Max;
type ClampProp = Min & Ideal & Max;

type CombinedProp = Expand<MinProp | MaxProp | MinMaxProp | ClampProp>;

export const defineSize = (sizes: CombinedProp) => {
  const { min, max, ideal } = Object.assign(
    {},
    ...Object.entries(sizes).map(([key, idealue]) => ({
      [key]: typeof idealue === 'number' ? convertPxToRem(idealue) : idealue,
    }))
  ) as Partial<{
    min: SizeVal;
    ideal: SizeVal;
    max: SizeVal;
  }>;

  if (min && max && !ideal) {
    return `minmax(${min}, ${max})`;
  }

  if (min && ideal && !max) {
    return `max(${min}, ${ideal})`;
  }
  if (max && ideal && !min) {
    return `min(${max}, ${ideal})`;
  }

  if (min && max && ideal) {
    return `clamp(${min}, ${ideal}, ${max})`;
  }

  return ideal;
};

export default defineSize;
