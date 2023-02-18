import axios from "axios";

export const getMovies = async (movieName = "", limit = 12, page = 1, genre = "") => {
	const { data } = await axios.get(
		`https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=${limit}&page=${page}&genre=${genre}&order_by=desc&query_term=${movieName}&with_cast=true`
	);
	return data;
};

export const getMovie = async (id) => {
	const { data } = await axios.get(
		`https://yts.mx/api/v2/movie_details.json?with_images=true&with_cast=true&imdb_id=${id}`
	);
	return data;
};

export const bestIMSDRating = async (rating, limit = 12, page = 1) => {
	const { data } = await axios.get(
		`https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=${limit}&order_by=desc&minimum_rating=${rating}&page=${page}`
	);
	return data;
};
