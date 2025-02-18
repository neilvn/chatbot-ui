import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Avatar, Modal, Affix } from '@mantine/core';
import { IconMessageFilled } from '@tabler/icons-react';
import { DialogueBox } from './DialogueBox'; 

const mockResponses = [
  'Hi, how can I help you?',
  'Sure, that wont be a problem',
  'Is there anything else I can help you with',
  'Thank you'
]

export type Message = {
  author: string;
  text: string;
}

export function Chatbox() {
  const [timer, setTimer] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  function reset() {
    setMessages([]);
    setTimer(0);
  }

  useEffect(() => {
      let intervalId: number;
      if (opened) {
        intervalId = setInterval(() => {
          setTimer(prevTimer => prevTimer + 1);
        }, 1000);
      }

      return () => clearInterval(intervalId);
    }, [opened])
  

  useEffect(() => {
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1]
    
    if (lastMessage.author === 'user') {
      const botMessage = mockResponses[Math.floor(Math.random() * mockResponses.length)]

      setTimeout(() => setMessages([ ...messages, { author: 'bot', text: botMessage }]), 500)
    }
  }, [messages])

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0,
          blur: 0,
        }}
        styles={{ content: { display: 'none' }}}
      >
        <DialogueBox
          close={close}
          messages={messages}
          timer={timer}
          reset={reset}
          setMessages={setMessages}
        />
      </Modal>

      <Affix position={{ bottom: 50, right: 50 }}>
        <Avatar
          size='lg'
          radius={'xl'}
          color='blue'
          variant='filled'
          styles={{ root: { cursor: 'pointer'}}}
          onClick={open}
        >
          <IconMessageFilled size={30}/>
        </Avatar>
      </Affix>
    </>
  );
}
