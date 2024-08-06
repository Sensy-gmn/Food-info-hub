import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/details">Details</Link>
      <Link href="/search">Search</Link>
      <Link href="/adminUsers">Admin - Users</Link>
      <Link href="/adminProducts">Admin - Products</Link>
      <Link href="/adminCategory">Admin - Category</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
