const express = require("express");
const authenticate = require("../middleware/auth");

const router = express.Router();


// =====================================================
// GET CURRENT USER
// =====================================================

router.get("/me", authenticate, async (req, res) => {
    try {
        const db = req.app.locals.db;

        const userRef = db
            .collection("users")
            .doc(req.user.uid);

        const userDoc = await userRef.get();

        // Create user document if it doesn't exist
        if (!userDoc.exists) {

            const userData = {
                uid: req.user.uid,

                email: req.user.email || "",

                name:
                    req.user.name ||
                    req.user.email?.split("@")[0] ||
                    "Student",

                createdAt: new Date(),

                updatedAt: new Date()
            };

            await userRef.set(userData);
        }

        const finalDoc = await userRef.get();

        res.json({
            success: true,

            user: {
                id: finalDoc.id,
                ...finalDoc.data()
            }
        });

    } catch (error) {

        console.error("GET USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load user"
        });
    }
});


// =====================================================
// UPDATE USER PROFILE
// =====================================================

router.put("/me", authenticate, async (req, res) => {

    try {

        const {
            name
        } = req.body;

        if (!name || !name.trim()) {

            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        const db = req.app.locals.db;

        const userRef = db
            .collection("users")
            .doc(req.user.uid);

        await userRef.set({

            uid: req.user.uid,

            email:
                req.user.email || "",

            name:
                name.trim(),

            updatedAt:
                new Date()

        }, {
            merge: true
        });

        res.json({

            success: true,

            message:
                "Profile updated successfully"
        });

    } catch (error) {

        console.error(
            "UPDATE USER ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update profile"
        });
    }
});


// =====================================================
// GET USER BOOKMARKS
// =====================================================

router.get(
    "/me/bookmarks",
    authenticate,
    async (req, res) => {

        try {

            const db = req.app.locals.db;

            const snapshot = await db
                .collection("users")
                .doc(req.user.uid)
                .collection("bookmarks")
                .orderBy("createdAt", "desc")
                .get();

            const bookmarks = [];

            snapshot.forEach((doc) => {

                bookmarks.push({
                    id: doc.id,
                    ...doc.data()
                });

            });

            res.json({

                success: true,

                bookmarks
            });

        } catch (error) {

            console.error(
                "GET BOOKMARKS ERROR:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to load bookmarks"
            });
        }
    }
);


// =====================================================
// GET USER'S UPLOADED NOTES
// =====================================================

router.get(
    "/me/notes",
    authenticate,
    async (req, res) => {

        try {

            const db = req.app.locals.db;

            const snapshot = await db
                .collection("notes")
                .where(
                    "uploaderId",
                    "==",
                    req.user.uid
                )
                .get();

            const notes = [];

            snapshot.forEach((doc) => {

                notes.push({
                    id: doc.id,
                    ...doc.data()
                });

            });

            res.json({

                success: true,

                notes
            });

        } catch (error) {

            console.error(
                "GET USER NOTES ERROR:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to load your notes"
            });
        }
    }
);


module.exports = router;