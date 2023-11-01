import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

interface NavigationState {
  route: string;
}

interface NavigationContextValue {
  navigate: (route: string) => void;
  currentNavigation: NavigationState | null;
}

const NavigateContext = createContext<NavigationContextValue | undefined>(
  undefined,
);

interface NavigateProviderProps {
  children: ReactNode;
}

export const NavigateProvider: React.FC<NavigateProviderProps> = ({
  children,
}) => {
  const [currentNavigation, setCurrentNavigation] =
    useState<NavigationState | null>(null);

  const navigate = useCallback(
    (route: string) => {
      setCurrentNavigation({ route });
    },
    [setCurrentNavigation],
  );

  const contextValue = {
    navigate,
    currentNavigation,
  };

  return (
    <NavigateContext.Provider value={contextValue}>
      {children}
    </NavigateContext.Provider>
  );
};

export const useNavigateContext = (): NavigationContextValue => {
  const context = useContext(NavigateContext);
  if (!context) {
    throw new Error('useNavigate must be used within a NavigateProvider');
  }
  return context;
};
