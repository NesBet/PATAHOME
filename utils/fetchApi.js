import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Key': 'c7de3d3146mshaab2115c1f35283p171ba6jsnc3fd3ff8ef8e',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    },
  });

  return data;
}