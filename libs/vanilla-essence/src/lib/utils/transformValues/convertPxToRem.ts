const baseFontSize = 16;

export function convertPxToRem(px: number) {
  const remVal = px / baseFontSize;

  return `${remVal}rem`;
}
