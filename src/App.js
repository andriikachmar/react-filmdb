import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button.component';
import Form from './components/Form.component';
import List from './components/List.component';
import Search from './components/Search.component';
import filmService from './services/films';

const App = () => {
    const newFilmInitialstate = {
        title: '',
        year: '',
        format: 'DVD',
        stars: '',
    };
    const validErrorInitialstate = {
        titleError: '',
        yearError: '',
        starsError: '',
    };

    const [searchFilm, setSearchFilm] = useState('');
    const [sortType, setSortType] = useState('asc');
    const [showAllInfo, setShowAllInfo] = useState(false);
    const [newFilm, setNewFilm] = useState(newFilmInitialstate);
    const [inputErrors, setInputErrors] = useState(
        validErrorInitialstate,
    );
    const [filmsData, setFilmsData] = useState([]);

    useEffect(() => {
        filmService.getAll().then((initialFilms) => {
            initialFilms.map((film) => (film.showInfo = false));
            setFilmsData(initialFilms);
        });
    }, []);

    const handleSearch = (event) => {
        setSearchFilm(event.target.value);
    };

    const filmsDataSearchResult = !searchFilm
        ? filmsData
        : filmsData.filter(
              (film) =>
                  film.title
                      .toLowerCase()
                      .includes(searchFilm.toLocaleLowerCase()) ||
                  film.stars.some((star) =>
                      star
                          .toLowerCase()
                          .includes(searchFilm.toLocaleLowerCase()),
                  ),
          );

    const handleSort = () => {
        let copiedFilmsData = filmsData;

        if (sortType === 'asc') {
            copiedFilmsData = copiedFilmsData.sort((a, b) =>
                b.title.localeCompare(a.title),
            );
            setSortType('desc');
        } else {
            copiedFilmsData = copiedFilmsData.sort((a, b) =>
                a.title.localeCompare(b.title),
            );
            setSortType('asc');
        }

        setFilmsData(copiedFilmsData);
    };

    const handleShowAll = () => {
        let copiedFilmsData = filmsData;

        copiedFilmsData.map(
            (film) => (film.showInfo = !showAllInfo ? true : false),
        );

        setFilmsData(copiedFilmsData);
        setShowAllInfo(!showAllInfo);
    };

    const handleShowInfo = (id) => {
        setFilmsData(
            filmsData.map((film) =>
                film.id === id
                    ? { ...film, showInfo: !film.showInfo }
                    : film,
            ),
        );
    };

    const handleRemoveFilm = (id) => {
        filmService.remove(id).then((returnedFilm) => {
            setFilmsData(filmsData.filter((film) => film.id !== id));
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNewFilm({
            ...newFilm,
            [name]: value,
        });
    };

    const handleSelect = (event) => {
        setNewFilm({
            ...newFilm,
            format: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { title, year, format, stars } = newFilm;

        let { titleError, yearError, starsError } = '';

        if (!title) {
            titleError = 'Please, enter a title';
        }
        if (year < 1800 || year > new Date().getFullYear()) {
            yearError = 'Please, enter a valid year';
        }
        if (!stars) {
            starsError = 'Please, enter a star';
        }

        if (titleError || yearError || starsError) {
            setInputErrors({
                ...inputErrors,
                titleError,
                yearError,
                starsError,
            });
            return false;
        }
        const splittedStars = stars.split(',');
        const filmObject = {
            title,
            year,
            format,
            stars: splittedStars,
        };

        filmService.create(filmObject).then((returnedFilm) => {
            console.log(returnedFilm);
            setFilmsData(filmsData.concat(returnedFilm));
            setInputErrors(validErrorInitialstate);
            setNewFilm(newFilmInitialstate);
        });
    };

    return (
        <div>
            <Search
                searchFilm={searchFilm}
                handleSearch={handleSearch}
            />
            <Button
                onClick={handleSort}
                innerText={
                    sortType === 'asc'
                        ? 'Sort by: title Z-A'
                        : 'Sort by: title A-Z'
                }
            />
            <Button
                onClick={handleShowAll}
                innerText={
                    showAllInfo
                        ? 'Hide Films Info'
                        : 'Show Films Info'
                }
            />
            <List
                filmsDataSearchResult={filmsDataSearchResult}
                handleShowInfo={handleShowInfo}
                handleRemoveFilm={handleRemoveFilm}
            />
            <Form
                newFilm={newFilm}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleSelect={handleSelect}
                inputErrors={inputErrors}
            />
        </div>
    );
};

export default App;
