// @ts-expect-error @typescript-eslint/ban-ts-comment
import { v4 as uuidv4 } from 'uuid';

export const generateID = () => {
    const uuId = uuidv4();
    console.log('This person UUID generated is: ', uuId);
    return uuId;
}