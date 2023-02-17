import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ myRef_ }) => {
	const navegation = useNavigation();

	return (
		<TouchableOpacity
			className="px-2 py-1 bg-teal-200 rounded-sm"
			onPress={() => {
				navegation.navigate("AllMoviesScreen", {
					myRef_,
				});
			}}
		>
			<Text>{myRef_}</Text>
		</TouchableOpacity>
	);
};

export default CategoryCard;
