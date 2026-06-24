import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function InsightsStatsSection() {
  const { items } = useGroceryStore();

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.purchased).length;
  const pendingItems = totalItems - completedItems;

  const completionRate = totalItems
    ? Math.round((completedItems / totalItems) * 100)
    : 0;

  return (
    <>
      <View className="flex-row gap-4">
        <View className="flex-1 rounded-3xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/40">
              <FontAwesome6 name="clock" size={18} color="#F59E0B" />
            </View>

            <View>
              <Text className="text-2xl font-bold text-foreground">
                {pendingItems}
              </Text>
              <Text className="text-xs text-muted-foreground">Pending</Text>
            </View>
          </View>
        </View>

        <View
          className="flex-1 rounded-3xl p-4"
          style={{
            backgroundColor: "#D1FAE520",
            borderWidth: 1,
            borderColor: "#A7F3D0",
          }}
        >
          <View className="flex-row items-center gap-3">
            <View
              className="h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "#D1FAE580" }}
            >
              <FontAwesome6 name="check" size={18} color="#39FF14" />
            </View>

            <View>
              <Text className="text-2xl font-bold text-foreground">
                {completedItems}
              </Text>
              <Text className="text-xs text-muted-foreground">Completed</Text>
            </View>
          </View>
        </View>

        <View className="flex-1 rounded-3xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40">
              <FontAwesome6 name="layer-group" size={18} color="#3B82F6" />
            </View>

            <View>
              <Text className="text-2xl font-bold text-foreground">
                {totalItems}
              </Text>
              <Text className="text-xs text-muted-foreground">Total</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-1 rounded-3xl border border-border bg-card p-5">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-foreground">
            Completion Rate
          </Text>

          <View className="rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900/40">
            <Text className="font-bold text-foreground">{completionRate}%</Text>
          </View>
        </View>

        <View className="h-3 overflow-hidden rounded-full bg-secondary">
          <View
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${Math.max(completionRate, 2)}%` }}
          />
        </View>
      </View>
    </>
  );
}
