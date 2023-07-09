import allCountries from './allCountries.json';

export const findCountryByCode = (code) => {
  return allCountries.find((c) => c.code == code);
};

export const formatPhoneNumber = (code, number) => {
  let numberLength = String(number).length;
  let [threes, anyRest, helperArray, final, connectLast] = [
    0,
    0,
    [...String(number)],
    [],
    false,
  ];
  if (numberLength % 3 == 1) connectLast = true;
  threes = numberLength / 3;
  anyRest = numberLength % 3;
  for (let i = 0; i < threes; i++) {
    final.push(helperArray.splice(0, 3).join(''));
  }
  if (connectLast) final.push(final.splice(final.length - 2, 2).join(''));
  return `(+${code}) ${final.join('-')}`;
};
