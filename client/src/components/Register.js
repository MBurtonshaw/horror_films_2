import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from './Error';

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

    let str = window.location.pathname;
    let newString = str.split("/").pop();

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
                <div>
                    <h1>Register</h1>
                    <form action='/login' method='POST' onSubmit={registerUser}>
                        <div>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input type='text' id='name' name='name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}></input>
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                            </div>
                            <button type='submit' onSubmit={registerUser}>Register</button>
                        </div>
                    </form>
                    <div>
                        <p>Already have an account?</p>
                        <a href='/login'>Login</a>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Register</h1>
                    <form action='/login' method='POST' onSubmit={registerUser}>
                        <div>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input type='text' id='name' name='name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}></input>
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                            </div>
                            <button type='submit' onSubmit={registerUser}>Register</button>
                        </div>
                    </form>
                    <div>
                        <p>Already have an account?</p>
                        <a href='/login'>Login</a>
                    </div>
                </div>
            );
        }
    }
}