// Här renderar vi ut mer detaljerad information från ett ord och även lägger till så att användaren kan lägga till ordet till favoritlistan

import { useEffect, useRef } from 'react';

const WordDetail = ({ wordData, onAddFavorite }) => {
  const audioRef = useRef(null); 

  if (!wordData) return null;

  const { word, phonetics, meanings } = wordData;


  useEffect(() => {
    if (audioRef.current && phonetics?.[0]?.audio) {
      audioRef.current.src = phonetics[0].audio; 
      audioRef.current.load();
    }
  }, [wordData]); 

  return (
    <div>
      <h2>{word}</h2>

    
      {phonetics?.[0]?.audio && (
        <audio ref={audioRef} controls>
          <source src={phonetics[0].audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

    
      {meanings?.map((meaning, index) => (
        <div key={index}>
          <h4>{meaning.partOfSpeech}</h4>
          <ul>
            {meaning.definitions.map((def, idx) => (
              <li key={idx}>{def.definition}</li>
            ))}
          </ul>
        </div>
      ))}

    
      <button onClick={onAddFavorite}>Add to Favorites</button>
    </div>
  );
};

export default WordDetail;