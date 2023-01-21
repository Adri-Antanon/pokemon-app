import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { PokemonFavoriteCard } from '../pokemon/PokemonFavoriteCard';

interface Props {
  favoritePokemons: number[];
}

export const Favorites: FC<Props> = ({ favoritePokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favoritePokemons.map((id) => (
        <PokemonFavoriteCard pokemonId={id} key={id} />
      ))}
    </Grid.Container>
  );
};
