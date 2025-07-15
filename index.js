const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/configDb');

const authenticateToken = require('./middleware/middleware');

const niveauRoute = require('./route/niveauRoute');
const filiereRoute = require('./route/filiereRoute');
const promotionRoute =  require('./route/promotionRoute');
const etudiantRoute =  require('./route/etudiantRoute');
const gerantRoute =  require('./route/gerantRoute');
const authRoute =  require('./route/authRoute');

sequelize.authenticate()
    .then(() => {
        console.log('connexion reussit !');
        return sequelize.sync();
    })
    .catch(err => console.error("erreur de la connexion a la base de donnée : ", err));

const corsOptions = {
    origin: "*"
}

const app = express();

app.use(cors(corsOptions));

app.use(express.json({ extended: true }));

app.use(cookieParser());

app.use("/api/niveau",authenticateToken, niveauRoute);
app.use("/api/filiere",authenticateToken, filiereRoute);
app.use("/api/promotion",authenticateToken, promotionRoute);
app.use("/api/etudiant",authenticateToken, etudiantRoute);
app.use("/api/gerant",authenticateToken, gerantRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is running on port ${port}`));