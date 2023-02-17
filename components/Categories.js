import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";

import CategoryCard from "./CategoryCard";

import { categories } from "../utils/categories";

const Categories = () => {
	return (
		<FlatList
			data={categories}
			renderItem={({ item }) => <CategoryCard myRef_={item} />}
			keyExtractor={(item) => item}
			ListEmptyComponent={<Text>Esperandoo ...</Text>}
			horizontal={true}
			removeClippedSubviews={true}
			ItemSeparatorComponent={() => <View className="w-3" />}
			showsHorizontalScrollIndicator={false}
		/>
	);
};

export default Categories;
