import { useState } from 'react';
import { ufs } from '../../helpers/Ufs';
import { Link } from 'react-router-dom';
import Seats from '../../components/Seats/Seats';
import { Bus43 } from '../../components/Bus/Bus43';
import { Header } from '../../components/Header/Header';

export function Trip() {
  const trips = JSON.parse(localStorage.getItem('trip') || '[]');
  const selectedIndex = localStorage.getItem('selectedTripIndex') || '[]';
  const selectedTrip: Trip = trips[selectedIndex];

  const [isOpen, setIsOpen] = useState(false);
  const [currentPassenger, setCurrentPassenger] = useState<Passenger>(
    selectedTrip.passengers[0]
  );

  const [cities, setCities] = useState({ origin: [], destination: [] });

  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  const fetchCities = async (uf: string) => {
    const response = await fetch(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`
    );
    const data = await response.json();
    return data;
  };

  const openModal = (passenger: Passenger, index: number) => {
    setCurrentPassengerIndex(index);
    setCurrentPassenger(passenger);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCurrentPassenger((prev) => {
      const updatedPassenger = { ...prev };

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

      setCurrentPassenger((prev) => ({ ...prev, [name]: value }));

      return updatedPassenger;
    });
  };

  return (
    <>
      <Header>
        <div className='py-3 relative mx-[10%]'>
          <Link
            to='/'
            className='absolute top-1/2 translate-y-[-50%] inline py-2 px-4 bg-white rounded-full text-black font-extrabold text-sm transform transition-transform duration-200 hover:scale-105 active:scale-95'
          >
            Voltar
          </Link>
          <h1 className='py-3 text-white font-extrabold text-center text-2xl'>
            Viagem
          </h1>
        </div>
      </Header>
      <div className='w-4/5 mx-auto'>
        {isOpen && (
          <div className='z-[20] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-2/4 bg-white p-4 rounded'>
              <div>
                <p>Poltrona: {currentPassenger.seat}</p>
                <label>Nome Completo:</label>
                <input
                  id='fullName'
                  type='text'
                  name='fullName'
                  maxLength={50}
                  value={currentPassenger.fullName.toUpperCase() || ''}
                  onChange={handleChange}
                  className='border p-1 w-full'
                />
                <label htmlFor='rg'>RG:</label>
                <input
                  id='rg'
                  type='text'
                  name='rg'
                  maxLength={11}
                  value={currentPassenger.rg.replace(/[^0-9]/g, '') || ''}
                  onChange={handleChange}
                  className='border p-1 w-full'
                />
                <label htmlFor='sex'>Sexo:</label>
                <select
                  id='sex'
                  name='sex'
                  value={currentPassenger.sex.toUpperCase() || ''}
                  onChange={handleChange}
                  className='border p-1 w-full'
                >
                  <option value='M'>Masculino</option>
                  <option value='F'>Feminino</option>
                </select>
                <label htmlFor='value'>Passagem:</label>
                <input
                  id='value'
                  type='number'
                  name='value'
                  maxLength={70}
                  value={
                    currentPassenger.value.toString().replace(/\D/g, '') || ''
                  }
                  onChange={handleChange}
                  className='border p-1 w-full'
                />
                <label htmlFor='escort'>Escolta:</label>
                <input
                  id='escort'
                  type='number'
                  name='escort'
                  maxLength={70}
                  value={
                    currentPassenger.escort.toString().replace(/\D/g, '') || ''
                  }
                  onChange={handleChange}
                  className='border p-1 w-full'
                />
                <label htmlFor='rg'>Observação:</label>
                <input
                  id='notes'
                  type='text'
                  name='notes'
                  maxLength={70}
                  value={currentPassenger.notes.toUpperCase() || ''}
                  onChange={handleChange}
                  className='border p-1 w-full'
                />
                <p>
                  Origem: {currentPassenger.origin.city} -{' '}
                  {currentPassenger.origin.uf}
                </p>
                <p>
                  Destino: {currentPassenger.destination.city} -{' '}
                  {currentPassenger.destination.uf}
                </p>
              </div>
              <p>Nova origem:</p>
              <select
                name='originUf'
                onChange={handleChange}
                value={currentPassenger.origin.uf}
              >
                <option value=''>Selecione a origem</option>
                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla}
                  </option>
                ))}
              </select>

              <select
                name='originCity'
                onChange={handleChange}
                value={currentPassenger.origin.city}
              >
                <option value=''>Selecione a cidade de origem</option>
                {cities.origin.map((city: City) => (
                  <option key={city.codigo_ibge} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>

              <p>Novo Destino:</p>
              <select
                name='destinationUf'
                onChange={handleChange}
                value={currentPassenger.destination.uf}
              >
                <option value=''>Selecione a origem</option>
                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla}
                  </option>
                ))}
              </select>

              <select
                name='destinationCity'
                onChange={handleChange}
                value={currentPassenger.destination.city}
              >
                <option value=''>Selecione a cidade de origem</option>
                {cities.destination.map((city: City) => (
                  <option key={city.codigo_ibge} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>

              <div>
                <button className='py-3 px-2 bg-red-500' onClick={closeModal}>
                  Fechar
                </button>

                <button
                  className='py-3  px-2 bg-green-600'
                  onClick={() => {
                    selectedTrip.passengers[currentPassengerIndex] =
                      currentPassenger;
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
        <div className='grid grid-cols-2'>
          <div>
            <div>
              <h1 className='py-2 mb-3 text-2xl text-neutral-900 font-extrabold'>
                Detalhes da Viagem:
              </h1>
              <div className=' p-4 mb-4 bg-neutral-200 rounded-xl w-max text-sm'>
                <p>
                  <span className='font-semibold'>Data de Saída: </span>
                  {selectedTrip.departureDay.split('-').reverse().join('/')}
                </p>
                <p>
                  <span className='font-semibold'>Data de Retorno: </span>
                  {selectedTrip.returnDay.split('-').reverse().join('/')}
                </p>
                <p>
                  <span className='font-semibold'>Nº Ônibus: </span>
                  {selectedTrip.busNumber}
                </p>
                <p>
                  <span className='font-semibold'>Assentos: </span>
                  {selectedTrip.busModel} lugares
                </p>
                <p>
                  <span className='font-semibold'>Motorista: </span>
                  {selectedTrip.driver}
                </p>
                <p>
                  <span className='font-semibold'>Equipe de Apoio: </span>
                  {selectedTrip.team}
                </p>
                <p>
                  <span className='font-semibold'>Origem: </span>
                  {selectedTrip.originCity} - {selectedTrip.originUf}
                </p>
                <p>
                  <span className='font-semibold'>Destino: </span>
                  {selectedTrip.destinationCity} - {selectedTrip.destinationUf}
                </p>
              </div>
            </div>

            <div>
              <h2 className='py-2 mb-3 mt-10 text-2xl text-neutral-900 font-extrabold'>
                Passageiros:
              </h2>
              <div className='h-[70vh] mb-10 overflow-y-auto max-w-[70%] scrollbar-custom'>
                {selectedTrip.passengers.map((passenger, index) => (
                  <div
                    onClick={() => openModal(passenger, index)}
                    className={`w-full flex justify-evenly py-2 ${
                      index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'
                    }`}
                    key={index}
                  >
                    <div>
                      <p>
                        <span className='font-semibold'>Nome: </span>
                        {passenger.fullName}
                      </p>
                      <p>
                        <span className='font-semibold'>RG: </span>
                        {passenger.rg}
                      </p>
                      <p>
                        <span className='font-semibold'>Origem: </span>
                        {passenger.origin.city} - {passenger.origin.uf}
                      </p>
                      <p>
                        <span className='font-semibold'>Destino: </span>
                        {passenger.destination.city} -{' '}
                        {passenger.destination.uf}
                      </p>
                    </div>
                    <Seats id={passenger.seat} sex={passenger.sex} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className='sticky top-5 mt-5'>
              <Bus43 trip={selectedTrip} />
              {/* <Bus64 trip={selectedTrip} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
