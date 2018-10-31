import { Carina } from 'carina';
import { setFollowerCount } from './actions';

let ca: Carina;

export async function initCarina() {
   ca = new Carina({ isBot: true }).open()
}

export function startFollowerListener(channelId: number) {
    ca.subscribe<IEventFollowers>(`channel:${channelId}:update`, data => {
        setFollowerCount(data.numFollowers);
    });
}

interface IEventFollowers {
    numFollowers: number;
}