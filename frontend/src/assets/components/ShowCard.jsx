import './ShowCard.css';

function ShowCard({ movie, releaseDate, posterUrl, genre, description, director, duration }) {

    // Här antas releaseDate vara en sträng i formatet YYYY-MM-DD
    const formattedDate = releaseDate || "Datum ej tillgängligt"; // Om releaseDate inte finns, använd fallback-text

    return (
        <div className="show-card">
            <div className="show-card-img">
                <img src={posterUrl} alt={movie.title} className="show-poster" />
            </div>

            <div className="show-card-table">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">{movie.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="td-str">Release datum:</td>
                            <td>{formattedDate}</td>
                        </tr>
                        <tr>
                            <td className="td-str">Genre:</td>
                            <td>{genre}</td>
                        </tr>
                        <tr>
                            <td className="td-str">Filmbeskrivning:</td>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <td className="td-str">Regissör:</td>
                            <td>{director}</td>
                        </tr>
                        <tr>
                            <td className="td-str">Längd:</td>
                            <td>{duration} minuter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowCard;
