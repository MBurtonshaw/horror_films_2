import { React, useState, useEffect } from 'react';
import Error from './Error';

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
                <div>
                    <h1> Genres </h1>
                    <div>
                        {
                            types.map((genre, i) => {

                                //function to return contents of the cards and leave the innderWidth conditons below more concise
                                function fill_in() {
                                    return (
                                        <div>
                                            <a href={`/genres/${genre}`}>
                                                <img src={`../../photos/genres/${genre.toLowerCase()}.jpg`} alt="..." />
                                                <div >
                                                    <h5 >{genre}</h5>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                }
                                //optimizing widths for different screen sizes
                                if (window.innerWidth < 768) {
                                    return (
                                        <div key={i}>
                                            {fill_in()}
                                        </div>
                                    );
                                }
                                if (window.innerWidth < 992) {
                                    return (
                                        <div key={i}>
                                            {fill_in()}
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div key={i}>
                                            {fill_in()}
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}
