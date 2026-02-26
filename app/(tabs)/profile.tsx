import Text from "@/components/text";
import { useSession } from "@/contexts/auth-context";
import { View } from "react-native";

export default function ProfileScreen() {
  const { session } = useSession();
  return (
    <View>
      <Text>{JSON.stringify(session?.user, null, 2)}</Text>
    </View>
  );
}
