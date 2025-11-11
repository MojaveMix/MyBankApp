import api from './api';

export const PostData = async (route: string, bodies: object) => {
  try {
    const { data } = await api.post(route, bodies);
    return data;
  } catch (error: any) {
    console.error('PostData error:', error.message);
    throw error; // rethrow to handle it in your component
  }
};

export const PutData = async (route: string, bodies: object) => {
  try {
    const { data } = await api.put(route, bodies);
    return data;
  } catch (error: any) {
    console.error('PutData error:', error.message);
    throw error;
  }
};

export const GetData = async (route: string) => {
  try {
    const { data } = await api.get(route);
    return data;
  } catch (error: any) {
    console.error('GetData error:', error.message);
    throw error;
  }
};
