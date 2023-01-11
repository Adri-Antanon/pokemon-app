import { useTheme as useNextTheme } from 'next-themes';
import { Spacer, Switch, Text, useTheme } from '@nextui-org/react';
import { FC } from 'react';
import { SwitchEvent } from '@nextui-org/react/esm/switch/switch';
import Image from 'next/image';

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
      <Image
        src={
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        }
        alt={'App Icon'}
        width={70}
        height={70}
      />
      <Text color="white" h2>
        Pokemon - First gen
      </Text>
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