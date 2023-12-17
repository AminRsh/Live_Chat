import axios from 'axios';

export default async function handler(req, res) {
    console.log('Start of function');
    try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${req.query.query}&per_page=1`, {
            headers: {
                Authorization: import.meta.env.VITE_FIREBASE_PEXELS_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log('End of function');;
    }
}
