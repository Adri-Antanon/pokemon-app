import { useTheme as useNextTheme } from 'next-themes';
import { Spacer, Text, useTheme } from '@nextui-org/react';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {}

const Navbar: FC<Props> = () => {
  const { setTheme } = useNextTheme();
  const { isDark, theme } = useTheme();
  const router = useRouter();

  const handleClick = () => router.push('/');
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme?.colors.gray900.value,
        justifyContent: 'start',
        padding: '0 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Image
          src={
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
          }
          alt={'App Icon'}
          width={70}
          height={70}
        />
        <Text color="white" h2>
          Pokémon - Pokedex
        </Text>
      </div>
      <Spacer
        css={{
          flex: 1,
        }}
      />
      <Text color="white"> Favorites</Text>
    </div>
  );
};

export default Navbar;
