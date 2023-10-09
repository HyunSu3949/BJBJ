import Router from './components/route/Router';
import { UserContextProvider } from './components/contexts/userContext';
export function App() {
  return (
    <>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </>
  );
}
