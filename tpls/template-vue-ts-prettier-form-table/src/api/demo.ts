import { defHttp } from '@/utils/axios';

enum Api {
    getList = '/demo_api/demo_list',
    create = '/demo_api/add_demo',
}

export const getDemoList = (params) => defHttp.get({ url: Api.getList, params });

export const createDemo = (params) => defHttp.post({ url: Api.create, params });
