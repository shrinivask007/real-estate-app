import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Filter() {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState(['Apartments', 'Townhomes']);

  const propertyTypes = ['Apartments', 'Townhomes', 'Homes', 'Condos', 'Duplexes', 'Studios'];

  const handleTypePress = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
        <TouchableOpacity onPress={() => {
          // Reset filters logic here
          router.back();
        }}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        {/* Add your price range slider component here */}

        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.typeContainer}>
          {propertyTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedTypes.includes(type) && styles.selectedType,
              ]}
              onPress={() => handleTypePress(type)}
            >
              <Text style={[
                styles.typeText,
                selectedTypes.includes(type) && styles.selectedTypeText
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Home Details</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Bedrooms</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity 
              onPress={() => setBedrooms(Math.max(0, bedrooms - 1))}
              style={styles.counterButton}
            >
              <Ionicons name="remove" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.counterText}>{bedrooms}</Text>
            <TouchableOpacity 
              onPress={() => setBedrooms(bedrooms + 1)}
              style={styles.counterButton}
            >
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Bathrooms</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity 
              onPress={() => setBathrooms(Math.max(0, bathrooms - 1))}
              style={styles.counterButton}
            >
              <Ionicons name="remove" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.counterText}>{bathrooms}</Text>
            <TouchableOpacity 
              onPress={() => setBathrooms(bathrooms + 1)}
              style={styles.counterButton}
            >
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.setFilterButton} onPress={() => router.back()}>
        <Text style={styles.setFilterText}>Set Filter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  resetText: {
    color: '#007AFF',
    fontSize: 17,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  selectedType: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    color: '#000000',
    fontSize: 16,
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  detailLabel: {
    fontSize: 17,
    color: '#48484A',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 17,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  setFilterButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  setFilterText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
}); 