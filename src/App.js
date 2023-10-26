import React, { useEffect, useState } from "react";
import "./styles.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_KEY = "https://www.omdbapi.com?apikey=6f5ecd29";

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	//connects to external API AND PASSES THE DATA INTO setMovies
	const searchMovies = async (title) => {
		try {
			const response = await fetch(`${API_KEY}&S=${title}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setMovies(data.Search);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		searchMovies(`Spiderman`);
	}, []);

	return (
		<div className="app">
			<h1>Best Movies of All Time</h1>
			<div className="search">
				<input
					placeholder="Search Movie"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>
			{/* checks to see if the array exists and loops through */}
			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard movie={movie} />
					))}
				</div>
			) : (
				<div className="empty">
					<h3>No movies found</h3>
				</div>
			)}
		</div>
	);
}

export default App;
