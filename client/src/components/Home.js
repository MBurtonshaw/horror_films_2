import { React } from 'react';
import Main from './Main';



export default function Home(props) {
    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/
    function searchbar() {
        if (window.innerWidth > 767) {
            return (
                <div>

                    <h1 className='py-5'> Horror Films </h1>
                </div>
            );
        } else if (window.innerWidth < 768) {
            return (
                <div>

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