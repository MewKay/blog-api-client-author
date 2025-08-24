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
    };
  } catch (error) {
    return null;
  }
};

export default decodeTokenToUser;
