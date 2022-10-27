
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useEffect, useState, useCallback } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBtIlTMfa34vjhcJm1miNlU0oNwlj5QeqA",
  authDomain: "truss-e14f2.firebaseapp.com",
  databaseURL: "https://truss-e14f2-default-rtdb.firebaseio.com",
  projectId: "truss-e14f2",
  storageBucket: "truss-e14f2.appspot.com",
  messagingSenderId: "165168607858",
  appId: "1:165168607858:web:47dff2ccab473e394d48eb",
  measurementId: "G-TQ9PJ78M1Q"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
}


