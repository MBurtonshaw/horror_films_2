import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Cookies from 'js-cookie';
import Error from './Error';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Title(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/
    let { url } = useParams();
    let [sizeClass, setSizeClass] = useState('');
    let [currentFilm, setCurrentFilm] = useState('');
    let [isChecked, setIsChecked] = useState();
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');

    //async function to match the corresponding film with the url
    async function getData() {
        try {
            for (let i = 0; i < props.context.data.movies.movies.length; i++) {
                let newTypes = await props.context.data.movies.movies;
                if (newTypes[i].url === url) {
                    let newType = newTypes[i];
                    setCurrentFilm(newType);
                    if (document.cookie) {
                        let cookie = Cookies.get(`myList-${newType.id}`);

                        if (cookie === undefined) {
                            setIsChecked(false);
                        } else {
                            if (cookie === currentFilm.title) {
                                setIsChecked(true);
                            }
                        }
                    }
                }
            }
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getScreenSize() }, [setSizeClass]);
    useEffect(() => { getData() }, [setIsLoading]);

    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/

    let str = window.location.pathname;
    let newString = str.split("/").pop();

    //function to match the film's release year with the /decades path it corresponds to
    function decade_filler() {
        let variant;
        if (movie.year < 1970) {
            variant = '../decades/classics'
        }
        if (movie.year < 1980 && movie.year > 1969) {
            variant = '../decades/70s'
        }
        if (movie.year < 1990 && movie.year > 1979) {
            variant = '../decades/80s'
        }
        if (movie.year < 2000 && movie.year > 1989) {
            variant = '../decades/90s'
        }
        if (movie.year < 2010 && movie.year > 1999) {
            variant = '../decades/00s'
        }
        if (movie.year < 2020 && movie.year > 2009) {
            variant = '../decades/10s'
        }
        if (movie.year < 2030 && movie.year > 2019) {
            variant = '../decades/20s'
        }
        return (
            <a href={variant}>{movie.year}</a>
        );
    }

    //Sets the screen width to state which is used later in the Amazon Prime & YouTube icons' classLists
    function getScreenSize() {

        setSizeClass('socials');

    }

    let movie;
    let authors;
    let genres;
    let filmMakers;

    function width_checker() {
        if (window.innerWidth > 992) {
            return ('w-75');
        } else {
            return ('mx-auto px-2');
        }
    }

    //function to create the accordion component
    function accordion_fill() {
        return (
            <div className={`accordion m-auto col ${width_checker()}`}>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Writer(s)
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {authors}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Director(s)
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {filmMakers}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Release Year
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {decade_filler()}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Genres
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {genres}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Links
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className='w-100 m-auto'>
                                {link_fill_in()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //function to handle the Amazon Prime & YouTube icons
    function link_fill_in() {
        if (movie.prime_link.length > 2 && movie.youtube_link.length > 2) {
            return (
                <div>
                    <a href={movie.prime_link}>
                        <img className={`${sizeClass}`} src='../../photos/prime_icon.jpg' alt='icon for a link to Amazon Prime Video'></img>
                    </a>
                    <a href={movie.youtube_link}>
                        <img className={`${sizeClass}`} src='../../photos/youtube_icon.jpg' alt='icon for a link to YouTube'></img>
                    </a>
                </div>
            );
        } else if (movie.prime_link.length > 2 && movie.youtube_link.length < 2) {
            return (
                <div>
                    <a href={movie.prime_link}>
                        <img className={`${sizeClass}`} src='../../photos/prime_icon.jpg' alt='icon for a link to Amazon Prime Video'></img>
                    </a>
                </div>
            );
        } else if (movie.prime_link.length < 2 && movie.youtube_link.length > 2) {
            return (
                <div>
                    <a href={movie.youtube_link}>
                        <img className={`${sizeClass}`} src='../../photos/youtube_icon.jpg' alt='icon for a link to YouTube'></img>
                    </a>
                </div>
            );
        }
    }

    function loader_fill_in() {
        if (window.innerWidth < 768) {
            return (
                <div>
                    <div>
                        <div><h1 >...Loading...</h1><div></div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <h1>Loading...</h1>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            );
        }
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
        if (isLoading === true) {
            return (loader_fill_in());

        } else if (isLoading === false && currentFilm.url !== url) {
            return (
                <div>
                    <NotFound message={url} />
                </div>)

        } else if (currentFilm.url === url && isLoading === false) {

            movie = currentFilm;
            authors = movie.writers.map((artist, i) => <li key={i}>{artist}</li>);
            genres = movie.genres.map((type, i) => <li key={i}><a href={`/genres/${type}`}>{type}</a></li>);
            filmMakers = movie.directors.map((person, i) => <li key={i}>{person}</li>);

            function cookie_handler() {
                if (props.user === '' || props.user === undefined) {
                    return (
                        <div className='mt-5'>
                            <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                        </div>
                    );
                } else {
                    if (isChecked === true) {
                        return (
                            <div className='mt-5'>
                                <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                                <p className='mt-2'>added to list</p>
                            </div>
                        );
                    } else {
                        return (
                            <div className='mt-5'>
                                <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                                <button className='mt-2' onClick={() => {
                                    //needs logic to determine what to do when cookie doesn't exist yet
                                    Cookies.set(`myList-${props.user.email}-${movie.id}`, `${movie.title}`, { expires: 7 });
                                    setIsChecked(true);
                                }}>Add to My List</button>
                            </div>
                        );
                    }
                }
            }
            //logic to handle different screen widths
            if (window.innerWidth < 992) {
                return (
                    <div>
                        <div className='m-auto'>
                            <div className='mt-5 w-50 mx-auto'>
                                <Header context={props.context} />
                            </div>
                            {
                                cookie_handler()
                            }
                            <div className='my-5'>
                                <div className='my-5'>
                                    <a href='/titles'><img className='small_img' src={`${movie.photo}.jpg`} alt={`Film art for ${movie.title}`}></img></a>
                                </div>
                                <div className=''>
                                    {accordion_fill()}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            if (props.context.folded === true) {
                return (
                    <div className='row align-items-start'>
                        <div className='col position-fixed'>
                            <Sidebar context={props.context} />
                        </div>
                        <div className='w-75 m-auto'>
                            <div className='mt-5'>
                                <Header />
                            </div>
                            {
                                cookie_handler()
                            }
                            <div className='row align-items-start my-5'>
                                <div className='col'>
                                    {accordion_fill()}
                                </div>
                                <div className='w-50 m-auto col'>
                                    <a href='/titles'><img className='small_img' src={`${movie.photo}.jpg`} alt={`Film art for ${movie.title}`}></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='row align-items-start background_box'>
                        <div className='col w-50 my-5'>
                            <div className='right-spacest'>
                                <Header />
                            </div>
                            <Sidebar context={props.context} />
                        </div>
                        <div className='col w-50 m-auto'>
                            {
                                cookie_handler()
                            }
                            <div className='row align-items-start my-5 py-5'>
                                <div className='col'>
                                    {accordion_fill()}
                                </div>
                                <div className='w-50 m-auto col'>
                                    <a href='/titles'><img className='small_img' src={`${movie.photo}.jpg`} alt={`Film art for ${movie.title}`}></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}
