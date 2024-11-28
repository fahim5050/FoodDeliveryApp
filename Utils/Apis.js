// import axios from 'axios';
// import { setData } from '../redux/Apislice';

// // Base URL of the API
// const BASE_URL = 'https://bitebaseapiservices.paktech24.com/api';


// // Function to fetch branches
// export const fetchBranches = () => async (dispatch) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Restaurants/GetBranches`);
//         dispatch(setData(response.data));
//     } catch (error) {
//         console.error('Error fetching branches: ', error);
//     }
// };


// //  Function to fetch organization data
// export const fetchOrganization = () => async (dispatch) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Restaurants/GetOrganization`);
//         dispatch(setData(response.data));
//     } catch (error) {
//         console.error('Error fetching organization: ', error);
//     }
// };

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Base URL of the API
const BASE_URL = 'https://bitebaseapiservices.paktech24.com/api';

// Function to fetch branches
export const fetchBranches = createAsyncThunk('data/fetchBranches', async () => {
    const response = await axios.get(`${BASE_URL}/Restaurants/GetBranches`);
    return response.data; // This becomes action.payload
});

// Function to fetch organization data
export const fetchOrganization = createAsyncThunk('data/fetchOrganization', async () => {
    const response = await axios.get(`${BASE_URL}/Restaurants/GetOrganization`);
    return response.data; // This becomes action.payload
});
