import { useState } from 'react';

export const Seat: React.FC<SeatProps> = ({ id, width = 'w-11', height = 'h-9', sex, isPreferential, openModal }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const getBackgroundColor = () => {
    if (isPreferential) return 'bg-amber-500';
    if (sex === 'M') return 'bg-blue-950';
    if (sex === 'F') return 'bg-pink-600';
    return 'bg-green-700';
  };

  return (
    <div className="flex items-center justify-center">
      <button
        id={`${id}`}
        onClick={() => {
          handleClick();
          if (openModal) openModal();
        }}
        className={`${width} ${height} m-[.2rem] flex items-center justify-center text-white rounded-lg relative transform transition-transform duration-200 hover:scale-105 active:scale-95 hover:border-2 hover:border-white
        ${isClicked ? 'scale-95 opacity-80' : 'scale-100'}
        ${getBackgroundColor()}`}
      >
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-800 rounded-t-lg border-white border "
          style={{
            width: '80%',
            height: '20%',
          }}
        ></div>
        {id}
      </button>
    </div>
  );
};
