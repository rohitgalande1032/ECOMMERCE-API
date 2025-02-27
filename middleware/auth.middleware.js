import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    //get token from header
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const {name, email, role} = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {name, email, role}
        next()
    } catch (error) {
        res.status(500).json(error)
    }
}