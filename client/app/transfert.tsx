import {
  Image,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import HeaderInfo from './HeaderInfo';
import { PostData } from '@/api/authService';
import { useLayouts } from './_layout';
import { useRouter } from 'expo-router';

const Transfert = () => {
  const [amount, setAmount] = useState('');
  const [libelle, setLibelle] = useState('');
  const [rib, setRib] = useState('');
  const { account } = useLayouts();
  const router = useRouter();

  const handleTransfertMoney = async () => {
    try {
      if (account.accountId) {
        await PostData('/account/transfert/money', {
          account_id: account.accountId,
          rib,
          libelle,
          amount,
        });
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} // Added paddingBottom to ensure space at the bottom
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HeaderInfo />
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.jpg')}
            style={styles.logoWith}
          />
          <Text style={styles.bankName}>MyBank</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Reason for transfer"
            value={libelle}
            onChangeText={setLibelle}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="RIB"
            value={rib}
            onChangeText={setRib}
          />
          <TouchableOpacity
            onPress={handleTransfertMoney}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Transfer Money</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Transfert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  bankName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#55a4fc',
  },
  formContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    borderColor: '#55a4fc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#55a4fc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoWith: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
});
