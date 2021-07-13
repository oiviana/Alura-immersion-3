import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar({user}){
  return(
    <Box style={{gridArea: 'profileArea'}}>
      <img src={`https://github.com/${user}.png`} style={{borderRadius:'8px'}}/>
   </Box>
  );

}

export default function Home() {
  const githubUser = "oiviana";
  const favoritePersons = ['CarlosLevir','gagigante','saulorodriguesm','aka-sacci','varelabeatriz','RaphaMarinho1'];
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
      </div>
      <div className="relationsArea">
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
