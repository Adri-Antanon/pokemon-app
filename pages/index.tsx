import { Button } from '@nextui-org/react';
import { NextPage } from 'next';
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layout title="Pokémon List">
      <h1>pokeApp</h1>
      <Button color={'gradient'}> Pika pika </Button>
    </Layout>
  );
};

export default HomePage;
