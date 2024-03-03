import { React, useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Error from './Error';

export default function TitlePage(props) {
    let [movies, setMovies] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let str = window.location.pathname;
    let newString = str.split("/").pop();

    async function getData() {
        try {
            let films = await props.context.data.movies.movies;
            setMovies(films);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setMovies]);

    function content_filler() {
        if (window.innerWidth < 768) {
            return (
                films.map((movie, i) => {
                    return (
                        <div key={i} className='mx-auto my-3'>
                            <a className='nonchalant' href={`/titles/${movie.url}`}>
                                <div className="card round_thumb w-50 mx-auto mt-4">
                                    <img className="card-img-top round_thumb" src={`../../photos/titles/${movie.url}_round.jpg`} alt="Card image cap" />
                                </div>
                                <h5 className='py-3'>{movie.title}</h5>
                            </a>
                        </div>
                    );
                })
            );
        }
        return (
            films.map((movie, i) => {
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

    let films = props.context.data.movies.movies;
    if (isLoading) {
        for (let i = 0; i < films.length; i++) {
            return (
                <div className='mt-5'>
                    <Header />
                    <h1 className='pt-5'>
                        ...Loading...
                    </h1>
                    <div>
                        <div className="card-group w-75 mx-auto">
                            {
                                films.map((i) => {
                                    return (
                                        <div key={i}>
                                            <div className="card round_thumb_loader m-3">
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        if (films.length < 1) {
            return (
                <h1>
                    Not Found
                </h1>
            );
        } else {
            if (error) {
                return (
                    <div className='m-5 p-5'>
                        <Error message={error} />
                    </div>
                );
            }
            for (let i = 0; i < films.length; i++) {
                if (window.innerWidth < 768) {
                    return (
                        <div className='m-auto'>
                            <div className='w-50 m-auto mt-5'>
                                <Header context={props.context} user={props.user} />
                            </div>
                            <div className="card-group w-100 m-auto background_box">
                                <h1 className='text-center w-100 mx-auto my-5 mt-2 pt-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                                {
                                    content_filler()
                                }
                            </div>
                        </div>
                    );
                }
                if (props.context.folded === false) {
                    return (
                        <div className='m-auto background_box'>
                            <div className='row align-items-start'>
                                <div className='w-50 m-auto col mt-5 position-fixed'>
                                    <Sidebar context={props.context} user={props.user} />
                                </div>
                                <div className='col'></div>
                                <div className="card-group col w-50 m-auto mt-5">
                                    <h1 className='w-100 right-space'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                                    {
                                        content_filler()
                                    }
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className='m-auto'>
                            <div className='w-100 m-auto mt-5'>
                                <Header />
                                <div className='position-fixed'>
                                    <Sidebar context={props.context} />
                                </div>
                            </div>
                            <div className="card-group w-75 m-auto mt-4 px-5 background_box">
                                <h1 className='text-center w-100 m-auto py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                                {
                                    content_filler()
                                }
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}
