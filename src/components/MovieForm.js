import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        release_date: "",
        genre: "",
        poster_url: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://imdb-admin-portal-be.onrender.com/api/movies", formData);
            onAdd();
            setFormData({
                title: "",
                description: "",
                release_date: "",
                genre: "",
                poster_url: ""
            });
        } catch (error) {
            console.error("error in adding movies", error);
        }
    };

    return (
        <div className="container col-sm-6 col-lg-3">
            <h2 className="text-center">Add Movie</h2>
            <form onSubmit={handleSubmit}>

                <div className="row ">
                    <div className=" mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="description" className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="release_date" className="form-label">Release Date</label>
                        <input type="date" className="form-control" name="release_date" value={formData.release_date} onChange={handleChange} required />
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <input type="text" className="form-control" name="genre" value={formData.genre} onChange={handleChange} required />
                    </div>
               
   
                    <div className=" mb-3">
                        <label htmlFor="poster" className="form-label">Poster Url</label>
                        <input type="url" className="form-control" name="poster_url" value={formData.poster_url} onChange={handleChange} required />
                    
                    </div>
                    <div className=" mb-3">
                        <button type="submit" className="btn btn-primary">Add Movies</button>
                    </div>
                
                    </div>
            </form>
        </div>
    );
};

export default MovieForm;
