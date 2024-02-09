import { React } from 'react';

export default function Error(props) {
    if (window.innerWidth < 768) {
        return (
            <div>
                <div>
                    <h1>Error: </h1>
                    <h1>{props.message}</h1>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div>
                <h1>Error: </h1>
                <h1>{props.message}</h1>
            </div>
        </div>
    );
}