export function setObjectProperties<T>(obj: T, props: Partial<T>): T {
  const allKeys: Array<keyof T | string> = Object.keys(this);
  Object.keys(props).forEach((key) => {
    if (allKeys.includes(key)) {
      obj[key] = props[key];
    }
  });
  return obj;
}
