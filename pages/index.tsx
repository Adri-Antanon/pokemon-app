import { GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';
import { Layout } from '../components/layouts';

import { pokeApi } from '../api';
import { PokemonListResponse } from '../interfaces';
import { SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}
export default function HomePage({ pokemons }: Props) {
  return (
    <Layout title="Pokémon List">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons && pokemons.length > 0 ? (
          pokemons.map((poke) => (
            <PokemonCard pokemon={poke} key={poke.name + ' ' + poke.id} />
          ))
        ) : (
          <h1>LOADING...</h1>
        )}
      </Grid.Container>
    </Layout>
  );
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    '/pokemon/?limit=1008',
  );

  const pokemons: SmallPokemon[] = data.results.map((poke, index) => {
    return {
      ...poke,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};
