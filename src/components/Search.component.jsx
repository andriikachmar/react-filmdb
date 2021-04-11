const Search = ({ searchFilm, handleSearch }) => (
    <input
        name='search'
        placeholder='Search by Title or Star'
        type='value'
        value={searchFilm}
        onChange={handleSearch}
    />
);

export default Search;
