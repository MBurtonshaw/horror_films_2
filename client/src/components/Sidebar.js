import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Search from './Search';
import Header from './Header';

export default function Sidebar(props) {

    let [user, setUser] = useState('');
    let [isLoading, setIsLoading] = useState(true);

    async function getData() {
        let logger = await props.user;
        if (logger === undefined || logger === '') {
            setUser('');

        } else {
            setUser(logger);
        }
        setIsLoading(false);
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
    if (isLoading) {
        return null;
    } else {
        if (props.context.folded === false) {
            if (user !== undefined) {
                    return (
                        <div id='Header' className='container animate'>
                            <div className=''>
                                {/* <a href="https://www.flaticon.com/free-icons/left-arrow" title="left arrow icons">Left arrow icons created by syafii5758 - Flaticon</a> */}
                                <div>
                                    <div className='my-4'>
                                        <Header context={props.context} user={props.user}/>
                                    </div>
                                    <ul className='straightener'>
                                        <li><h4><a className='nonchalant' href='/titles'>Titles</a></h4></li>
                                        <li><h4><a className='nonchalant' href='/genres'>Genres</a></h4></li>
                                        <li><h4><a className='nonchalant' href='/decades'>Decades</a></h4></li>
                                        <li><h4><a className='nonchalant' href='/list'>My List</a></h4></li>
                                        <li><h4><a className='nonchalant' href='/logout'>Logout</a></h4></li>
                                        <li><h4><a className='nonchalant' href='/'>Home</a></h4></li>
                                    </ul>
                                    <Search />
                                </div>
                                <div className='arrow_downward'>
                                    {arrow_button()}
                                </div>
                            </div>
                        </div>
                    );
            }
            else {
                <div id='Header' className='container animate my-5'>
                    {/* <a href="https://www.flaticon.com/free-icons/left-arrow" title="left arrow icons">Left arrow icons created by syafii5758 - Flaticon</a> */}
                    <div className='w-75 mx-auto'>
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
            }
        } else {
            return (
                <div className='w-25 m-auto my-5 py-3'>
                    {arrow_button()}
                </div>
            );
        }
    }
}

