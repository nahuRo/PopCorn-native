import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import {
	UserIcon,
	ChevronRightIcon,
	InformationCircleIcon,
	SquaresPlusIcon,
	ArrowRightOnRectangleIcon,
} from "react-native-heroicons/solid";

const DrawerScreen = ({ drawer }) => {
	return (
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
};

export default DrawerScreen;
