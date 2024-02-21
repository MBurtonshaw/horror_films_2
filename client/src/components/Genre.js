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
        //
        return (
            fill_array.map((film, i) => {

                return (
                    <li key={i}><a href={`/titles/${film.url}`}>{film.title}</a></li>
                );
            })
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

    function reg_filler() {
        return (
            <div className='m-auto'>

                <div className='row align-items-start'>
                    <div className='w-50 m-auto col position-fixed mt-5'>
                        <Header />
                        <Sidebar />
                    </div>
                    <div className='w-25 m-auto col'></div>
                    <div className='w-25 m-auto col px-5'>
                        <ul>
                            {fill_in()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
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
                    mobile_filler()
                );
            } else {
                return (
                    reg_filler()
                );
            }


        }
    }
    //
}