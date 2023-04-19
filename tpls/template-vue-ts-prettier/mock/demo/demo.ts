import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../_util';
import { Random } from 'mockjs';

const demoList = (() => {
    const result: any[] = [];
    for (let index = 0; index < 200; index++) {
        result.push({
            id: `${index}`,
            target: Random.string('abcdefghijklmnopqrstuvwxyz', 5),
            source: Random.title(5),
            creator: Random.name(true),
            annotation: Random.cparagraph(10, 20),
            update_time: Random.datetime(),
        });
    }
    return result;
})();

export default [
    {
        url: '/api/list',
        timeout: 1000,
        method: 'get',
        response: ({ query }) => {
            const { page = 1, pageSize = 20 } = query;
            return resultPageSuccess(page, pageSize, demoList, 'records');
        },
    },
    {
        url: '/api/add',
        method: 'post',
        response: () => {
            return resultSuccess(null);
        },
    },
] as MockMethod[];
