import { constants } from "./constant.js";
import call from "../api/call.js";

const validateJWT = async(req) => {
  const url = constants.VALIDATE;
  if(!req.headers && !req.headers.authorization ) return false; 
  if(req.headers.authorization == undefined) return false;
  const headers = {
    Authorization: req.headers.authorization.split("Bearer ")[1],
  };
  const method = "GET";
  const response = await call(url, method, headers);
  if (response && response.message == "invalid token") return false;
  return true;
};

export { validateJWT };
