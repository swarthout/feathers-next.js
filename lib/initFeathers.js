import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

let client = null;

export default function initFeathers() {
    if (!client) {
        const socket = io('http://localhost:3030');
        client = feathers();

        client.configure(hooks());
        client.configure(socketio(socket));
        client.configure(authentication({
            storage: window.localStorage
        }));
    }
    return client;
}