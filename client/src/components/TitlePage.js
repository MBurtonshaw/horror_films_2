import { React, useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function TitlePage(props) {
    let [movies, setMovies] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let str = window.location.pathname;
    let newString = str.split("/").pop();

    async function getData() {
        let films = await props.context.data.movies.movies;
        setMovies(films);
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setMovies]);

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
                                films.map((movie, i) => {
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
            return (<h1>Not Found</h1>);
        } else {
            for (let i = 0; i < films.length; i++) {
                if (window.innerWidth < 768) {
                    return (
                        <div className='m-auto'>
                            <Header />
                            <div className="card-group">
                                {
                                    films.map((movie, i) => {
                                        return (
                                            <div key={i}>
                                                <a href={`/titles/${movie.url}`}>
                                                    <div className="card round_thumb">
                                                        <img className="card-img-top round_thumb" src={`../../photos/titles/${movie.url}_round.jpg`} alt={`${movie.title} thumbnail`} />
                                                    </div>
                                                </a>
                                                <p className='py-3'>{movie.title}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                } else {
                    if (props.context.folded === false) {
                        return (
                            <div className='m-auto'>
                                <div className='row align-items-start'>
                                    <div className='w-50 m-auto col mt-5 position-fixed'>
                                        <div className='right-spacest'>
                                            <Header />
                                        </div>
                                        <Sidebar context={props.context} />
                                    </div>
                                    <div className='col'></div>
                                    <div className="card-group col w-50 m-auto mt-5">
                                        <h1 className='w-100 right-space'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                                        {
                                            films.map((movie, i) => {
                                                return (
                                                    <div key={i}>
                                                        <a href={`/titles/${movie.url}`}>
                                                            <div className="card round_thumb">
                                                                <img className="card-img-top round_thumb" src={`../../photos/titles/${movie.url}_round.jpg`} alt="Card image cap" />
                                                            </div>
                                                        </a>
                                                        <p className='py-3'>{movie.title}</p>
                                                    </div>
                                                );
                                            })
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
                                <div className="card-group w-75 m-auto mt-4 px-5">
                                    <h1 className='text-center w-100 m-auto py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                                    {
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
                                    }
                                </div>
                            </div>
                        );
                    }
                }
            }
        }
    }
}
