import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLayouts } from './_layout';
import { GetData } from '@/api/authService';
import Card from '@/components/Card';
// import bankData from '@/data/bankData.json';
import { ChevronLeftIcon, Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const HeaderInfo = () => {
  const { user, setAccount, account } = useLayouts();
  //   const { accounts } = bankData;
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [balance, setBalance] = useState(null);
  //   const mainAccount = accounts[0];
  const router = useRouter();
  const fetchAccountInfo = useCallback(async () => {
    try {
      if (user && user.userid) {
        const data = await GetData(`/account/${user.userid}`);
        setBalance(data?.balance);
        setAccount(data);
        console.log('data', data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  const navigateToPage = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/'); // or any default page
    }
  };
  const replacefirst8Char = (text: any) => {
    const strformatt = text?.length > 0 ? text.split(' ') : [];
    let strtoetoile = '';
    for (let i = 0; i < strformatt.length; i++) {
      if (i < 2) {
        strtoetoile += '**** ';
      } else {
        strtoetoile += strformatt[i] + ' ';
      }
    }
    return strtoetoile ? strtoetoile : 'Not found';
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.previous} onPress={navigateToPage}>
          <ChevronLeftIcon size={27} color={'#2563eb'} />
          <Text style={styles.previoustxt}>Previous</Text>
        </TouchableOpacity>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>{user?.email || 'User'}</Text>
            <Text style={styles.userName}>
              {user?.prenom + ' ' + user?.nom}
            </Text>
          </View>
          <Image
            source={require('@/assets/images/user.jpg')}
            style={styles.avatar}
          />
        </View>
      </View>

      <Card style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <TouchableOpacity
            onPress={() => setBalanceVisible(!balanceVisible)}
            activeOpacity={0.7}
          >
            {balanceVisible ? (
              <Eye size={25} color="#fff" />
            ) : (
              <EyeOff size={25} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.balanceAmount}>
          {balanceVisible ? `$${balance}` : '••••••'}
        </Text>
        <View style={styles.balanceFooter}>
          <View>
            <Text style={styles.accountLabel}>Main Account</Text>
            <Text style={styles.accountNumber}>
              {replacefirst8Char(account?.cardNumber)}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default HeaderInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  balanceCard: {
    marginHorizontal: 20,
    backgroundColor: '#2563eb',
    padding: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#bfdbfe',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 16,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountLabel: {
    fontSize: 12,
    color: '#bfdbfe',
  },
  accountNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  transactionCard: {
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  transactionMerchant: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 32,
  },
  previous: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 5,
    marginBottom: 8,
  },
  previoustxt: {
    fontSize: 20,
    fontWeight: '500',
    color: '#2563eb',
  },
});
