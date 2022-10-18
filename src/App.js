import { useState, createContext } from 'react';
import {group} from './Components/Classes';
import MembersInfo from './Components/MembersInfo';
import RepaymentsBox from './Components/RepaymentsBox';

export const GroupContext = createContext()

function App() {
  const [membersState, setMembers] = useState(group.members)

  function updateMembersState() {
      setMembers(prev => { return {...prev} })
  }

  console.log('Starting App')
  console.log(group)


    return (
        <div className="App">
            <GroupContext.Provider value={[membersState, updateMembersState]}>
                <MembersInfo />
                <RepaymentsBox />
            </GroupContext.Provider>
        </div>
    );
}

export default App;
