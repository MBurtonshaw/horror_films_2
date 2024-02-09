import { React } from 'react';

export default function NotFound(props) {
    if (window.innerWidth < 768) {
        return (
            <div>
                <div>
                    <h1>{props.message}</h1>
                    <h1>Not Found</h1>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div>
                <h1>{props.message}</h1>
                <h1>Not Found</h1>
            </div>
        </div>
    );
}