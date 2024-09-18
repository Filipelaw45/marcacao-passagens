import * as XLSX from 'xlsx';

export function PrintTrip({ trip, handleClose }: { trip: Trip; handleClose: () => void }) {
  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    const data = [
      ['Saída', 'Retorno', 'Nº ônibus', 'Motorista', 'Passageiros'],
      [
        trip.departureDay.split('-').reverse().join('/'),
        trip.returnDay.split('-').reverse().join('/'),
        trip.busNumber,
        trip.driver,
        `${trip.passengers.length} / ${trip.busModel}`,
      ],
      [`Relatório ${trip.departureDay.split('-').reverse().join('/')}`],
      ['Assento', 'Nome', 'Cidade', 'uf', 'Passagem', 'Escolta', 'Volume', 'Frete'],
      ...trip.passengers
        .sort((a, b) => a.seat - b.seat)
        .map((passenger) => [
          passenger.seat,
          passenger.fullName,
          passenger.origin.city,
          passenger.origin.uf,
          `R$ ${passenger.value.toFixed(2)}`,
          `R$ ${passenger.escort.toFixed(2)}`,
          '', // Volume
          '', // Frete
        ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');

    XLSX.writeFile(wb, `${trip.departureDay.split('-').reverse().join('_')}_relatorio_viagem.xlsx`);
  };

  console.log(typeof trip.passengers[0].value);
  console.log(trip.passengers[0].value);
  
  return (
    <div className="z-[20] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="printable-area w-5/6 h-[85vh] px-8 py-3 bg-white rounded">
        <h1 className="text-center text-xl font-semibold my-3">
          Relatório {trip.departureDay.split('-').reverse().join('/')}
        </h1>
        <table className="table-auto text-center border border-zinc-600 w-full">
          <thead>
            <tr>
              <th className="border border-black bg-blue-400">Saída</th>
              <th className="border border-black bg-blue-400">Retorno</th>
              <th className="border border-black bg-blue-400">Nº ônibus</th>
              <th className="border border-black bg-blue-400">Motorista</th>
              <th className="border border-black bg-blue-400">Passageiros</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black">{trip.departureDay.split('-').reverse().join('/')}</td>
              <td className="border border-black">{trip.returnDay.split('-').reverse().join('/')}</td>
              <td className="border border-black">{trip.busNumber}</td>
              <td className="border border-black">{trip.driver}</td>
              <td className="border border-black">
                {trip.passengers.length} / {trip.busModel}
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-center text-xl font-semibold my-3">Passageiros</h2>
        <div className="overflow-auto h-[60%]">
          <table className="text-center w-full">
            <thead>
              <tr>
                <th className="border border-black bg-blue-400">Assento</th>
                <th className="border border-black bg-blue-400">Nome</th>
                <th className="border border-black bg-blue-400">Cidade</th>
                <th className="border border-black bg-blue-400">Passagem</th>
                <th className="border border-black bg-blue-400">Escolta</th>
              </tr>
            </thead>
            <tbody>
              {trip.passengers
                .sort((a, b) => a.seat - b.seat)
                .map((passenger, index) => (
                  <tr className="border border-black" key={index}>
                    <td className="border border-black px-3">{passenger.seat}</td>
                    <td className="border border-black max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {passenger.fullName}
                    </td>
                    <td className="border border-black max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {passenger.origin.city} - {passenger.origin.uf}
                    </td>
                  <td className="border border-black">R$ {`${passenger.value.toFixed(2)}`}</td>
                    <td className="border border-black">R$ {`${passenger.escort.toFixed(2)}`}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pt-4 w-1/2 flex justify-between m-auto">
          <button onClick={handleClose} className="bg-red-700 text-white px-4 py-2 rounded">
            Fechar
          </button>
          <button onClick={handleExport} className="bg-green-700 text-white px-4 py-2 rounded">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  );
}
