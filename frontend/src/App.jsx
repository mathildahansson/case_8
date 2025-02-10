import { useState, useEffect } from 'react';
import MovieContainer from './assets/components/MovieContainer';
import ShowCard from './assets/components/ShowCard';
import Modal from './assets/components/Modal';
// import BookingForm from './assets/components/BookingForm';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import './App.css';

// // Miljövariabeln för att dynamiskt sätta backend-URL:en:
const backendUrl = import.meta.env.VITE_BACKEND_URL;
// console.log('Backend URL:', backendUrl);

function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShows, setSelectedShows] = useState([]);
  const [bookingMessage, setBookingMessage] = useState('');
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);  // för att lagra den valda filmen

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

  const handleBookingSuccess = (message, bookingInfo) => {
    if (bookingInfo) {
      setBookingMessage(
        `Bokningen lyckades! \n\nNamn: ${bookingInfo.name}\nE-post: ${bookingInfo.email}\nFilm: ${bookingInfo.movieTitle}\nStarttid: ${new Date(bookingInfo.startTime).toLocaleString('sv-SE')}\nSalong: ${bookingInfo.roomNumber}\nAntal platser: ${bookingInfo.seats.join(', ')}\nTotalt pris: ${bookingInfo.totalPrice} kr`

      );
    } else {
      setBookingMessage('Bokningen lyckades!');
    }

    setIsModalOpen(false);
    setSelectedShows([]);
    setSelectedShow(null);

    // dölj meddelandet efter 5 sekunder
    setTimeout(() => {
      setBookingMessage('');
    }, 5000);
  };

  useEffect(() => {
    if (bookingMessage) {
      const timer = setTimeout(() => {
        setBookingMessage('');
      }, 5000); // meddelandet försvinner efter 5 sekunder
      return () => clearTimeout(timer);
    }
  }, [bookingMessage]);

  const openModal = (movieId) => {
    const movie = movies.find(movie => movie._id === movieId);
    const showsForMovie = getShowsForMovie(movieId);

    setSelectedMovie(movie);
    setSelectedShows(showsForMovie);
    setIsModalOpen(true);
    setSelectedShow(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShows([]);
    setSelectedShow(null);
    setBookingMessage(''); // rensa bokningsmeddelandet när modalen stängs
  };

  return (
    <>

        {/* bokningsmeddelande */}
        {bookingMessage && <p className="booking-message">{bookingMessage}</p>}

        <Header />

        <MovieContainer movies={movies} openModal={openModal} />

        <Modal show={isModalOpen} onClose={closeModal}>
          {selectedMovie && (
            <ShowCard
              movie={selectedMovie}
              shows={selectedShows}
              onBookingSuccess={handleBookingSuccess}
              bookings={bookings}
            />
          )}
        </Modal>

        <Footer />
    </>
  );
}

export default App;