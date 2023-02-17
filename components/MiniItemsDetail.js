import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StarIcon } from "react-native-heroicons/solid";

import { getMovie } from "../services/fetchApi";

const MiniItemsDetail = ({ title, genres, rating, medium_cover_image, imdb_code }) => {
	const [dataM, setDataM] = useState([]);

	useEffect(() => {
		fetchApi(imdb_code);
	}, []);

	const fetchApi = async (id) => {
		const { data } = await getMovie(id);
		setDataM(data.movie);
	};

	const navegation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => {
				navegation.navigate("MovieScreen", {
					...dataM,
				});
			}}
			className="bg-gray-100 rounded-md overflow-hidden w-44 my-2"
		>
			<Image
				style={{ resizeMode: "cover" }}
				className="h-64 w-full"
				source={{
					uri: medium_cover_image,
				}}
			/>
			<View className="px-1">
				<Text className="font-bold text-sm pt-1">
					{title.length > 19 ? `${title.slice(0, 19)} ...` : title}
				</Text>
				<View className="flex-row items-center space-x-1">
					<StarIcon size={16} color="#00CCBB" opacity={0.5} />
					<Text className="text-xs text-slate-500">
						<Text className="text-xs text-red-200">{rating}</Text> &bull;{" "}
						{genres[0]}/{genres[1]}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default MiniItemsDetail;
