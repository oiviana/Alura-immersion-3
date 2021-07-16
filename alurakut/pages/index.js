import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar({user}){
  return(
    <Box as='aside' style={{gridArea: 'profileArea'}}>
      <img src={`https://github.com/${user}.png`} style={{borderRadius:'8px'}}/>
      <hr/>
      <a className="boxLink" href={`https://github.com/${user}`}>
      @{user}
      </a>
      <AlurakutProfileSidebarMenuDefault/>
   </Box>
  );

}

function ProfileRelationsBox({title, itens}){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{title} ({itens.length})</h2>
    {/* <ul>
          {followers.map((item) => {
            return (
              <li key={item}>
                <a href={`https://github.com/${item}.png`}>
                  <img src={item} />
                  <span>{item}</span>
                </a>
              </li>
            )
          })}
        </ul> */}
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [comunities, setComunities] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = "oiviana";
  const favoritePersons = ['CarlosLevir','gagigante','saulorodriguesm','aka-sacci','varelabeatriz','RaphaMarinho1'];
  const [followers, setFollowers] = React.useState([]);
  
  // 0 - Pegar o array de dados do github 
  React.useEffect(function() {
    // GET
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setFollowers(respostaCompleta);
    })
  })
  return (
    <>
    <AlurakutMenu/>
    <MainGrid>
      <div className="profileArea">
        <ProfileSideBar user={githubUser}/>
      </div>
      <div className="welcomeArea">
        <Box style={{gridArea: 'welcomeArea'}}>
          <h1 className="title">Bem vindo(a)</h1>
          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subtitle">O que você deseja fazer?</h2>

          <form onSubmit={(e) =>{
            e.preventDefault()
            const formData = new FormData(e.target)//Pega os dados do formulário

            comunitieData ={
              title: formData.get('title'),
              image: formData.get('image')
            }

            const currentComunities = [...comunities, comunitieData]
            setComunities(currentComunities)


            }}>
            <div>
              <input
              type="text" 
              placeholder="Nome da sua comunidade" 
              name="title" 
              aria-label="Nome da sua comunidade"
              />
            </div>
            <div>
              <input 
              placeholder="Insira uma URL para a capa" 
              name="image" 
              aria-label="Insira uma URL para a capa"
              />
            </div>
            <button>Criar comunidade</button>
          </form>
        </Box>
      </div>
      <div className="relationsArea">
        <ProfileRelationsBox itens={followers} title="Seguidores"/>

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Comunidades ({comunities.length})</h2>
        <ul>
              {comunities.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item.title}`}>
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper style={{gridArea: 'relationsArea'}}>
          <h2 className="smallTitle">Amigos ({favoritePersons.length})</h2>
     
         <ul>
              {favoritePersons.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
