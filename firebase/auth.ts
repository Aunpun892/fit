import firebaseapp from "./app";
import { getAuth } from "firebase/auth";

const auth  = getAuth(firebaseapp)
export default auth;