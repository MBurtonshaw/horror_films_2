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
    let str = window.location.pathname;
    let newString = str.split("/").pop();

    

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
        if (props.decades.length < 1) {
            return (
                <div >
                    <h1 > Loading... </h1>
                    <div >
                    </div>
                </div>
            );
        } 
        
        if (props.context.folded === false) {
            return (
                <div className='m-auto'>
                    <div className='row align-items-start'>
                        <div className='w-50 m-auto col position-fixed mt-5'>
                            <Header />
                            <Sidebar context={props.context}/>
                        </div>
                        <div className='col'></div>
                        <div className="card-group col w-50 m-auto mt-5 right-space">
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
            return(
            <div className='m-auto'>

                                <div className='w-100 m-auto mt-5'>
                                    <Header />
                                    <div className='position-fixed'>
                                        <Sidebar context={props.context} />
                                    </div>

                                </div>
                                <div className='m-auto'>
                                    <h1 className='text-center w-100 m-auto py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                                    <div className="card-group w-75 mt-5 m-auto">
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
