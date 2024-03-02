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
        if (window.innerWidth < 768) {
            movies.map((movie, i) => {
                return (
                    <div key={i} className='mx-auto'>
                        <a href={`/titles/${movie.url}`}>
                            <div className="card round_thumb w-75 m-auto">
                                <img className="card-img-top round_thumb" src={`../../photos/titles/${movie.url}_round.jpg`} alt="Card image cap" />
                            </div>
                        </a>
                        <p className='py-3'>{movie.title}</p>
                    </div>
                );
            })
        }
        return (
            movies.map((movie, i) => {
                return (
                    <div key={i} className='mx-auto'>
                        <a href={`/titles/${movie.url}`}>
                            <div className="card round_thumb">
                                <img className="card-img-top round_thumb" src={`../../photos/titles/${movie.url}_round.jpg`} alt="Card image cap" />
                            </div>
                        </a>
                        <p className='py-3'>{movie.title}</p>
                    </div>
                );
            })
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
        }
        if (window.innerWidth < 768) {
            return (
                <div className='m-auto'>
                    <div className='w-50 m-auto mt-5'>
                        <Header context={props.context} user={props.user} />
                    </div>
                    <div className="card-group m-auto mt-4 px-5 background_box">
                        <h1 className='text-center w-100 m-auto py-5'>{`Results: ${props.context.actions.capitalizeFirstLetter(url)}`}</h1>
                        {
                            body_fill()
                        }
                    </div>
                </div>
            );
        }
        if (props.context.folded === true) {
            return (
                <div className='m-auto'>
                    <div className='w-100 m-auto mt-5'>
                        <Header />
                        <div className='position-fixed'>
                            <Sidebar context={props.context} />
                        </div>
                    </div>
                    <div className="card-group w-75 m-auto mt-4 px-5 background_box">
                        <h1 className='text-center w-100 m-auto py-5'>{`Results: ${url.toUpperCase()}`}</h1>
                        {
                            body_fill()
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className='m-auto background_box'>
                    <div className='row align-items-start'>
                        <div className='w-50 m-auto col mt-5 position-fixed'>
                            <Sidebar context={props.context} user={props.user} />
                        </div>
                        <div className='col'></div>
                        <div className="card-group col w-50 m-auto mt-5">
                            <h1 className='w-100 right-space'>{`Results: ${url.toUpperCase()}`}</h1>
                            {
                                body_fill()
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}