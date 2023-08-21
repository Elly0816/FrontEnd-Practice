import '@testing-library/jest-dom/';
import { render,
    //  fireEvent, waitFor,
      screen, 
      } from '@testing-library/react';
import App, {getSynonym} from './App';

//Mocking the fetch funtion

(global.fetch as jest.Mock) = jest.fn(() => 
Promise.resolve({
    json: () => Promise.resolve([{word: 'run'}]),
    ok: true
}))

test('renders the form and input fields', () => {
  render(<App/>);
  const formElement = screen.getAllByTestId('form') as HTMLFormElement[];
  const buttonElement = screen.getByDisplayValue('search') as HTMLInputElement;
  const inputElement = screen.getByPlaceholderText('enter a word') as HTMLInputElement
  expect(formElement[0] as HTMLFormElement).toBeInTheDocument();
  expect(buttonElement as HTMLButtonElement).toBeInTheDocument();
  expect(inputElement as HTMLInputElement).toBeInTheDocument();
});


beforeEach(()=>jest.spyOn(global, 'fetch').mockClear())


test('function returns data of run', async ()=>{
    const data = await getSynonym('test');
    expect(data).toBe('run');
    expect(fetch).toHaveBeenCalledTimes(1);
    
});


test('function should return error', async ()=>{
    jest.spyOn(global, 'fetch').mockImplementationOnce(()=>Promise.reject(new Error('Error')))
    try {        
        await getSynonym('-2456');
    } catch(e){
        expect.assertions(2);
        expect(e).toBe('Error');
        expect(fetch).toHaveBeenCalledTimes(1);
}
})

// test('error element should be shown when form is submitted', async () => {
//     render(<App/>);
//     jest.spyOn(global, 'fetch').mockImplementationOnce(()=>Promise.reject(new Error('Error')));
//     const inputElement = screen.getByPlaceholderText('enter a word') as HTMLInputElement;
//     fireEvent.change(inputElement, {target:{value: 'run'}});
//     const searchElement = screen.getByDisplayValue('search');
//     fireEvent.click(searchElement);
//     await waitFor(() => {
//         expect(fetch).toHaveBeenCalledTimes(1);
//         const error = screen.getByTestId('error');
//         expect(error).toBeInTheDocument();
//     })

// }) 

