import { React } from 'react';

export default function TitlePage(props) {

    if (props.context.data.movies.movies.length < 1) {
        return null;
    } else {

        for (let i = 0; i < props.context.data.movies.movies.length; i++) {

            if (window.innerWidth < 768) {
                return (
                    <div>
                        <h1>
                            Titles
                        </h1>
                        <div>
                            <ul>
                                {
                                    props.context.data.movies.movies.map((movie, i) => {
                                        if (movie.id < 7) {
                                            return (
                                                <li key={i}>
                                                    <a href={`/titles/${movie.url}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={i}>
                                                    <a href={`/titles/${movie.url}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h1>
                            Titles
                        </h1>
                        <div>
                            <ul>
                                {
                                    props.context.data.movies.movies.map((movie, i) => {
                                        if (movie.id < 12) {
                                            return (
                                                <li key={i}>
                                                    <a href={`/titles/${movie.url}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={i}>
                                                    <a href={`/titles/${movie.url}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                );
            }
        }
    }
}