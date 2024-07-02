import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =   'http://137.184.206.139:8001';

export const socket = io(URL);