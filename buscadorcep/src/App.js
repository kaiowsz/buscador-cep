import './App.css';
import {FiSearch} from 'react-icons/fi'
import api from './Api'
import { useState } from 'react';

function App() {

  const [input, setInput] = useState('')

  async function handleSearch() {

    
    try {
      const search = await api.get(`${input}/json`)
      
      const {bairro, cep, uf, ddd, localidade, logradouro} = search.data
      

    if(search.data.erro === true) {
      throw new Error('')
    } else {
      document.querySelector('.result').classList.remove('off')
      document.querySelector('.cep').innerText = `CEP: ${cep}`
      document.querySelector('.rua').innerText = `${logradouro}`
      document.querySelector('.bairro').innerText = `${bairro}`
      document.querySelector('.cidade').innerText = `${localidade}, ${uf}`
      document.querySelector('.ddd').innerText = `DDD: ${ddd}`
    }
  } 
  catch (error) {
    document.querySelector("#cep-input").value = ""
    const modal = document.querySelector('.modal')
      modal.classList.toggle('on')
      setTimeout(() => {
        modal.classList.toggle('on')
      }, 2000);
    }
    

  }


  return (
    <div className="App">
      <header>
        <h1>Buscador CEP</h1>
      </header>
      
      <section className="search">
        <input type={'text'}
        placeholder="Digite o CEP"
        id="cep-input"
        onChange={(e) => {setInput(e.target.value)}}></input>
        <button className="search-cep" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" id="iconFi"/>
        </button>
      </section>

      <main className="result off">
        <h2 className='cep'> </h2>
        <p className='rua'></p>
        <p className='bairro'></p>
        <p className='cidade'></p>
        <p className='complemento'></p>
        <p className='ddd'></p>
      </main>

      <div className="modal">
        <p>Não conseguimos encontrar o CEP. Por favor, tente novamente.</p>
      </div>



    </div>
  );
}

export default App;
