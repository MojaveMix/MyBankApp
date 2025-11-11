import { jwtDecode } from 'jwt-decode';
import { isExpired } from 'react-jwt';

export const decodeJwt = (token: any) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token: any) => {
  const decodedToken = isExpired(token);
  return decodedToken;
};
