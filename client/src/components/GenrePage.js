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

    async function getData() {
        try {
            let genres = await props.context.data.movies.genres;
            let genreArray = [];
            for (let i = 0; i < genres.length; i++) {
                if (!genreArray.includes(genres[i].name)) {
                    genreArray.push(genres[i].name);
                    setTypes(genreArray);
                }
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
            <div >
                <Error message={error} />
            </div>
        );
    } else {
        if (types.length < 1) {
            return (
                <div >
                    <h1 > Loading... </h1>
                    <div >
                    </div>
                </div>
            );
        } else {
            return (
                <div className='m-auto'>
                    <div className='row align-items-start'>
                        <div className='w-50 m-auto col position-fixed mt-5'>
                            <Header />
                            <Sidebar />
                        </div>
                        <div className='w-25 m-auto col'></div>
                        <div className="card-group col w-50 m-auto mt-5">
                            {
                                types.map((genre, i) => {
                                    //function to return contents of the cards and leave the innderWidth conditons below more concise
                                    function fill_in() {
                                        return (
                                            <div>
                                                <a className='w-100' href={`/genres/${genre}`}>
                                                    <img className='w-100 radius' src={`../../photos/genres/${genre.toLowerCase()}.jpg`} alt="..." />

                                                    <h5 >{genre}</h5>

                                                </a>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={i} className='round_thumb'>
                                            {fill_in()}
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
