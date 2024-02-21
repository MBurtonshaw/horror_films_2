import { React } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DecadesPage(props) {

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
                        <Sidebar />
                    </div>
                    <div className='w-25 m-auto col'></div>
                    <div className='w-25 m-auto col px-5'>
                        {
                            props.decades.map((item, i) => {

                                //function to fill in card data below
                                function fill_in() {
                                    return (
                                        <div>
                                            <a href={`/decades/${item.url}`}>
                                                <img src={`../../photos/decades/${item.name}.jpg`} alt={`a description of ${item.name} horror`} />
                                                <div>
                                                    <h5>{item.name}</h5>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={i}>
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