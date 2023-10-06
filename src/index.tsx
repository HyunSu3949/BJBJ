import { createRoot } from 'react-dom/client';
import { App } from './App';
import { worker } from './mocks/browser';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('#root element not found');
}
const root = createRoot(container);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
root.render(<App />);
