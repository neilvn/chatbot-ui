import { useState } from 'react'; 
import { Text, AppShell, Burger, Group, NavLink, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Items from './testData.json';
import { IconBox } from '@tabler/icons-react'; 
import '@mantine/core/styles.css';
import { Chatbox } from './ChatBox';

export function App() {
  const [opened, { toggle }] = useDisclosure();
  const [selected, setSelected] = useState(Items[0].section)

  const sections = Items.map(item => item.section)

  const selectedItem = Items.find(item => item.section === selected)

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconBox size={40} color='#6495ED'/>
          <Title c='#6495ED'>Chatbot</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {sections.map(section =>
          <NavLink
            label={section}
            active={section === selected}
            onClick={() => setSelected(section)}
            key={section}
          />
        )}
      </AppShell.Navbar>
      <AppShell.Main>
        <Text size='xl'>{selectedItem?.content}</Text>
        <Chatbox />
      </AppShell.Main>
    </AppShell>
  );
}
