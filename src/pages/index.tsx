import { Box, Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

const getImages = async ({ pageParam = null }) => {
  const { data } = await api.get('/api/images', {
    params: {
      after: pageParam,
    },
  });
  return data;
}

export default function Home(): JSX.Element {
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isLoading,
      isError,
      isFetchingNextPage,
    } = useInfiniteQuery({queryKey: ["images"], queryFn: getImages,
      getNextPageParam: lastPage =>  lastPage.after  || null });

      const formattedData = useMemo(() => {
        return data?.pages.flatMap(pageData => pageData.data.flat());
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
        {hasNextPage && (
            <Button onClick={() => fetchNextPage()} marginTop="2.5rem">
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
        )}
      </Box>
    </>
  );
}
