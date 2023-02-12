import { useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';

import { pokeApi } from '../../api';
import { Pokemon, TypeColor } from '../../interfaces/pokemon-full';
import { toCapitalize, localFavorites } from '../../utils';
import { extractProperty } from '../../utils/handleData';

interface Props {
  pokemon: Pokemon;
}

const typeColors: TypeColor = {
  normal: {
    border: 'rgb(168,160,144)',
    bg: 'rgba(168,160,144, 0.4)',
  },
  fire: {
    border: 'rgb(240,80,48)',
    bg: 'rgba(240,80,48, 0.4)',
  },
  steel: {
    border: 'rgb(168,168,192)',
    bg: 'rgba(168,168,192, 0.4)',
  },
  water: {
    border: 'rgb(56,153,248) ',
    bg: 'rgba(56,153,248, 0.4)',
  },
  grass: {
    border: 'rgb(120,200,80)',
    bg: 'rgba(120,200,80, 0.4)',
  },
  electric: {
    border: 'rgb(248,208,48)',
    bg: 'rgba(248,208,48, 0.4)',
  },
  ice: {
    border: 'rgb(88,200,224)',
    bg: 'rgba(88,200,224, 0.4)',
  },
  fighting: {
    border: 'rgb(160,80,56)',
    bg: 'rgba(160,80,56, 0.4)',
  },
  poison: {
    border: 'rgb(176,88,160)',
    bg: 'rgba(176,88,160, 0.4)',
  },
  ground: {
    border: 'rgb(234,214,164)',
    bg: 'rgba(234,214,164, 0.4)',
  },
  flying: {
    border: 'rgb(152,168,240)',
    bg: 'rgba(152,168,240, 0.4)',
  },
  psychic: {
    border: 'rgb(248,112,160)',
    bg: 'rgba(248,112,160, 0.4)',
  },
  bug: {
    border: 'rgb(168,184,32)',
    bg: 'rgba(168,184,32, 0.4)',
  },
  rock: {
    border: 'rgb(184,160,88)',
    bg: 'rgba(184,160,88, 0.4)',
  },
  ghost: {
    border: 'rgb(96,96,176)',
    bg: 'rgba(96,96,176, 0.4)',
  },
  dark: {
    border: 'rgb(122,88,72)',
    bg: 'rgba(122,88,72, 0.4)',
  },
  dragon: {
    border: 'rgb(120, 96, 224)',
    bg: 'rgba(120, 96, 224, 0.4)',
  },
  fairy: {
    border: 'rgb(231,159,231)',
    bg: 'rgba(231,159,231, 0.4)',
  },
};

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const { id, name, sprites, types } = pokemon;
  const [isInFavorites, setIsInFavorites] = useState<boolean>(
    localFavorites.existInFavorites(id),
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 2,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
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
              <Text
                css={{
                  paddingBottom: '$8',
                }}
                size={30}
              >
                Types:
              </Text>
              <Container display="flex">
                {types.map((type) => (
                  <Text
                    css={{
                      border: `1px solid ${typeColors[type.type.name].border}`,
                      backgroundColor: `${typeColors[type.type.name].bg}`,
                      paddingLeft: '$8',
                      paddingRight: '$8',
                      color: 'White',
                      borderRadius: '5px',
                    }}
                    key={`${name} - ${type.slot} ${type.type.name}`}
                  >
                    {toCapitalize(type.type.name)}
                  </Text>
                ))}
              </Container>
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
  const pokemons251 = [...Array(251)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons251.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (/* ctx */ { params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  const pokemon = {
    id: extractProperty(data, 'id'),
    name: extractProperty(data, 'name'),
    sprites: extractProperty(data, 'sprites'),
    types: extractProperty(data, 'types'),
  };

  return {
    props: {
      pokemon,
    },
  };
};
