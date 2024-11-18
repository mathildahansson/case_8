import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Home from '/pages/Home';
import Login from '/pages/Login';

// import components
import MovieContainer from './assets/components/MovieContainer';
import ShowCard from './assets/components/ShowCard';
import Modal from './assets/components/Modal';
import BookingForm from './assets/components/BookingForm';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
// import MovieCard from './assets/components/MovieCard';

// import CSS
import './App.css'



function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState([]); // lägger till state för bokningar
  const [isModalOpen, setIsModalOpen] = useState(false); // hanterar modalens synlighet
  const [selectedShows, setSelectedShows] = useState([]); // hanterar vilken "show" som är vald för bokning
  const [bookingMessage, setBookingMessage] = useState(''); // state för bokningsmeddelande
  const [selectedShow, setSelectedShow] = useState(null); // state för vald show


  // fetch - movies
  useEffect(() => {
    fetch('https://cinema-api.henrybergstrom.com/api/v1/movies')
      .then(response => response.json())
      .then(data => {
        console.log(data); // logga data för att se om en film har ett unikt id
        setMovies(data);
      })
      .catch(error => {
        console.error('Fel vid hämtning av filmer:', error);
      });
  }, []);

  // fetch - shows
  useEffect(() => {
    fetch('https://cinema-api.henrybergstrom.com/api/v1/shows')
      .then(response => response.json())
      .then(data => {
        console.log('Shows:', data); // logga shows
        setShows(data);
      })
      .catch(error => {
        console.error('Fel vid hämtning av bookings:', error);
      });
  }, []);


  // gruppera visningar per film
  const getShowCountForMovie = (movieId) => {
    return shows.filter(show => show.movie._id === movieId).length;
  };

  // hämta alla shows för en specifik film
  const getShowsForMovie = (movieId) => {
    return shows.filter(show => show.movie._id === movieId);
  };

  // hantera bokningsdata
  const handleBookingSubmit = (bookingData) => {
    if (!selectedShow) {
      alert("Välj en föreställning först.");
      return;
    }

    fetch('https://cinema-api.henrybergstrom.com/api/v1/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bookingData,
        show: {
          _id: selectedShow._id,
          startTime: selectedShow.startTime,
          endTime: selectedShow.endTime,
          pricePerSeat: selectedShow.pricePerSeat,
          roomNumber: selectedShow.roomNumber,
        },
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Bokningen lyckades:', data);
        setBookings(prevBookings => [...prevBookings, data]);

        const updatedShow = {
          ...selectedShow,
          availableSeats: selectedShow.availableSeats.filter(seat => !bookingData.seats.includes(seat)),
          bookedSeats: [...selectedShow.bookedSeats, ...bookingData.seats],
        };
        setSelectedShow(updatedShow);
        setBookingMessage(`Bokningen lyckades! Email: ${bookingData.email}, Tider: ${new Date(updatedShow.startTime).toLocaleString()} - ${new Date(updatedShow.endTime).toLocaleString()}, Totalt pris: ${bookingData.totalPrice} kr.`);
        // stäng modalen om du vill
        closeModal();
      })
      .catch(error => {
        console.error('Fel vid bokning:', error);
      });
  };


  // funktion för att hantera val av föreställning
  const handleShowSelect = (show) => {
    setSelectedShow(show); // uppdatera med den valda föreställningen
  };

  // funktion - öppna modalen och visa alla shows för en film
  const openModal = (movieId) => {
    const showsForMovie = getShowsForMovie(movieId); // hämta alla shows för filmen
    setSelectedShows(showsForMovie); // spara dem i state
    setSelectedShow(null); // rensa tidigare vald show
    setIsModalOpen(true);
    setBookingMessage(''); // rensa bokningsmeddelande när modalen öppnas
  };

  // funktion - stänga modalen
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShows([]); // rensa valda shows när modalen stängs
    setSelectedShow(null); // rensa vald show
  };


  return (
    <>
      {/* hanterar olika sidor - pages */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>

      {/* header */}
      <Header />

      {/* visa bokningsmeddelandet om det finns */}
      {bookingMessage && <p className="booking-message">{bookingMessage}</p>}


      {/* visa alla movies från api */}
      <MovieContainer movies={movies} openModal={openModal} />


      {/* modal för att visa bokningsinformation */}
      <Modal show={isModalOpen} onClose={closeModal}>
        {selectedShows.length > 0 && (
          <div className='show-card'>

            {/* filminformation och bild */}
            <div className='show-card-info'>
              <ShowCard
                movie={selectedShows[0].movie}
                releaseDate={selectedShows[0].movie.releaseDate}
                posterUrl={selectedShows[0].movie.posterUrl}
                genre={selectedShows[0].movie.genre}
                description={selectedShows[0].movie.description}
              />
            </div>

            {/* info som tabell och show-spec */}
            <div className="show-card-info">
              <h3 id='show-h3'>Föreställningar för: {selectedShows[0].movie.title}</h3>

              {selectedShows.map(show => (
                <div key={show._id} className='show-spec'>
                  <details>
                    <summary onClick={() => handleShowSelect(show)}>
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
                    <br />
                    <p><strong>Starttid:</strong> {new Date(show.startTime).toLocaleString()}</p>
                    <p><strong>Sluttid:</strong> {new Date(show.endTime).toLocaleString()}</p>
                    <p><strong>Salong:</strong> {show.roomNumber}</p>
                    <p><strong>Pris:</strong> {show.pricePerSeat} kr</p>
                    <p><strong>Lediga platser:</strong> {show.availableSeats.join(', ')}</p>
                    <p><strong>Bokade platser:</strong> {show.bookedSeats.join(', ')}</p>

                    <BookingForm
                      bookings={bookings}
                      selectedShow={show} // skicka varje show individuellt
                      onSubmit={handleBookingSubmit} // använd den redan definierade funktionen här
                    />
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>


      {/* footer */}
      <Footer />
    </>
  );
}

export default App;