import Router from './components/route/Router';
import { UserContextProvider } from './components/contexts/userContext';
import { ModalContextProvider } from './components/contexts/modalContext';
import Modals from './components/modals/Modals';
import './App.css';
import { NavigateProvider } from './components/contexts/NavigateContext';

export function App() {
  return (
    <>
      <NavigateProvider>
        <UserContextProvider>
          <ModalContextProvider>
            <Router />
            <Modals />
          </ModalContextProvider>
        </UserContextProvider>
      </NavigateProvider>
    </>
  );
}
