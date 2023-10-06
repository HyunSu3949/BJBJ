import { setupServer } from 'msw/node';
import { clubHandlers } from './clubHandlers';

export const server = setupServer(...clubHandlers);
