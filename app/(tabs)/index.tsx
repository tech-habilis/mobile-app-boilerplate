import Text from "@/components/text";
import { View } from "react-native";
import { useSession } from "@/contexts/auth-context";
import dayjs from "dayjs";
import "dayjs/locale/fr";

// Set dayjs locale to French
dayjs.locale("fr");

export default function HomeScreen() {
  const { session } = useSession();
  const userId = session?.user?.id;
  const time = dayjs().format("HH:mm");
  const message = `Bonjour, ${userId} the time is ${time}`;

  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
}
