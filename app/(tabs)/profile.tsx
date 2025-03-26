import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function Profile() {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/200/200' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="camera" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Shrinivas Kathare</Text>
        <Text style={styles.emailText}>shree@gmail.com</Text>
      </View>

      {/* Account Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={20} color="#0061FF" />
              </View>
              <Text style={styles.menuItemText}>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="wallet-outline" size={20} color="#0061FF" />
              </View>
              <Text style={styles.menuItemText}>Payment Method</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="location-outline" size={20} color="#0061FF" />
              </View>
              <Text style={styles.menuItemText}>Saved Addresses</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={20} color="#0061FF" />
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch 
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: "#8C8E98", true: "#0061FF" }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="moon-outline" size={20} color="#0061FF" />
              </View>
              <Text style={styles.menuItemText}>Dark Mode</Text>
            </View>
            <Switch 
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: "#8C8E98", true: "#0061FF" }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Other Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Other</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="help-circle-outline" size={20} color="#0061FF" />
              </View>
              <Text style={styles.menuItemText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#0061FF" />
              </View>
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutSection} onPress={handleLogout}>
        <View style={styles.menuItemLeft}>
          <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          </View>
          <Text style={[styles.menuItemText, { color: '#DC2626' }]}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#8C8E98",
  },
  profileImageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0061FF',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#191D31",
    marginBottom: 2,
  },
  emailText: {
    fontSize: 13,
    color: "#666876",
  },
  sectionContainer: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666876",
    marginLeft: 16,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: '#F0F3FF',
  },
  menuItemText: {
    fontSize: 14,
    color: "#191D31",
  },
  logoutSection: {
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
  },
}); 