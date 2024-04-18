import React, { useState } from 'react'
import axios from 'axios';


const MovieForm = ({onAdd}) => {
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        release_date:"",
        genre:"",
        poster_url:""
        })
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
            })
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                await axios.post("http://localhost:4000/api/movies",formData)
                onAdd();
                setFormData({
                    title:"",
                    description:"",
                    release_date:"",
                    genre:"",
                    poster_url:""
                })

            }catch(error){
console.error("error in adding movies",error)
            }
        }
  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' value={formData.title} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor='description'>Description</label>
            <input type='text' name="description" value={formData.description} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor='release_date'>Release Date</label>
            <input type='date' name="release_date" value={formData.release_date} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor='genre'>Genre</label>
            <input type='text' name="genre" value={formData.genre} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor='poster'>Poster Url</label>
            <input type='url' name="poster_url" value={formData.poster_url} onChange={handleChange} required/>
        </div>
        <button type='submit'>Add Movies</button>
      </form>
    </div>
  )
}

export default MovieForm

