import { FC } from 'react';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { SmallPokemon } from '../../interfaces';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {
  pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { name, id, img } = pokemon;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${id}`);
  };
  return (
    <Grid xs={6} sm={3} md={2}>
      <Card hoverable clickable onClick={handleClick}>
        <Card.Body
          css={{
            p: 1,
          }}
        >
          <Image
            alt={id + ' - ' + name}
            src={img}
            height={140}
            width={300}
            style={{
              width: '100%',
            }}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
