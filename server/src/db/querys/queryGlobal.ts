export const queryFetchCountryAll: string =
  'SELECT C.id,C.name,C.code FROM country as C WHERE C.active = 1';

export const queryFetchGenderAll: string =
  'SELECT G.id, G.name FROM gender as G WHERE G.active = 1';
