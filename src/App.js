import { useState } from 'react';
import {group} from './Components/Classes';
import MembersInfo from './Components/MembersInfo';


function App() {
  const [membersState, setMembers] = useState(group.members)

  function updateMembersState() {
      setMembers(prev => { return {...prev} })
  }

  console.log('Starting App')
  console.log(group)



  return (
    <div className="App">
      <MembersInfo membersState={membersState} setMembersState={updateMembersState}/>
    </div>
  );
}

export default App;
