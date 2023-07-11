
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoqlCpFfMOx6EIynHjczAzS_ixC3ZIgnA",
  authDomain: "authen-e551e.firebaseapp.com",
  projectId: "authen-e551e",
  storageBucket: "authen-e551e.appspot.com",
  messagingSenderId: "709591155741",
  appId: "1:709591155741:web:64b0c72bcd631f5a91f2f4",
  measurementId: "G-1PHE7D0LY2"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

