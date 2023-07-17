
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDoqlCpFfMOx6EIynHjczAzS_ixC3ZIgnA",
//   authDomain: "authen-e551e.firebaseapp.com",
//   projectId: "authen-e551e",
//   storageBucket: "authen-e551e.appspot.com",
//   messagingSenderId: "709591155741",
//   appId: "1:709591155741:web:64b0c72bcd631f5a91f2f4",
//   measurementId: "G-1PHE7D0LY2"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCqV3fxcpWn8YnOgI5M_vyFGW3VFjVL5uM",
  authDomain: "vinhome-ecommerence.firebaseapp.com",
  databaseURL: "https://vinhome-ecommerence-default-rtdb.firebaseio.com",
  projectId: "vinhome-ecommerence",
  storageBucket: "vinhome-ecommerence.appspot.com",
  messagingSenderId: "778533524226",
  appId: "1:778533524226:web:739e59d182c25b0cc9e81b",
  measurementId: "G-M300G60503"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

