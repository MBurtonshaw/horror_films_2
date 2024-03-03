import { React, useState, useEffect } from 'react';
import Error from './Error';

export default function Search(props) {

    /************************************************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ************************************************************************************************************************/
    let [error, setError] = useState('');

    //sorting movies by title
    async function getData() {
        try {
            let waiter = await props.movies;
            if (waiter === undefined) {
                return null;
            } else {
                for (let i = 0; i < waiter.length; i++) {
                    titleArray.push(waiter[i]);
                }
            }
            let str = window.location.pathname;
            let newString = str.split("/").pop();
            //function to append a message when the searchbar is focused upon/////////////////////////////////////


        } catch (err) {
            setError(err.message);
        }
    }

    //function to change url based on search term from state
    async function clicker() {
        const searcher = document.getElementById('searchBar');
        try {
            window.location.href = `/results/${searcher.value}`;
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => { getData() }, []);

    /************************************************************************************************************************
        FUNCTIONS
    ************************************************************************************************************************/
    //////////////////////////////////////////////////////////////////////////////////////////////////////

    let titleArray = [];

    //logging search value and setting to uppercase


    /************************************************************************************************************************
        RENDER
    ************************************************************************************************************************/

    if (error) {
        return (
            <div>
                <Error message={error} />
            </div>
        );
    } else {

        return (
            <div>
                <input id='searchBar' name='searchInput' type='text' ></input>
                <button id='searchButton' htmlFor='searchInput' onClick={() => clicker()}> Find </button>
                <div id="liveAlertPlaceholder"></div>
            </div>
        );
    }

}