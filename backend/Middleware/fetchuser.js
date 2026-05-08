import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET || 'inotebook@myapp$';

const fetchuser = (req, res, next) => {
    try {
        const token = req.header('auth-token')
        if (!token) {
            return res.status(401).send({ error: "please authenticate with valid token" })
        }
        const data = verify(token, secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate with valid token" })
    }

}

export default fetchuser;