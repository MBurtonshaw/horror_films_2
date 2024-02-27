import { React, useState, useEffect } from 'react';
import Header from './Header';
import Search from './Search';

export default function Main(props) {

    let first, second, third, fourth, fifth, sixth;
    let season;
    let [films, setFilms] = useState('');
    let [isLoading, setIsLoading] = useState(true);

    async function getData() {
        let movies = await props.context.data.movies.movies;
        setFilms(movies);
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setFilms]);

    const setter = new Date();
    const month = setter.getMonth() + 1;

    function card_filler(number) {
        return ({
            memo: films[number].memo,
            title: films[number].title,
            url: films[number].url
        });
    }

    if (month === 9 || month === 10 || month === 11) {
        if (isLoading === true) {
            return null;
        }
        first = card_filler(24);
        second = card_filler(2);
        third = card_filler(10);
        fourth = card_filler(25);
        fifth = card_filler(3);
        sixth = card_filler(30);
        season = 'Autumn';

    } else if (month === 12 || month === 1 || month === 2) {
        if (isLoading === true) {
            return null;
        }
        first = card_filler(11);
        second = card_filler(9);
        third = card_filler(29);
        fourth = card_filler(25);
        fifth = card_filler(3);
        sixth = card_filler(30);
        season = 'Winter';
    } else if (month === 3 || month === 4 || month === 5) {
        if (isLoading === true) {
            return null;
        }
        first = card_filler(7);
        second = card_filler(21);
        third = card_filler(14);
        fourth = card_filler(15);
        fifth = card_filler(19);
        sixth = card_filler(18);
        season = 'Spring';
    } else {
        if (isLoading === true) {
            return null;
        }
        first = card_filler(0);
        second = card_filler(8);
        third = card_filler(14);
        fourth = card_filler(26);
        fifth = card_filler(28);
        sixth = card_filler(20);
        season = 'Summer';
    }

    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/
    //function to fill out cards with the flashcard class on smaller screens
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_mobile(number) {
        return (
            <div>
                <div className='background_box my-5 py-5'>
                    <a href={`/titles/${number.url}`}>
                        <img id={number.url} className='round_thumb' src={`../../photos/titles/${number.url}_round.jpg`} alt={`a movie poster for ${number.title}`} />
                    </a>
                    <p className='m-auto mx-5 pt-5'>{`${number.memo}`}</p>
                </div>
            </div>
        );
    }

    //function to fill out cards with the flashcard class and the picture on the right side
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_left(number) {
        return (
            <div className='row align-items-start background_box py-5 my-3'>
                <div className='col w-50 m-auto'>
                    <a href={`/titles/${number.url}`}>
                        <img id={number.url} className='round_thumb' src={`../../photos/titles/${number.url}_round.jpg`} alt={`a movie poster for ${number.title}`} />
                    </a>
                </div>
                <div className='col w-50 m-auto'>
                    <p className='py-3 w-75 m-auto'>{number.memo}</p>
                </div>
            </div>
        );
    }
    //function to fill out cards with the flashcard class and the picture on the left side
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_right(number) {
        return (
            <div className='row align-items-start background_box py-5 my-3'>
                <div className='col w-50 m-auto'>
                    <p className='py-3 w-75 m-auto'>{number.memo}</p>
                </div>
                <div className='col w-50 m-auto'>
                    <a href={`/titles/${number.url}`}>
                        <img id={number.url} className='round_thumb' src={`../../photos/titles/${number.url}_round.jpg`} alt={`a movie poster for ${number.title}`} />
                    </a>
                </div>
            </div>
        );
    }

    function user_info() {
        if (document.cookie.signedIn === '') {
            return (
                <div className='w-75 h-100 m-auto'>
                    <ul className='little-right'>
                        <li><h4><a className='nonchalant' href='/titles'>Titles</a></h4></li>
                        <li><h4><a className='nonchalant' href='/genres'>Genres</a></h4></li>
                        <li><h4><a className='nonchalant' href='/decades'>Decades</a></h4></li>
                        <li><h4><a className='nonchalant' href='/list'>My List</a></h4></li>
                        <li><h4><a className='nonchalant' href='/logout'>Logout</a></h4></li>
                    </ul>
                    <Search />
                </div>
            );
        } else {
            return (
                <div className='w-75 h-100 m-auto'>
                    <ul className='little-right'>
                        <li><h4><a className='nonchalant' href='/titles'>Titles</a></h4></li>
                        <li><h4><a className='nonchalant' href='/genres'>Genres</a></h4></li>
                        <li><h4><a className='nonchalant' href='/decades'>Decades</a></h4></li>
                        <li><h4><a className='nonchalant' href='/login'>Login</a></h4></li>
                    </ul>
                    <Search />
                </div>
            );
        }
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (window.innerWidth < 768) {
        return (
            <div >
                <div className='w-50 m-auto mt-5'>
                    <Header context={props.context} />
                </div>
                <h2 className='pt-5 my-2'> {season} Recommendations </h2>
                {/* the first two cards don't use the card_filler functions because they are supposed to be visible on pageload */}
                {card_filler_mobile(first)}
                {card_filler_mobile(second)}
                {card_filler_mobile(third)}
                {card_filler_mobile(fourth)}
                {card_filler_mobile(fifth)}
                {card_filler_mobile(sixth)}
            </div>
        );
    }
    return (
        <div className='row align-items-start mx-auto'>
            <div className='w-50 h-100 m-auto pt-5 col position-fixed'>
                <Header />
                <div id='Header' className='container animate my-5'>
                    {/* <a href="https://www.flaticon.com/free-icons/left-arrow" title="left arrow icons">Left arrow icons created by syafii5758 - Flaticon</a> */}
                    {user_info()}
                </div>
            </div>
            <div className='m-auto col'></div>
            <div className='m-auto col mx-5 my-5'>
                <h2 className='py-5 my-2'> {season} Recommendations </h2>
                {/* the first two cards don't use the card_filler functions because they are supposed to be visible on pageload */}
                {card_filler_left(first)}
                {card_filler_right(second)}
                {card_filler_left(third)}
                {card_filler_right(fourth)}
                {card_filler_left(fifth)}
                {card_filler_right(sixth)}
            </div>
        </div>
    );
}






