
import './App.css';
import MovieForm from './components/MovieForm';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [movies,setMovies] = useState([]);
useEffect(()=>{
fetchMovies()
},[])
  const fetchMovies = async() => {
    try{
      const response = axios.get("http://localhost:4000/api/movies");
      setMovies(response.data.movies)

    }catch(err){
console.error('error retrieving movies:',err)
    }
  }
const handleAddMovie = async() => {
await fetchMovies()
}
  return (
    <div className="App">
      <MovieForm onAdd={handleAddMovie}/>
      {
        movies.map((movie)=>(
          <div key={movies.id}>
<h2>{movie.title}</h2>
<p>{movie.description}</p>
            </div>
        ))
      }
    </div>
  );
}

export default App;
