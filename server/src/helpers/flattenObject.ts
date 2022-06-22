export const flattenObject = (array: any[]) => {
  const newArray: any[] = [];

  array.map((obj: any) => {
    const newItem = Object.values(obj).flat();
    if (newItem[1] !== undefined) {
      const obj = { user: newItem[0], requestData: newItem[1] };
      newArray.push(obj);
    } else {
      newArray.push(newItem[0]);
    }
  });
  return newArray;
};
