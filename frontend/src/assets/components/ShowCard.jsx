import './ShowCard.css';

function ShowCard({ movie }) {
    // Här antas releaseDate vara en sträng i formatet YYYY-MM-DD
    const { title, releaseDate, genre, description, director, duration, posterUrl } = movie;

    // Om releaseDate är en sträng i formatet YYYY-MM-DD, omvandla det till ett Date-objekt
    const releaseDateObj = new Date(releaseDate);

    // Formatera datumet till DD-MM-YYYY
    const formattedDate = releaseDateObj.getDate().toString().padStart(2, '0') + '-' +
        (releaseDateObj.getMonth() + 1).toString().padStart(2, '0') + '-' +
        releaseDateObj.getFullYear();

    return (
        <div className="show-card">
            <div className="show-card-img">
                <img src={posterUrl} alt={title} className="show-poster" />
            </div>

            <div className="show-card-table">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">{title}</th>
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
