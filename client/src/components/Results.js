import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Error from './Error';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Results(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/
    let [term, setTerm] = useState('');
    let [movies, setMovies] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let { url } = useParams();

    //function to set a term from url to state then sort movies based on that term
    async function getData() {
        try {
            let movieArray = await props.context.data.movies.movies;
            let result = window.location.pathname.slice(9);
            if (movieArray.length < 1) {
                return null;
            } else {
                for (let i = 0; i < movieArray.length; i++) {
                    let newArray = [];
                    movieArray.forEach(title => {
                        if (title.url.toLowerCase().includes(result.toLowerCase())) {
                            newArray.push(title);
                        }
                    });
                    setMovies(newArray);
                }
                setIsLoading(false);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => { getData() }, [setMovies]);

    /***************************************************************************************
        FUNCTIONS
    ***************************************************************************************/

    function body_fill() {
        return (
            <ul>
                {
                    //mapping movies from state
                    movies.map((film, i) => {
                        //adding the flashcard animation class to later entries on the list
                        if (i > 10) {
                            return (
                                <li key={i}><a href={`/titles/${film.url}`}>{film.title}</a></li>
                            );
                        } else {
                            return (
                                <li key={i}><a href={`/titles/${film.url}`}>{film.title}</a></li>
                            );
                        }
                    })
                }
            </ul>
        );
    }

    /***************************************************************************************
        RENDER
    ***************************************************************************************/
    if (error) {
        return (
            <div>
                <Error message={error} />
            </div>
        );
    }

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
    } else {
        if (movies.length < 1) {
            return (
                <div>
                    <NotFound message={url} />
                </div>
            );
        } else {
            for (let m = 0; m < movies.length; m++) {
                if (window.innerWidth < 768) {
                    return (
                        <div>
                            <h1>
                                {props.context.actions.capitalizeFirstLetter(term.toLowerCase())}
                            </h1>
                            <div>
                                {body_fill()}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className='row align-items-start'>
                            <div className='w-25 m-auto col mt-5'>
                                <Header />
                                <Sidebar context={props.context} />
                            </div>
                            <div className='col w-25 m-auto'></div>
                            <div className='col w-50 m-auto'>
                                <h1>
                                    {props.context.actions.capitalizeFirstLetter(term.toLowerCase())}
                                </h1>

                                <div>
                                    {body_fill()}
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}