import { React, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Main(props) {

    let first, second, third, fourth, fifth, sixth;

    let season;

    let [films, setFilms] = useState('');
    let [genres, setGenres] = useState('');

    async function getData() {
        let movies = await props.context.data.movies.movies;
        let genres = await props.context.data.movies.genres;
        setFilms(movies);
        setGenres(genres);
    }

    useEffect(() => { getData() }, [setFilms, setGenres]);

    let str = window.location.pathname;
    let newString = str.split("/").pop();

    const setter = new Date();
    const month = setter.getMonth() + 1;

    if (month === 9 || month === 10 || month === 11) {

        first = {
            memo: 'An escaped mental patient stalks high school girls on Halloween night.',
            title: 'Halloween',
            url: 'halloween'
        };
        second = {
            memo: 'Two sisters suddenly have to learn to deal with some physical changes.',
            title: 'Ginger Snaps',
            url: 'ginger_snaps'
        };
        third = {
            memo: 'A scientist devotes his studies to raising the dead, regardless of consequences.',
            title: 'The Curse of Frankenstein',
            url: 'curse_of_frankenstein'
        };
        fourth = {
            memo: 'A woman is cursed to be followed by an entity until her death.',
            title: 'It Follows',
            url: 'it_follows'
        };
        fifth = {
            memo: 'In Colonial America, a baby is stolen from an outcast family and taken to the woods.',
            title: 'The VVitch',
            url: 'the_vvitch'
        };
        sixth = {
            memo: 'Herbert West has concocted a formula to bring the recently dead back to life.',
            title: 'Re-Animator',
            url: 're_animator'
        };
        season = 'Autumn';

    } else if (month === 12 || month === 1 || month === 2) {

        //first = 'black_christmas';
        first = {
            memo: 'It\'s Christmas, and people are celebrating; but a sorority house is receiving disturbing phone calls.',
            title: 'Black Christmas',
            url: 'black_christmas'
        };
        second = {
            memo: 'Following the Mexican-American War, a military regiment takes in a stranger on a snowy night.',
            title: 'Ravenous',
            url: 'ravenous'
        };
        third = {
            memo: 'A father buys his son a rare pet as a Christmas present from a mysterious shop in Chinatown.',
            title: 'Gremlins',
            url: 'gremlins'
        };
        fourth = {
            memo: 'Somewhere in Antarctica, American researchers rescue a dog and take it back to camp.',
            title: 'The Thing',
            url: 'the_thing'
        };
        fifth = {
            memo: 'A local Canadian radio host finds himself reporting on strange stories during a snowstorm.',
            title: 'Pontypool',
            url: 'pontypool'
        };
        sixth = {
            memo: 'A group of people record their life in an abandoned hotel while converting it into a haunted house attraction.',
            title: 'Hell House LLC',
            url: 'hell_house_llc'
        };
        season = 'Winter';
    } else if (month === 3 || month === 4 || month === 5) {
        first = {
            memo: 'Something\'s in the mist that\'s descended upon a small town in Maine.',
            title: 'The Mist',
            url: 'the_mist'
        };
        second = {
            memo: 'In a cabin in the woods, someone reads from an ancient book and causes the Deadites to rise.',
            title: 'Evil Dead',
            url: 'evil_dead'
        };
        third = {
            memo: 'Things become strange between two lighthouse keepers while alone on an island.',
            title: 'The Lighthouse',
            url: 'the_lighthouse'
        };
        fourth = {
            memo: 'A grandmother\'s death causes problems to surface in her daughter\'s family.',
            title: 'Hereditary',
            url: 'hereditary'
        };
        fifth = {
            memo: 'A woman yearns for fame while working on a farm, waiting for her husband to return from war.',
            title: 'Pearl',
            url: 'pearl'
        };
        sixth = {
            memo: 'Boys around town are being kidnapped by a man with a black van.',
            title: 'Black Phone',
            url: 'black_phone'
        };
        season = 'Spring';
    } else {
        first = {
            memo: 'A teenage babysitter receives disturbing phone calls while watching some children.',
            title: 'The Sitter',
            url: 'the_sitter'
        };
        second = {
            memo: 'Two criminal brothers take a family hostage in order to find safety over the Mexican border.',
            title: 'From Dusk Till Dawn',
            url: 'dusk_till_dawn'
        };
        third = {
            memo: 'A man calls on a vengeful creature to punish those that wronged him.',
            title: 'Pumpkinhead',
            url: 'pumpkinhead'
        };
        fourth = {
            memo: 'High school students are being murdered by a killer who loves horror movies.',
            title: 'Scream',
            url: 'scream'
        };
        fifth = {
            memo: 'A group of people band together as a virus causes everyone else to mutate and attack.',
            title: 'Planet Terror',
            url: 'planet_terror'
        };
        sixth = {
            memo: 'Local graves are being desecrated, and a van full of people has just stumbled onto the wrong property.',
            title: 'The Texas Chainsaw Massacre',
            url: 'texas_chainsaw_massacre'
        };
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
                <div>
                    <a href={`/titles/${number.url}`}>
                        <img id={number.url} className='smaller_img' src={`../../photos/titles/${number.url}_mini.jpg`} alt={`a movie poster for ${number.title}`} />
                    </a>
                    <p>{`${number.memo}`}</p>
                </div>
            </div>
        );
    }

    //function to fill out cards with the flashcard class and the picture on the right side
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_1(number) {
        return (
            <div className='row align-items-start'>
                <div className='col w-50 m-auto'>
                    <a href={`/titles/${number.url}`}>
                        <img id={number.url} className='round_thumb' src={`../../photos/titles/${number.url}_round.jpg`} alt={`a movie poster for ${number.title}`} />
                    </a>
                    <p className='py-3 w-75 m-auto'>{number.memo}</p>
                </div>
                <div className='col w-50 m-auto'>

                </div>
            </div>
        );
    }
    //function to fill out cards with the flashcard class and the picture on the left side
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_2(number) {
        return (
            <div className='row align-items-start'>
                <div className='col w-50 m-auto'>

                </div>
                <div className='col w-50 m-auto'>
                    <a href={`/titles/${number.url}`}>
                        <img id={number.url} className='round_thumb' src={`../../photos/titles/${number.url}_round.jpg`} alt={`a movie poster for ${number.title}`} />
                    </a>
                    <p className='py-3 w-75 m-auto'>{number.memo}</p>
                </div>
            </div>
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (window.innerWidth < 768) {
        return (
            <div>
                <div>
                    <h2> {season} Recommendations </h2>

                    {/* the first card doesn't use the card_filler function because it is supposed to be visible on pageload */}
                    <div>
                        <div className='row align-items-start'>
                            <div className='col'>
                                <a href={`/titles/${first.url}`}>
                                    <img id={first.url} className='smaller_img' src={`../../photos/titles/${first.url}_mini.jpg`} alt={`a movie poster for ${first.title}`} />
                                </a>
                                <p>{first.memo}</p>
                            </div>
                        </div>
                    </div>
                    {card_filler_mobile(second)}
                    {card_filler_mobile(third)}
                    {card_filler_mobile(fourth)}
                    {card_filler_mobile(fifth)}
                    {card_filler_mobile(sixth)}
                </div>
            </div>
        );
    } else {
        return (
            <div className='row align-items-start'>
                <div className='w-50 m-auto col position-fixed mt-5'>
                    <Header />
                    <Sidebar context={props.context}/>
                </div>
                <div className='w-25 m-auto col'></div>
                <div className='w-25 m-auto col px-5 my-5'>
                    <h2 className='py-5 mt-5'> {season} Recommendations </h2>

                    {/* the first two cards don't use the card_filler functions because they are supposed to be visible on pageload */}
                    <div className='row align-items-start'>
                        <div className='col w-50 m-auto mt-3'>
                            <a href={`/titles/${first.url}`}>
                                <img id={first.url} className='round_thumb' src={`../../photos/titles/${first.url}_round.jpg`} alt={`a movie poster for ${first.title}`} />
                            </a>
                            <p className='py-3 w-75 m-auto'>{first.memo}</p>
                        </div>
                        <div className='col w-50 m-auto'>
                        </div>
                    </div>
                    {card_filler_2(second)}
                    {card_filler_1(third)}
                    {card_filler_2(fourth)}
                    {card_filler_1(fifth)}
                    <div className='row align-items-start mb-5'>
                        <div className='col w-50 m-auto'>
                        </div>
                        <div className='col w-50 m-auto'>
                            <a href={`/titles/${sixth.url}`}>
                                <img id={sixth.url} className='round_thumb' src={`../../photos/titles/${sixth.url}_round.jpg`} alt={`a movie poster for ${sixth.title}`} />
                            </a>
                            <p className='py-3 w-75 m-auto'>{sixth.memo}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}






