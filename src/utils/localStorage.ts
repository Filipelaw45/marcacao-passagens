export const createTrip = (formData: Trip) => {
  const trip = localStorage.getItem('trip');

  if (!trip) {
    localStorage.setItem('trip', JSON.stringify([formData]));
  } else {
    const trips = JSON.parse(trip);
    trips.push(formData);
    localStorage.setItem('trip', JSON.stringify(trips));
  }
};
