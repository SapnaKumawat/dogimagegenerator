import { http } from "../services/http"

export const getAllBreeds = () => {
    return http.get("/breeds/list/all")
}

export const getBreedImage = (breed) => {
    return http.get(`/breed/${breed}/images/random`)
}

export const getSubBreedImage = (breed, subBreed) => {
    return http.get(`/breed/${breed}/${subBreed}/images/random`)
}