const express = require('express');
const cors = require('cors');
const sequelize = require('./config/configDb');
const niveauRoute = require('./route/niveauRoute');
const filiereRoute = require('./route/filiereRoute');
const promotionRoute =  require('./route/promotionRoute');

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

app.use("/api/niveau", niveauRoute);
app.use("/api/filiere", filiereRoute);
app.use("/api/promotion", promotionRoute);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is running on port ${port}`));