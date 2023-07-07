import React from "react";
import { useEffect, useState } from "react";
import { getAllBreeds, getSubBreedImage, getBreedImage } from "./api/services/breed";

function App() {
  const [breeds, setBreeds] = useState([])
  const [currentBreed, setCurrentBreed] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getAllBreeds();
      const _breeds = response.data.message;
      const breed_list = [];

      Object.keys(_breeds).forEach(breed => {
        const sub_breeds = _breeds[breed]
        if(sub_breeds.length > 0) {
          for(let i = 0; i < sub_breeds.length; i++) {
            breed_list.push(sub_breeds[i] + " " + breed);
          }
        } else {
          breed_list.push(breed);
        }
      })
      setBreeds(breed_list);
    })()

  }, [])

  const handleBreedChange = (e) => {
    setCurrentBreed(e.target.value);
    handleFetchClick();
  }

  const handleFetchClick = async () => {
    if (currentBreed.length === 0) return;

    const _split = currentBreed.split(" ");
    if (_split.length === 1) {
      //breed only.
      const res = await getBreedImage(_split[0]);
      setImage(res.data.message);
      return
    } else {
      const res = await getSubBreedImage(_split[1], _split[0]);
      setImage(res.data.message);
    }
  }

  return (
    <section className="container p-5 my-5 bg-light border border-muted text-centre rounded">
      <h2>Breed List</h2>
      <div className="bg-white rounded border border-muted gap-2 p-4 d-inline-flex align-items-center">
        <p className="m-0">https://dog.ceo/api/breed/</p>
        <select onChange={handleBreedChange} value={currentBreed} className="px-3 m-0 rounded py-2 border bg-white text-dark">
          <option value="">---- select breed ----</option>
        {
            breeds.map(breed => (
              <option key={breed} value={breed} >
                {breed}
              </option>
            ))
          }
        </select>
        <p className="m-0">/images/random</p>
        <button onClick={handleFetchClick} className="btn btn-primary">Fetch</button>
      </div>
      <div className="p-5 bg-white border border-muted my-3 rounded" >
        {
          image && <img className="img-fluid" src={image} alt="dogs"></img>
        }
        {
          !image && <p className="m-0 lead">Click on fetch or change the input..</p>
        }
      </div>
    </section>
  )
}

export default App;
