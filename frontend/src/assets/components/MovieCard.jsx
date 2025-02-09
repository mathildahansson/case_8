import './MovieCard.css';

function MovieCard({ title, posterUrl, onBook }) {
  // console.log("Poster URL:", posterUrl); // debugging
  return (
    <div className="movie-card">

      {/* bild med hover-titel */}
      <div className="image-container">
      <img src={`${posterUrl}`} alt={title} className="movie-image" />

      {/* titel som visas vid hover */}
        <div className="movie-title-hover">
          <h3 id='h3-hover-title'>{title}</h3>
          <button onClick={onBook} className='btn-book'>Boka</button> {/* onClick för att öppna modalen */}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;