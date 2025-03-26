import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import PropertyCard from "../../../components/PropertyCard";
import SearchBar from "../../../components/SearchBar";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

// Define the Property type
type Property = {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  postedby: string;
  posteddate: string;
  rating: number;
};

export default function Index() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // New state for refreshing

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refreshing animation
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProperties();
  };

  const handleSearch = (text: string) => {
    console.log('Searching for:', text);
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    paddingVertical: 8,
  },
});