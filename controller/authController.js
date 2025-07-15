const { generateAccessToken, generateRefreshToken } = require("../config/jwtUtils");
const jwt = require('jsonwebtoken');
const Gerant = require("../model/gerant");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await Gerant.findOne({ where: { email } });
    if (!user || !(await user.verifyPassword(password))) {
        return res.status(401).json({ message: "Identifiants invalides" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
        })
        .json({ accessToken });
};

const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(403).json({ message: "Token manquant" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalide" });

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    });
};

const logout = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({ message: "Déconnecté avec succès" });
};

const activateCompte = async (req, res) => {
    try {
        const {email,password} = req.body;
        const data = await Gerant.findOne({where: {email}});

        if(!data) return res.status(404).json({message: 'compte non trouver !'});
        data.password = password;
        data.isPasswordTemp = false;
        await data.save();
        res.status(200).json({message: 'compte activer !'});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "erreur lors de l'activation du compte : " + error.message})
    }
}

module.exports = {
    login,
    refreshToken,
    logout,
    activateCompte
}