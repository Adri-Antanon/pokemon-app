import { useTheme as useNextTheme } from 'next-themes';
import { Spacer, Text, useTheme } from '@nextui-org/react';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {}

const Navbar: FC<Props> = () => {
  const { setTheme } = useNextTheme();
  const { isDark, theme } = useTheme();
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
      <Link
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        href={'/'}
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
          P
        </Text>
        <Text color="white" h3>
          okémon - Pokedex
        </Text>
      </Link>
      <Spacer
        css={{
          flex: 1,
        }}
      />
      <Link href={'/favorites'}>
        <Text color="white"> Favorites</Text>
      </Link>
    </div>
  );
};

export default Navbar;
