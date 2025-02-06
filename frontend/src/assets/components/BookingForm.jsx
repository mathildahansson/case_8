import { useState, useEffect } from 'react';
import './BookingForm.css';


// Hämta backend URL från miljövariabeln
const backendUrl = import.meta.env.VITE_BACKEND_URL;  // Här används import.meta.env istället för process.env



function BookingForm({ bookings, selectedShow, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(selectedShow?.availableSeats || []);

  useEffect(() => {
    // Uppdatera tillgängliga platser om selectedShow ändras
    if (selectedShow?.availableSeats) {
      setAvailableSeats(selectedShow.availableSeats);
    }
  }, [selectedShow]);

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
      alert('Vänligen välj minst en plats.'); // Meddelande om inga platser valda
      return;
    }

    const bookingData = {
      name,
      email,
      show: selectedShow._id, // Skicka endast ID till API:t
      seats: selectedSeats,
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

      // Uppdatera platser efter bokning
      setAvailableSeats((prevSeats) => prevSeats.filter((seat) => !selectedSeats.includes(seat)));
      setName('');
      setEmail('');
      setSelectedSeats([]);

      // Anropa onSubmit för att meddela föräldern om lyckad bokning
      if (onSubmit) {
        onSubmit(data);
      }
    } catch (error) {
      console.error('Kunde inte skicka bokningen:', error);
      alert('Något gick fel, vänligen försök igen.');
    }
  };

  const totalPrice = selectedSeats.length * (selectedShow.pricePerSeat || 0);

  return (
    <form onSubmit={handleSubmit}>
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

      <div>
        <p><strong>Välj platser:</strong></p>
        {availableSeats.map((seat) => (
          <label key={seat} className="seat-option">
            <input
              type="checkbox"
              checked={selectedSeats.includes(seat)}
              onChange={() => handleSeatChange(seat)}
            />
            {seat}
          </label>
        ))}
      </div>

      <p><strong>Totalpris:</strong> {totalPrice} kr</p>

      <button type="submit">Boka</button>
    </form>
  );
}

export default BookingForm;
