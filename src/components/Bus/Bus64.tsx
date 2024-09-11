import { useEffect, useState } from "react";
import Seats from "../Seats/Seats";

export function Bus64() {
  const [LowerDeckLeftSeats, setLowerDeckLeftSeats] = useState<JSX.Element[]>(
    []
  );
  const [LowerDeckRightSeats, setLowerDeckRightSeats] = useState<JSX.Element[]>(
    []
  );
  const [LowerDeckTopRightSeats, setLowerDeckTopRightSeats] = useState<
    JSX.Element[]
  >([]);

  const [UpperDeckRightSeats, setUpperDeckRightSeats] = useState<JSX.Element[]>(
    []
  );
  const [UpperDeckLeftSeats, setUpperDeckLeftSeats] = useState<JSX.Element[]>(
    []
  );

  useEffect(() => {
    const seatsArray = Array.from({ length: 64 }, (_, index) => {
      const seatNumber = index + 1;
      const isPreferential = [20, 19, 49, 50, 52, 51].includes(seatNumber);
      return (
        <Seats key={index} id={seatNumber} isPreferential={isPreferential} />
      );
    });
    setLowerDeckLeftSeats(
      seatsArray.slice(0, 46).filter((_, index) => {
        return index % 4 < 2 || index === 14 || index === 15;
      })
    );
    setLowerDeckRightSeats(
      seatsArray.slice(18, 48).filter((_, index) => index % 4 < 2)
    );
    setLowerDeckTopRightSeats(
      seatsArray.slice(2, 12).filter((_, index) => index % 4 < 2)
    );

    setUpperDeckRightSeats(
      seatsArray.slice(48, 62).filter((_, index) => index % 4 < 2)
    );
    setUpperDeckLeftSeats(
      seatsArray.slice(50).filter((_, index) => index % 4 < 2)
    );
  }, []);

  return (
    <>
      <section className="flex max-sm:flex-col">
        {/* UPPER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <div className="absolute bg-darkGray top-[0.5rem] left-[1.6rem] w-[15rem] h-[6.25rem] rounded-full z-[-10] max-sm:hidden"></div>
          <section className="max-w-[16rem] h-[35rem] ml-5 mr-5 mt-5 mb-2 flex rounded-t-3xl p-2 bg-secondaryBackground">
            {/* LEFT SIDE */}
            <section className="h-full flex-1 flex flex-wrap justify-center">
              {LowerDeckLeftSeats.map((seat) => (
                <>{seat}</>
              ))}
            </section>

            {/* RIGHT SIDE */}
            <section className="h-full flex-1 flex flex-row-reverse flex-wrap justify-center">
              {LowerDeckTopRightSeats.map((seat) => (
                <>{seat}</>
              ))}

              <div className="w-[80%] h-9 m-[.2rem] bg-lightGray text-blue-800 font-extrabold flex items-center justify-center">
                ESCADA
              </div>
              <div className="w-[80%] h-9 m-[.2rem] bg-lightGray text-blue-800 font-extrabold flex items-center justify-center">
                CAFETERIA
              </div>

              {LowerDeckRightSeats.map((seat) => (
                <>{seat}</>
              ))}
            </section>
          </section>
          <div className="w-64 h-12 bg-secondaryBackground text-blue-800 flex items-center justify-center font-extrabold text-xl rounded-b-3xl">
            PISO SUPERIOR
          </div>
        </section>

        {/* LOWER DECK SEATS */}
        <section className="flex flex-col items-center relative">
          <div className="absolute bg-darkGray top-[0.5rem] left-[1.6rem] w-[15rem] h-[6.25rem] rounded-full z-[-10] max-sm:hidden"></div>
          <section className="max-w-[16rem] h-[35rem] ml-5 mr-5 mt-5 mb-2 flex rounded-t-3xl p-2 bg-secondaryBackground flex-col">
            <div className="w-full flex justify-between px-10">
              <div className="w-[30px] h-[30px] m-[.2rem] bg-blue-600 rounded-md"></div>
              <div className="w-[30px] h-[30px] m-[.2rem] bg-blue-600 rounded-md"></div>
            </div>

            <div className="flex flex-col gap-1">
              
              <div className="w-[100%] h-[6rem] bg-lightGray flex flex-col font-extrabold">
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-yellow-700"></div>
                  <p>PREFERENCIAL</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-avaible"></div>
                  <p>DISPONÍVEL</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-secondaryBlue"></div>
                  <p>HOMEM (OCUPADO)</p>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-4 h-4 bg-pink-500"></div>
                  <p>MULHER (OCUPADO)</p>
                </div>
              </div>

              <div className="w-full flex justify-between gap-1">
                <div className="w-[40%] h-[4rem] bg-lightGray text-blue-800 flex items-center justify-center font-extrabold">
                  BANHEIRO
                </div>
                <div className="w-[60%] h-[4rem] bg-lightGray text-blue-800 flex items-center justify-center font-extrabold">
                  ENTRADA
                </div>
              </div>
            </div>

            <div className="flex h-[40%] justify-center m-[.5rem] gap-5">
              {/* RIGHT SIDE */}
              <section className="h-full flex flex-wrap justify-center">
                {UpperDeckRightSeats.map((seat) => (
                  <>{seat}</>
                ))}
              </section>
              {/* LEFT SIDE */}
              <section className="h-full flex flex-row-reverse flex-wrap justify-center">
                {UpperDeckLeftSeats.map((seat) => (
                  <>{seat}</>
                ))}
              </section>
            </div>

            <div className="w-full h-[100px] bg-lightGray text-blue-800 flex items-center justify-center font-extrabold text-2xl">
              BAGAGEIRO
            </div>
          </section>
          <div className="w-64 h-12 bg-secondaryBackground text-blue-800 flex items-center justify-center font-extrabold text-xl rounded-b-3xl">
            PISO INFERIOR
          </div>
        </section>
      </section>
    </>
  );
}
