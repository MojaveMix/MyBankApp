import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  ShoppingBag,
  Briefcase,
  Coffee,
  ArrowRightLeft,
  Zap,
  Tv,
  Car,
  ShoppingCart,
} from 'lucide-react-native';
import Card from '@/components/Card';
import bankData from '@/data/bankData.json';
import { useLayouts } from '../_layout';
import { useRouter } from 'expo-router';
import { GetData } from '@/api/authService';

const iconMap: { [key: string]: any } = {
  'shopping-bag': ShoppingBag,
  briefcase: Briefcase,
  coffee: Coffee,
  'arrow-right-left': ArrowRightLeft,
  zap: Zap,
  tv: Tv,
  car: Car,
  'shopping-cart': ShoppingCart,
};

export default function ActivityScreen() {
  const [filter, setFilter] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const { account } = useLayouts();

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((t: any) => t.type === filter);

  const groupByDate = (txns: typeof transactions) => {
    const groups: { [key: string]: typeof transactions } = {};

    txns.forEach((txn: any) => {
      const date = new Date(txn.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let label = '';
      if (date.toDateString() === today.toDateString()) {
        label = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        label = 'Yesterday';
      } else {
        label = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(txn);
    });

    return groups;
  };

  const groupedTransactions = groupByDate(filteredTransactions);

  // const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === 'all' && styles.filterChipActive,
            ]}
            onPress={() => setFilter('all')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'all' && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === 'receive' && styles.filterChipActive,
            ]}
            onPress={() => setFilter('receive')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'receive' && styles.filterTextActive,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === 'transfer' && styles.filterChipActive,
            ]}
            onPress={() => setFilter('transfer')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'transfer' && styles.filterTextActive,
              ]}
            >
              Expenses
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedTransactions).map(([date, txns]) => (
          <View key={date} style={styles.dateSection}>
            <Text style={styles.dateLabel}>{date}</Text>
            {txns.map((transaction: any) => {
              const IconComponent = iconMap[transaction.icon] || ShoppingBag;
              // const account = accounts.find(
              //   (acc) => acc.id === transaction.accountId
              // );

              return (
                <Card key={transaction.id} style={styles.transactionCard}>
                  <View style={styles.transactionRow}>
                    <View style={styles.transactionLeft}>
                      <View
                        style={[
                          styles.iconContainer,
                          {
                            backgroundColor:
                              transaction.type === 'credit'
                                ? '#dcfce7'
                                : '#fee2e2',
                          },
                        ]}
                      >
                        {/* <IconComponent
                          size={20}
                          color={
                            transaction.type === 'credit' ? '#059669' : '#dc2626'
                          }
                        /> */}
                        <Text style={styles.iconText}>
                          {transaction.type.charAt(0)}
                        </Text>
                      </View>
                      <View style={styles.transactionInfo}>
                        <Text style={styles.transactionMerchant}>
                          {transaction.type}
                        </Text>
                        <View style={styles.transactionMeta}>
                          <Text style={styles.transactionCategory}>
                            {transaction.category}
                          </Text>
                          <Text style={styles.transactionAccount}>
                            {transaction.libelle}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.transactionRight}>
                      <Text
                        style={[
                          styles.transactionAmount,
                          {
                            color:
                              transaction.type === 'receive'
                                ? '#059669'
                                : 'red',
                          },
                        ]}
                      >
                        {transaction.type === 'receive' ? '+' : '-'}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </Text>
                      <Text style={styles.transactionStatus}>
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        ))}

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
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateSection: {
    marginBottom: 24,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
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
    flex: 1,
  },
  iconText: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  transactionCategory: {
    fontSize: 13,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  metaDivider: {
    fontSize: 13,
    color: '#6b7280',
    marginHorizontal: 6,
  },
  transactionAccount: {
    fontSize: 13,
    color: '#6b7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  transactionStatus: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  bottomPadding: {
    height: 32,
  },
});
