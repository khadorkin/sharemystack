import { Bug } from "@tamagui/lucide-icons";
import { Stack, useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerRight: (props) => {
          return <Bug onPress={() => router.push("/(tabs)/settings/debug")} />;
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="debug" options={{ title: "Debug" }} />
    </Stack>
  );
}
