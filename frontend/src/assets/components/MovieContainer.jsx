import MovieCard from './MovieCard'; 
import './MovieCard.css';
import './MovieContainer.css';

function MovieContainer({ movies, openModal, backendUrl }) {
    return (
        <div className="movie-container">
            <h2>Aktuella filmer:</h2>
            <div className="movies-list">
                {movies.map(movie => (
                    <MovieCard
                        key={movie._id}
                        title={movie.title}
                        description={movie.description}
                        releaseDate={movie.releaseDate}
                        posterUrl={movie.posterUrl}
                        genre={movie.genre}
                        onBook={() => openModal(movie._id)} // öppna modal med filmens id
                        backendUrl={backendUrl}  // Skickar backendUrl som prop till MovieCard
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieContainer;
