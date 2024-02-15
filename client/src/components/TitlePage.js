import { React, useState, useEffect } from 'react';

export default function TitlePage(props) {
    let [movies, setMovies] = useState('');
    let [isLoading, setIsLoading] = useState(true);

    function loader() {
        for (let i = 0; i < props.context.data.movies.movies.length; i++) {
            return(
                <div>
                    <h1>Liadughng</h1>
                </div>
            );
        }
    }

    if (isLoading) {
        return(
            <div>
                <h1 className='p-5'> ...loading... </h1>
                <div>
                    { loader() }
                </div>
            </div>
        );
    } else {
        if (props.context.data.movies.movies.length < 1) {
            return (<h1>Not Found</h1>);
        } else {
            for (let i = 0; i < props.context.data.movies.movies.length; i++) {
                if (window.innerWidth < 768) {
                    return (
                        <div>
                            <h1>
                                Titles
                            </h1>
                            <div>
                                <div className="card-group">
                                    {
                                        props.context.data.movies.movies.map((movie, i) => {
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
                            <h1>
                                Titles
                            </h1>
                            <div className="card-group">
                                {
                                    props.context.data.movies.movies.map((movie, i) => {

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
                    );
                }
            }
        }
    }
}