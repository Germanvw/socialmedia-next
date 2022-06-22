export const handleFilter = (
  list: any,
  filterInput: string,
  withResults: boolean
) => {
  if (filterInput === '') {
    return withResults ? [] : list;
  } else {
    return list.filter(
      (contact: any) =>
        contact.firstname
          .toLocaleLowerCase()
          .includes(filterInput.toLocaleLowerCase()) ||
        contact.lastname
          .toLocaleLowerCase()
          .includes(filterInput.toLocaleLowerCase()) ||
        contact.username
          .toLocaleLowerCase()
          .includes(filterInput.toLocaleLowerCase())
    );
  }
};
