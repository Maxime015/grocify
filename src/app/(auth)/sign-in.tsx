import useSocialAuth from "@/hooks/useSocialAuth";
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

// DÉPLACEMENT DES CONSTANTES ICI POUR QU'ELLES SOIENT ACCESSIBLES PAR STYLESHEET
const { width } = Dimensions.get("window");
const TILE_SIZE = width * 0.28;
const TILE_MARGIN = 8;
const ITEM_HEIGHT = TILE_SIZE + TILE_MARGIN * 2;

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isAppleClicked = loadingStrategy === "oauth_apple";
  const isGitHubClicked = loadingStrategy === "oauth_github";

  const isLoading = isAppleClicked || isGitHubClicked || isGoogleClicked;

  const ITEMS = [
    { emoji: "🍔", color: "#F8D548" },
    { emoji: "🍟", color: "#FFD9A8" },
    { emoji: "🌮", color: "#FFE4A3" },
    { emoji: "🍿", color: "#FFF0C9" },
    { emoji: "🥤", color: "#FAD6E0" },
    { emoji: "🎮", color: "#DDEDF2" },
    { emoji: "🍪", color: "#EFD3B5" },
    { emoji: "🎲", color: "#E8EAF6" },
    { emoji: "🍕", color: "#FFD6A5" },
    { emoji: "🍣", color: "#E8DFF5" },
    { emoji: "🛍️", color: "#FFF1C5" },
    { emoji: "💐", color: "#FCE1E4" },
    { emoji: "🍏", color: "#D8F3DC" },
    { emoji: "💊", color: "#CFE8FF" },
    { emoji: "🍰", color: "#FAD6E0" },
    { emoji: "🍦", color: "#EDF2FB" },
    { emoji: "🍩", color: "#F7D1CD" },
    { emoji: "🥑", color: "#D8F3DC" },
    { emoji: "🌭", color: "#FFD8BE" },
    { emoji: "🍗", color: "#F6D6A8" },
    { emoji: "🍜", color: "#FFE6CC" },
    { emoji: "🍫", color: "#D8B892" },
    { emoji: "🧁", color: "#FFCFE6" },
    { emoji: "🍓", color: "#FFD6D6" },
    { emoji: "🍉", color: "#D8F3DC" },
    { emoji: "🍇", color: "#E9D8FD" },
    { emoji: "☕", color: "#E6D3C2" },
    { emoji: "🧋", color: "#F8D7E6" },
    { emoji: "🎧", color: "#DDEDF2" },
    { emoji: "🎨", color: "#E9D8FD" },
    { emoji: "📚", color: "#E2F0CB" },
    { emoji: "🎁", color: "#FFF1C5" },
    { emoji: "🎈", color: "#FFD6E0" },
    { emoji: "🧸", color: "#EFD9CE" },
  ];

  function Tile({ emoji, color }) {
    return (
      <View style={[styles.tile, { backgroundColor: color }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    );
  }

  const VerticalMarquee = ({ items, reverse = false, duration = 25000 }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const data = [...items, ...items];
    const halfHeight = items.length * ITEM_HEIGHT;

    const currentY = useRef(0);
    const animationRef = useRef(null);
    const startDragY = useRef(0);

    useEffect(() => {
      const id = translateY.addListener(({ value }) => {
        currentY.current = value;
      });
      return () => translateY.removeListener(id);
    }, [translateY]);

    const startAnimation = (fromValue) => {
      if (animationRef.current) animationRef.current.stop();

      let normalizedFrom = fromValue;
      while (normalizedFrom < -halfHeight) normalizedFrom += halfHeight;
      while (normalizedFrom > 0) normalizedFrom -= halfHeight;

      translateY.setValue(normalizedFrom);

      const targetValue = reverse ? 0 : -halfHeight;
      const distanceToCover = Math.abs(targetValue - normalizedFrom);
      const calculatedDuration = (distanceToCover / halfHeight) * duration;

      animationRef.current = Animated.timing(translateY, {
        toValue: targetValue,
        duration: calculatedDuration > 0 ? calculatedDuration : duration,
        easing: Easing.linear,
        useNativeDriver: true,
      });

      animationRef.current.start(({ finished }) => {
        if (finished) {
          translateY.setValue(reverse ? -halfHeight : 0);

          animationRef.current = Animated.loop(
            Animated.timing(translateY, {
              toValue: reverse ? 0 : -halfHeight,
              duration,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          );
          animationRef.current.start();
        }
      });
    };

    useEffect(() => {
      startAnimation(reverse ? -halfHeight : 0);
      return () => {
        if (animationRef.current) animationRef.current.stop();
      };
    }, [reverse, halfHeight, duration]);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          if (animationRef.current) animationRef.current.stop();
          translateY.stopAnimation((value) => {
            startDragY.current = value;
            currentY.current = value;
          });
        },
        onPanResponderMove: (_, gestureState) => {
          let nextValue = startDragY.current + gestureState.dy;

          while (nextValue < -halfHeight) nextValue += halfHeight;
          while (nextValue > 0) nextValue -= halfHeight;

          translateY.setValue(nextValue);
        },
        onPanResponderRelease: () => {
          startAnimation(currentY.current);
        },
      }),
    ).current;

    return (
      <View style={styles.column} {...panResponder.panHandlers}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {data.map((item, index) => (
            <Tile key={index} {...item} />
          ))}
        </Animated.View>
      </View>
    );
  };

  const halfIdx = Math.floor(ITEMS.length / 2);

  const col1 = useRef([...ITEMS].sort(() => Math.random() - 0.5)).current;
  const col2 = useRef([...ITEMS].reverse()).current;
  const col3 = useRef([
    ...ITEMS.slice(halfIdx),
    ...ITEMS.slice(0, halfIdx),
  ]).current;

  return (
    <SafeAreaView className="bg-background" style={styles.container}>
      <View className="bg-muted" style={styles.background}>
        <View style={styles.grid}>
          <VerticalMarquee items={col1} duration={28000} />
          <VerticalMarquee items={col2} duration={34000} reverse={true} />
          <VerticalMarquee items={col3} duration={24000} />
        </View>
      </View>

      <View className="flex-1 overflow-hidden rounded-t-[36px] bg-background px-6 pb-8 pt-6">
        <Text className="text-card-foreground" style={styles.logo}>
          Grocify
        </Text>

        <View className="self-center rounded-full bg-secondary px-3 py-1">
          <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
            Welcome Back
          </Text>
        </View>

        <Text className="mt-2 text-center text-sm leading-6 text-muted-foreground">
          Choose a social provider and jump right into your personalized grocery
          experience.
        </Text>

        <View className="mt-6">
          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${
              isLoading ? "opacity-70" : ""
            }`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <Image
                source={require("../../../assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
              {isGoogleClicked
                ? "Connecting Google..."
                : "Continue with Google"}
            </Text>

            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>

          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${
              isLoading ? "opacity-70" : ""
            }`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_github")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <FontAwesome name="github" size={24} color="#111" />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
              {isGitHubClicked
                ? "Connecting GitHub..."
                : "Continue with GitHub"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>

          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-foreground bg-foreground px-4 active:opacity-90 ${
              isLoading ? "opacity-70" : ""
            }`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_apple")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <FontAwesome6 name="apple" size={22} color="#111" />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold text-background">
              {isAppleClicked ? "Connecting Apple..." : "Continue with Apple"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>
        </View>

        <Text className="mt-3 text-center text-sm leading-5 text-muted-foreground">
          By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: 420,
    overflow: "hidden",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
  },
  column: {
    width: TILE_SIZE,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: TILE_MARGIN,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  emoji: {
    fontSize: 60,
  },
  logo: {
    fontSize: 52,
    fontWeight: "300",
    marginTop: -20,
    fontFamily: "KaushanScript-Regular",
    textAlign: "center", // Centre le texte à l'intérieur du bloc
    alignSelf: "center", // Centre le bloc lui-même à l'écran
  },
});
