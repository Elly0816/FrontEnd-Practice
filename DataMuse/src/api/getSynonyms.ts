
const URL = 'https://api.datamuse.com/words?rel_syn'


export const getSynonym:(word:string)=>Promise<Error|string> = async (word) =>{
      
    const fullURL = URL+`=${word}`;
      
    try {
    const response = await fetch(fullURL);
    //console.log(response)
    if (!response.ok){
        throw new Error('There was an error with the response');
        // setError('There was an error with the response')
    } else {

      const data = await response.json();
      //console.log(data)
      if (!data){
        throw new Error("There was an error");
      } else {

        // as {word:string, person:number}[]
        // setWord('');
        //console.log(data.length);
        if (data.length > 0){
          // setSynonym(data[0].word)
          return data[0].word;
        } else {
          // setSynonym("No Synonyms were found");

          //console.log( "No Synonyms were found");
          return "No Synonyms were found";
        }
        // setError("");
      }
    }

  } catch (err) {
    const error = err as Error;
    //console.log(error.message);
    if (!error){
        return Promise.reject('Something went wrong 🫤');
    } else {

      return Promise.reject(error.message);
      // setSynonym("");
    }
  }
  }