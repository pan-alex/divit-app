import './App.css';
import { useState } from 'react';
import {Group, group} from './Components/Classes';
// import MembersInfo from './Components/MembersInfo';
import MemberNew from './Components/MemberNew';
import MembersInfo from './Components/MembersInfo';

function App() {
  console.log('Starting App')
  console.log(group)

  return (
    <div className="App">
      <MembersInfo />
    </div>
  );
}

export default App;
