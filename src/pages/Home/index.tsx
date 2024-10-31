import { useState } from 'react';
import { ufs } from '../../helpers/Ufs';
import { createTrip } from '../../utils/localStorage';

import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { PrintTrip } from '../../components/PrintTrip';
import { fetchCities } from '../../utils/fetchCities';

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
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

  const selectedTrip = localStorage.getItem('selectedTripIndex');
  const selectedTripIndex = selectedTrip ? JSON.parse(selectedTrip) : 0;
  const trip = trips[selectedTripIndex] || trips[0];

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

    const requiredFields = [
      { name: 'departureDay', label: 'Data de Saída' },
      { name: 'returnDay', label: 'Data de Retorno' },
      { name: 'originUf', label: 'Estado de Origem' },
      { name: 'originCity', label: 'Cidade de Origem' },
      { name: 'destinationUf', label: 'Estado de Destino' },
      { name: 'destinationCity', label: 'Cidade de Destino' },
    ];
    const missingFields = requiredFields.filter((field) => !formData[field.name as keyof Trip]);

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map((field) => field.label).join(', ');
      alert(`Preencha os campos obrigatórios: ${missingFieldNames}.`);
      return;
    }

    createTrip(formData);
    setIsOpen(!isOpen);
    setFormData(initialTrip);
    setTripsList(tripsList);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Tem certeza de que deseja apagar essa viagem?')) {
      const trip = JSON.parse(localStorage.getItem('trip') || '[]');
      trip.splice(index, 1);
      localStorage.setItem('trip', JSON.stringify(trip));
      setTripsList(trip);
    }
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

        {openReport && <PrintTrip trip={trip} handleClose={() => setOpenReport(false)} />}

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full h-full px-8 py-3 bg-white md:w-3/4 md:h-4/5 overflow-auto">
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

                <div className="flex w-full justify-between flex-col md:flex-row md:align-center">
                  <div className="md:w-1/2">
                    <label className="block py-1" htmlFor="originUf">
                      Origem:
                    </label>
                    <div className="flex flex-col gap-3 md:flex-row">
                      <select
                        id="originUf"
                        className="border p-1 w-15 md:w-1/4"
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
                          className="border p-1 w-15 md:w-2/4"
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
                  <div className="md:w-1/2">
                    <label className="block py-1" htmlFor="destinationUf">
                      Destino
                    </label>
                    <div className="flex flex-col gap-3 md:flex-row">
                      <select
                        id="destinationUf"
                        className="border p-1 w-15 md:w-1/4"
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
                          className="border p-1 w-15 md:w-2/4"
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

                <div className="py-5 w-full flex justify-around m-auto md:w-1/2 md:justify-between">
                  <button
                    className=" rounded p-2 bg-red-600 text-white"
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setFormData(initialTrip);
                    }}
                  >
                    Cancelar
                  </button>

                  <button className="rounded p-2 bg-green-600 text-white" type="submit">
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-3">
          <h2 className="py-3 text-2xl font-semibold">Lista de viagens</h2>
          <div className="mb-10 overflow-auto">
            <table className="table-auto text-center border border-zinc-600 w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-4 py-2 whitespace-nowrap">Saída</th>
                  <th className="px-4 py-2 whitespace-nowrap">Retorno</th>
                  <th className="px-4 py-2 whitespace-nowrap">Origem</th>
                  <th className="px-4 py-2 whitespace-nowrap">Destino</th>
                  <th className="px-4 py-2 whitespace-nowrap">Nº ônibus</th>
                  <th className="px-4 py-2 whitespace-nowrap">Motorista</th>
                  <th className="px-4 py-2 whitespace-nowrap">Passageiros</th>
                  <th className="px-4 py-2 whitespace-nowrap">Detalhes</th>
                  <th className="px-4 py-2 whitespace-nowrap">Apagar</th>
                  <th className="px-4 py-2 whitespace-nowrap">Relatório</th>
                </tr>
              </thead>
              <tbody className="bg-neutral-200">
                {trips.map((trip, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-400 hover:cursor-pointer transition-all duration-300 ease-in-out"
                  >
                    <td className="py-2 px-3 border-y border-black whitespace-nowrap">{trip.departureDay.split('-').reverse().join('/')}</td>
                    <td className="py-2 px-3 border-y border-black whitespace-nowrap">{trip.returnDay.split('-').reverse().join('/')}</td>
                    <td className="py-2 px-3 border-y border-black whitespace-nowrap">{trip.originUf}</td>
                    <td className="py-2 px-3 border-y border-black whitespace-nowrap">{trip.destinationUf}</td>
                    <td className="py-2 px-3 border-y border-black whitespace-nowrap">{trip.busNumber}</td>
                    <td className="py-2 px-3 border-y border-black whitespace-nowrap">{trip.driver}</td>
                    <td className="py-2 px-3 border-y border-black whitespace-nowrap">
                      {trip.passengers.length} / {trip.busModel}
                    </td>
                    <td
                      onClick={() => {
                        localStorage.setItem('selectedTripIndex', `${index}`);
                        navigate('/viagem');
                      }}
                      className="relative overflow-hidden bg-green-700 place-self-start py-2 text-white font-semibold transition-all duration-300 ease-in-out before:absolute before:top-0 before:right-full before:bg-green-800 before:h-full before:w-full before:transition-all before:duration-300 before:ease-in-out hover:before:right-0 z-10"
                    >
                      <span className="relative z-20">Detalhes</span>
                    </td>
                    <td
                      onClick={() => handleDelete(index)}
                      className="relative overflow-hidden bg-red-700 place-self-start py-2 text-white font-semibold transition-all duration-300 ease-in-out before:absolute before:top-0 before:right-full before:bg-red-800 before:h-full before:w-full before:transition-all before:duration-300 before:ease-in-out hover:before:right-0 z-10"
                    >
                      <span className="relative z-20">Apagar</span>
                    </td>
                    <td
                      onClick={() => {
                        localStorage.setItem('selectedTripIndex', `${index}`);
                        setOpenReport(!isOpen);
                      }}
                      className="relative overflow-hidden bg-blue-500 place-self-start py-2 text-white font-semibold transition-all duration-300 ease-in-out before:absolute before:top-0 before:right-full before:bg-blue-600 before:h-full before:w-full before:transition-all before:duration-300 before:ease-in-out hover:before:right-0 z-10"
                    >
                      <span className="relative z-20">Relatório</span>
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
