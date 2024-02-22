import { React } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DecadesPage(props) {

    let str = window.location.pathname;
    let newString = str.split("/").pop();

    if (props.context.data.movies.movies.length < 1) {
        return (
            <div>
                <h1> Loading... </h1>
                <div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='m-auto'>
                <div className='row align-items-start'>
                    <div className='w-50 m-auto col position-fixed mt-5'>
                        <Header />
                        <Sidebar context={props.context}/>
                    </div>

                    <div className='w-25 m-auto col'></div>
                        <div className="card-group col w-50 m-auto mt-5">
                            <h1 className='w-100 py-5'>{newString.charAt(0).toUpperCase() + newString.slice(1)}</h1>
                        {
                            props.decades.map((item, i) => {

                                //function to fill in card data below
                                function fill_in() {
                                    return (
                                        <div className=''>
                                            <a className='nonchalant' href={`/decades/${item.url}`}>
                                                <img className='radius' src={`../../photos/decades/${item.name}.jpg`} alt={`a description of ${item.name} horror`} />
                                                <div className='p-1'>
                                                    <h5>{item.name}</h5>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={i} className='w-75 m-auto'>
                                        {fill_in()}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}