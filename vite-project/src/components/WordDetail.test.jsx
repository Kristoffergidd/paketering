// Testar vi återigen så att efter vi sökt på ett ord att vi får ut information om ordet vi testar även så att vi kan spela upp ljudet om det är tillgängligt


import { render, screen } from '@testing-library/react';
import WordDetail from './WordDetail';
import React from 'react';  
import { test, expect } from 'vitest'; 

test('Word is displayed on the website after search', () => {
  const wordData = {
    word: 'example',
    phonetics: [],
    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [{ definition: 'A representative form or pattern' }],
      },
    ],
  };

  render(<WordDetail wordData={wordData} />);
  
  expect(screen.getByText('example')).toBeInTheDocument();
  expect(screen.getByText('A representative form or pattern')).toBeInTheDocument();
});

test('Audio can be played if available', () => {
  const wordData = {
    word: 'example',
    phonetics: [{ audio: 'https://api.dictionaryapi.dev/media/audio/example.mp3' }],
    meanings: [],
  };

  render(<WordDetail wordData={wordData} />);
  
  const audioElement = screen.getByText(/Your browser does not support the audio element/i).closest('audio');
  expect(audioElement).toBeInTheDocument();

  const audioSource = audioElement.querySelector('source');
  expect(audioSource).toHaveAttribute('src', 'https://api.dictionaryapi.dev/media/audio/example.mp3');
});


