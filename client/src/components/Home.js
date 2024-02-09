import { React } from 'react';
import Main from './Main';
import Search from './Search';


export default function Home(props) {
    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/
    function searchbar() {
        if (window.innerWidth > 767) {
            return (
                <div>
                    <Search movies={props.context.movies} />
                    <h1> Horror Films </h1>
                </div>
            );
        } else if (window.innerWidth < 768) {
            return (
                <div>
                    <Search movies={props.context.movies} />
                </div>
            );
        }
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/

    return (
        <div>
            <div>
                {searchbar()}
                <Main />
            </div>
        </div>
    );


}