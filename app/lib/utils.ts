export const closestDateTime = (times: Date[]) => {
  const now = new Date();
  return times.reduce((closest: Date, date: Date) =>
    Math.abs(date - now) < Math.abs(closest - now) ? date : closest,
  );
};

export const getRandomArrayItem = <T>(array: T[]): T => {
  if (array.length === 0) throw new Error("Array is empty");

  return array[Math.floor(Math.random() * array.length)];
};
