import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Error from './Error';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Genres(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/
    let { url } = useParams();
    let [movies, setMovies] = useState('');
    let [genre, setGenre] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let str = window.location.pathname;
    let newString = str.split("/").pop();

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
            }
            )
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    let title_filler = window.location.pathname.slice(8, 18);
    //error
    if (error) {
        return (
            <div>
                <Error message={error} />
            </div>
        );
    } else {
        //loading
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
            //not found
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
            //return functions by screen size
            if (window.innerWidth < 768) {
                return (
                    <div className='m-auto'>
                        <div className='w-50 m-auto mt-5'>
                            <Header context={props.context} user={props.user} />
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
                    <div className='w-100 m-auto mt-5'>
                        <Header />
                        <div className=''>
                            <div className='position-fixed'>
                                <Sidebar context={props.context} />
                            </div>
                            <div className="card-group w-75 mx-auto mt-5 background_box">
                                <h1 className='w-100 py-5'>{`Genre: ${newString.charAt(0).toUpperCase() + newString.slice(1)}`}</h1>
                                {
                                    fill_in()
                                }
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
                        <div className='col'></div>
                        <div className="card-group col mx-auto mt-5 right-spacer">
                            <h2 className='w-100 py-5'>{`Genre: ${newString.charAt(0).toUpperCase() + newString.slice(1)}`}</h2>
                            {fill_in()}
                        </div>
                    </div>
                );
            }
        }
    }
    //
}