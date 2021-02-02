import React, {useState} from 'react';
import Routes from './routes';
import UserContext from './context/user';

const App = () => {
    const [user, setUser] = useState(sessionStorage);

    return(
    <UserContext.Provider value={[user,setUser]}>
      <Routes />
    </UserContext.Provider>
    )
  }

export default App;
