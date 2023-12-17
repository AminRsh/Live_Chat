import axios from 'axios';

export default async function handler(req, res) {
    console.log('Start of function');
    try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${req.query.query}&per_page=1`, {
            headers: {
                Authorization: "kAjCHUL3B0us6dbJBna3ANSI4z2SeQknxKSYbRufppFsKysW5uOkAtxC"
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log('End of function');
    }
}
