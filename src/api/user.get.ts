import authAxios from './client';

// -----------Get All Calls--------------
export const GetAllCalls = async (offset: number, limit: number) => {
  let result = authAxios.get(`/calls?offset=${offset}&limit=${limit}`);
  return result;
};

// -----------Get One Calls--------------
export const GetOneCalls = async (id: number) => {
  let result = authAxios.get(`/calls/${id}`);
  return result;
};
