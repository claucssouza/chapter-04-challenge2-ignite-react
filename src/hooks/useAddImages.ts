
import { useCallback } from 'react';
import { useImages } from "../services/addimages";

export const  useAddImages = () => {

  const { mutate, isSuccess, isError  } = useImages();

  const addImages = useCallback(
    (data) => {
       mutate(data,
       {
        onSuccess: () => {
          console.log('inserido com sucesso!');
        },
        onError: () => {
          console.log('deu ruim');
        }
       })
    },
    [mutate]
  );

  return { addImages, isSuccess, isError };
}
