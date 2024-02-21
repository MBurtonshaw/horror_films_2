import { React, useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function TitlePage(props) {
    let [movies, setMovies] = useState('');
    let [isLoading, setIsLoading] = useState(true);

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
                <div>
                    <h1 className='pt-5 mt-5'>
                        ...Loading...
                    </h1>
                    <div>
                        <div className="card-group">
                            {
                                films.map((movie, i) => {
                                    return (
                                        <div key={i}>

                                            <div className="card round_thumb_loader m-2">

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
                    return (
                        <div className='m-auto'>
                            <Header />
                            <div className='row align-items-start'>
                                <div className='w-50 m-auto col position-fixed mt-5'>
                                    <Sidebar />
                                </div> 
                                <div className='w-25 m-auto col'></div>
                                <div className="card-group col w-50 m-auto mt-5">
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
                }
            }
        }
    }
}