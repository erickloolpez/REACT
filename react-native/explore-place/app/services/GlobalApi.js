import axios from 'axios'

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
const API_KEY = 'your key'


const nearByPlace =()=>axios.get(BASE_URL + 
    '?keyword=cruise'+
  '&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant'+
  '&key='+API_KEY)


export default{
    nearByPlace
}