import { useState } from 'react';
import { ufs } from '../../helpers/Ufs';
import { createTrip } from '../../utils/localStorage';

import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const initialTrip: Trip = {
    departureDay: '',
    returnDay: '',
    busModel: '40',
    busNumber: '',
    driver: '',
    team: '',
    originUf: '',
    originCity: '',
    destinationUf: '',
    destinationCity: '',
    passengers: [],
  };

  const [formData, setFormData] = useState<Trip>(initialTrip);
  const [cities, setCities] = useState({ origin: [], destination: [] });

  const trips: Trip[] = JSON.parse(localStorage.getItem('trip') || '[]');

  const [tripsList, setTripsList] = useState<Trip[]>(trips);

  const fetchCities = async (uf: string) => {
    const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`);
    const data = await response.json();
    return data;
  };

  const handleInputChange =
    (fieldName: keyof Trip) =>
    async (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));

      if (fieldName === 'originUf') {
        fetchCities(value).then((fetchedCities) => {
          setCities((prevCities) => ({ ...prevCities, origin: fetchedCities }));
        });
      }

      if (fieldName === 'destinationUf') {
        fetchCities(value).then((fetchedCities) => {
          setCities((prevCities) => ({
            ...prevCities,
            destination: fetchedCities,
          }));
        });
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header>
        <h1 className="py-3 text-white font-extrabold text-center text-2xl">Início</h1>
      </Header>
      <div className="w-4/5 mx-auto">
        <button
          className="py-4 px-4 bg-green-700 rounded-full text-white font-extrabold text-sm transform transition-transform duration-200 hover:scale-105 active:scale-95"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Criar Viagem
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-3/4 h-6/7 px-8 py-3 bg-white">
              <h2 className="py-1 text-center text-xl">Criar Viagem</h2>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="block py-1" htmlFor="departureDay">
                  Data de Saída:
                </label>
                <input
                  className="border p-1 w-full"
                  id="departureDay"
                  type="date"
                  value={formData.departureDay}
                  onChange={handleInputChange('departureDay')}
                />

                <label className="block py-1" htmlFor="returnDay">
                  Data de Retorno:
                </label>
                <input
                  className="border p-1 w-full"
                  id="returnDay"
                  type="date"
                  value={formData.returnDay}
                  onChange={handleInputChange('returnDay')}
                />

                <label className="block py-1" htmlFor="busModel">
                  Modelo do ônibus:
                </label>
                <select className="border p-1 w-full" id="busModel" onChange={handleInputChange('busModel')}>
                  <option key="40" value={40}>
                    40 lugares
                  </option>
                  <option key="42" value={42}>
                    42 lugares
                  </option>
                  <option key="64" value={64}>
                    64 lugares
                  </option>
                </select>

                <label className="block py-1" htmlFor="busNumber">
                  Nº ônibus:
                </label>
                <input
                  className="border p-1 w-full"
                  id="busNumber"
                  type="text"
                  autoComplete="off"
                  value={formData.busNumber}
                  onChange={handleInputChange('busNumber')}
                />

                <label className="block py-1" htmlFor="driver">
                  Motorista:
                </label>
                <input
                  className="border p-1 w-full"
                  id="driver"
                  type="text"
                  autoComplete="off"
                  value={formData.driver}
                  onChange={handleInputChange('driver')}
                />

                <label className="block py-1" htmlFor="team">
                  Equipe de apoio:
                </label>
                <input
                  className="border p-1 w-full"
                  id="team"
                  type="text"
                  autoComplete="off"
                  value={formData.team}
                  onChange={handleInputChange('team')}
                />

                <div className="flex w-full justify-between">
                  <div className="w-1/2">
                    <label className="block py-1" htmlFor="originUf">
                      Origem:
                    </label>
                    <div className="flex gap-3">
                      <select
                        id="originUf"
                        className="border p-1 w-1/4"
                        onChange={handleInputChange('originUf')}
                        value={formData.originUf}
                      >
                        <option value="">UF</option>
                        {ufs.map((uf) => (
                          <option key={uf.id} value={uf.sigla}>
                            {uf.sigla}
                          </option>
                        ))}
                      </select>

                      {formData.originUf && (
                        <select
                          className="border p-1 w-2/4"
                          onChange={handleInputChange('originCity')}
                          value={formData.originCity}
                        >
                          <option value="">Selecione a cidade de origem</option>
                          {cities.origin.map((city: City) => (
                            <option key={city.codigo_ibge} value={city.nome}>
                              {city.nome}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="w-1/2">
                    <label className="block py-1" htmlFor="destinationUf">
                      Destino
                    </label>
                    <div className="flex gap-3">
                      <select
                        id="destinationUf"
                        className="border p-1 w-1/4"
                        onChange={handleInputChange('destinationUf')}
                        value={formData.destinationUf}
                      >
                        <option value="">UF</option>
                        {ufs.map((uf) => (
                          <option key={uf.id} value={uf.sigla}>
                            {uf.sigla}
                          </option>
                        ))}
                      </select>

                      {formData.destinationUf && (
                        <select
                          className="border p-1 w-2/4"
                          onChange={handleInputChange('destinationCity')}
                          value={formData.destinationCity}
                        >
                          <option value="">Selecione a cidade de destino</option>
                          <option value="">Selecione a cidade de origem</option>
                          {cities.destination.map((city: City) => (
                            <option key={city.codigo_ibge} value={city.nome}>
                              {city.nome}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 w-1/2 flex justify-between m-auto">
                  <button
                    className=" rounded p-2 bg-red-600 text-white"
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setFormData(initialTrip);
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    className=" rounded p-2 bg-green-600 text-white"
                    type="submit"
                    onClick={() => {
                      createTrip(formData);
                      setIsOpen(!isOpen);
                      setFormData(initialTrip);
                      setTripsList(tripsList);
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div>
          <h2 className="py-3 text-2xl">Lista de viagens</h2>
          <div>
            <table className="table-auto text-center border border-zinc-600 w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-4 py-2">Saída</th>
                  <th className="px-4 py-2">Retorno</th>
                  <th className="px-4 py-2">Origem</th>
                  <th className="px-4 py-2">Destino</th>
                  <th className="px-4 py-2">Nº ônibus</th>
                  <th className="px-4 py-2">Motorista</th>
                  <th className="px-4 py-2">Passageiros</th>
                  <th className="px-4 py-2">Detalhes</th>
                  <th className="px-4 py-2">Apagar</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip, index) => (
                  <tr key={index} className="hover:bg-gray-400 hover:cursor-pointer ">
                    <td className="py-2 border-y border-black">{trip.departureDay.split('-').reverse().join('/')}</td>
                    <td className="py-2 border-y border-black">{trip.returnDay.split('-').reverse().join('/')}</td>
                    <td className="py-2 border-y border-black">{trip.originUf}</td>
                    <td className="py-2 border-y border-black">{trip.destinationUf}</td>
                    <td className="py-2 border-y border-black">{trip.busNumber}</td>
                    <td className="py-2 border-y border-black">{trip.driver}</td>
                    <td className="py-2 border-y border-black">
                      {trip.passengers.length} / {trip.busModel}
                    </td>
                    <td
                      onClick={() => {
                        localStorage.setItem('selectedTripIndex', `${index}`);
                        navigate('/viagem');
                      }}
                      className=" rounded py-2 border-y border-black bg-green-600 text-white"
                    >
                      Detalhes
                    </td>
                    <td
                      onClick={() => {
                        const trip = JSON.parse(localStorage.getItem('trip') || '[]');
                        if (trip) trip.splice(index, 1);
                        localStorage.setItem('trip', JSON.stringify(trip));
                        setTripsList(trip);
                      }}
                      className=" rounded py-2 text-white border-y border-black bg-red-500"
                    >
                      Apagar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
