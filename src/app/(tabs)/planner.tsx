import PlannerFormCard from "@/components/planner/PlannerFormCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { AlertTriangle, Clock3, Package } from "lucide-react-native";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const PlannerScreen = () => {
  const { items } = useGroceryStore();

  const pendingCount = items.filter((item) => !item.purchased).length;
  const highPriorityCount = items.filter(
    (item) => !item.purchased && item.priority === "high",
  ).length;

  const totalQuantity = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <KeyboardAwareScrollView
      bottomOffset={80}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background py-4"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <TabScreenBackground />

      <View className="gap-2 rounded-3xl border border-border bg-card/70 p-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold leading-9 text-foreground">
              Grocery planner
            </Text>
            <Text className="mt-1 text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Plan smarter, shop calmer.
            </Text>
            <Text className="mt-2 text-sm leading-5 text-muted-foreground">
              Organize your next grocery run with categories, quantities, and
              priority in one place.
            </Text>
          </View>

          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <FontAwesome6 name="cubes" size={20} color="#ffffff" />
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 rounded-3xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/40">
                <Clock3 size={18} color="#F59E0B" />
              </View>

              <Text className="text-2xl font-bold text-foreground">
                {pendingCount}
              </Text>
            </View>

            <Text className="mt-2 text-center text-xs font-medium text-muted-foreground">
              Pending
            </Text>
          </View>

          <View className="flex-1 rounded-3xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/40">
                <AlertTriangle size={18} color="#EF4444" />
              </View>

              <Text className="text-2xl font-bold text-foreground">
                {highPriorityCount}
              </Text>
            </View>

            <Text className="mt-2 text-center text-xs font-medium text-muted-foreground">
              High Priority
            </Text>
          </View>

          <View className="flex-1 rounded-3xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40">
                <Package size={18} color="#3B82F6" />
              </View>

              <Text className="text-2xl font-bold text-foreground">
                {totalQuantity}
              </Text>
            </View>

            <Text className="mt-2 text-center text-xs font-medium text-muted-foreground">
              Units
            </Text>
          </View>
        </View>
      </View>

      <View className="px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          Build your list
        </Text>
        <Text className="mt-1 text-sm text-muted-foreground">
          Add items with the right quantity, category, and urgency.
        </Text>
      </View>

      <PlannerFormCard />
    </KeyboardAwareScrollView>
  );
};
export default PlannerScreen;
