require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const notesRoutes = require("./routes/notes");
const discussionsRoutes = require("./routes/discussions");
const usersRoutes = require("./routes/users");

const serviceAccount = require("./serviceAccountKey.json");


// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const firebaseApp = initializeApp({
    credential: cert(serviceAccount)
});


// =====================================================
// FIREBASE SERVICES
// =====================================================

const db = getFirestore(firebaseApp);


// =====================================================
// EXPRESS
// =====================================================

const app = express();


// =====================================================
// CORS
// =====================================================

app.use(cors({
    origin: process.env.FRONTEND_URL || "*"
}));


// =====================================================
// JSON
// =====================================================

app.use(express.json());


// =====================================================
// LOCAL UPLOADS
// =====================================================

// Serve uploaded files publicly during development.

const uploadsPath =
    path.join(__dirname, "..", "uploads");

app.use(
    "/uploads",
    express.static(uploadsPath)
);


// =====================================================
// MAKE SERVICES AVAILABLE TO ROUTES
// =====================================================

app.locals.db = db;

app.locals.FieldValue = FieldValue;


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Inkshelf backend is running"
    });

});


// =====================================================
// API ROUTES
// =====================================================

app.use(
    "/api/notes",
    notesRoutes
);

app.use(
    "/api/discussions",
    discussionsRoutes
);

app.use(
    "/api/users",
    usersRoutes
);


// =====================================================
// 404
// =====================================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message:
            "API endpoint not found"

    });

});


// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message:
            "Internal server error"

    });

});


// =====================================================
// START SERVER
// =====================================================

const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Inkshelf backend running on port ${PORT}`
    );

});