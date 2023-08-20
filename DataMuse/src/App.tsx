import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'


const URL = 'https://api.datamuse.com/words?rel_syn'


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

    e.preventDefault();
    if (word.length < 1){
      setError('Enter a word in the search box')
    } else {

      //console.log(word);
      
      const fullURL = URL+`=${word}`;
      
      try {
      const response = await fetch(fullURL);
      if (!response.ok){
          setError('There was an error with the response')
      } else {

        const data = await response.json();
        if (!data){
          throw new Error("There was an error")
        } else {

          // as {word:string, person:number}[]
          setWord('');
          //console.log(data);
          if (data.length > 0){
            setSynonym(data[0].word)
          } else {
            setSynonym("No Synonyms were found");
          }
          setError("");
        }
      }

    } catch (err) {
      const error = err as {message:string}
      //console.log(error.message);
      setError(error.message);
      setSynonym("");
    }
  }
    
  }
  
  return (
    <>
      <div>
        <form onSubmit={(e) =>  handleSubmit(e)}>
          <input placeholder='enter a word' type="text"  value={word} onChange={(e) => handleChange(e)}/>
          <input type="submit"  value='search'/>
        </form>
        {error && <p>{error}</p>}
        {synonym && <p>{synonym}</p>}
      </div>
    </>
  )
}

export default App
