import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'


const URL = 'https://api.datamuse.com/words?rel_syn'


const App: React.FC = () =>  {
  const [word, setWord] = useState<string>("")
  const [synonym, setSynonym] = useState<string>("")
  const [error, setError] = useState<string>("")


  
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setWord(value)
  }
  
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (word.length < 1){
      setError('Enter a word in the search box')
    } else {
      getSynonym(word)
      .then((val) => setSynonym(val as string))
      .catch((err) => setError(err.message))

      console.log(word);
    
  }
    
  }
  
  return (
    <>
      <div>
        <form id='form' data-testid= 'form' onSubmit={(e) =>  handleSubmit(e)}>
          <input placeholder='enter a word' type="text"  value={word} onChange={(e) => handleChange(e)}/>
          <input type="submit"  value='search'/>
        </form>
        {error && <p data-testid='error' id='error'>{error}</p>}
        {synonym && <p data-testid='result' id='result'>{synonym}</p>}
      </div>
    </>
  )
}

export default App

  export const getSynonym:(word:string)=>Promise<Error|string> = async (word) =>{
      
    const fullURL = URL+`=${word}`;
      
    try {
    const response = await fetch(fullURL);
    console.log(response)
    if (!response.ok){
        throw new Error('There was an error with the response');
        // setError('There was an error with the response')
    } else {

      const data = await response.json();
      console.log(data)
      if (!data){
        throw new Error("There was an error");
      } else {

        // as {word:string, person:number}[]
        // setWord('');
        console.log(data.length);
        if (data.length > 0){
          // setSynonym(data[0].word)
          return data[0].word;
        } else {
          // setSynonym("No Synonyms were found");

          console.log( "No Synonyms were found");
          return "No Synonyms were found";
        }
        // setError("");
      }
    }

  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    if (!error){
        return Promise.reject('Something went wrong 🫤');
    } else {

      return Promise.reject(error.message);
      // setSynonym("");
    }
  }
  }
