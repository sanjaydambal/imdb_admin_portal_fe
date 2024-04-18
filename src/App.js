import './App.css';
import MovieForm from './components/MovieForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/movies");
            setMovies(response.data.movie);
        } catch (err) {
            console.error('Error retrieving movies:', err);
        }
    };

    const handleAddMovie = async () => {
        await fetchMovies();
    };

    return (
        <div className="App">
            <div className="container mt-5">
                <MovieForm onAdd={handleAddMovie} />
                <div className="row mt-3">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={movie.poster_url} className="card-img-top" alt={movie.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">{movie.description}</p>
                                    <p className="card-text"><small className="text-muted">Release Date: {movie.release_date}</small></p>
                                    <p className="card-text"><small className="text-muted">Genre: {movie.genre}</small></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
