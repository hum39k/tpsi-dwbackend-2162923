const { User } = require("../db_sequelize");
const auth = require("../utils/auth");

exports.login = async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        // For demo: compare plaintext (should hash in production)
        if (user.passwd !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        // Generate JWT token
        const token = auth.generateAccessToken(user);
        // Return user info (excluding password)
        const { passwd, ...userInfo } = user.toJSON();
        console.log("token payload:", { id: user.user_id, email: user.email });
        res.json({ token, user: userInfo });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.signup = async function (req, res) {
    const { email, passwd, first_name, last_name, username, phonenumber } = req.body;
    
    if (!email || !passwd || !first_name || !last_name || !username) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = await User.create({
            first_name,
            email,
            passwd,
            last_name,
            username,
            phonenumber
        });

        const token = auth.generateAccessToken(user);
        const { passwd: _, ...userInfo } = user.toJSON();
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: userInfo
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}