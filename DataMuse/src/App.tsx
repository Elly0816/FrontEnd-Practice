import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'


const URL = 'https://api.datamuse.com/words?rel_syn'


const App: React.FC = () =>  {
  const [word, setWord] = useState<string|undefined>("")
  const [synonym, setSynonym] = useState<string|undefined>("")


  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setWord(value)
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(word);

    const fullURL = URL+`=${word}`;

    try {
      const response = await fetch(fullURL);
      const data = await response.json() as {word:string, person:number}[];
      setWord('');
      console.log(data);
      setSynonym(data[0].word)

    } catch (e) {
      console.log(e);
    }

  }

  return (
    <>
      <div>
        <form onSubmit={(e) =>  handleSubmit(e)}>
          <input placeholder='enter a word' type="text"  value={word} onChange={(e) => handleChange(e)}/>
          <input type="submit"  value='search'/>
        </form>

        {synonym && <p>{synonym}</p>}
      </div>
    </>
  )
}

export default App
