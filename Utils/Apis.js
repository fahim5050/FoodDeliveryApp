import axios from 'axios';
import { setData } from '../redux/reducers';

// Base URL of the API
const BASE_URL = 'https://bitebaseapiservices.paktech24.com/api';


// Function to fetch branches
export const fetchBranches = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/Restaurants/GetBranches`);
        dispatch(setData(response.data));
    } catch (error) {
        console.error('Error fetching branches: ', error);
    }
};


// Function to fetch organization data
export const fetchOrganization = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/Restaurants/GetOrganization`);
        dispatch(setData(response.data));
    } catch (error) {
        console.error('Error fetching organization: ', error);
    }
};

