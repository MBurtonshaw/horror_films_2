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
        try {
            let decades = await props.decades;
            if (decades.length > 1) {
                setTypes(decades);
            }
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setTypes]);

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (isLoading) {
        if (window.innerWidth < 768) {
            if (props.decades !== '' && props.decades !== undefined) {
                return (
                    <div className='m-auto'>
                        <div className='w-50 m-auto mt-5'>
                            <Header />
                        </div>
                        <div className="card-group w-100 m-auto mt-4">
                            <h1 className='text-center w-100 mx-auto my-5 mt-2 pt-5'>...Loading...</h1>
                            <div className='mx-auto background_box my-3'>
                                <div className='box_loader'></div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        for (let i = 0; i < props.decades.length; i++) {
            return (
                <div>
                    <h1 className='pt-5 mt-5'>
                        ...Loading...
                    </h1>
                    <div className="card-group">
                        {
                            props.decades.map((i) => {
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
            );
        }
    } else {
        if (error) {
            return (
                <div >
                    <Error message={error} />
                </div>
            );
        }
        if (window.innerWidth < 768) {
            return (
                <div className='m-auto'>
                    <div className='w-50 m-auto mt-5'>
                        <Header context={props.context} user={props.user} />
                    </div>
                    <div className="card-group w-100 m-auto mt-4">
                        <h1 className='text-center w-100 mx-auto my-5 mt-2 pt-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        {
                            types.map((decade, i) => {
                                return (
                                    <div key={i} className='mx-auto background_box my-3'>
                                        <a className='nonchalant' href={`/decades/${decade.url}`}>
                                            <div className="card round_thumb w-50 mx-auto mt-4">
                                                <img className="card-img-top round_thumb" src={`../../photos/decades/${decade.name}.jpg`} alt="Card image cap" />
                                            </div>
                                            <h5 className='py-3'>{decade.name}</h5>
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
                            <div className='row align-items-start'>
                                <Sidebar context={props.context} user={props.user} />
                            </div>
                        </div>
                        <div className='col'></div>
                        <div className="card-group col w-50 m-auto mt-5 right-spacer">
                            <h1 className='w-100 py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                            {
                                types.map((item, i) => {
                                    //function to fill in card data below
                                    return (
                                        <div key={i} className='m-auto'>
                                            <a className='nonchalant' href={`/decades/${item.url}`}>
                                                <img className='round_thumb' src={`../../photos/decades/${item.name}.jpg`} alt={`a description of ${item.name} horror`} />
                                                <h5>{item.name}</h5>
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
                <div className='mt-5'>
                    <Header context={props.context} user={props.user} />
                    <div className='position-fixed'>
                        <Sidebar context={props.context} />
                    </div>
                    <div className="card-group w-75 mx-auto mt-5 background_box">
                        <h1 className='w-100 py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        {
                            types.map((decade, i) => {
                                //function to return contents of the cards and leave the innderWidth conditons below more concise
                                return (
                                    <div key={i} className='mx-auto'>
                                        <div className='py-3'>
                                            <a className='nonchalant' href={`/decades/${decade.url}`}>
                                                <img className='round_thumb' src={`../../photos/decades/${decade.name.toLowerCase()}.jpg`} alt="..." />
                                                <h5 className='p-1'>{decade.name}</h5>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        }
    }
}
