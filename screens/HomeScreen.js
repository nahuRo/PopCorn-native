import {
	View,
	Text,
	Image,
	TextInput,
	ScrollView,
	StatusBar,
	StyleSheet,
	DrawerLayoutAndroid,
	TouchableOpacity,
	Button,
	TouchableHighlight,
} from "react-native";
import { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
	ChevronDownIcon,
	UserIcon,
	MagnifyingGlassIcon,
	ChevronRightIcon,
	InformationCircleIcon,
	SquaresPlusIcon,
	ArrowRightOnRectangleIcon,
} from "react-native-heroicons/solid";

import { getMovies, bestIMSDRating } from "../services/fetchApi";

import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
	const navigation = useNavigation();
	const [generalM, setGeneralM] = useState([]);
	const [ratingM, setRatingM] = useState([]);
	const [Search, setSearch] = useState("");

	const drawer = useRef(null);
	const inputt = useRef(null);
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		getMovies().then((resp) => {
			const { data } = resp;
			setGeneralM(data.movies);
		});
		bestIMSDRating(9).then((resp) => {
			const { data } = resp;
			setRatingM(data.movies);
		});
	}, []);

	const handleSubmit = (e) => {
		navigation.navigate("AllMoviesScreen", {
			myRef_: e.nativeEvent.text,
		});
		setSearch("");
	};

	const navigationView = () => (
		<View className="bg-white px-3 py-4 h-full flex-col justify-between">
			<View className="flex-col justify-evenly">
				<Text className="text-black text-3xl pb-4 font-bold">Settings</Text>
				<View className="py-1">
					<View className="flex-row items-center space-x-2 pt-4 pb-2 border-gray-200 border-b-2">
						<UserIcon size={25} color="#000" />
						<Text className="">Account</Text>
					</View>
					<TouchableOpacity className="flex-row justify-between items-center py-3">
						<Text className="text-gray-400">Edit Profile</Text>
						<ChevronRightIcon size={20} color="#000" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row justify-between items-center py-3">
						<Text className="text-gray-400">Change Password</Text>
						<ChevronRightIcon size={20} color="#000" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row justify-between items-center py-3">
						<Text className="text-gray-400">Privacy</Text>
						<ChevronRightIcon size={20} color="#000" />
					</TouchableOpacity>
				</View>
				<View className="py-1">
					<View className="flex-row items-center space-x-2 pt-4 pb-2 border-gray-200 border-b-2">
						<InformationCircleIcon size={25} color="#000" />
						<Text>Notification</Text>
					</View>
					<TouchableOpacity className="flex-row justify-between items-center py-3">
						<Text className="text-gray-400">Notifications</Text>
						<ChevronRightIcon size={20} color="#000" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row justify-between items-center py-3">
						<Text className="text-gray-400">App Notifications</Text>
						<ChevronRightIcon size={20} color="#000" />
					</TouchableOpacity>
				</View>
				<View className="py-1">
					<View className="flex-row items-center space-x-2 pt-4 pb-2 border-gray-200 border-b-2">
						<SquaresPlusIcon size={25} color="#000" />
						<Text>More</Text>
					</View>
					<TouchableOpacity className="flex-row justify-between items-center py-3">
						<Text className="text-gray-400">Language</Text>
						<ChevronRightIcon size={20} color="#000" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row justify-between items-center py-3">
						<Text className="text-gray-400">Country</Text>
						<ChevronRightIcon size={20} color="#000" />
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				className="flex-row justify-center items-center space-x-4"
				onPress={() => drawer.current.closeDrawer()}
			>
				<ArrowRightOnRectangleIcon size={20} color="#000" />
				<Text className="text-gray-400">LOGOUT</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<DrawerLayoutAndroid
			ref={drawer}
			drawerWidth={300}
			drawerPosition="right"
			renderNavigationView={navigationView}
		>
			<StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
			<SafeAreaView className="bg-white">
				{/* Header */}
				<View className="flex-row pb-3 items-center justify-between mx-4 h-fit">
					<Image source={require("../assets/popCorn.png")} className="h-full w-5" />
					<Text className="font-bold text-xl text-gray-400 ">PopCorn</Text>
					<TouchableOpacity onPress={() => drawer.current.openDrawer()}>
						<UserIcon size={35} color="#00CCBB" />
					</TouchableOpacity>
				</View>

				{/* Search */}
				<View className="flex-row pb-3 mx-4">
					<View className="flex-row items-center bg-gray-200 flex-1 space-x-2 p-2 rounded-md">
						<MagnifyingGlassIcon size={20} color="gray" />
						<TextInput
							ref={inputt}
							placeholder="Search ..."
							onChangeText={(value) => setSearch(value)}
							onSubmitEditing={(e) => handleSubmit(e)}
							className="w-11/12"
							value={Search}
							blurOnSubmit={(e) => console.log("enviado")}
						/>
					</View>
				</View>

				{/* categories */}
				<View className="pb-2 mx-4">
					<Categories />
				</View>

				{/* BODY */}
				<ScrollView
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						backgroundColor: "#fff",
						paddingHorizontal: 16,
						paddingBottom: 150,
					}}
				>
					{/* items */}
					<FeaturedRow
						title="Last Movies"
						description="hola"
						data={generalM}
						myRef_="LM"
					/>
					<FeaturedRow
						title="Best Rating"
						description="hola"
						data={ratingM}
						myRef_="BR"
					/>
				</ScrollView>
			</SafeAreaView>
		</DrawerLayoutAndroid>
	);
};

export default HomeScreen;
