// only to avoid TS errors
const includes = <T extends U, U>(
  givenArray: ReadonlyArray<T>,
  el: U
): el is T => {
  return givenArray.includes(el as T);
};

export default includes;
