import axios from 'axios';
import { NextPage, GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonListResponse } from '../interfaces';
import { PokemonResult } from '../interfaces/pokemon-list';

interface Props {
  pokemons: PokemonResult[];
}
export default function HomePage({ pokemons }: Props) {
  return (
    <Layout title="Pokémon List">
      <ul>
        {pokemons && pokemons.length > 0
          ? pokemons.map((poke, index) => (
              <li key={poke.name}>
                {index + 1} - {poke.name}
              </li>
            ))
          : null}
      </ul>
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
    '/pokemon/?limit=151',
  );

  return {
    props: {
      pokemons: data.results,
    },
  };
};
