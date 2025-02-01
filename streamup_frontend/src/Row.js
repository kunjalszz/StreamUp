import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

const posterBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState(""); // Fix: Initialize as empty string

    // Fetch movies from API
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    // Handle clicking on a movie poster
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl(""); // Close trailer if it's already playing
        } else {
            movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
                .then((url) => {
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get('v'));
                    } else {
                        console.log("Trailer not found.");
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="row">
            <h4>{title}</h4>
            <div className="posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${posterBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {/* Trailer only appears when a poster is clicked */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
