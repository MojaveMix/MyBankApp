import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MoreVertical } from 'lucide-react-native';
import Card from '@/components/Card';
import bankData from '@/data/bankData.json';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export default function CardsScreen() {
  const { cards, accounts } = bankData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cards</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {cards.map((card) => {
            const account = accounts.find((acc) => acc.id === card.accountId);
            return (
              <View key={card.id} style={styles.cardWrapper}>
                <LinearGradient
                  colors={[card.color, card.color + 'cc']}
                  style={styles.creditCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardType}>
                      {card.type.toUpperCase()}
                    </Text>
                    <TouchableOpacity activeOpacity={0.7}>
                      <MoreVertical size={24} color="#ffffff" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardChip} />

                  <Text style={styles.cardNumber}>{card.cardNumber}</Text>

                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.cardLabel}>CARD HOLDER</Text>
                      <Text style={styles.cardValue}>{card.cardHolder}</Text>
                    </View>
                    <View>
                      <Text style={styles.cardLabel}>EXPIRES</Text>
                      <Text style={styles.cardValue}>{card.expiryDate}</Text>
                    </View>
                  </View>

                  <View style={styles.cardBrandContainer}>
                    <Text style={styles.cardBrand}>
                      {card.brand.toUpperCase()}
                    </Text>
                  </View>
                </LinearGradient>

                {account && (
                  <Card style={styles.accountInfo}>
                    <View style={styles.accountRow}>
                      <View>
                        <Text style={styles.accountLabel}>Linked Account</Text>
                        <Text style={styles.accountName}>{account.name}</Text>
                      </View>
                      <View style={styles.balanceContainer}>
                        <Text style={styles.accountLabel}>Balance</Text>
                        <Text
                          style={[
                            styles.accountBalance,
                            {
                              color: account.balance >= 0 ? '#059669' : '#dc2626',
                            },
                          ]}
                        >
                          ${Math.abs(account.balance).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Text>
                      </View>
                    </View>
                  </Card>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Settings</Text>
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <Text style={styles.settingText}>Lock Card</Text>
              <View style={styles.settingToggle} />
            </TouchableOpacity>
          </Card>
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <Text style={styles.settingText}>Online Payments</Text>
              <View style={[styles.settingToggle, styles.settingToggleActive]} />
            </TouchableOpacity>
          </Card>
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <Text style={styles.settingText}>Contactless</Text>
              <View style={[styles.settingToggle, styles.settingToggleActive]} />
            </TouchableOpacity>
          </Card>
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
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  cardWrapper: {
    marginBottom: 24,
  },
  creditCard: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  cardChip: {
    width: 50,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#fbbf24',
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 40,
  },
  cardLabel: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.8,
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  cardBrandContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    opacity: 0.5,
  },
  accountInfo: {
    marginTop: 12,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  settingCard: {
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  settingToggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
  },
  settingToggleActive: {
    backgroundColor: '#2563eb',
  },
  bottomPadding: {
    height: 32,
  },
});
