import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const axios = require("axios");

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = async () => {
		setIsLoading(true);
		setError(null);

		const options = {
			url: "https://swapi.dev/api/films/",
		};

		try {
			const resp = await axios(options);
			const transformedMovies = resp.data.results.map((movie) => {
				return {
					id: movie.episode_id,
					title: movie.title,
					openingText: movie.opening_crawl,
					releaseDate: movie.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
				{!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
				{isLoading && <p>Loading...</p>}
				{!isLoading && error && <p>{error}</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
