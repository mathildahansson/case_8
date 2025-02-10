import { useState } from 'react';
import './ShowCard.css';
import BookingForm from './BookingForm';

function ShowCard({ movie, shows, onBookingSuccess, bookings }) {
    // releaseDate antas vara en sträng i formatet YYYY-MM-DD
    const { title, releaseDate, genre, description, director, duration, posterUrl } = movie;

    // lokal state för vald föreställning
    const [selectedShow, setSelectedShow] = useState(null);

    const [bookingInfo, setBookingInfo] = useState(null);

    // om releaseDate är en sträng i formatet YYYY-MM-DD, omvandla det till ett Date-objekt
    const releaseDateObj = new Date(releaseDate);

    // formatera datumet till DD-MM-YYYY
    const formattedDate = releaseDateObj.getDate().toString().padStart(2, '0') + '-' +
        (releaseDateObj.getMonth() + 1).toString().padStart(2, '0') + '-' +
        releaseDateObj.getFullYear();

    return (
        // "wrapper" för show-card
        <div className="show-card">

            <img src={posterUrl} alt={title} className="show-poster" />

            {/* filminformation: */}
            <div className="movie-info">

                {/* filmtitel */}
                <h3 id='movie-title'>{title}</h3>

                {/* specifik filminformation */}
                <div className="movie-spec-div">
                    {/* genre */}
                    <p className="movie-spec">
                        {genre}
                    </p>
                    {/* duration */}
                    <p className="movie-spec">
                        {duration} min
                    </p>
                    {/* director */}
                    <p className="movie-spec">
                        Regissör: {director}
                    </p>
                </div>

                <hr className='hr-movie' />

                {/* filmbeskrivning */}
                <p>{description}</p>

                {/* shows-div för bokning */}
                <div className="shows-to-book">
                    {/* föreställningar visas här */}
                    {shows.length > 0 && (
                        <div className="show-details">
                            {shows.map(show => (
                                <details
                                    key={show._id}
                                    className="show-item"
                                    onToggle={(e) => {
                                        if (e.target.open) {
                                            setSelectedShow(show); // sätt föreställningen när <details> öppnas
                                        } else {
                                            setSelectedShow(null); // nollställ om det stängs
                                        }
                                    }}
                                >
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

                                    {/* föreställningsinformation */}
                                    <div className="show-spec">
                                        <span><strong>Starttid:</strong> {new Date(show.startTime).toLocaleTimeString('sv-SE', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</span>
                                        <span><strong>Salong:</strong> {show.roomNumber}</span>
                                        <span><strong>Pris per plats:</strong> {show.pricePerSeat} kr</span>
                                    </div>

                                    {/* använd den valda föreställningen */}
                                    {selectedShow && selectedShow._id === show._id && (
                                        <>
                                            <BookingForm
                                                bookings={bookings}
                                                selectedShow={selectedShow}
                                                onSubmit={(message, bookingInfo) => {
                                                    onBookingSuccess(message, bookingInfo); // skicka bokningsmeddelandet och info till App.jsx
                                                }}
                                            />
                                        </>
                                    )}
                                </details>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        // </div>
    );
}

export default ShowCard;