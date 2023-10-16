import { authHandlers } from './authHandlers';
import { clubHandlers } from './clubHandlers';
import { feedHandlers } from './feedHandlers';

export const handlers = [...clubHandlers, ...feedHandlers, ...authHandlers];
