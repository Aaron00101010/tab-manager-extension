export function move<T>(array: T[], from: number, to: number): T[] {
  array = [...array];
  const item = array[from];
  array.splice(from, 1);
  array.splice(to, 0, item);
  return array;
}
