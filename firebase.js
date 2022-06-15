import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoP6QpxVoW3ikOsk3DkFo1zQarQC23_W0",
  authDomain: "summerquiz-76fe5.firebaseapp.com",
  databaseURL: "https://summerquiz-76fe5-default-rtdb.firebaseio.com",
  projectId: "summerquiz-76fe5",
  storageBucket: "summerquiz-76fe5.appspot.com",
  messagingSenderId: "850536550202",
  appId: "1:850536550202:web:6a58c374ba37726c3f0a03",
  measurementId: "G-0DXTMZVXFK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);