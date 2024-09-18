import { useState } from 'react';
import { ufs } from '../../helpers/Ufs';
import { Link } from 'react-router-dom';
import Seats from '../../components/Seats/Seats';
import { Bus64 } from '../../components/Bus/Bus64';
import { Header } from '../../components/Header/Header';
import { Bus42 } from '../../components/Bus/Bus42';
import { Bus40 } from '../../components/Bus/Bus40';

export function Trip() {
  const trips = JSON.parse(localStorage.getItem('trip') || '[]');
  const selectedIndex = localStorage.getItem('selectedTripIndex') || '[]';
  const selectedTrip: Trip = trips[selectedIndex];

  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  const initialPassenger: Passenger = {
    seat: currentPassengerIndex,
    fullName: '',
    rg: '',
    sex: 'F',
    origin: {
      city: '',
      uf: '',
    },
    destination: {
      city: '',
      uf: '',
    },
    notes: '',
    value: 0,
    escort: 0,
  };

  const [currentPassenger, setCurrentPassenger] = useState<Passenger>(initialPassenger);
  const [currentTrip, setCurrentTrip] = useState<Trip>(selectedTrip);
  const [isOpen, setIsOpen] = useState(false);
  const [editTrip, setEditTrip] = useState(false);
  const [cities, setCities] = useState({ origin: [], destination: [] });

  const fetchCities = async (uf: string) => {
    const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`);
    const data = await response.json();
    return data;
  };

  const openModal = (passenger: Passenger | null, index: number) => {
    setCurrentPassengerIndex(index);
    setCurrentPassenger(passenger ?? initialPassenger);
    setIsOpen(true);
  };

  const openEditTrip = () => {
    setEditTrip(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeEditTrip = () => {
    setEditTrip(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCurrentPassenger((prev) => {
      const updatedPassenger = { ...prev, [name]: value };

      if (name === 'originUf') {
        updatedPassenger.origin.uf = value;
        fetchCities(value).then((fetchedCities) => {
          setCities((prevCities) => ({ ...prevCities, origin: fetchedCities }));
        });
      }
      if (name === 'originCity') {
        updatedPassenger.origin.city = value;
      }
      if (name === 'destinationUf') {
        updatedPassenger.destination.uf = value;
        fetchCities(value).then((fetchedCities) => {
          setCities((prevCities) => ({
            ...prevCities,
            destination: fetchedCities,
          }));
        });
      }
      if (name === 'destinationCity') {
        updatedPassenger.destination.city = value;
      }

      return updatedPassenger;
    });
  };

  const handleTripChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCurrentTrip((prev) => {
      const updatedTrip = { ...prev, [name]: value };

      if (name === 'originUf') {
        updatedTrip.originUf = value;
        fetchCities(value).then((fetchedCities) => {
          setCities((prevCities) => ({ ...prevCities, origin: fetchedCities }));
        });
      }
      if (name === 'originCity') {
        updatedTrip.originCity = value;
      }
      if (name === 'destinationUf') {
        updatedTrip.destinationUf = value;
        fetchCities(value).then((fetchedCities) => {
          setCities((prevCities) => ({
            ...prevCities,
            destination: fetchedCities,
          }));
        });
      }
      if (name === 'destinationCity') {
        updatedTrip.destinationCity = value;
      }

      return updatedTrip;
    });
  };

  return (
    <>
      <Header>
        <div className="py-3 relative mx-[10%]">
          <Link
            to="/"
            className="absolute top-1/2 translate-y-[-50%] inline py-2 px-4 bg-white rounded-full text-black font-extrabold text-sm transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Voltar
          </Link>
          <h1 className="py-3 text-white font-extrabold text-center text-2xl">Viagem</h1>
        </div>
      </Header>
      {/* container pop-up */}
      <div className="w-4/5 mx-auto">
        {isOpen && (
          <div className="z-[20] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-3/4 h-6/7 px-8 py-3 bg-white rounded">
              <div>
                <div className="relative">
                  <h2 className="py-3 font-extrabold text-center text-2xl">Poltrona {currentPassengerIndex}</h2>
                  <button
                    className="absolute right-0 top-0 rounded p-2 bg-red-600 text-white"
                    onClick={() => {
                      const existingPassengerIndex = selectedTrip.passengers.findIndex(
                        (p) => p.seat === currentPassenger.seat
                      );

                      if (existingPassengerIndex !== -1) {
                        selectedTrip.passengers.splice(existingPassengerIndex, 1);
                        trips[selectedIndex] = selectedTrip;
                        localStorage.setItem('trip', JSON.stringify(trips));
                        closeModal();
                      }
                    }}
                  >
                    Apagar
                  </button>
                </div>
                <label className="font-semibold" htmlFor="fullName">
                  Nome Completo:
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  autoComplete="off"
                  maxLength={50}
                  value={currentPassenger.fullName}
                  className="border p-1 w-full"
                  onChange={handleChange}
                />
                <label className="font-semibold" htmlFor="rg">
                  RG:
                </label>
                <input
                  id="rg"
                  type="text"
                  autoComplete="off"
                  name="rg"
                  maxLength={11}
                  onChange={handleChange}
                  value={currentPassenger.rg.replace(/[^0-9]/g, '')}
                  className="border p-1 w-full"
                />
                <label className="font-semibold" htmlFor="sex">
                  Sexo:
                </label>
                <select
                  id="sex"
                  name="sex"
                  onChange={handleChange}
                  value={currentPassenger.sex || 'F'}
                  className="border p-1 w-full"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
                <label className="font-semibold" htmlFor="value">
                  Passagem:
                </label>
                <input
                  id="value"
                  type="number"
                  name="value"
                  autoComplete="off"
                  maxLength={70}
                  onChange={handleChange}
                  value={currentPassenger.value.toString().replace(/\D/g, '')}
                  className="border p-1 w-full"
                />
                <label className="font-semibold" htmlFor="escort">
                  Escolta:
                </label>
                <input
                  id="escort"
                  type="number"
                  name="escort"
                  autoComplete="off"
                  maxLength={70}
                  value={currentPassenger.escort.toString().replace(/\D/g, '')}
                  onChange={handleChange}
                  className="border p-1 w-full"
                />
                <label className="font-semibold" htmlFor="rg">
                  Observação:
                </label>
                <input
                  id="notes"
                  type="text"
                  name="notes"
                  autoComplete="off"
                  maxLength={70}
                  value={currentPassenger.notes}
                  onChange={handleChange}
                  className="border p-1 w-full"
                />
                <div className="flex py-3 gap-10">
                  <p>
                    <span className="font-semibold">Origem:</span> {currentPassenger.origin.city} -{' '}
                    {currentPassenger.origin.uf}
                  </p>
                  <p>
                    <span className="font-semibold">Destino:</span> {currentPassenger.destination.city} -{' '}
                    {currentPassenger.destination.uf}
                  </p>
                </div>
              </div>

              <div className="flex w-full justify-between">
                <div className="w-1/2">
                  <label className="block py-1 font-semibold" htmlFor="originUf">
                    Nova origem:
                  </label>
                  <div className="flex gap-3">
                    <select id="originUf" name="originUf" onChange={handleChange} value={currentPassenger.origin.uf}>
                      <option value="">Selecione a origem</option>
                      {ufs.map((uf) => (
                        <option key={uf.id} value={uf.sigla}>
                          {uf.sigla}
                        </option>
                      ))}
                    </select>

                    <select name="originCity" onChange={handleChange} value={currentPassenger.origin.city}>
                      <option value="">Selecione a cidade de origem</option>
                      {cities.origin.map((city: City) => (
                        <option key={city.codigo_ibge} value={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block py-1 font-semibold" htmlFor="destinationUf">
                    Novo Destino:
                  </label>
                  <div className="flex gap-3">
                    <select
                      id="destinationUf"
                      name="destinationUf"
                      onChange={handleChange}
                      value={currentPassenger.destination.uf}
                    >
                      <option value="">Selecione a origem</option>
                      {ufs.map((uf) => (
                        <option key={uf.id} value={uf.sigla}>
                          {uf.sigla}
                        </option>
                      ))}
                    </select>

                    <select name="destinationCity" onChange={handleChange} value={currentPassenger.destination.city}>
                      <option value="">Selecione a cidade de origem</option>
                      {cities.destination.map((city: City) => (
                        <option key={city.codigo_ibge} value={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3 w-1/2 flex justify-between m-auto">
                <button className="rounded p-2 bg-red-600 text-white" onClick={closeModal}>
                  Fechar
                </button>

                <button
                  className="rounded p-2 bg-green-600 text-white"
                  onClick={() => {
                    const passenger: Passenger = {
                      seat: currentPassengerIndex,
                      fullName: currentPassenger.fullName.toUpperCase(),
                      rg: currentPassenger.rg,
                      sex: currentPassenger.sex,
                      origin: {
                        city: currentPassenger.origin.city,
                        uf: currentPassenger.origin.uf,
                      },
                      destination: {
                        city: currentPassenger.destination.city,
                        uf: currentPassenger.destination.uf,
                      },
                      notes: currentPassenger.notes.toUpperCase(),
                      value: currentPassenger.value,
                      escort: currentPassenger.escort,
                    };

                    const existingPassengerIndex = selectedTrip.passengers.findIndex((p) => p.seat === passenger.seat);

                    if (existingPassengerIndex !== -1) {
                      selectedTrip.passengers[existingPassengerIndex] = passenger;
                    } else {
                      selectedTrip.passengers.push(passenger);
                    }

                    trips[selectedIndex] = selectedTrip;
                    localStorage.setItem('trip', JSON.stringify(trips));

                    closeModal();
                  }}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {editTrip && (
          <div className="z-[20] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-3/4 h-6/7 px-8 py-3 bg-white rounded">
              <div>
                <label className="font-semibold" htmlFor="departureDay">
                  Data de saída:
                </label>
                <input
                  id="departureDay"
                  type="date"
                  name="departureDay"
                  autoComplete="off"
                  maxLength={50}
                  value={currentTrip.departureDay}
                  className="border p-1 w-full"
                  onChange={handleTripChange}
                />
                <label className="font-semibold" htmlFor="returnDay">
                  Data de retorno:
                </label>
                <input
                  id="returnDay"
                  type="date"
                  name="returnDay"
                  autoComplete="off"
                  maxLength={50}
                  value={currentTrip.returnDay}
                  className="border p-1 w-full"
                  onChange={handleTripChange}
                />
                <label className="font-semibold" htmlFor="busNumber">
                  Nº Ônibus:
                </label>
                <input
                  id="busNumber"
                  name="busNumber"
                  onChange={handleTripChange}
                  value={currentTrip.busNumber}
                  className="border p-1 w-full"
                />
              </div>

              <label className="block py-1 font-semibold" htmlFor="busModel">
                Modelo do ônibus:
              </label>
              <select
                className="border p-1 w-full"
                value={currentTrip.busModel}
                id="busModel"
                name="busModel"
                onChange={handleTripChange}
              >
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

              <label className="block py-1 font-semibold" htmlFor="driver">
                Motorista:
              </label>
              <input
                className="border p-1 w-full"
                id="driver"
                name="driver"
                type="text"
                autoComplete="off"
                value={currentTrip.driver}
                onChange={handleTripChange}
              />

              <label className="block py-1 font-semibold" htmlFor="team">
                Equipe de apoio:
              </label>
              <input
                className="border p-1 w-full"
                id="team"
                name="team"
                type="text"
                autoComplete="off"
                value={currentTrip.team}
                onChange={handleTripChange}
              />

              <div className="flex w-full justify-between">
                <div className="w-1/2">
                  <label className="block py-1 font-semibold" htmlFor="originUf">
                    Nova origem:
                  </label>
                  <div className="flex gap-3">
                    <select id="originUf" name="originUf" onChange={handleTripChange} value={currentTrip.originUf}>
                      <option value="">Selecione a origem</option>
                      {ufs.map((uf) => (
                        <option key={uf.id} value={uf.sigla}>
                          {uf.sigla}
                        </option>
                      ))}
                    </select>

                    <select name="originCity" onChange={handleTripChange} value={currentTrip.originCity}>
                      <option value="">Selecione a cidade de origem</option>
                      {cities.origin.map((city: City) => (
                        <option key={city.codigo_ibge} value={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block py-1 font-semibold" htmlFor="destinationUf">
                    Novo Destino:
                  </label>
                  <div className="flex gap-3">
                    <select
                      id="destinationUf"
                      name="destinationUf"
                      onChange={handleTripChange}
                      value={currentTrip.destinationUf}
                    >
                      <option value="">Selecione a origem</option>
                      {ufs.map((uf) => (
                        <option key={uf.id} value={uf.sigla}>
                          {uf.sigla}
                        </option>
                      ))}
                    </select>

                    <select name="destinationCity" onChange={handleTripChange} value={currentTrip.destinationCity}>
                      <option value="">Selecione a cidade de origem</option>
                      {cities.destination.map((city: City) => (
                        <option key={city.codigo_ibge} value={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3 w-1/2 flex justify-between m-auto">
                <button className="rounded p-2 bg-red-600 text-white" onClick={closeEditTrip}>
                  Fechar
                </button>

                <button
                  className="rounded p-2 bg-green-600 text-white"
                  onClick={() => {
                    const updatedTrip: Trip = {
                      busNumber: currentTrip.busNumber,
                      departureDay: currentTrip.departureDay,
                      returnDay: currentTrip.returnDay,
                      busModel: currentTrip.busModel,
                      destinationCity: currentTrip.destinationCity,
                      destinationUf: currentTrip.destinationUf,
                      originCity: currentTrip.originCity,
                      originUf: currentTrip.originUf,
                      driver: currentTrip.driver,
                      passengers: currentTrip.passengers,
                      team: currentTrip.team,
                    };

                    trips[selectedIndex] = updatedTrip;
                    localStorage.setItem('trip', JSON.stringify(trips));
                    closeEditTrip();
                  }}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2">
          <div>
            <div className="flex gap-10">
              <div>
                <h1 className="py-2 text-2xl">Detalhes da Viagem</h1>
                <div className="bg-neutral-300 rounded-lg p-3 flex gap-7">
                  <div>
                    <p>
                      <span className="font-semibold">Data de Saída: </span>
                      {selectedTrip.departureDay.split('-').reverse().join('/')}
                    </p>
                    <p>
                      <span className="font-semibold">Data de Retorno: </span>
                      {selectedTrip.returnDay.split('-').reverse().join('/')}
                    </p>
                    <p>
                      <span className="font-semibold">Nº Ônibus: </span>
                      {selectedTrip.busNumber}
                    </p>
                    <p>
                      <span className="font-semibold">Assentos: </span>
                      {selectedTrip.busModel} lugares
                    </p>
                    <p>
                      <span className="font-semibold">Motorista: </span>
                      {selectedTrip.driver}
                    </p>
                    <p>
                      <span className="font-semibold">Equipe de Apoio: </span>
                      {selectedTrip.team}
                    </p>
                    <p>
                      <span className="font-semibold">Origem: </span>
                      {selectedTrip.originCity} - {selectedTrip.originUf}
                    </p>
                    <p>
                      <span className="font-semibold">Destino: </span>
                      {selectedTrip.destinationCity} - {selectedTrip.destinationUf}
                    </p>
                  </div>
                  <button
                    className="relative overflow-hidden bg-blue-700 place-self-start py-3 px-6 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out before:absolute before:top-0 before:right-full before:bg-blue-800 before:h-full before:w-full before:transition-all before:duration-300 before:ease-in-out hover:before:right-0 z-10"
                    onClick={openEditTrip}
                  >
                    <span className="relative z-20">Editar</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="py-2 mb-3 mt-10 text-2xl text-neutral-900 font-extrabold">Passageiros:</h2>
              <div className="h-[70vh] mb-10 overflow-y-auto max-w-[90%] scrollbar-custom">
                {selectedTrip.passengers.map((passenger, index) => (
                  <div
                    onClick={() => openModal(passenger, passenger.seat)}
                    className={`cursor-pointer w-full flex justify-between px-3 py-2 ${
                      index % 2 === 0 ? 'bg-gray-200 hover:bg-blue-200' : 'bg-gray-400 text-black hover:bg-blue-200'
                    }`}
                    key={index}
                  >
                    <div className="text-sm">
                      <p>
                        <span className="font-semibold">Nome: </span>
                        {passenger.fullName}
                      </p>
                      <p>
                        <span className="font-semibold">RG: </span>
                        {passenger.rg}
                      </p>
                      <p>
                        <span className="font-semibold">Origem: </span>
                        {passenger.origin.city} - {passenger.origin.uf}
                      </p>
                      <p>
                        <span className="font-semibold">Destino: </span>
                        {passenger.destination.city} - {passenger.destination.uf}
                      </p>
                    </div>
                    <Seats id={passenger.seat} sex={passenger.sex} width="w-[60px]" height="h-[60px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-5 mt-5 flex justify-center">
              {selectedTrip.busModel === '42' && <Bus42 openModal={openModal} trip={selectedTrip} />}
              {selectedTrip.busModel === '64' && <Bus64 openModal={openModal} trip={selectedTrip} />}
              {selectedTrip.busModel === '40' && <Bus40 openModal={openModal} trip={selectedTrip} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
