import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type PropertyCardProps = {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  postedby: string;
  posteddate: string;
  rating: number;
  isLiked?: boolean;
  onLikeToggle?: () => void;
};

export default function PropertyCard({
  id,
  image,
  title,
  price,
  location,
  postedby,
  posteddate,
  rating,
  isLiked: propIsLiked,
  onLikeToggle,
}: PropertyCardProps) {
  const { session } = useAuth();
  const [isLiked, setIsLiked] = useState(propIsLiked || false);
  
  useEffect(() => {
    if (session) {
      checkIfLiked();
    }
  }, [session]);

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

  const handleLikeToggle = async (e: any) => {
    e.stopPropagation();
    
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
      if (onLikeToggle) onLikeToggle();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/home/[id]",
      params: { id, image, title, price, location, postedby, posteddate }
    });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name={star <= rating ? "star" : "star-outline"}
        size={16}
        color={star <= rating ? "#FFD700" : "#C7C7CC"}
        style={styles.star}
      />
    ));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={{ uri: image }}
          style={styles.propertyImage}
        />
        
        <View style={styles.propertyInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingContainer}>
              {renderStars()}
            </View>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{price}</Text>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? "#FF3B30" : "#8E8E93"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.location}>{location}</Text>
          
          <View style={styles.footer}>
            <View style={styles.userInfo}>
              <View style={styles.avatar} />
              <Text style={styles.username}>{postedby}</Text>
            </View>
            <Text style={styles.date}>{posteddate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  propertyImage: {
    width: "100%",
    height: 160,
  },
  propertyInfo: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 0,
  },
  location: {
    fontSize: 14,
    color: "#48484A",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E5EA",
    marginRight: 8,
  },
  username: {
    fontSize: 13,
    color: "#48484A",
  },
  date: {
    fontSize: 13,
    color: "#8E8E93",
  },
}); 