import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { session } = useAuth();

  const handleLikeToggle = async () => {
    if (!session) {
      // Handle case when user is not logged in
      return;
    }
  
    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', session.user.id)
          .eq('property_id', id);
  
        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: session.user.id,
            property_id: id
          });
  
        if (error) throw error;
      }
  
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  const checkIfLiked = async () => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', session?.user.id)
        .eq('property_id', id)
        .single();
  
      setIsLiked(!!data);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };
  
  useEffect(() => {
    if (session && id) {
      fetchPropertyDetails(id as string);
      checkIfLiked();
    }
  }, [id]);

  const fetchPropertyDetails = async (propertyId: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name={star <= property.rating ? "star" : "star-outline"}
        size={16}
        color={star <= property.rating ? "#FFD700" : "#C7C7CC"}
        style={styles.star}
      />
    ));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!property) {
    return <Text>Property not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <View style={styles.backButtonCircle}>
          <Ionicons name="chevron-back" size={24} color="#2E7D32" />
        </View>
      </TouchableOpacity>

      {/* Property Image */}
      <Image
        source={{ uri: property.image }}
        style={styles.propertyImage}
      />

      {/* Property Details */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.ratingContainer}>
            {renderStars()}
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{property.price}</Text>
          <TouchableOpacity 
            onPress={handleLikeToggle}
            style={styles.likeButton}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "#FF3B30" : "#8E8E93"}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#666876" />
          <Text style={styles.location}>{property.location}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.postedByContainer}>
          <View style={styles.userInfo}>
            <View style={styles.avatar} />
            <Text style={styles.postedByText}>{property.postedby}</Text>
          </View>
          <Text style={styles.dateText}>{property.posteddate}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {property.description}
        </Text>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Agent</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#191D31',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0061FF',
  },
  likeButton: {
    marginLeft: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#666876',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#8C8E98',
    marginVertical: 16,
  },
  postedByContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5EA',
    marginRight: 12,
  },
  postedByText: {
    fontSize: 16,
    color: '#000',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191D31',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666876',
    lineHeight: 24,
  },
  contactButton: {
    backgroundColor: '#0061FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  star: {
    marginRight: 4,
  },
}); 