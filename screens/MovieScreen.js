import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	Modal,
	Pressable,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute, validatePathConfig } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
	StarIcon,
	PlayCircleIcon,
	VideoCameraIcon,
	UserIcon,
} from "react-native-heroicons/solid";

const MovieScreen = () => {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);

	const {
		params: {
			imdb_code,
			title,
			genres,
			language,
			year,
			description_full,
			rating,
			large_cover_image,
			cast,
		},
	} = useRoute();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<View className="flex-1">
			<StatusBar barStyle="light-content" translucent={!modalVisible ? true : false} />

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View className="p-2 flex-col items-center justify-center flex-1 space-y-10 bg-white">
					<View>
						<VideoCameraIcon size={200} color="black" />
						<Text className="text-3xl text-red-400 -mt-4">Not Movie Yet</Text>
					</View>
					<Pressable onPress={() => setModalVisible(!modalVisible)}>
						<Text className="bg-slate-500 p-2 rounded-md text-white">Go Back</Text>
					</Pressable>
				</View>
			</Modal>

			<LinearGradient
				className="w-full h-4/6"
				colors={["transparent", "transparent", "transparent", "#000"]}
			>
				<Image
					source={{ uri: large_cover_image }}
					style={{ resizeMode: "cover" }}
					className="w-full h-full absolute -z-10"
				/>
			</LinearGradient>
			<ScrollView
				className="px-4 bg-black text-white "
				contentContainerStyle={{
					paddingBottom: 10,
				}}
			>
				<View className="flex-row items-center justify-between">
					<View className="flex-row space-x-1">
						<View className="bg-gray-700 text-xs py-0.5 px-1 rounded-md">
							{genres && <Text className="text-xs text-white">{genres[0]}</Text>}
						</View>
						<View className="bg-gray-700 text-xs py-0.5 px-1 rounded-md">
							<Text className="text-xs text-white">{year}</Text>
						</View>
						<View className="bg-gray-700 text-xs py-0.5 px-1 rounded-md">
							{language && (
								<Text className="text-xs text-white">
									{language.charAt(0).toUpperCase() + language.slice(1)}
								</Text>
							)}
						</View>
						<View className="flex-row items-center justify-between bg-gray-700  py-0.5 px-1 rounded-md text-xs  space-x-1">
							<StarIcon size={16} color="#efb810" />
							<Text className="text-xs text-white">{rating}</Text>
						</View>
					</View>
					<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
						<PlayCircleIcon size={65} color="#fff" />
					</TouchableOpacity>
				</View>
				<View className="-mt-3">
					<Text className="text-white text-lg">{title}</Text>
					<Text className="text-gray-400">{description_full}</Text>
				</View>
				{cast && (
					<View className="pt-3">
						<Text className="text-white text-lg">Actors</Text>
						<View className="flex-row justify-start items-center">
							{cast.map((act) => (
								<View className="h-full w-20 mr-3" key={act.imdb_code}>
									{act.url_small_image ? (
										<Image
											source={{
												uri: act.url_small_image,
											}}
											className="w-full h-20 rounded-md"
											style={{ resizeMode: "contain" }}
										/>
									) : (
										<UserIcon size={80} color="#fff" />
									)}

									<Text className="text-white text-xs">{act.name}</Text>
								</View>
							))}
						</View>
					</View>
				)}

				<View className="pt-3">
					<Text className="text-white text-lg">Trailer</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default MovieScreen;
