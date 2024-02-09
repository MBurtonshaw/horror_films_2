import { React } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/

    const navigate = useNavigate();

    function logoutUser(e) {
        e.preventDefault();
        props.context.actions.signOut();
        navigate('/');
        window.location.reload();
    }

    function content_filler() {
        return (
            <div>
                <h1>Logout</h1>
                <form action='/login' method='POST' onSubmit={logoutUser}>
                    <div>
                        <h1>Are you sure?</h1>
                        <button onClick={logoutUser}>Logout</button>
                    </div>
                </form>

            </div>
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (window.innerWidth < 768) {
        return (
            <div>
                {content_filler()}
                <div>
                    <a href={'/'}>Home</a>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                {content_filler()}
                <div>
                    <a href={'/'}>Home</a>
                </div>
            </div>
        );
    }
}