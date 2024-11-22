import { useState } from 'react';
import './BookingForm.css';

function BookingForm({ bookings, selectedShow, onSubmit }) {
    const [email, setEmail] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);

    console.log(selectedShow); // logga för felsök



    const handleSeatChange = (seat) => {
        setSelectedSeats(prevSelected => {
            if (prevSelected.includes(seat)) {
                return prevSelected.filter(s => s !== seat); // avmarkera plats
            } else {
                return [...prevSelected, seat]; // markera plats
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedSeats.length === 0) {
            alert('Vänligen välj minst en plats.'); // meddelande om inga platser valda
            return;
        }

        const bookingData = {
            email,
            show: {
                _id: selectedShow._id, // skicka hela show-objektet för att få mer information
                startTime: selectedShow.startTime,
                endTime: selectedShow.endTime,
                pricePerSeat: selectedShow.pricePerSeat,
                roomNumber: selectedShow.roomNumber,
            },
            seats: selectedSeats,
            bookingTime: new Date().toLocaleString(),
            totalPrice: selectedSeats.length * selectedShow.pricePerSeat,
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error(`Fel vid bokning: ${response.statusText}`);
            }

            const result = await response.json();
            alert('Bokning lyckades!');
            setEmail('');
            setSelectedSeats([]);
            console.log('Bokningsresultat:', result);
        } catch (error) {
            console.error('Kunde inte skicka bokningen:', error);
            alert('Något gick fel, vänligen försök igen.');
        }
        // onSubmit(bookingData); // skicka bokningsdata till föräldern
    };

    // kontrollera om selectedShow finns och har tillgängliga platser
    if (!selectedShow || !Array.isArray(selectedShow.availableSeats) || selectedShow.availableSeats.length === 0) {
        return <p>Inga platser tillgängliga för denna föreställning.</p>;
    }

    // beräkna totalpris med säkerhetskontroll
    const totalPrice = selectedSeats.length * (selectedShow.pricePerSeat || 0);

    return (
        <form onSubmit={handleSubmit}>
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
                {selectedShow.availableSeats.map((seat) => (
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


            {/* totalprisberäkning och visning */}
            <p><strong>Totalpris:</strong> {totalPrice} kr</p>


            <button type="submit">Boka</button>
        </form>
    );
}

export default BookingForm;