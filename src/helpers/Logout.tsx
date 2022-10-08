import authToken from '../api/authToken';
import {removeJwtToken} from '../store/jwt.slice';

export const LogoutFun = async (dispatch: () => {}) => {
  console.log('called');
  await authToken.removeToken();
  dispatch(removeJwtToken());
};
