import { React } from 'react';
import Main from './Main';

export default function Home(props) {
    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/


    /**************************************************************************************
        RENDER
    ***************************************************************************************/

    return (
        <div>
            <div>
                <Main context={props.context} />
            </div>
        </div>
    );


}