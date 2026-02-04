import { appName } from "@/constants/misc";
import Text from "./text";
import { FadeIn, FadeOut } from "react-native-reanimated";
import Animated from "react-native-reanimated";

export default function CustomSplash() {
  return (
    <Animated.View
      className="w-full h-full bg-primary flex items-center justify-center"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text className="text-white text-[44px] font-ls-extrabold mb-4 mt-3.5 uppercase">
        {appName}
      </Text>
      <Text className="text-white font-medium">Build amazing</Text>
      <Text className="text-white font-medium">experiences</Text>
    </Animated.View>
  );
}
