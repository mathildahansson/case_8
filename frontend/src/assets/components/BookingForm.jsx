import { useState, useEffect } from 'react';
import './BookingForm.css';

// Hhmta backend URL från miljövariabeln
const backendUrl = import.meta.env.VITE_BACKEND_URL;  // här används import.meta.env istället för process.env

function BookingForm({ bookings, selectedShow, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  // const [availableSeats, setAvailableSeats] = useState(selectedShow?.availableSeats || []);
  const [bookedSeats, setBookedSeats] = useState(selectedShow?.bookedSeats || []);
  const [availableSeats, setAvailableSeats] = useState(
    selectedShow?.availableSeats.filter((seat) => !bookedSeats.includes(seat)) || []
  );

  useEffect(() => {
    if (selectedShow?.availableSeats && bookedSeats) {
      // hämta tillgängliga platser genom att ta bort de bokade platserna från listan
      setAvailableSeats(
        selectedShow.availableSeats.filter(seat => !bookedSeats.includes(seat))
      );
    }
  }, [selectedShow, bookedSeats]);

  if (!selectedShow || !Array.isArray(selectedShow.availableSeats) || selectedShow.availableSeats.length === 0) {
    return <p>Inga platser tillgängliga för denna föreställning.</p>;
  }

  const handleSeatChange = (seat) => {
    setSelectedSeats((prevSelected) => {
      const updatedSeats = prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat];
      return updatedSeats;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedSeats.length === 0) {
      alert('Vänligen välj minst en plats.');
      return;
    }

    const bookingData = {
      name,
      email,
      movieTitle: selectedShow.movieTitle,
      show: selectedShow._id,
      roomNumber: selectedShow.roomNumber,
      seats: selectedSeats,
      startTime: selectedShow.startTime,
      bookingTime: new Date().toLocaleString(),
      totalPrice: selectedSeats.length * selectedShow.pricePerSeat,
    };

    try {
      const response = await fetch(`${backendUrl}/api/v1/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`Fel vid bokning: ${response.statusText}`);
      }

      const data = await response.json();

      // uppdatera platser efter bokning
      setAvailableSeats((prevSeats) => prevSeats.filter((seat) => !selectedSeats.includes(seat)));
      setName('');
      setEmail('');
      setSelectedSeats([]);

      // skicka tillbaka hela 'bookingData' till ShowCard
      if (onSubmit) {
        onSubmit('Bokningen lyckades! 🎉', bookingData);
      }
    } catch (error) {
      console.error('Kunde inte skicka bokningen:', error);
      alert('Något gick fel, vänligen försök igen.');
    }
  };

  const totalPrice = selectedSeats.length * (selectedShow.pricePerSeat || 0);

  // 2D-array som representerar 4 rader och 8 platser
  const seatRows = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
  ];

  return (
    <form onSubmit={handleSubmit} className='booking-form'>

      <p><strong>Välj platser:</strong></p>
      <div className="salong">
        {/* <div className="seat-container"> */}

        {/* film-screen*/}
        <div className="film-screen"><p>Filmduk</p></div>
        <div className="seat-container">

          {seatRows.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat) => {
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (

                  <div
                    key={seat}
                    className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => !isBooked && handleSeatChange(seat)}
                  >
                    {seat}
                  </div>
                );

              })}

            </div>
          ))}
        </div>

      </div>

      <p className='total-price'><strong>Totalpris:</strong> {totalPrice} kr</p>

      <hr />

      <div className="booking-inputs">
        <label>
          Namn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          E-post:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <button type="submit">Boka</button>
    </form>
  );
}

export default BookingForm;
