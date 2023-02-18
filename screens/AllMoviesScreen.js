import { View, Text, FlatList } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMovies, bestIMSDRating } from "../services/fetchApi";

import MiniItemsDetail from "../components/MiniItemsDetail";

import { categories } from "../utils/categories";

const AllMoviesScreen = () => {
	const [page, setPage] = useState(1);
	const [moviesList, setMoviesList] = useState([]);
	const [moviesPages, setMoviesPages] = useState(0);

	const navigation = useNavigation();

	const {
		params: { myRef_ },
	} = useRoute();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [page]);

	useEffect(() => {
		fetchApi(myRef_, page);
	}, [page]);

	const handleEnd = () => {
		console.log({ page, moviesPages });

		if (page === moviesPages) {
			return console.log("no hay mas ");
		}
		setPage(page + 1);
	};

	const fetchApi = async (myRef_, currentPage) => {
		if (myRef_ === "BR") {
			const { data } = await bestIMSDRating(9, 24, currentPage);
			setMoviesPages(Math.round(data.movie_count / data.limit));

			setMoviesList([...moviesList, ...data.movies]);
		} else if (myRef_ === "LM") {
			const { data } = await getMovies("", 24, currentPage);
			setMoviesPages(Math.round(data.movie_count / data.limit));

			setMoviesList([...moviesList, ...data.movies]);
		} else if (categories.includes(myRef_)) {
			const { data } = await getMovies("", 24, currentPage, myRef_);
			setMoviesPages(Math.round(data.movie_count / data.limit));

			setMoviesList([...moviesList, ...data.movies]);
		} else {
			const { data } = await getMovies(myRef_, 24, currentPage);
			setMoviesPages(Math.round(data.movie_count / data.limit));

			setMoviesList([...moviesList, ...data.movies]);
		}
	};

	if (!moviesList) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>Not Found</Text>
			</View>
		);
	}

	if (moviesList.length === 0) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>Loading</Text>
			</View>
		);
	}

	return (
		<SafeAreaView>
			<FlatList
				numColumns={2}
				data={moviesList}
				renderItem={({ item }) => (
					<View className="bg-white w-1/2 items-center">
						<MiniItemsDetail {...item} />
					</View>
				)}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.5}
				onEndReached={handleEnd}
				// ListFooterComponent={() => <Text>soy ultimo</Text>}
			/>
		</SafeAreaView>
	);
};

export default AllMoviesScreen;
