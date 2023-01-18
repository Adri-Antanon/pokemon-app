import { useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import { Layout } from '../../components/layouts';

import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces/pokemon-full';
import { toCapitalize, localFavorites } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const { id, name, sprites } = pokemon;
  const [isInFavorites, setIsInFavorites] = useState<boolean>(
    localFavorites.existInFavorites(id),
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorites(!isInFavorites);
  };

  return (
    <Layout title={toCapitalize(name)}>
      <Grid.Container
        css={{
          mt: '5px',
        }}
        gap={2}
      >
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Image
                alt={id + ' - ' + name}
                src={sprites.other.dream_world.front_default}
                height={200}
                width={350}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text h1> {name}</Text>
              <Button
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
                color={'gradient'}
              >
                {isInFavorites ? 'Favorite' : 'Save to Favorites'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}> Sprites: </Text>
              <Container justify="space-evenly" display="flex">
                <Image
                  src={sprites.front_default}
                  alt={name + ' sprite'}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_default}
                  alt={name + ' sprite'}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name + ' sprite'}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name + ' sprite'}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default PokemonPage;

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (/* ctx */ { params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};
