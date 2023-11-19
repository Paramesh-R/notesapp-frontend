import './App.css';
import MainRoutes from './MainRoutes';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <MainRoutes />
      </div>
    </UserContextProvider>
  );
}

export default App;
