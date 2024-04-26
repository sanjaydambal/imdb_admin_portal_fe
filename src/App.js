import './App.css';
// import MovieForm from './components/MovieForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateMovie from './components/UpdateMovie';

function App() {
    const [movies, setMovies] = useState([]);
    const [updateMovies,setUpdateMovies] = useState(null)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const apiURL = process.env.REACT_APP_API_BASE_URL || "https://imdb-admin-portal-be.onrender.com";
    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${apiURL}/api/movies`);
            setMovies(response.data.movie);
        } catch (err) {
            console.error('Error retrieving movies:', err);
        }
    };

    const handleAddUpdateMovie = async () => {
        setUpdateMovies(null)
        await fetchMovies();

    };
    const handleCancel = () => {
        setUpdateMovies(null)
    }
  
    const handleDeleteMovie = async (id) => {
        try {
            setMovieToDelete(id);
            setShowConfirmationModal(true);
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };
    
    

    const confirmDelete = async () => {
        try {
            await axios.delete(`${apiURL}/api/movies/${movieToDelete}`);
            await fetchMovies();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
        setShowConfirmationModal(false);
        setMovieToDelete(null);
    };

    return (
        <div className="App">
            <div className="container mt-5">
                <UpdateMovie onUpdate={handleAddUpdateMovie} onCancel= {handleCancel} movie={updateMovies} />
                <div className="row mt-3">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={movie.poster_url} className="card-img-top inline" width="250" height="400" alt={movie.title} />
                               
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">{movie.description}</p>
                                    <p className="card-text"><small className="text-muted">Release Date: {movie.release_date}</small></p>
                                    <p className="card-text"><small className="text-muted">Genre: {movie.genre}</small></p>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 btn-primary primary gap-1" onClick={() => setUpdateMovies(movie)}>Update</button>
                                    <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showConfirmationModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Are you sure you want to delete this movie?</p>
                            <div>
                                <button onClick={confirmDelete}>Confirm</button>
                                <button onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
