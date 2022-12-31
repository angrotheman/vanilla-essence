export const hexToRgba = (hex: string, alpha: string | number = 1) => {
  const realHex = hex.replace('#', '');
  if (realHex.length === 6) {
    const r = parseInt(realHex.substring(0, 2), 16);
    const g = parseInt(realHex.substring(2, 4), 16);
    const b = parseInt(realHex.substring(4, 6), 16);

    return `rgb(${r} ${g} ${b} / ${alpha})`;
  } else {
    const rd = realHex.substring(0, 1) + realHex.substring(0, 1);
    const gd = realHex.substring(1, 2) + realHex.substring(1, 2);
    const bd = realHex.substring(2, 3) + realHex.substring(2, 3);
    const r = parseInt(rd, 16);
    const g = parseInt(gd, 16);
    const b = parseInt(bd, 16);

    return `rgb(${r} ${g} ${b} / ${alpha})`;
  }
};
