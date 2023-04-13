import { useState, useEffect } from 'react';
import './App.css';
import {Auth} from './components/auth';
import { db,auth, storage } from './config/firebase-config';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
function App() {

  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  //READ
  const getMovieList = async() => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => (
        {...doc.data(),
          id: doc.id
        }))
        setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getMovieList();
  },[]);


  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [fileUploadState, setFileUploadState] = useState(null);

  const [updMovieTitle, setUpdMovieTitle] = useState("");
  //CREATE
  const onSubmitMovie = async() => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movieTitle,
        releaseDate: releaseDate,
        isActive: isActive,
        userId: auth?.currentUser?.uid
      })
      getMovieList();
    } catch (error) {
      console.error(error)
    }
  }

  //DELETE
  const deleteMovie = async(id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  }

  //UPDATE
  const updateMovie = async(id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {
      title: updMovieTitle
    })
    getMovieList();
  }


  const uploadFile = async() => {
    if(!fileUploadState) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUploadState.name}`);
    try {
        await uploadBytes(filesFolderRef, fileUploadState);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <Auth />

      <div>
        <input placeholder="Movie title" onChange={(e) => setMovieTitle(e.target.value)} />
        <input placeholder="Year" type="number" onChange={(e) => setReleaseDate(e.target.value)} />
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> <label>Is Active</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>

<div>
  {
    movieList.map((movie) => (
      <div>
        <h1>{movie.title}</h1>
        <p>Date: {movie.releaseDate}</p>
        <button onClick={() => deleteMovie(movie.id)}>Delete</button>

        <input placeholder="New title" onChange={(e) => setUpdMovieTitle(e.target.value)} />
        <button onClick={() => {updateMovie(movie.id)}}>Update</button>

      </div>
    ))
  }
</div>


<div>
  <input type="file" onChange={(e) => setFileUploadState(e.target.files[0])} />
  <button onClick={uploadFile}>Upload File</button>
</div>

    </div>
  );
}

export default App;
