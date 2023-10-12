import Router from './components/route/Router';
import { UserContextProvider } from './components/contexts/userContext';
import { ModalContextProvider } from './components/contexts/modalContext';
import Modals from './components/modals/Modals';
export function App() {
  return (
    <>
      <UserContextProvider>
        <ModalContextProvider>
          <Router />
          <Modals />
        </ModalContextProvider>
      </UserContextProvider>
    </>
  );
}
