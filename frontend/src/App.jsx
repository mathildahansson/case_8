import { useState, useEffect } from 'react';
import MovieContainer from './assets/components/MovieContainer';
import ShowCard from './assets/components/ShowCard';
import Modal from './assets/components/Modal';
import BookingForm from './assets/components/BookingForm';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import './App.css';


  // Använd den miljövariabeln för att dynamiskt sätta backend-URL:en:
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log('Backend URL:', backendUrl); // Lägg till denna rad för att debugga



function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShows, setSelectedShows] = useState([]);
  const [bookingMessage, setBookingMessage] = useState('');
  const [selectedShow, setSelectedShow] = useState(null);



  useEffect(() => {
    fetch(`${backendUrl}/api/v1/movies`)
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Fel vid hämtning av filmer:', error));
  }, [backendUrl]);

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/shows`)
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error('Fel vid hämtning av shows:', error));
  }, [backendUrl]);

  const getShowsForMovie = (movieId) => {
    return shows.filter(show => show.movie._id === movieId);
  };

  const handleBookingSuccess = (message) => {
    setBookingMessage(message); // Uppdatera bokningsmeddelandet
  };

  const openModal = (movieId) => {
    const showsForMovie = getShowsForMovie(movieId);
    setSelectedShows(showsForMovie);
    setIsModalOpen(true);
    setSelectedShow(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShows([]);
    setSelectedShow(null);
    setBookingMessage(''); // Rensa bokningsmeddelandet när modalen stängs
  };

  return (
    <>
      <Header />
      {bookingMessage && <p className="booking-message">{bookingMessage}</p>}

      <MovieContainer movies={movies} openModal={openModal} />

      <Modal show={isModalOpen} onClose={closeModal}>
        {selectedShows.length > 0 && selectedShows.map(show => (
          <div key={show._id} className='show-card'>
            <ShowCard movie={show.movie} />
            
            {/* Här är detaljerna om showen i en 'details'-tagg */}
            <div className="show-card-info">
              <h3>Föreställning för: {show.movie.title}</h3>

              {/* Details för varje show */}
              <details>
                <summary>
                  {new Date(show.startTime).toLocaleDateString('sv-SE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  }).toUpperCase()},{' kl. '}
                  {new Date(show.startTime).toLocaleTimeString('sv-SE', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).toUpperCase()}
                </summary>

                {/* Placera alla platsrelaterade detaljer här */}
                <p><strong>Starttid:</strong> {new Date(show.startTime).toLocaleString()}</p>
                <p><strong>Sluttid:</strong> {new Date(show.endTime).toLocaleString()}</p>
                <p><strong>Salong:</strong> {show.roomNumber}</p>
                <p><strong>Pris per plats:</strong> {show.pricePerSeat} kr</p>
                
                {/* Lediga platser */}
                <p><strong>Lediga platser:</strong> {show.availableSeats.join(', ')}</p>

                {/* Bokade platser */}
                <p><strong>Bokade platser:</strong> {show.bookedSeats.join(', ')}</p>

                {/* Bokningsformuläret som ska visas för denna specifika show */}
                <BookingForm
                  selectedShow={show}
                  bookings={bookings}
                  onBookingSuccess={handleBookingSuccess}
                />
              </details>
            </div>
          </div>
        ))}
      </Modal>

      <Footer />
    </>
  );
}

export default App;
