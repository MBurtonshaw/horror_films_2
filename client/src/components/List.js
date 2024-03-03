import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Error from './Error';
import Sidebar from './Sidebar';
import Header from './Header';

export default function List(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/

    let [filmList, setFilmList] = useState('');
    let finalArray = [];
    let [error, setError] = useState('');
    let [user, setUser] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    let str = window.location.pathname;
    let newString = str.split("/").pop();

    async function getData() {
        if (isLoading) {
            if (filmList.length < 1) {
                if (!user) {
                    return null;
                } else {
                    let cookie_array = [];
                    for (let i = 0; i < props.context.data.movies.movies.length; i++) {
                        let cookies = Cookies.get(`myList-${user.email}-${i}`);
                        if (cookies !== undefined) {
                            cookie_array.push(cookies);
                        }
                    }
                    props.context.data.movies.movies.forEach(
                        item => {
                            if (cookie_array.includes(item.title)) {
                                finalArray.push(item);
                                setFilmList(finalArray);
                            }
                        }
                    );
                }
                //setIsLoading(false);
            }
        }
    }
    useEffect(() => { setUser(props.user) });
    useEffect(() => { getData() });

    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/
    //function to avoid an error and check if there are no films in state on pageload
    //if there are films present, it will return them as list items
    function mapper() {
        if (filmList.length < 1) {
            return null;
        } else {
            if (window.innerWidth < 768) {
                return (
                    filmList.map((item, i) =>
                        <div className='my-2'>
                            <li key={i}>
                                <div className='w-100 py-2'>
                                    <a href={`/titles/${item.url}`}> <img className='round_thumb' src={`../../photos/titles/${item.url}_round.jpg`} /> </a>
                                </div>
                                <div className='py-2'>
                                    <span className='w-100 mx-auto'>{item.title}</span>
                                </div>
                                <button onClick={() => {
                                    Cookies.remove(`myList-${user.email}-${item.id}`, { path: `/` });
                                    window.location.reload();
                                }}>remove</button>
                            </li>
                        </div>
                    )
                );
            }
            if (props.context.folded === true) {
                return (
                    filmList.map((item, i) =>
                        <div key={i} className='w-25 mx-auto my-3'>
                            <div className='mx-auto'>
                                <div>
                                    <a href={`/titles/${item.url}`}>
                                        <img className='round_thumb' src={`../../photos/titles/${item.url}_round.jpg`} />
                                    </a>
                                    <div className='mx-auto my-3'>
                                        <a className='nonchalant' href={`/titles/${item.url}`}> {item.title} </a>
                                        <div className='w-50 mx-auto my-2'>
                                            <button onClick={() => {
                                                Cookies.remove(`myList-${user.email}-${item.id}`, { path: `/` });
                                                window.location.reload();
                                            }}>remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                );
            } else {
                return (
                    filmList.map((item, i) =>
                        <div key={i} className='mx-auto my-5'>
                            <a className='' href={`/titles/${item.url}`}>
                                <img className='round_thumb' src={`../../photos/titles/${item.url}_round.jpg`} />
                            </a>
                            <div className='mt-3'>
                                <a className='nonchalant m-auto' href={`/titles/${item.url}`}> {item.title} </a>
                                <div className='m-auto'>
                                    <button onClick={() => {
                                        Cookies.remove(`myList-${user.email}-${item.id}`, { path: `/` });
                                        window.location.reload();
                                    }}>remove</button>
                                </div>
                            </div>
                        </div>
                    )
                );
            }
        }
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/

    //checking if there are any cookies present. It not, this is returned
    if (error) {
        return (
            <div className='m-5 p-5'>
                <Error message={error} />
            </div>
        );
    }
    if (isLoading) {
        return (
            <div>
                <h1> Loading... </h1>
            </div>
        );
    } else {
        if (!document.cookie || JSON.parse(Cookies.get('signedIn?')) === '' || JSON.parse(Cookies.get('signedIn?')) === undefined) {
            return (
                <div>
                    <h1> My List </h1>
                    <div>
                        <h2>Please login first</h2>
                        <div>
                            <a href='/login'>Login</a>
                        </div>
                        <div >
                            <a href='/'>Home</a>
                        </div>
                    </div>
                </div>
            );
        } else {
            //loading screen based on isLoading from getData function
            if (window.innerWidth < 768) {
                return (
                    <div className='w-100 m-auto mt-5'>
                        <div className='w-50 mx-auto'>
                            <Header context={props.context} user={props.user} />
                        </div>
                        <div className="card-group w-100 m-auto background_box row align-items-start mt-3">
                            <h1 className='text-center w-100 mx-auto my-5 mt-2 pt-5'> My List </h1>
                            {mapper()}
                        </div>
                    </div>
                );
            }
            if (props.context.folded === true) {
                return (
                    <div className='w-100 mx-auto mt-5'>
                        <Header />
                        <div className='position-fixed'>
                            <Sidebar context={props.context} />
                        </div>
                        <div className="card-group w-75 mx-auto row align-items-start background_box">
                            <h1 className='py-5'> My List </h1>
                            {mapper()}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='mx-auto background_box'>
                        <div className='row align-items-start'>
                            <div className='w-50 mx-auto col position-fixed mt-5'>
                                <Sidebar context={props.context} />
                            </div>
                            <div className='col'></div>
                            <div className='col'>
                                <h1 className='my-5'> My List </h1>
                                {mapper()}
                            </div>
                        </div>
                    </div>
                );
            }
            //if the signedIn? cookie has user data, this is returned
        }
    }
}