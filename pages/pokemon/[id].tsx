import { useRouter } from 'next/router';
import { Layout } from '../../components/layouts';

interface Props {}

export default function PokemonPage() {
  const router = useRouter();

  return (
    <Layout title="Some Pokémon">
      <h1>Test</h1>
    </Layout>
  );
}
