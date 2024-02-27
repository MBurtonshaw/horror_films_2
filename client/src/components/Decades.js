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

        return (
            fill_array.map((film, i) => {
                return (
                    <div key={i} className='mx-auto background_box my-3'>
                                            <a className='nonchalant' href={`/titles/${film.url}`}>
                                                <div className="card round_thumb w-50 mx-auto mt-4">
                                                    <img className="card-img-top round_thumb" src={`../../photos/titles/${film.url}_round.jpg`} alt="Card image cap" />
                                                </div>
                                                <h5 className='py-3'>{film.title}</h5>
                                            </a>
                                        </div>
                );
            }
            )
        );
    }

    function mobile_filler() {
        return (
            <div>
                <Header />
                {fill_in()}
            </div>
        );
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
                            <div className='w-50 m-auto mt-3'>
                                <Header context={props.context} />
                            </div>
                            <div className="card-group w-100 m-auto mt-4">
                                <h1 className='text-center w-100 mx-auto my-5 mt-2 pt-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                                {
                                    fill_in()
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
                                <Header />
                                <div className='py-5'>
                                    <h2>{`Genre: ${props.context.actions.capitalizeFirstLetter(title_filler)}`}</h2>
                                </div>
                                <div className='position-fixed'>
                                    <Sidebar context={props.context} />
                                </div>
                            </div>
                            <div className='px-5 card-group w-75 m-auto'>
                                {fill_in()}
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='row align-items-start'>
                        <div className='w-50 m-auto col position-fixed mt-5'>
                            <Header />
                            <Sidebar context={props.context} />
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