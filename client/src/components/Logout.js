import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

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
            <div className='m-5 p-5'>
                <h1>Logout</h1>
                <form action='/login' method='POST' onSubmit={logoutUser}>
                    <div>
                        <h2 className='mt-5'>Are you sure?</h2>
                        <button className='mt-2' onClick={logoutUser}>Logout</button>
                    </div>
                </form>
                <a href={'/'}><button className='mt-2'>Home</button></a>
            </div>
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (window.innerWidth < 768) {
        return (
            <div>
                <div className='mt-5 w-50 mx-auto'>
                    <Header context={props.context} user={props.user} />
                </div>
                <div className='p-5 background_box'>
                    <h1>Logout</h1>
                    <form action='/login' method='POST' onSubmit={logoutUser}>
                        <div>
                            <h2 className='mt-5'>Are you sure?</h2>
                            <button className='mt-2' onClick={logoutUser}>Logout</button>
                        </div>
                    </form>
                    <a href={'/'}><button className='mt-2'>Home</button></a>
                </div>
            </div>
        );
    } else {
        if (props.context.folded === true) {
            return (
                <div>
                    <Header />
                    <div>
                        <div className='w-50 m-auto position-fixed mt-5'>
                            <Sidebar context={props.context} />
                        </div>
                        <div className='w-25 m-auto px-5'>
                            {content_filler()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='row align-items-start'>
                    <Header />
                    <div className='col'>
                        <Sidebar context={props.context} />
                    </div>
                    <div className='col'>
                        {content_filler()}
                    </div>
                </div>
            );
        }
    }
}