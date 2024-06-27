
import './App.css';
import './dispMoveis.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import {useState} from 'react';
import {marked} from 'marked';

marked.setOptions({
  breaks: true
});

function App(){
  let introducao = `
  # Olá Mundo !

  ## Sejam bem-vindos
  
  Um código HTML em linha: \`<div></div>\`

  > Um código JS em bloco:

  \`\`\`
  function verificarIdade(idade) {
    if (idade >= 18) {
      return "Já pode dirigir";
    }else{
      return "Não pode dirigir";
    }
  }
  \`\`\`

  Texto em **negrito**
  Texto ~~riscado~~
  E texto em _itálico_
  
  Aqui um link para o meu perfil do [GitHub](https://www.github.com/Gabrielffer)
  
  Este projeto foi feito com:
  1. Bootstrap
  1. React
  1. Marked
  
  Um projeto do curso:
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

  const [state, setState] = useState({
    entrada: introducao,
    ttlCaracteres: introducao.length
  });

  const transferir = (txt) => {
    setState({
      entrada: txt,
      ttlCaracteres: txt.length
    });
  }

  const [preVisuExpandido, redimensionar] = useState(false);
  const alternarExpansao = (obj) => {
    if(obj.className === 'bi bi-arrows-angle-expand'){
      obj.className = 'bi bi-arrows-angle-contract';
      redimensionar(true);
    }else{
      obj.className = 'bi bi-arrows-angle-expand';
      redimensionar(false);
    }
  }

  return (
    <div>
      {preVisuExpandido ? '' : <Editor entrada={state.entrada} ttlCaracteres={state.ttlCaracteres} transferir={transferir}/>}
      <PreVisualizacao entrada={state.entrada} alternarExpansao={alternarExpansao}/>
    </div>
  );
}

function Editor({entrada, ttlCaracteres, transferir}){
  return (
    <div id='div_editor' className='card' style={{borderColor: 'unset'}}>
      <div className='card-title bg-primary text-white'>
        <div>
          <i className='bi bi-pencil-square'></i>&nbsp;
          <span>Editor</span>
        </div>
        <div>
          <span className='badge bg-success'>{ttlCaracteres}</span>
        </div>
      </div>
      <div className='card-body' style={{padding: 0}}>
        <textarea id='editor' onChange={(e) => transferir(e.target.value)} value={entrada} spellCheck='false'></textarea>
      </div>
    </div>
  );
}

function PreVisualizacao({entrada, alternarExpansao}){
  return (
    <div id='div_pre_visualizacao'>
      <div className='card-title bg-success text-white'>
        <div>
          <i className='bi bi-eye'></i>&nbsp;
          <span>Pré-Visualização</span>
        </div>
        <div>
          <i className='bi bi-arrows-angle-expand' onClick={(e) => alternarExpansao(e.target)}></i>
        </div>
      </div>
      <div id='preview' className='card-body bg-secondary text-white' style={{padding: 10}} dangerouslySetInnerHTML={{__html: marked(entrada)}}>
      </div>
    </div>
  );
}

export default App;