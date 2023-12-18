import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${req.query.query}&per_page=1`, {
            headers: {
                // Authorization: `Bearer ${process.env.VITE_FIREBASE_PEXELS_API_KEY}`
                Authorization: "kAjCHUL3B0us6dbJBna3ANSI4z2SeQknxKSYbRufppFsKysW5uOkAtxC"
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
    }
}
