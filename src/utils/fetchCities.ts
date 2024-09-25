export const fetchCities = async (uf: string) => {
  const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`);
  const data = await response.json();
  return data;
};