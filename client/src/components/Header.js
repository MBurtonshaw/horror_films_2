import { React } from 'react';
import { useParams } from 'react-router-dom';

export default function Header() {
    let str = window.location.pathname;
    function titleName() {
        if (str === '/') {
            return(
                <div className='mt-5'>
                    <h1><a href='/' className='nonchalant'>Horror Films</a></h1>
                </div>
            );
        } else {
            let newString = str.split("/").pop();
            return(
                <div className='mt-5'>
                    <h1><a href='/' className='nonchalant'>Horror Films</a></h1>
                    <h1 className='pt-2'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                </div>
                
            )
        }
    };

    return (
        <div>
            {titleName()}
        </div>
    );
}
