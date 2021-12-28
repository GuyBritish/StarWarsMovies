import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

const axios = require("axios");

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		const options = {
			url: "https://starwarsmovies-6c935-default-rtdb.firebaseio.com/movies.json",
		};

		try {
			const resp = await axios(options);
			const loadedMovies = [];
			for (const key in resp.data) {
				loadedMovies.push({
					id: key,
					title: resp.data[key].title,
					openingText: resp.data[key].openingText,
					releaseDate: resp.data[key].releaseDate,
				});
			}

			setMovies(loadedMovies);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	const addMovieHandler = async (movie) => {
		const options = {
			url: "https://starwarsmovies-6c935-default-rtdb.firebaseio.com/movies.json",
			data: JSON.stringify(movie),
			method: "POST",
		};
		const resp = await axios(options);
		console.log(resp.data);
	};

	let content = <p>Found no movies.</p>;

	if (movies.length > 0) content = <MoviesList movies={movies} />;
	if (error) content = <p>{error}</p>;
	if (isLoading) content = <p>Loading...</p>;

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
