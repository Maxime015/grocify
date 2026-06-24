import { useGroceryStore } from "@/store/grocery-store";
import { Pressable, Text } from "react-native";

export default function ClearCompletedButton() {
  const { clearPurchased } = useGroceryStore();

  return (
    <Pressable
      className="mt-2 rounded-2xl bg-primary py-3"
      onPress={clearPurchased}
    >
      <Text className="text-center text-lg font-semibold text-primary-foreground">
        Clear completed items
      </Text>
    </Pressable>
  );
}
