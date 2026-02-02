import { isPast } from "date-fns";
import { decodeJwt } from "jose";

const decodeTokenToUser = (token) => {
  try {
    const payload = decodeJwt(token);
    const expirationDate = new Date(payload.exp * 1000);
    const isTokenExpired = isPast(expirationDate);

    if (isTokenExpired) {
      return null;
    }

    return {
      id: payload.id,
      username: payload.username,
      is_author: payload.is_author,
      is_guest: payload.is_guest,
    };
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
};

export default decodeTokenToUser;
