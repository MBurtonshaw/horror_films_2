import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Login(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/
    let [data, setData] = useState({
        email: '',
        password: ''
    })

    let [error, setError] = useState('');

    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        if (!data.email) {
            setError('Please enter an email address');
        } else {
            if (!data.password) {
                setError('Please enter a password');
            } else {
                //signing in through Context with email and password from state
                props.context.actions.signIn(data.email, data.password).then(response => {
                    //if there's any response from Context, it'll be an error
                    //so that response will be set to setError and be rendered as <Error /> below
                    if (response) {
                        setError(response);
                    } else {
                        //if there's no response, user is taken to the homepage and is now logged in
                        navigate('/');
                        window.location.reload();
                    }
                });
            }
        }
    }

    function content_filler() {
        if (window.innerWidth < 768) {
            return (
                <div className='m-5'>
                    <h1>Login</h1>
                    <form action='/login' method='POST' onSubmit={loginUser}>
                        <div>
                            <div>
                                <label className='w-100' htmlFor='email'>Email</label>
                                <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                            </div>
                            <div>
                                <label className='w-100' htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                            </div>
                            <button className='my-2' type='submit' onSubmit={loginUser}>Login</button>
                        </div>
                    </form>
                    <div className='mt-5'>
                        <p>Don't have an account yet?</p><a href={'/register'}><button>Register</button></a>
                    </div>
                </div>
            );
        }
        return (
            <div className='m-5 p-5'>
                <h1>Login</h1>
                <form action='/login' method='POST' onSubmit={loginUser}>
                    <div>
                        <div>
                            <label className='w-100' htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                        </div>
                        <div>
                            <label className='w-100' htmlFor='password'>Password</label>
                            <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                        </div>
                        <button type='submit' onSubmit={loginUser}>Login</button>
                    </div>
                </form>
                <div className='mt-5'>
                    <p>Don't have an account yet?</p><a href={'/register'}><button>Register</button></a>
                </div>
            </div>
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (error) {
        if (window.innerWidth < 768) {
            return (
                <div>
                    <Error message={error} />
                    <div>
                        <div><a href='/login'>Back</a></div>
                        <div><a href='/register'>Register</a></div>
                        <div><a href='/'>Home</a></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Error message={error} />
                    <div>
                        <div><a href='/login'>Back</a></div>
                        <div><a href='/register'>Register</a></div>
                        <div><a href='/'>Home</a></div>
                    </div>
                </div>
            );
        }
    } else {
        if (window.innerWidth < 768) {
            return (
                <div>
                    <div className='mt-5 w-50 mx-auto'>
                        <Header context={props.context} user={props.user} />
                    </div>
                    <div>
                        <div className='px-5 background_box'>
                            {content_filler()}
                        </div>
                    </div>
                </div>
            );
        } else if (props.context.folded === true) {
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