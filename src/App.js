import { useState } from 'react';
import {group} from './Components/Classes';
import MembersInfo from './Components/MembersInfo';
import RepaymentsBox from './Components/RepaymentsBox';

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
      <RepaymentsBox />
    </div>
  );
}

export default App;
