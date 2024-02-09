import { React } from 'react';

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
            <div>
                <h1> Decades </h1>
                <div>
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

                            //returning different widths based on screen size
                            if (window.innerWidth < 768) {
                                return (
                                    <div key={i}>
                                        {fill_in()}
                                    </div>
                                );
                            }
                            if (window.innerWidth < 992) {
                                return (
                                    <div key={i}>
                                        {fill_in()}
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div key={i}>
                                        {fill_in()}
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}