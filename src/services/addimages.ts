import axios from 'axios';
import { useMutation } from 'react-query';


const addImages =  (data) => {
  return axios.post('/api/images', data);
};

export const useImages = () => {
  return useMutation(async(data) => {
    await addImages(data);
  });
}
