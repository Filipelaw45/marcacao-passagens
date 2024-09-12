import Seats from '../Seats/Seats';

interface Bus43Props {
  trip: Trip;
}

export function Bus42({ trip }: Bus43Props) {
  const upperDeckFirstColumn = [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15, 17, 18, 20, 21, 23, 24, 26, 27, 29, 30];
  const upperDeckSecondColumn = [3, 6];
  const upperDeckSecondColumn2 = [13, 16, 19, 22, 25, 28, 31];
  const lowerDeckFirstColumn = [32, 33, 35, 36, 38, 39, 41, 42];
  const lowerDeckSecondColumn = [34, 37, 40];
  const preferentialSeats = [13, 32, 33, 34];

  return (
    <>
      <section className="flex max-sm:flex-col sticky top-0">
        {/* UPPER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <section className="max-w-[16rem] h-[35rem] ml-5 mr-5 mt-5 mb-2 flex rounded-t-3xl p-2 bg-neutral-300">
            {/* LEFT SIDE */}
            <section className="h-full flex-1 flex flex-wrap justify-center">
              {Array.from({ length: upperDeckFirstColumn.length }).map((_, index) => {
                const seatId = upperDeckFirstColumn[index];
                const isPreferential = preferentialSeats.includes(seatId);

                const passenger = trip.passengers.find((p) => p.seat === upperDeckFirstColumn[index]);
                return (
                  <div key={upperDeckFirstColumn[index]}>
                    {passenger ? (
                      <Seats sex={passenger.sex} id={upperDeckFirstColumn[index]} isPreferential={isPreferential} />
                    ) : (
                      <Seats id={upperDeckFirstColumn[index]} isPreferential={isPreferential} />
                    )}
                  </div>
                );
              })}
            </section>

            {/* RIGHT SIDE */}
            <section className="h-full flex-1 bg flex flex-col flex-wrap gap-[1.3%] mt-1">
              {Array.from({ length: upperDeckSecondColumn.length }).map((_, index) => {
                const isPreferential = preferentialSeats.includes(upperDeckSecondColumn[index]);
                const passenger = trip.passengers.find((p) => p.seat === upperDeckSecondColumn[index]);
                return (
                  <div key={upperDeckSecondColumn[index]}>
                    {passenger ? (
                      <Seats sex={passenger.sex} id={upperDeckSecondColumn[index]} isPreferential={isPreferential} />
                    ) : (
                      <Seats id={upperDeckSecondColumn[index]} isPreferential={isPreferential} />
                    )}
                  </div>
                );
              })}

              <div className="w-[80%] h-10 bg-sky-950 text-white text-xs font-bold flex items-center justify-center rounded-md">
                ESCADA
              </div>
              <div className="w-[80%] h-10 bg-sky-950 text-white text-xs font-bold flex items-center justify-center rounded-md">
                CAFETERIA
              </div>

              {Array.from({ length: upperDeckSecondColumn2.length }).map((_, index) => {
                const isPreferential = preferentialSeats.includes(upperDeckSecondColumn2[index]);
                const passenger = trip.passengers.find((p) => p.seat === upperDeckSecondColumn2[index]);
                return (
                  <div key={upperDeckSecondColumn2[index]}>
                    {passenger ? (
                      <Seats sex={passenger.sex} id={upperDeckSecondColumn2[index]} isPreferential={isPreferential} />
                    ) : (
                      <Seats id={upperDeckSecondColumn2[index]} isPreferential={isPreferential} />
                    )}
                  </div>
                );
              })}
            </section>
          </section>
          <div className="w-[85%] h-12 bg-neutral-700 text-white flex items-center justify-center font-extrabold text-xl rounded-b-3xl">
            PISO SUPERIOR
          </div>
        </section>

        {/* LOWER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <section className="max-w-[16rem] h-[35rem] ml-5 mr-5 mt-5 mb-2 flex rounded-t-3xl p-2 bg-neutral-300 flex-col">
            <div className="w-full flex justify-between px-10">
              <div className="w-[30px] h-[30px] m-[.2rem] bg-blue-600 rounded-md"></div>
              <div className="w-[30px] h-[30px] m-[.2rem] bg-blue-600 rounded-md"></div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="w-[100%] h-[6rem] bg-sky-950 flex flex-col font-bold place-content-center rounded-md">
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-amber-500 "></div>
                  <p className="text-sm text-white">PREFERENCIAL</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-green-700"></div>
                  <p className="text-sm text-white">DISPONÍVEL</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-blue-950"></div>
                  <p className="text-sm text-white">HOMEM (OCUPADO)</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-pink-600"></div>
                  <p className="text-sm text-white">MULHER (OCUPADO)</p>
                </div>
              </div>

              <div className="w-full flex justify-between gap-1">
                <div className="w-[40%] h-[4rem] bg-sky-950 text-white text-xs flex items-center justify-center font-bold rounded-md">
                  BANHEIRO
                </div>
                <div className="w-[60%] h-[4rem] bg-sky-950 text-white text-xs flex items-center justify-center font-bold rounded-md">
                  ENTRADA
                </div>
              </div>
            </div>

            <div className="flex h-[40%] m-2 pr-4 gap-5">
              {/* LEFT SIDE */}
              <section className="h-full flex flex-wrap justify-center">
                {Array.from({ length: lowerDeckFirstColumn.length }).map((_, index) => {
                  const isPreferential = preferentialSeats.includes(lowerDeckFirstColumn[index]);
                  const passenger = trip.passengers.find((p) => p.seat === lowerDeckFirstColumn[index]);
                  return (
                    <div key={lowerDeckFirstColumn[index]}>
                      {passenger ? (
                        <Seats sex={passenger.sex} id={lowerDeckFirstColumn[index]} isPreferential={isPreferential} />
                      ) : (
                        <Seats id={lowerDeckFirstColumn[index]} isPreferential={isPreferential} />
                      )}
                    </div>
                  );
                })}
              </section>
              {/* RIGHT SIDE */}
              <section className="h-full flex flex-row-reverse flex-wrap justify-center">
                {Array.from({ length: lowerDeckSecondColumn.length }).map((_, index) => {
                  const isPreferential = preferentialSeats.includes(lowerDeckSecondColumn[index]);
                  const passenger = trip.passengers.find((p) => p.seat === lowerDeckSecondColumn[index]);
                  return (
                    <div key={lowerDeckSecondColumn[index]}>
                      {passenger ? (
                        <Seats sex={passenger.sex} id={lowerDeckSecondColumn[index]} isPreferential={isPreferential} />
                      ) : (
                        <Seats id={lowerDeckSecondColumn[index]} isPreferential={isPreferential} />
                      )}
                    </div>
                  );
                })}
              </section>
            </div>

            <div className="w-full h-[100px] bg-sky-950 text-white flex items-center justify-center font-extrabold text-2xl rounded-md">
              BAGAGEIRO
            </div>
          </section>
          <div className="w-[85%] h-12 bg-neutral-700 text-white flex items-center justify-center font-extrabold text-xl rounded-b-3xl">
            PISO INFERIOR
          </div>
        </section>
      </section>
    </>
  );
}
