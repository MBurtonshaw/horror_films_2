import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Search from './Search';

export default function Header() {

    let [user, setUser] = useState('');

    function getData() {
        if (!document.cookie) {
            setUser('');
        } else {
            let logger = Cookies.get('signedIn?');
            if (logger === undefined) {
                return null;
            } else {
                let newLogger = JSON.parse(logger);
                if (newLogger === '') {
                    setUser('');
                } else {
                    setUser(newLogger);
                }
            }
        }
    }

    useEffect(() => { getData() }, [ setUser ]);

    /**************************************************************************************
        MOBILE
    ***************************************************************************************/

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //props.user comes from App.js, where it is derived from a cookie set in /contexts/context.js
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    if (user === '') {
        return (
            <div id='Header' className='container animate'>
                <div className="dropdown w-50 m-auto py-3 px-5">
                    <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img id='menu_icon' className='w-25' alt='a menu icon, three horizontal bars' src='../../photos/menu_icon.png'></img>
                    </button>
                    <ul className="dropdown-menu text-center w-100 m-auto">
                        <li>
                            <button className="dropdown-item" type="button">
                                <a href='/'>Home</a>
                            </button>
                        </li>

                        <li>
                            <button className="dropdown-item" type="button">
                                <a href='/login'>Login</a>
                            </button>
                        </li>
                    </ul>
                </div>
                <Search />
            </div>
        );
    } else {
        return (
            <div id='Header' className='container'>
                <div className="dropdown w-50 m-auto py-3 px-5">
                    <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img id='menu_icon' className='w-25' alt='a menu icon, three horizontal bars' src='../../photos/menu_icon.png'></img>
                    </button>
                    <ul className="dropdown-menu text-center w-100 m-auto">
                        <li>
                            <button className="dropdown-item" type="button">
                                <a href='/'>Home</a>
                            </button>
                        </li>

                        <li>
                            <button className="dropdown-item" type="button">
                                <a href='/list'>My List</a>
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button">
                                <a href='/logout'>Logout</a>
                            </button>
                        </li>
                    </ul>
                </div>
                <Search />
            </div>
        );
    }

}