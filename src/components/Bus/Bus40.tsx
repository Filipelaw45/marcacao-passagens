import Seats from '../Seats/Seats';

export function Bus40({ trip, openModal }: BusProps) {
  const upperDeckFirstColumn = [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15, 17, 18, 20, 21, 23, 24, 26, 27, 29, 30];
  const upperDeckSecondColumn = [3, 6];
  const upperDeckSecondColumn2 = [13, 16, 19, 22, 25, 28, 31];
  const lowerDeckFirstColumn = [32, 33, 35, 36, 38, 39];
  const lowerDeckSecondColumn = [34, 37, 40];
  const preferentialSeats = [13, 32, 33, 34];

  return (
    <>
      <section className="flex max-sm:flex-col sticky top-0">
        {/* UPPER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <section className="max-w-[16rem] h-[35rem] ml-2 mr-2 mt-5 mb-2 flex rounded-t-3xl p-2 bg-neutral-300">
            {/* LEFT SIDE */}
            <section className="h-full flex-1 flex flex-wrap justify-center">
              {Array.from({ length: upperDeckFirstColumn.length }).map((_, index) => {
                const isPreferential = preferentialSeats.includes(upperDeckFirstColumn[index]);
                const passenger = trip.passengers.find((p) => p.seat === upperDeckFirstColumn[index]);
                return (
                  <div key={upperDeckFirstColumn[index]}>
                    {passenger ? (
                      <Seats
                        sex={passenger.sex}
                        id={upperDeckFirstColumn[index]}
                        isPreferential={isPreferential}
                        openModal={() => {
                          openModal(passenger, passenger.seat);
                        }}
                      />
                    ) : (
                      <Seats
                        id={upperDeckFirstColumn[index]}
                        isPreferential={isPreferential}
                        openModal={() => {
                          openModal(null, upperDeckFirstColumn[index]);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </section>

            {/* RIGHT SIDE */}
            <section className="h-full flex-1 bg flex flex-col flex-wrap gap-[1.3%]">
              {Array.from({ length: upperDeckSecondColumn.length }).map((_, index) => {
                const isPreferential = preferentialSeats.includes(upperDeckSecondColumn[index]);
                const passenger = trip.passengers.find((p) => p.seat === upperDeckSecondColumn[index]);
                return (
                  <div key={upperDeckSecondColumn[index]}>
                    {passenger ? (
                      <Seats
                        sex={passenger.sex}
                        id={upperDeckSecondColumn[index]}
                        isPreferential={isPreferential}
                        openModal={() => {
                          openModal(passenger, passenger.seat);
                        }}
                      />
                    ) : (
                      <Seats
                        id={upperDeckSecondColumn[index]}
                        isPreferential={isPreferential}
                        openModal={() => {
                          openModal(null, upperDeckSecondColumn[index]);
                        }}
                      />
                    )}
                  </div>
                );
              })}

              <div className="w-[80%] h-9 bg-gray-400 text-black text-xs font-semibold flex items-center justify-center rounded-md m-[.2rem]">
                ESCADA
              </div>
              <div className="w-[80%] h-9 bg-gray-400 text-black text-xs font-semibold flex items-center justify-center rounded-md m-[.2rem]">
                GELADEIRA
              </div>

              {Array.from({ length: upperDeckSecondColumn2.length }).map((_, index) => {
                const isPreferential = preferentialSeats.includes(upperDeckSecondColumn2[index]);
                const passenger = trip.passengers.find((p) => p.seat === upperDeckSecondColumn2[index]);
                return (
                  <div key={upperDeckSecondColumn2[index]}>
                    {passenger ? (
                      <Seats
                        sex={passenger.sex}
                        id={upperDeckSecondColumn2[index]}
                        isPreferential={isPreferential}
                        openModal={() => {
                          openModal(passenger, passenger.seat);
                        }}
                      />
                    ) : (
                      <Seats
                        id={upperDeckSecondColumn2[index]}
                        isPreferential={isPreferential}
                        openModal={() => {
                          openModal(null, upperDeckSecondColumn2[index]);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </section>
          </section>
          <div className="w-64 h-12 bg-neutral-300 text-blue-800 flex items-center justify-center font-extrabold text-xl rounded-b-3xl">
            PISO SUPERIOR
          </div>
        </section>

        {/* LOWER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <section className="max-w-[16rem] h-[35rem] ml-2 mr-2 mt-5 mb-2 flex rounded-t-3xl p-2 bg-neutral-300 flex-col">
            <div className="w-full flex justify-between px-10">
              <div className="w-[30px] h-[30px] m-[.2rem] bg-gray-400 rounded-md"></div>
              <div className="w-[30px] h-[30px] m-[.2rem] bg-gray-400 rounded-md"></div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="w-[100%] h-[6rem] bg-gray-400 flex flex-col font-semibold text-black text-sm place-content-center rounded-md">
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-amber-500 "></div>
                  <p>PREFERENCIAL</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-green-700"></div>
                  <p>DISPONÍVEL</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-blue-950"></div>
                  <p>HOMEM (OCUPADO)</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-pink-600"></div>
                  <p>MULHER (OCUPADO)</p>
                </div>
              </div>

              <div className="w-full flex justify-between gap-1">
                <div className="w-[40%] h-[4rem] bg-gray-400 text-black text-xs flex items-center justify-center font-semibold rounded-md">
                  BANHEIRO
                </div>
                <div className="w-[60%] h-[4rem] bg-gray-400 text-black text-xs flex items-center justify-center font-semibold rounded-md">
                  ENTRADA
                </div>
              </div>
            </div>

            <div className="flex h-[30%] pr-4 gap-2">
              {/* LEFT SIDE */}
              <section className="h-full flex flex-wrap justify-center">
                {Array.from({ length: lowerDeckFirstColumn.length }).map((_, index) => {
                  const isPreferential = preferentialSeats.includes(lowerDeckFirstColumn[index]);
                  const passenger = trip.passengers.find((p) => p.seat === lowerDeckFirstColumn[index]);
                  return (
                    <div key={lowerDeckFirstColumn[index]}>
                      {passenger ? (
                        <Seats
                          sex={passenger.sex}
                          id={lowerDeckFirstColumn[index]}
                          isPreferential={isPreferential}
                          openModal={() => {
                            openModal(passenger, passenger.seat);
                          }}
                        />
                      ) : (
                        <Seats
                          id={lowerDeckFirstColumn[index]}
                          isPreferential={isPreferential}
                          openModal={() => {
                            openModal(null, lowerDeckFirstColumn[index]);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </section>
              {/* RIGHT SIDE */}
              <section className="h-[166px] flex flex-row-reverse flex-wrap justify-center">
                {Array.from({ length: lowerDeckSecondColumn.length }).map((_, index) => {
                  const isPreferential = preferentialSeats.includes(lowerDeckSecondColumn[index]);
                  const passenger = trip.passengers.find((p) => p.seat === lowerDeckSecondColumn[index]);
                  return (
                    <div key={lowerDeckSecondColumn[index]}>
                      {passenger ? (
                        <Seats
                          sex={passenger.sex}
                          id={lowerDeckSecondColumn[index]}
                          isPreferential={isPreferential}
                          openModal={() => {
                            openModal(passenger, passenger.seat);
                          }}
                        />
                      ) : (
                        <Seats
                          id={lowerDeckSecondColumn[index]}
                          isPreferential={isPreferential}
                          openModal={() => {
                            openModal(null, lowerDeckSecondColumn[index]);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </section>
            </div>

            <div className="w-full h-[150px] bg-gray-400 text-black flex items-center justify-center font-semibold text-2xl rounded-md">
              BAGAGEIRO
            </div>
          </section>
          <div className="w-64 h-12 bg-neutral-300 text-blue-800 flex items-center justify-center font-extrabold text-xl rounded-b-3xl">
            PISO INFERIOR
          </div>
        </section>
      </section>
    </>
  );
}
