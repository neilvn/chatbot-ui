import { MouseEventHandler, useState, KeyboardEvent } from 'react';
import { Flex, TextInput, Chip, Button, Group, Stack, Affix } from '@mantine/core'; 
import { Message } from './ChatBox'


type DialogueBoxProps = {
  close: MouseEventHandler<HTMLButtonElement>;
  timer: number;
  reset: MouseEventHandler<HTMLButtonElement>;
  messages: Message[];
  setMessages: Function;
}

export function DialogueBox({ close, timer, reset, setMessages, messages }: DialogueBoxProps) {
  const [text, setText] = useState<string>('');

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event?.key === 'Enter') {
      setMessages([
        ...messages,
        { author: 'user', text: text }
      ]);
      setText('')
    }
  }

  return (
    <Affix position={{ bottom: 100, right: 100 }} bg={'white'} p={20}>
      <Stack
        h={'60vh'}
        w={'50vw'}
        justify='space-between'
      >
        <Stack styles={{ root: { overflowX: 'auto' }}}>
          <Group c='blue' justify='space-between'>
            <div>{timer} seconds</div>
            <Group>
              <Button onClick={reset}>Reset</Button>
              <Button onClick={close}>Close</Button>
            </Group>
          </Group>

          <Flex direction={'column'}>
            {messages.map((message, idx) => {
              return (
                <Chip
                  variant='filled'
                  color={message?.author === 'user' ? '' : 'gray'}
                  key={idx}
                  styles={{
                    root: {
                      marginBottom: 10,
                      alignSelf: message.author === 'user' ? 'end' : 'start'
                    },
                    label: {
                      backgroundColor: message?.author === 'user' ? 'cornflowerblue' : '#ECECEC',
                      color: message?.author === 'user' ? 'white' : 'black' 
                    }
                  }}
                >
                  {message.text}
                </Chip>
              )
            })}
          </Flex>
        </Stack>

        <TextInput
          placeholder='Type and press Enter to submit'
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />      
      </Stack>
    </Affix>
  )
  
}
