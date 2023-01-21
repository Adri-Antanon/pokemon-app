import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts';
import { Favorites, NoFavorites } from '../../components/ui';
import localFav from '../../utils/localFavorites';

interface Props {
  // pokemons: SmallPokemon[];
}
export default function FavoritesPage({}: Props) {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFav.pokemons());
  }, []);

  return (
    <Layout title="Pokémon - Favorites">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <Favorites favoritePokemons={favoritePokemons} />
      )}
    </Layout>
  );
}
