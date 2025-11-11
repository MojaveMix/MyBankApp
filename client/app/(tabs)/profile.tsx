import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import Card from '@/components/Card';
import bankData from '@/data/bankData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useLayouts } from '../_layout';
// import { API_URL } from '@env';

interface MenuItemProps {
  icon: any;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

function MenuItem({ icon: Icon, title, subtitle, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity
      key={title}
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconContainer}>
          <Icon size={20} color="#2563eb" />
        </View>
        <View>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { accounts } = bankData;
  const { userInfo, account } = useLayouts();
  const totalAccounts = accounts.length;
  // const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const router = useRouter();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={require('@/assets/images/user.jpg')}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>
                {userInfo?.prenom} {userInfo?.nom}
              </Text>
              <Text style={styles.userEmail}>{userInfo?.email}</Text>
              <Text style={styles.userPhone}>{userInfo?.phone}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{totalAccounts}</Text>
            <Text style={styles.statLabel}>Accounts</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>
              $
              {account?.balance?.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
            <Text style={styles.statLabel}>Total Balance</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Card style={styles.menuCard}>
            <MenuItem
              icon={User}
              title="Personal Information"
              subtitle="Update your details"
              onPress={() => console.log('Personal Info')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Shield}
              title="Security"
              subtitle="Password, biometrics"
              onPress={() => console.log('Security')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Bell}
              title="Notifications"
              subtitle="Manage preferences"
              onPress={() => console.log('Notifications')}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <Card style={styles.menuCard}>
            <MenuItem
              icon={CreditCard}
              title="Payment Methods"
              onPress={() => console.log('Payment Methods')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={Settings}
              title="Preferences"
              onPress={() => console.log('Preferences')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={HelpCircle}
              title="Help & Support"
              onPress={() => console.log('Help')}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={styles.menuCard}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={logout}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View
                  style={[styles.menuIconContainer, styles.logoutIconContainer]}
                >
                  <LogOut size={20} color="#dc2626" />
                </View>
                <Text style={styles.logoutText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        <Text style={styles.versionText}>Version 1.0.0</Text>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logoutIconContainer: {
    backgroundColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#dc2626',
  },
  versionText: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 16,
  },
  bottomPadding: {
    height: 32,
  },
});
