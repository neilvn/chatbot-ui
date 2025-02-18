import { useState } from 'react' 
import { AppShell, Burger, Group, NavLink, Title, TextInput, Highlight } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Items from './testData.json'
import { IconBox } from '@tabler/icons-react' 
import '@mantine/core/styles.css'
import { Chatbox } from './ChatBox'

export function App() {
  const [opened, { toggle }] = useDisclosure()
  const [searchValue, setSearchValue] = useState<string>('')
  const [selected, setSelected] = useState(Items[0].section)

  const sections = Items.map(item => item.section)

  const selectedItem = Items.find(item => item.section === selected)

  const selectedParagraphs = searchValue
    ? selectedItem?.content.filter(p => p.includes(searchValue))
    : selectedItem?.content

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Group justify='space-between' align='initial' h={60}>
          <Group h='100%' px='md'>
            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
            <IconBox size={40} color='#6495ED'/>
            <Title c='#6495ED'>Chatbot</Title>
          </Group>
          <TextInput
            value={searchValue}
            onChange={e => setSearchValue(e.currentTarget.value)}
            placeholder='Search'
            mr={20}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md'>
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
        {selectedParagraphs
         && selectedParagraphs.map(
          (paragraph, idx) =>
            <Highlight highlight={searchValue} size='xl' mb={20} key={idx}>{paragraph}</Highlight>
        )}
        <Chatbox />
      </AppShell.Main>
    </AppShell>
  )
}
