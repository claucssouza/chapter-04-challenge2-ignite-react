import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Card } from './Card';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      <SimpleGrid columns={[1,3]} spacing={10}>
        {cards?.map(item => 
          <Box bg='pGray.800' w='100%' borderRadius='0.2rem' key={item.id}>
            <Image src={item.url} width='100%'/>
            <Box marginLeft='0.8rem' padding='0.4rem'>
              <Text fontSize='2xl' color='pGray.50' marginTop='0.8rem'>{item.title}</Text>
              <Text fontSize='lg' color='pGray.100'>{item.description}</Text>
            </Box>
          </Box>
        )}
      </SimpleGrid >
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
