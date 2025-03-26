import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (text: string) => void;
};

export default function SearchBar({ placeholder = "Search", onSearch }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color="#8E8E93" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          onChangeText={onSearch}
        />
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/home/filter')}
          style={styles.filterButton}
        >
          <Ionicons name="options-outline" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F2F2F7",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 17,
    color: "#000000",
  },
  filterButton: {
    marginLeft: 8,
    padding: 4,
  },
}); 