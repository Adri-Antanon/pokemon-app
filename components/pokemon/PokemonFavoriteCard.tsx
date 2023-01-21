import { Card, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  pokemonId: number;
}
export const PokemonFavoriteCard: FC<Props> = ({ pokemonId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <Grid xs={6} sm={3} md={2}>
      <Card
        hoverable
        clickable
        onClick={handleClick}
        css={{
          padding: 10,
        }}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width={'100%'}
          height={'140px'}
        />
      </Card>
    </Grid>
  );
};
