const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password, source } = req.body;

    try {
        let user = await UserRepository.getByEmail(email);

        if (!user) {
            throw "Invalid credentials.";
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw "Invalid credentials.";
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
            source: source
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if (error) {
                    throw error;
                } else {
                    res.json({success: true, token: token });
                }
            }
        );
    } catch (error) {
        res.status(401).json({error: true, message: error});
    }
}

const auth = async (req, res) => {
    try {
        const user = await UserRepository.getById(req.user.id);

        res.json(user);
    } catch (error) {
        res.status(401).json({error: true, message: error});
    }
}

module.exports = {
    login,
    auth
};