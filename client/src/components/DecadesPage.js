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
    let newString = str.split("/").pop();

    async function getData() {
        let decades = await props.decades;
        if (decades.length > 1) {
            setTypes(decades);
            setIsLoading(false);
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
        if (isLoading) {
            if (window.innerWidth < 768) {
                return (
                    <div className=''>

                    </div>
                );
            }
            for (let i = 0; i < props.decades.length; i++) {
                return (
                    <div>
                        <h1 className='pt-5 mt-5'>
                            ...Loading...
                        </h1>
                        <div>
                            <div className="card-group">
                                {
                                    props.decades.map((movie, i) => {
                                        return (
                                            <div key={i} className='mx-auto px-5'>
                                                <div className="card round_thumb_loader m-2">
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
        }
        if (window.innerWidth < 768) {
            return (
                <div className='m-auto'>
                    <div className='w-50 mx-auto mt-5'>
                        <Header context={props.context} />
                    </div>
                    <div className=''>
                        <h1 className='text-center w-100 m-auto py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        <div className="card-group w-75 mx-auto m-5">
                            {
                                props.decades.map((decade, i) => {
                                    return (
                                        <div key={i} className='mx-auto'>
                                            <a href={`/decades/${decade.url}`}>
                                                <div className="card round_thumb">
                                                    <img className="card-img-top round_thumb" src={`../../photos/decades/${decade.name}.jpg`} alt="Card image cap" />
                                                </div>
                                            </a>
                                            <p className='py-3'>{decade.name}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
        if (props.context.folded === false) {
            return (
                <div className='m-auto'>
                    <div className='row align-items-start'>
                        <div className='w-50 m-auto col position-fixed mt-5'>
                            <div className='right-spacest'>
                                <Header />
                            </div>
                            <Sidebar context={props.context} />
                        </div>
                        <div className='col'></div>
                        <div className="card-group col w-50 m-auto mt-5 right-spacer">
                            <h1 className='w-100 py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                            {
                                props.decades.map((item, i) => {
                                    //function to fill in card data below
                                    return (
                                        <div key={i} className='m-auto'>
                                            <a className='nonchalant' href={`/decades/${item.url}`}>
                                                <img className='radius' src={`../../photos/decades/${item.name}.jpg`} alt={`a description of ${item.name} horror`} />
                                                <div className=''>
                                                    <h5>{item.name}</h5>
                                                </div>
                                            </a>
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
                <div className='m-auto'>
                    <div className='w-100 m-auto mt-5'>
                        <Header />
                        <div className='position-fixed'>
                            <Sidebar context={props.context} />
                        </div>
                    </div>
                    <div className=''>
                        <h1 className='text-center w-100 m-auto py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        <div className="card-group w-50 mt-5 m-auto">
                            {
                                props.decades.map((decade, i) => {
                                    return (
                                        <div key={i} className='mx-auto'>
                                            <a href={`/decades/${decade.url}`}>
                                                <div className="card round_thumb">
                                                    <img className="card-img-top round_thumb" src={`../../photos/decades/${decade.name}.jpg`} alt="Card image cap" />
                                                </div>
                                            </a>
                                            <p className='py-3'>{decade.name}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }


    }
}
