import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Error from './Error';

export default function Genres(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/
    let { url } = useParams();
    let [movies, setMovies] = useState('');
    let [genre, setGenre] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');

    //function to gather data from movies.json
    async function getData() {
        try {
            let pictures = [];
            let films = await props.context.data.movies.movies;

            for (let i = 0; i < films.length; i++) {
                for (let j = 0; j < films[i].genres.length; j++) {
                    if (films[i].genres.includes(url)) {
                        pictures.push(films[i]);
                        setMovies(props.context.actions.removeDuplicates(pictures));
                        setGenre(url);
                    }
                }
            }
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => { getData() }, [setGenre]);

    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/
    //function to map the movies corresponding to the correct decade, to list items
    let fill_array = [];

    //function to loop thru state & map films corresponding to the decade
    function fill_in() {
        for (let f = 0; f < movies.length; f++) {
            fill_array.push(movies[f]);
        }
        //
        return (
            fill_array.map((film, i) => {

                return (
                    <li key={i}><a href={`/titles/${film.url}`}>{film.title}</a></li>
                );
            })
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (error) {
        return (
            <div>
                <Error message={error} />
            </div>
        );
    } else {

        if (isLoading === true) {
            if (window.innerWidth < 768) {
                return (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                );
            }
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        } else if (isLoading === false && genre === '') {
            if (window.innerWidth < 768) {
                return (
                    <div>
                        <NotFound message={url} />
                    </div>
                );
            }
            return (
                <div>
                    <NotFound message={url} />
                </div>
            );
        } else {
            //combines previous two functions and returns formatting based on screen size
            if (window.innerWidth < 768) {
                return (
                    <div>
                        <h1>
                            Genre: {genre}
                        </h1>
                        <div>
                            <ul>
                                {fill_in()}
                            </ul>
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    <h1>
                        Genre: {genre}
                    </h1>
                    <div>
                        <ul>
                            {fill_in()}
                        </ul>
                    </div>
                </div>
            );
        }
    }
    //
}