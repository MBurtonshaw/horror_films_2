import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Search from './Search';
import Header from './Header';

export default function Sidebar(props) {

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

    useEffect(() => { getData() }, [setUser]);

    /**************************************************************************************
        MOBILE
    ***************************************************************************************/

    function arrow_button() {
        if (props.context.folded === true) {
            return (
                <div className='w-25 m-auto'>
                    <img id='arrow' src='../../photos/right-arrow.png' className='col' onClick={() => props.context.actions.clicker()} />
                </div>
            );
        } else {
            return (
                <div className='w-25 m-auto'>
                    <img id='arrow' src='../../photos/left-arrow.png' className='col' onClick={() => props.context.actions.clicker()} />
                </div>
            );
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //props.user comes from App.js, where it is derived from a cookie set in /contexts/context.js
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    if (user === '') {
        
        if (props.context.folded === false) {
            return (
                <div id='Header' className='container animate my-5'>
                    <div className=''>

                        {/* <a href="https://www.flaticon.com/free-icons/left-arrow" title="left arrow icons">Left arrow icons created by syafii5758 - Flaticon</a> */}
                        <div className='w-75 m-auto'>
                            <ul>
                                <li><h4><a className='nonchalant' href='/titles'>Titles</a></h4></li>
                                <li><h4><a className='nonchalant' href='/genres'>Genres</a></h4></li>
                                <li><h4><a className='nonchalant' href='/decades'>Decades</a></h4></li>
                                <li><h4><a className='nonchalant' href='/login'>Login</a></h4></li>
                                <li><h4><a className='nonchalant' href='/'>Home</a></h4></li>
                            </ul>
                            
                            
                            
                            
                            <Search />
                        </div>
                        <div className='w-25 m-auto my-5 py-3'>
                            {arrow_button()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='w-25 my-5 py-5'>
                    {arrow_button()}
                </div>
            );
        }
    } else {
        if (props.context.folded === false) {
            return (
                <div id='Header' className='container animate'>
                    <div className='row align-items-start'>

                        {/* <a href="https://www.flaticon.com/free-icons/left-arrow" title="left arrow icons">Left arrow icons created by syafii5758 - Flaticon</a> */}
                        <div className='col w-75 m-auto'>
                            <div className="dropdown w-50 m-auto py-3 px-5">
                                <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img id='menu_icon' className='w-25' alt='a menu icon, three horizontal bars' src='../../photos/menu_icon.png'></img>
                                </button>
                                <ul id='flagger' className="dropdown-menu text-center w-100 m-auto">
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            <a href='/'>Home</a>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            <a href='/titles'>Titles</a>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            <a href='/genres'>Genres</a>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type="button">
                                            <a href='/decades'>Decades</a>
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
                        <div className='w-25 m-auto'>
                            {arrow_button()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='w-25 my-5'>
                    {arrow_button()}
                </div>
            );
        }
    }
}