const Form = ({
    newFilm,
    handleSubmit,
    handleChange,
    handleSelect,
    inputErrors,
}) => (
    <form onSubmit={handleSubmit}>
        <h4>Add new film</h4>
        <div>
            <label htmlFor='title'>Title: </label>
            <input
                name='title'
                placeholder='Title'
                type='value'
                value={newFilm.title}
                onChange={handleChange}
            />
            <small>{inputErrors.titleError}</small>
        </div>
        <div>
            <label htmlFor='year'>Year: </label>
            <input
                name='year'
                placeholder='Year'
                type='number'
                pattern='[0-9]*'
                inputode='numeric'
                value={newFilm.year}
                onChange={handleChange}
            />
            <small>{inputErrors.yearError}</small>
        </div>
        <div>
            <label htmlFor='year'>Format: </label>
            <select value={newFilm.format} onChange={handleSelect}>
                <option value='DVD'>DVD</option>
                <option value='Blu-Ray'>Blu-Ray</option>
                <option value='VHS'>VHS</option>
            </select>
        </div>
        <div>
            <label htmlFor='stars'>Stars: </label>
            <input
                name='stars'
                placeholder='Enter through a comma'
                value={newFilm.stars}
                onChange={handleChange}
            />
            <small>{inputErrors.starsError}</small>
        </div>
        <button>Add film</button>
    </form>
);

export default Form;
