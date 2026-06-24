import {
  GroceryCategory,
  GroceryPriority,
  useGroceryStore,
} from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const categories: GroceryCategory[] = [
  "Produce",
  "Dairy",
  "Meat",
  "Bakery",
  "Beverages",
  "Household",
  "Snacks",
  "Other",
];

const priorities: GroceryPriority[] = ["low", "medium", "high"];

const categoryLabels: Record<GroceryCategory, string> = {
  Produce: "Fresh",
  Dairy: "Dairy",
  Meat: "Meat",
  Bakery: "Bakery",
  Beverages: "Drinks",
  Household: "Home",
  Snacks: "Snacks",
  Other: "Other",
};

const categoryIcons: Record<GroceryCategory, any> = {
  Produce: "leaf",
  Dairy: "cow",
  Meat: "drumstick-bite",
  Bakery: "bread-slice",
  Beverages: "mug-hot",
  Household: "pump-soap",
  Snacks: "cookie-bite",
  Other: "basket-shopping",
};

const priorityConfig: Record<
  GroceryPriority,
  {
    icon: any;
    label: string;
  }
> = {
  low: {
    icon: "seedling",
    label: "Low",
  },
  medium: {
    icon: "compass",
    label: "Medium",
  },
  high: {
    icon: "bolt",
    label: "High",
  },
};

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<GroceryCategory>("Produce");
  const [priority, setPriority] = useState<GroceryPriority>("medium");

  const canCreate = name.trim().length > 0 && Number(quantity) > 0;

  const handleQuantityChange = (value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    setQuantity(sanitized);
  };

  const createItem = async () => {
    if (!canCreate) return;

    await addItem({
      name: name.trim(),
      category,
      priority,
      quantity: Number(quantity),
    });

    setName("");
    setQuantity("1");
    setCategory("Produce");
    setPriority("medium");
  };

  return (
    <View className="rounded-3xl border border-border bg-card p-5">
      {/* ITEM NAME */}
      <Text className="text-sm font-semibold text-foreground">Item name</Text>

      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="bag-shopping" size={14} color="#5b7567" />

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ex: Blueberries"
          placeholderTextColor="#8aa397"
          className="ml-3 flex-1 text-base text-foreground"
        />
      </View>

      {/* QUANTITY */}
      <Text className="mt-5 text-sm font-semibold text-foreground">
        Quantity
      </Text>

      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="hashtag" size={14} color="#5b7567" />

        <TextInput
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="number-pad"
          placeholder="1"
          placeholderTextColor="#8aa397"
          className="ml-3 flex-1 text-base text-foreground"
        />
      </View>

      {/* CATEGORIES */}
      <Text className="mt-5 text-sm font-semibold text-foreground">
        Category
      </Text>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = option === category;

          return (
            <Pressable
              key={option}
              onPress={() => setCategory(option)}
              className={`flex-row items-center rounded-full px-4 py-2 ${
                active ? "bg-primary" : "bg-secondary"
              }`}
            >
              <FontAwesome6
                name={categoryIcons[option]}
                size={12}
                color={active ? "#fff" : "#486856"}
              />

              <Text
                className={`ml-2 text-sm font-semibold ${
                  active
                    ? "text-primary-foreground"
                    : "text-secondary-foreground"
                }`}
              >
                {categoryLabels[option]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* PRIORITY */}
      <Text className="mt-5 text-sm font-semibold text-foreground">
        Priority
      </Text>

      <View className="mt-3 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === priority;

          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-1 flex-row items-center justify-center rounded-2xl py-3 ${
                active ? "bg-primary" : "bg-secondary"
              }`}
            >
              <FontAwesome6
                name={priorityConfig[option].icon}
                size={13}
                color={active ? "#fff" : "#486856"}
              />

              <Text
                className={`ml-2 text-sm font-semibold ${
                  active
                    ? "text-primary-foreground"
                    : "text-secondary-foreground"
                }`}
              >
                {priorityConfig[option].label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* SUBMIT */}
      <Pressable
        disabled={!canCreate}
        onPress={createItem}
        className={`mt-6 flex-row items-center justify-center rounded-2xl py-3 ${
          canCreate ? "bg-primary" : "bg-muted"
        }`}
      >
        <FontAwesome6
          name="plus"
          size={14}
          color={canCreate ? "#fff" : "#7a9386"}
        />

        <Text
          className={`ml-2 text-base font-semibold ${
            canCreate ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          Add to Grocery List
        </Text>
      </Pressable>

      {error ? (
        <View className="mt-4 rounded-2xl border border-destructive bg-destructive px-4 py-3">
          <Text className="text-center text-sm font-medium text-white">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default PlannerFormCard;
