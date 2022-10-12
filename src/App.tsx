import React, { useState, useEffect } from 'react';
import './App.css';

interface QuoteData {
  _id?: String
  content: String
  author: String
  authorSlug?: String
  length?: Number
  tags?: String[]
}

function App() {
  const [data, setData] = useState<QuoteData>();

  async function updateQuote() {
    let response;
    try {
      response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if(!response.ok) throw new Error (`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      console.log(error);
      setData({ content: 'Oops... something went wrong.', author: ''});
    }
  }

  useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  return (
    <div className="App">
      <div className='card'>
        <p className='quote'>"{data.content}"</p>
        <p className='author'> -{data.author}</p>
      </div>
    </div>
  );
}

export default App;
