import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'
import { getSynonym } from './api/getSynonyms'



const App: React.FC = () =>  {
  const [word, setWord] = useState<string>("")
  const [synonym, setSynonym] = useState<string>("")
  const [error, setError] = useState<string>("")


  
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //console.log(value);
    setWord(value)
  }
  
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    setError("");
    setSynonym("");

    e.preventDefault();

    if (!/^[A-Za-z]+$/.test(word)) {
      setError('No spaces or numbers, only englsh letters');
    } else {
      if (word.length < 1){
        setError('Enter a word in the search box')
      } else {
        getSynonym(word)
        .then((val) => setSynonym(val as string))
        .catch((err) => setError(err.message))
  
        //console.log(word);
      
    }
    }
    
  }
  
  return (
    <>
      <div className='App'>
        <form id='form' data-testid= 'form' onSubmit={(e) =>  handleSubmit(e)}>
          <input placeholder='enter a word' type="text"  value={word} onChange={(e) => handleChange(e)}/>
          <input className='submit' type="submit"  value='search'/>
        </form>
        {error && <p className='error' data-testid='error' id='error'>{error}</p>}
        {synonym && <p className='result' data-testid='result' id='result'>{synonym}</p>}
      </div>
    </>
  )
}

export default App

  
