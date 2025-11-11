import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import Card from '@/components/Card';
import QuickAction from '@/components/QuickAction';
import bankData from '@/data/bankData.json';
import { useLayouts } from '../_layout';
import { GetData } from '@/api/authService';
import { useRouter } from 'expo-router';
import HeaderInfo from '../HeaderInfo';

export default function HomeScreen() {
  const { quickActions } = bankData;
  const { account } = useLayouts();
  const [transactions, setTransactions] = useState([]);
  // const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const router = useRouter();

  const fetchRecentTransactions = useCallback(async () => {
    try {
      if (account && account?.accountId) {
        const data = await GetData(`/transactions/${account.accountId}`);
        setTransactions(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [account]);

  useEffect(() => {
    fetchRecentTransactions();
  }, [fetchRecentTransactions]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <HeaderInfo />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <QuickAction
                key={action.id}
                title={action.title}
                icon={action.icon}
                color={action.color}
                onPress={() => router.replace(action.url as any)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {transactions.map((transaction: any) => (
            <Card
              key={transaction.transactionId}
              style={styles.transactionCard}
            >
              <View style={styles.transactionRow}>
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.transactionIcon,
                      {
                        backgroundColor:
                          transaction.type === 'deposit'
                            ? '#dcfce7'
                            : '#fee2e2',
                      },
                    ]}
                  >
                    <Text style={styles.transactionIconText}>
                      {transaction.libelle.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.transactionMerchant}>
                      {transaction?.libelle?.length > 20
                        ? transaction?.libelle.substring(0, 20) + '...'
                        : transaction?.libelle}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    {
                      color:
                        transaction.type === 'deposit' ||
                        transaction.type === 'receive'
                          ? '#059669'
                          : '#e7000b',
                    },
                  ]}
                >
                  {transaction.type === 'deposit' ||
                  transaction.type === 'receive'
                    ? '+'
                    : '-'}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
            </Card>
          ))}
        </View>

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
    textTransform: 'uppercase',
    textAlign: 'center',
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
});
