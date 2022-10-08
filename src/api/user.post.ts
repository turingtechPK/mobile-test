import baseUrl from '../settings/apiUrl';
import authAxios from './client';

// -----------LOGIN---------------
export const login = async (email: string, password: string) => {
  let payload = {
    username: email,
    password: password,
  };
  let response = await authAxios.post('/auth/login', payload);
  return response;
};
// -----------AddNewNote---------------
export const AddNewNote = async (id: string, note: string) => {
  let payload = {
    content: note,
  };
  let response = await authAxios.post(`/calls/${id}/note`, payload);
  return response;
};
// -----------ChangeArchiveStatus---------------
export const ChangeArchiveStatus = async (id: string) => {
  let response = await authAxios.put(`/calls/${id}/archive`);
  return response;
};
