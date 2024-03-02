import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Register(props) {

    /**************************************************************************************
        STATE
    ***************************************************************************************/
    let [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    let [error, setError] = useState('');

    /**************************************************************************************
        FUNCTIONS
    ***************************************************************************************/
    let navigate = useNavigate();

    function registerUser(e) {
        e.preventDefault();
        if (!data.name) {
            setError('Please enter a name');
        } else {
            if (!data.email) {
                setError('Please enter an email');
            } else {
                if (!data.password) {
                    setError('Please enter a password');
                } else {
                    props.context.actions.registerUser(data.name, data.email, data.password).then(response => {
                        if (!response) {
                            navigate('/login');
                        }
                    });
                }
            }
        }
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
                        <div><a href='/register'>Back</a></div>
                        <div><a href='/login'>Login</a></div>
                        <div><a href='/'>Home</a></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Error message={error} />
                    <div>
                        <div><a href='/register'>Back</a></div>
                        <div><a href='/login'>Login</a></div>
                        <div><a href='/'>Home</a></div>
                    </div>
                </div>
            );
        }
    } else {
        if (window.innerWidth < 768) {
            return (
                <div className='m-auto'>
                    <div className='w-50 m-auto mt-5'>
                        <Header context={props.context} user={props.user} />
                    </div>
                    <div className='px-5 background_box'>
                        <h1 className='my-3 mt-5'>Register</h1>
                        <form action='/register' method='POST' onSubmit={registerUser}>
                            <div className='text-center'>
                                <div>
                                    <label className='w-100' htmlFor='name'>Name</label>
                                    <input type='text' id='name' name='name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}></input>
                                </div>
                                <div>
                                    <label className='w-100' htmlFor='email'>Email</label>
                                    <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                                </div>
                                <div>
                                    <label className='w-100' htmlFor='password'>Password</label>
                                    <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                                </div>
                                <button className='my-2' type='submit' onSubmit={registerUser}>Register</button>
                            </div>
                        </form>
                        <div className='my-5'>
                            <p>Already have an account?</p>
                            <a href='/login'><button>Login</button></a>
                        </div>
                    </div>
                </div>
            );
        } else {
            if (props.context.folded === true) {
                return (
                    <div className='mt-5'>
                        <Header />
                        <div className='row align-items-start'>
                            <div className='w-50 m-auto mt-5 col'>
                                <Sidebar context={props.context} />
                            </div>

                            <div className='m-5 p-5 col'>
                                <h1>Register</h1>
                                <form action='/login' method='POST' onSubmit={registerUser}>
                                    <div>
                                        <div>
                                            <label className='w-100' htmlFor='email'>Email</label>
                                            <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                                        </div>
                                        <div>
                                            <label className='w-100' htmlFor='password'>Password</label>
                                            <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                                        </div>
                                        <button type='submit' onSubmit={registerUser}>Login</button>
                                    </div>
                                </form>
                                <div className='mt-5'>
                                    <p>Already have an account?</p><a href={'/login'}><button>Login</button></a>
                                </div>
                            </div>

                            <div className='col'></div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='row align-items-start background_box'>
                        <Header />
                        <div className='col'>
                            <Sidebar context={props.context} />
                        </div>
                        <div className='col'>
                            <div className='m-5 p-5'>
                                <h1>Register</h1>
                                <form action='/login' method='POST' onSubmit={registerUser}>
                                    <div>
                                        <div>
                                            <label className='w-100' htmlFor='email'>Email</label>
                                            <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                                        </div>
                                        <div>
                                            <label className='w-100' htmlFor='password'>Password</label>
                                            <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                                        </div>
                                        <button type='submit' onSubmit={registerUser}>Login</button>
                                    </div>
                                </form>
                                <div className='mt-5'>
                                    <p>Already have an account?</p><a href={'/login'}><button>Login</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

        }
    }
}