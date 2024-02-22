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
                    <div key={i} className='mx-auto p-2'>
                        <div className='card round_thumb'>
                            <a href={`/titles/${film.url}`}>
                                <img className='card-img-top round_thumb' src={`../../photos/titles/${film.url}_round.jpg`} />
                            </a>
                        </div>
                        <a className='nonchalant' href={`/titles/${film.url}`}><h5>{film.title}</h5></a>
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
                <div>
                    <ul>
                        {fill_in()}
                    </ul>
                </div>
            </div>
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
                    <div>
                        {mobile_filler()}
                    </div>
                );
            } else {
                if (props.context.folded === true) {
                    return (
                        <div>
                            <div>
                                <div className='mt-5'>
                                    <Header />
                                    <div className='py-5'>
                                        <h2>{`Genre: ${title_filler}`}</h2>
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
                            <div className="card-group col w-50 mx-auto mt-5 right-spacer">
                                <h2 className='w-100 py-5'>{`Genre: ${newString.charAt(0).toUpperCase() + newString.slice(1)}`}</h2>
                                {fill_in()}
                            </div>
                        </div>


                    );
                }

            }


        }
    }
    //
}