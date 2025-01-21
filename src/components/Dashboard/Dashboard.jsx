import { useContext } from 'react';
import { AuthedUserContext } from '../../App';

const Dashboard = () => {
    // const user = useContext(AuthedUserContext);
    const username = localStorage.getItem('username')

    return (
      <main>
        <h1>Welcome, {username}</h1>
        <p>
          This is the dashboard page where you, and only you, can see a dashboard
          of all of your things.
        </p>
      </main>
    );
  };
  
  export default Dashboard;
  