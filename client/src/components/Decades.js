import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Error from './Error';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Decades(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/
    let { url } = useParams();
    let [movies, setMovies] = useState('');
    let [error, setError] = useState('');
    let str = window.location.pathname;
    let newString = str.split("/").pop();

    //function to gather data from movies.json - sets category and sorts films based on url and film year
    async function getData() {
        try {
            let pictures = [];
            let films = await props.context.data.movies.movies;

            for (let i = 0; i < films.length; i++) {

                if (url === 'classics' && films[i].year < 1970) {
                    pictures.push(films[i]);
                }
                if (url === '70s' && films[i].year > 1969 && films[i].year < 1980) {
                    pictures.push(films[i]);
                }
                if (url === '80s' && films[i].year > 1979 && films[i].year < 1990) {
                    pictures.push(films[i]);
                }
                if (url === '90s' && films[i].year > 1989 && films[i].year < 2000) {
                    pictures.push(films[i]);
                }
                if (url === '00s' && films[i].year > 1999 && films[i].year < 2010) {
                    pictures.push(films[i]);
                }
                if (url === '10s' && films[i].year > 2009 && films[i].year < 2020) {
                    pictures.push(films[i]);
                }
                if (url === '20s' && films[i].year > 2019 && films[i].year < 2030) {
                    pictures.push(films[i]);
                }
                pictures = props.context.actions.removeDuplicates(pictures);
                setMovies(pictures);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => { getData() }, [setMovies]);
    /**************************************************************************************
        fUNCTIONS
    ***************************************************************************************/

    //function to map the movies corresponding to the correct decade, to list items
    let fill_array = [];

    function fill_in() {
        for (let f = 0; f < movies.length; f++) {
            fill_array.push(movies[f]);
        }
        fill_array.map((film, i) => {
            return (
                <div key={i} className='mx-auto my-3'>
                    <div>
                        <a className='nonchalant' href={`/titles/${film.url}`}>
                            <div className="card round_thumb mx-auto mt-4">
                                <img className="card-img-top round_thumb" src={`../../photos/titles/${film.url}_round.jpg`} alt="Card image cap" />
                            </div>
                            <h5 className='py-3'>{film.title}</h5>
                        </a>
                    </div>
                </div>
            );
        }
        )
        if (props.context.folded === true) {
            return (
                fill_array.map((film, i) => {
                    return (
                        <div key={i} className='mx-auto my-3'>
                            <a className='nonchalant' href={`/titles/${film.url}`}>
                                <div className="card round_thumb mx-auto mt-4">
                                    <img className="card-img-top round_thumb" src={`../../photos/titles/${film.url}_round.jpg`} alt="Card image cap" />
                                </div>
                                <h5 className='py-3'>{film.title}</h5>
                            </a>
                        </div>
                    );
                })
            );
        } else {
            return (
                fill_array.map((film, i) => {
                    return (
                        <div key={i} className='mx-auto my-3'>
                            <a className='nonchalant' href={`/titles/${film.url}`}>
                                <div className="card round_thumb w-25 mx-auto mt-4">
                                    <img className="card-img-top round_thumb" src={`../../photos/titles/${film.url}_round.jpg`} alt="Card image cap" />
                                </div>
                                <h5 className='py-3'>{film.title}</h5>
                            </a>
                        </div>
                    );
                })
            );
        }
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    let title_filler = window.location.pathname.slice(9, 18);
    if (error) {
        //error
        return (
            <div>
                <Error message={error} />
            </div>
        );
    } else {
        //by classics, mobile size
        if (url === 'classics' || url === '70s' || url === '80s' || url === '90s' || url === '00s' || url === '10s' || url === '20s') {
            //mobile
            if (window.innerWidth < 768) {
                return (
                    <div className='m-auto'>
                    <div className='w-50 m-auto mt-5'>
                        <Header context={props.context} user={props.user} />
                    </div>
                        <h1 className='text-center w-100 mx-auto my-5 mt-2 pt-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        <div className="card-group m-auto mt-4 background_box">
                            {
                                fill_array.map((film, i) => {
                                    return (
                                        <div key={i} className='mx-auto my-3'>
                                            <div>
                                                <a className='nonchalant' href={`/titles/${film.url}`}>
                                                    <div className="card round_thumb mx-auto mt-4 w-50">
                                                        <img className="card-img-top round_thumb" src={`../../photos/titles/${film.url}_round.jpg`} alt="Card image cap" />
                                                    </div>
                                                    <h5 className='py-3'>{film.title}</h5>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                );
            }
            if (props.context.folded === true) {
                return (
                    <div>
                        <div>
                            <div className='mt-5'>
                                <Header context={props.context} user={props.user} />
                                <div className='position-fixed'>
                                    <Sidebar context={props.context} />
                                </div>
                                <div className='py-5 w-75 mx-auto background_box my-5'>
                                    <h2>{`Decade: ${props.context.actions.capitalizeFirstLetter(title_filler)}`}</h2>
                                    <div className='px-5 card-group m-auto'>
                                        {fill_in()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='row align-items-start background_box'>
                        <div className='w-50 m-auto col position-fixed mt-5'>
                            <Sidebar context={props.context} user={props.user} />
                        </div>
                        <div className='w-25 m-auto col'></div>
                        <div className="col w-50 mx-auto mt-5 right-spacer">
                            <h2 className='w-100 py-5'>{`Decade: ${newString.charAt(0).toUpperCase() + newString.slice(1)}`}</h2>
                            {fill_in()}
                        </div>
                    </div>
                );
            }
        } else {
            //not found
            return (
                <div>
                    <NotFound message={url} />
                </div>
            )
        }
    }
}