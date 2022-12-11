import { Box, Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

const getImages = async ({ pageParam = 0 }) => {
  const dataImages = await api.get(`/api/images?after=${pageParam}`);
  return dataImages;
}

export default function Home(): JSX.Element {

    
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images', getImages, {
        getNextPageParam: (after) => after || 0,
    });
 
  const formattedData = useMemo(() => {
    const dataImages =  data?.pages[0].data?.data.map(itemImage => {
      return itemImage;
    });
    return dataImages;
  }, [data]);

  if (isLoading) {
    return (<Loading />);
  }  
  
  if (isError) {
    return (<Error />);
  }
  
  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {isFetchingNextPage && (
        <Button
           onClick={() => fetchNextPage()}
           marginTop='2rem'
         >
           {hasNextPage ? 'Carregar mais...'  : 'Carregando'}
         </Button>
        )}
      </Box>
    </>
  );
}
