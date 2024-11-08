import './ShowCard.css';


function ShowCard({ movie, releaseDate, posterUrl, genre, description }) {

    // omvandlar till yyyy-mm-dd och tar bort tid
    const formattedDate = new Date(releaseDate).toISOString().split('T')[0];

    return (

        <div className="show-card">

            {/* filmposter */}
            <div className="show-card-img">
                <img src={posterUrl} alt={movie.title} className='show-poster' />
            </div>

            {/* tabellstruktur för filminformation */}

            <div className="show-card-table">
                <table>
                    <thead>

                        {/* filmtitel */}
                        <tr>
                            <th colSpan="2">
                                {movie.title}
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {/* Release date */}
                        <tr>
                            <td className='td-str'>Release datum:</td>
                            <td>{formattedDate}</td>
                        </tr>

                        {/* Genre */}
                        <tr>
                            <td className='td-str'>Genre:</td>
                            <td>{genre}</td>
                        </tr>

                        {/* Film description */}
                        <tr>
                            <td className='td-str'>Filmbeskrivning:</td>
                            <td>{description}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowCard;

