import { useEffect, useState } from "react";
import Seats from "../Seats/Seats";

export function Bus43() {
  const [UpperDeckLeftSeats, setUpperDeckLeftSeats] = useState<JSX.Element[]>(
    []
  );
  const [UpperDeckRightSeats, setUpperDeckRightSeats] = useState<JSX.Element[]>(
    []
  );
  const [UpperDeckTopRightSeats, setUpperDeckTopRightSeats] = useState<
    JSX.Element[]
  >([]);

  const [LowerDeckLeftSeats, setLowerDeckLeftSeats] = useState<JSX.Element[]>(
    []
  );
  const [LowerDeckRightSeats, setLowerDeckRightSeats] = useState<JSX.Element[]>(
    []
  );

  useEffect(() => {
    const seatsArray = Array.from({ length: 64 }, (_, index) => {
      const seatNumber = index + 1;
      const isPreferential = [13, 32, 33, 34].includes(seatNumber);
      return (
        <Seats key={index} id={seatNumber} isPreferential={isPreferential} />
      );
    });
    const upperDeckSeats = seatsArray.slice(0, 30);

    const upperLeftSeatNumbers = [
      1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15, 17, 18, 20, 21, 23, 24, 26, 27,
      29, 30,
    ];
    const upperDeckLeftSeats = [];
    for (const seatNumber of upperLeftSeatNumbers) {
      const seatIndex = seatNumber - 1;
      if (seatIndex < upperDeckSeats.length) {
        upperDeckLeftSeats.push(upperDeckSeats[seatIndex]);
      }
    }

    setUpperDeckLeftSeats(upperDeckLeftSeats);

    const rightSeats = [];
    for (let i = 13; i <= 31; i += 3) {
      rightSeats.push(seatsArray[i - 1]);
    }

    setUpperDeckRightSeats(rightSeats);

    const upperTopRightSeats = [];
    for (let i = 3; i <= 6; i += 3) {
      upperTopRightSeats.push(seatsArray[i - 1]);
    }
    setUpperDeckTopRightSeats(upperTopRightSeats);

    setLowerDeckLeftSeats(
      seatsArray.slice(31, 43).filter((_, index) => index % 3 < 2)
    );

    const lowerRightSeats = [];
    for (let i = 34; i < 41; i += 3) {
      lowerRightSeats.push(seatsArray[i - 1]);
    }
    setLowerDeckRightSeats(lowerRightSeats);
  }, []);

  return (
    <>
      <section className="flex max-sm:flex-col">
        {/* UPPER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <div className="absolute bg-neutral-700 top-[0.5rem] left-[1.6rem] w-[15rem] h-[6.25rem] rounded-full z-[-10] max-sm:hidden"></div>
          <section className="max-w-[16rem] h-[35rem] ml-5 mr-5 mt-5 mb-2 flex rounded-t-3xl p-2 bg-neutral-300">
            {/* LEFT SIDE */}
            <section className="h-full flex-1 flex flex-wrap justify-center">
              {UpperDeckLeftSeats.map((seat) => (
                <>{seat}</>
              ))}
            </section>

            {/* RIGHT SIDE */}
            <section className="h-full flex-1 bg flex flex-col flex-wrap gap-[1.3%] mt-2">
              {UpperDeckTopRightSeats.map((seat) => (
                <>{seat}</>
              ))}

              <div className="w-[80%] h-9 m-[.2rem] bg-neutral-400 text-blue-800 font-extrabold flex items-center justify-center">
                ESCADA
              </div>
              <div className="w-[80%] h-9 m-[.2rem] bg-neutral-400 text-blue-800 font-extrabold flex items-center justify-center">
                CAFETERIA
              </div>

              {UpperDeckRightSeats.map((seat) => (
                <>{seat}</>
              ))}
            </section>
          </section>
          <div className="w-64 h-12 bg-neutral-300 text-blue-800 flex items-center justify-center font-extrabold text-xl rounded-b-3xl">
            PISO SUPERIOR
          </div>
        </section>

        {/* LOWER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <div className="absolute bg-neutral-700 top-[0.5rem] left-[1.6rem] w-[15rem] h-[6.25rem] rounded-full z-[-10] max-sm:hidden"></div>
          <section className="max-w-[16rem] h-[35rem] ml-5 mr-5 mt-5 mb-2 flex rounded-t-3xl p-2 bg-neutral-300 flex-col">
            <div className="w-full flex justify-between px-10">
              <div className="w-[30px] h-[30px] m-[.2rem] bg-blue-600 rounded-md"></div>
              <div className="w-[30px] h-[30px] m-[.2rem] bg-blue-600 rounded-md"></div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="w-[100%] h-[6rem] bg-neutral-400 flex flex-col font-extrabold">
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-amber-500"></div>
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
                <div className="w-[40%] h-[4rem] bg-neutral-400 text-blue-800 flex items-center justify-center font-extrabold">
                  BANHEIRO
                </div>
                <div className="w-[60%] h-[4rem] bg-neutral-400 text-blue-800 flex items-center justify-center font-extrabold">
                  ENTRADA
                </div>
              </div>
            </div>

            <div className="flex h-[40%] m-2 pr-4 gap-5">
              {/* LEFT SIDE */}
              <section className="h-full flex flex-wrap justify-center">
                {LowerDeckLeftSeats.map((seat) => (
                  <>{seat}</>
                ))}
              </section>
              {/* RIGHT SIDE */}
              <section className="h-full flex flex-row-reverse flex-wrap justify-center">
                {LowerDeckRightSeats.map((seat) => (
                  <>{seat}</>
                ))}
              </section>
            </div>

            <div className="w-full h-[100px] bg-neutral-400 text-blue-800 flex items-center justify-center font-extrabold text-2xl">
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
