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
        //
        return (
            <div>
                <ul>
                    {fill_array.map((film, i) => {
                        if (i > 12) {
                            return (
                                <li key={i}><a href={`/titles/${film.url}`}>{film.title}</a></li>
                            );
                        } else {
                            return (
                                <li key={i}><a href={`/titles/${film.url}`}>{film.title}</a></li>
                            );
                        }

                    })}
                </ul>
            </div>
        )
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
        if (url === 'classics') {
            if (window.innerWidth < 768) {
                return (
                    <div>
                        <Header />

                        {fill_in()}
                    </div>
                );
            } else {
                return (
                    <div>
                        <Header />
                        <div className='row align-items-start'>
                            <div className='w-50 m-auto col position-fixed mt-5'>
                                <Sidebar />
                            </div>
                            <div className='w-25 m-auto col'></div>
                            <div className='w-25 m-auto col px-5'>
                                {fill_in()}
                            </div>
                        </div>
                    </div>
                );
            }
        } else if (url === '70s' || url === '80s' || url === '90s' || url === '00s' || url === '10s' || url === '20s') {
            if (window.innerWidth < 768) {
                return (
                    <div>
                        <Header />
                        {fill_in()}
                    </div>
                );
            } else {
                return (
                    <div>
                        <Header />
                        <div className='row align-items-start'>
                            <div className='w-50 m-auto col position-fixed mt-5'>
                                <Sidebar />
                            </div>
                            <div className='w-25 m-auto col'></div>
                            <div className='w-25 m-auto col px-5'>
                                {fill_in()}
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <NotFound message={url} />
                </div>
            )
        }
    }
}