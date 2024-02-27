import { React, useState, useEffect } from 'react';
import Error from './Error';
import Header from './Header';
import Sidebar from './Sidebar';

export default function GenrePage(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/
    let [types, setTypes] = useState('');
    let [error, setError] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let str = window.location.pathname;
    let newString = str.split("/")[1];



    async function getData() {
        try {
            let genres = await props.context.data.movies.genres;
            let genreArray = [];
            for (let i = 0; i < genres.length; i++) {
                if (!genreArray.includes(genres[i].name)) {
                    genreArray.push(genres[i].name);
                    setTypes(genreArray);
                }
                setIsLoading(false);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => { getData() }, [setTypes]);

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (error) {
        return (
            <div className='m-5 p-5'>
                <Error message={error} />
            </div>
        );
    }
    if (isLoading) {
        for (let i = 0; i < types.length; i++) {
            return (
                <div className='mt-5'>
                    <Header />
                    <h1 className='pt-5 mt-5'>
                        ...Loading...
                    </h1>
                    <div>
                        <div className="card-group w-75 mx-auto">
                            {
                                types.map((movie, i) => {
                                    return (
                                        <div key={i} className='mx-auto py-3'>
                                            <div className="card oval_thumb_loader m-2">
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
        if (window.innerWidth < 768) {
   
            return (
                <div className='m-auto'>
                    <div className='w-50 m-auto mt-3'>
                        <Header context={props.context} />
                    </div>
                    <div className="card-group w-100 m-auto mt-4">
                        <h1 className='text-center w-100 mx-auto my-5 mt-2 pt-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        {
                            types.map((genre, i) => {
                                console.log(genre)
                                return (
                                    <div key={i} className='mx-auto background_box my-3'>
                                        <a className='nonchalant' href={`/genres/${genre}`}>
                                            <div className="card round_thumb w-50 mx-auto mt-4">
                                                <img className="card-img-top round_thumb" src={`../../photos/genres/${genre}_round.jpg`} alt="Card image cap" />
                                            </div>
                                            <h5 className='py-3'>{genre}</h5>
                                        </a>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        }
        if (props.context.folded === false) {
            return (
                <div className='m-auto background_box'>
                    <div className='row align-items-start'>
                        <div className='w-50 m-auto col position-fixed mt-5'>
                            <div className='right-spacest'>
                                <Header />
                            </div>
                            <Sidebar context={props.context} />
                        </div>
                        <div className='w-25 m-auto col'></div>
                        <div className="card-group col w-50 mx-auto mt-5 right-spacer">
                            <h1 className='w-100 py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                            {
                                types.map((genre, i) => {
                                    //function to return contents of the cards and leave the innderWidth conditons below more concise
                                    return (
                                        <div key={i} className='oval_thumb'>
                                            <div className='py-3 mx-auto'>
                                                <a className='w-100 nonchalant' href={`/genres/${genre}`}>
                                                    <img className='w-100 radius' src={`../../photos/genres/${genre.toLowerCase()}.jpg`} alt="..." />
                                                    <h5 className='p-1'>{genre}</h5>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='w-100 m-auto mt-5'>
                    <Header />
                    <div className=''>
                    <div className='position-fixed'>
                        <Sidebar context={props.context} />
                    </div>
                    <div className="card-group w-50 mx-auto mt-5 background_box">
                        <h1 className='w-100 py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        {
                            types.map((genre, i) => {
                                //function to return contents of the cards and leave the innderWidth conditons below more concise
                                return (
                                    <div key={i} className='px-4 mx-auto'>
                                        <div className='py-3'>
                                            <a className='nonchalant' href={`/genres/${genre}`}>
                                                <img className='round_thumb wide_adjust' src={`../../photos/genres/${genre.toLowerCase()}_round.jpg`} alt="..." />
                                                <h5 className='p-1'>{genre}</h5>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    </div>
                </div>
            )
        }

    }
}
