import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ArrowRightIcon } from "react-native-heroicons/solid";

import MiniItemsDetail from "../components/MiniItemsDetail";

const FeaturedRow = ({ title, description, data, myRef_ }) => {
	const navegation = useNavigation();

	return (
		<View>
			<View className="mt-2 flex-row items-center justify-between">
				<Text className="font-bold text-lg">{title}</Text>
				<TouchableOpacity
					onPress={() => {
						navegation.navigate("AllMoviesScreen", {
							myRef_,
						});
					}}
				>
					<ArrowRightIcon size={20} color="#00CCBB" />
				</TouchableOpacity>
			</View>
			<Text className="text-xs text-gray-500">{description}</Text>
			<FlatList
				data={data}
				renderItem={({ item }) => <MiniItemsDetail {...item} />}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={<Text>Esperandoo ...</Text>}
				horizontal={true}
				removeClippedSubviews={true}
				ItemSeparatorComponent={() => <View className="w-3" />}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default FeaturedRow;
