import { fetchNoToken } from '../../hooks/useFetch';

const fetchCountries = async () => {
  const req = await fetchNoToken('global/country', {});
  const answ = await req.json();
  if (answ) return answ.countryList;
  else throw new Error(answ.msg);
};

const fetchGenders = async () => {
  const req = await fetchNoToken('global/gender', {});
  const answ = await req.json();
  if (answ) return answ.genderList;
  else throw new Error(answ.msg);
};

export const dropdownServices = {
  fetchCountries,
  fetchGenders,
};
