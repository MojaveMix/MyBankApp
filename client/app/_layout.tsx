import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeJwt, isTokenExpired } from '@/utils/isExpired';
import { GetData } from '@/api/authService';

type TokenObj = {
  Token: string | null;
  setToken: (value: string | null) => void;
  user: any | null;
  setUser: (value: any | null) => void;
  account: any | null;
  setAccount: (value: any | null) => void;
  userInfo: User | null;
  setUserInfo: (value: any | null) => void;
};

type AccountType = {
  accountId: Number;
  balance: Number;
  accountType: String;
};

type User = {
  id: Number;
  username: Number;
  email: String;
  nom: String;
  prenom: String;
  phone: String;
};

const GlobalContext = createContext<TokenObj | undefined>(undefined);
export const useLayouts = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useLayouts must be used within GlobalContext');
  return context;
};

export default function RootLayout() {
  useFrameworkReady();
  const [Token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const router = useRouter();
  const [account, setAccount] = useState<AccountType | null>(null);

  const fetchToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        setToken(token);
        if (!isTokenExpired(token)) {
          const data = decodeJwt(token);
          setUser(data);
          router.replace('/');
        } else {
          router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const fetchUserById = useCallback(async () => {
    try {
      if (user?.userid) {
        const data = await GetData(`/user/id/${user.userid}`);
        setUserInfo(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    fetchUserById();
  }, [fetchUserById]);

  const obj: TokenObj = {
    Token,
    setToken,
    user,
    setUser,
    account,
    setAccount,
    userInfo,
    setUserInfo,
  };

  return (
    <GlobalContext.Provider value={obj}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </GlobalContext.Provider>
  );
}
