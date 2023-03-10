import { SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

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

  const [viewImage, setViewImage] = useState(false);

  const handleViewImage = () => {
    setViewImage(true);
  }

  const handleCloseViewImage = () => {
    setViewImage(false);
  }

  return (
    <SimpleGrid columns={[1,3]} spacing={10}>
    {cards?.map(item =>
    <div key={item.id}>
      <Card data={item} handleViewImage={handleViewImage} />
      {viewImage && (
        <ModalViewImage
          isOpen={viewImage}
          onClose={handleCloseViewImage}
          imgUrl={item.url}
          title={item.title}
        />
      )}
    </div>
    )}
  </SimpleGrid >
  );
}
