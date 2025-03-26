import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import PropertyCard from "../../components/PropertyCard";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";


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

export default function Like() {
  const { session } = useAuth();
  const [likedProperties, setLikedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLikedProperties = async () => {
    try {
      if (!session?.user?.id) return;
      
      const { data, error } = await supabase
        .from('likes')
        .select('property_id, properties(*)')
        .eq('user_id', session.user.id);

      if (error) throw error;

      const properties = data.map(item => item.properties);
      setLikedProperties(properties);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLikedProperties();
  }, [session]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLikedProperties();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const handleUnlike = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', session?.user.id)
        .eq('property_id', propertyId);

      if (error) throw error;
      fetchLikedProperties();
    } catch (error) {
      console.error('Error unliking property:', error);
    }
  };



  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#007AFF']} // iOS
          progressBackgroundColor="#FFFFFF"
          tintColor="#007AFF" // iOS
        />
      }
    >
      {likedProperties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          image={property.image}
          title={property.title}
          price={property.price}
          location={property.location}
          postedby={property.postedby}
          posteddate={property.posteddate}
          rating={property.rating}
          isLiked={true}
          onLikeToggle={() => handleUnlike(property.id)}
        />
      ))}
    </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});