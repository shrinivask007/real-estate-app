import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function AddProperty() {
  const { session } = useAuth();
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    imageUrl: '', // New field for image URL
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.price || !formData.location || !rating || !formData.imageUrl) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      const newProperty = {
        id: Date.now().toString(),
        image: formData.imageUrl,
        title: formData.title,
        price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
        location: formData.location,
        description: formData.description,
        rating: rating,
        postedby: session?.user?.user_metadata?.full_name || "Anonymous",
        posteddate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      const { data, error } = await supabase
        .from('properties')
        .insert([newProperty])
        .select();

      if (error) throw error;

      Alert.alert('Success', 'Property listed successfully!');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.error('Error adding property:', error);
      Alert.alert('Error', error.message || 'Failed to add property');
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity
        key={star}
        onPress={() => setRating(star)}
      >
        <Ionicons
          name={star <= rating ? "star" : "star-outline"}
          size={30}
          color={star <= rating ? "#FFD700" : "#C7C7CC"}
          style={styles.star}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Property Listing</Text>
        <Text style={styles.subtitle}>Share your property details with others</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Property Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter property title"
            placeholderTextColor="#8E8E93"
            value={formData.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            placeholderTextColor="#8E8E93"
            keyboardType="numeric"
            value={formData.price}
            onChangeText={(text) => handleInputChange('price', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter property location"
            placeholderTextColor="#8E8E93"
            value={formData.location}
            onChangeText={(text) => handleInputChange('location', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Property Rating</Text>
          <View style={styles.ratingContainer}>
            {renderStars()}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Property Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://picsum.photos/500/300"
            placeholderTextColor="#8E8E93"
            value={formData.imageUrl}
            onChangeText={(text) => handleInputChange('imageUrl', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your description or thoughts about this property..."
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Post Listing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
  },
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
}); 