import Seats from '../Seats/Seats';

export function Bus40({ trip, openModal }: BusProps) {
  const upperDeckFirstColumn = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34, 37, 38];
  const upperDeckSecondColumn2 = [4, 3, 8, 7, 12, 11, 16, 15, 20, 19, 24, 23, 28, 27, 32, 31, 36, 35, 40, 39];

  return (
    <section className="flex max-sm:flex-col sticky top-0">
      {/* UPPER DECK SEATS */}
      <section className="flex flex-col items-center relative">
        <section className="max-w-[16rem] h-[35rem] ml-2 mr-2 mt-5 mb-2 flex flex-col rounded-t-3xl p-2 bg-neutral-300">
          <div className="w-full flex justify-between mb-6">
            <div className="w-[30px] h-[30px] m-[.2rem] ml-8 bg-gray-400 rounded-md"></div>
            <div className="w-[90px] h-[40px] m-[.2rem] bg-gray-400 self-end rounded-md"></div>
          </div>
          <section className="flex gap-7">
            {/* LEFT SIDE */}
            <section className="h-full flex-1 flex flex-wrap justify-center">
              {Array.from({ length: upperDeckFirstColumn.length }).map((_, index) => {
                const passenger = trip.passengers.find((p) => p.seat === upperDeckFirstColumn[index]);
                return (
                  <div key={upperDeckFirstColumn[index]}>
                    {passenger ? (
                      <Seats
                        sex={passenger.sex}
                        id={upperDeckFirstColumn[index]}
                        openModal={() => {
                          openModal(passenger, passenger.seat);
                        }}
                      />
                    ) : (
                      <Seats
                        id={upperDeckFirstColumn[index]}
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
            <section className="h-full flex-1 bg flex flex-wrap">
              {Array.from({ length: upperDeckSecondColumn2.length }).map((_, index) => {
                const passenger = trip.passengers.find((p) => p.seat === upperDeckSecondColumn2[index]);
                return (
                  <div key={upperDeckSecondColumn2[index]}>
                    {passenger ? (
                      <Seats
                        sex={passenger.sex}
                        id={upperDeckSecondColumn2[index]}
                        openModal={() => {
                          openModal(passenger, passenger.seat);
                        }}
                      />
                    ) : (
                      <Seats
                        id={upperDeckSecondColumn2[index]}
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
          <div className="w-[95px] h-[30px] m-[.2rem] bg-gray-400 self-end rounded-md mr-2 text-black text-xs font-semibold flex items-center justify-center">BANHEIRO</div>
        </section>

        <div className="w-64 h-12 bg-neutral-300 text-blue-800 flex items-center justify-center font-extrabold text-xl rounded-b-3xl"></div>
      </section>
    </section>
  );
}
