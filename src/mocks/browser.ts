import { setupWorker } from 'msw';
import { clubHandlers } from './clubHandlers';

export const worker = setupWorker(...clubHandlers);
