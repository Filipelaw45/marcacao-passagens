interface City {
  nome: string;
  codigo_ibge: string;
}

interface SeatProps {
  id: number;
  width?: string;
  height?: string;
  sex?: string;
  isPreferential?: boolean;
}

interface Passenger {
  seat: number;
  fullName: string;
  rg: string;
  sex: 'F' | 'M',
  origin: {
    city: string;
    uf: string;
  };
  destination: {
    city: string;
    uf: string;
  };
  notes: string;
  value: number;
  escort: number;
}

interface Trip {
  departureDay: string;
  returnDay: string;
  busModel: '40' | '42' | '64';
  busNumber: string;
  driver: string;
  team: string;
  originUf: string;
  originCity: string;
  destinationUf: string;
  destinationCity: string;
  passengers: Passenger[];
}
