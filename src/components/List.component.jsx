const List = ({
    filmsDataSearchResult,
    handleShowInfo,
    handleRemoveFilm,
}) => (
    <div>
        <h2>List of films:</h2>
        {!filmsDataSearchResult.length ? (
            <p>Data is empty</p>
        ) : (
            filmsDataSearchResult.map((film) => (
                <div
                    id={film.id}
                    key={film.id}
                    style={{
                        border: '1px solid #000',
                        margin: '10px 0',
                        padding: '5px',
                    }}
                >
                    <h3>{film.title}</h3>
                    <button onClick={() => handleShowInfo(film.id)}>
                        {film.showInfo
                            ? 'Hide info'
                            : 'Show more info'}
                    </button>
                    {
                        <div
                            className={film.showInfo ? '' : 'hidden'}
                        >
                            <h4>Info:</h4>
                            <p>Year: {film.year}</p>
                            <p>Format: {film.format}</p>
                            <p>
                                Stars:{' '}
                                {film.stars
                                    ? film.stars.join(', ')
                                    : ''}
                            </p>
                        </div>
                    }
                    <button onClick={() => handleRemoveFilm(film.id)}>
                        Remove film
                    </button>
                </div>
            ))
        )}
    </div>
);

export default List;
