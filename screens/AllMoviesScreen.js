import { View, Text, FlatList, ScrollView } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMovies, bestIMSDRating } from "../services/fetchApi";

import MiniItemsDetail from "../components/MiniItemsDetail";

import { categories } from "../utils/categories";

const AllMoviesScreen = () => {
	const [moviesList, setMoviesList] = useState([]);
	const navigation = useNavigation();

	const {
		params: { myRef_ },
	} = useRoute();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		fetchApi(myRef_);
	}, []);

	const fetchApi = async (myRef_) => {
		if (myRef_ === "BR") {
			const { data } = await bestIMSDRating(9, 24);
			setMoviesList(data.movies);
		} else if (myRef_ === "LM") {
			const { data } = await getMovies("", 24);
			setMoviesList(data.movies);
		} else if (categories.includes(myRef_)) {
			const { data } = await getMovies("", 24, "", myRef_);
			setMoviesList(data.movies);
		} else {
			const { data } = await getMovies(myRef_, 24);
			setMoviesList(data.movies);
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
			/>
		</SafeAreaView>
	);
};

export default AllMoviesScreen;
