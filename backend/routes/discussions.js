const express = require("express");
const authenticate = require("../middleware/auth");

const router = express.Router();


// =====================================================
// GET ALL DISCUSSIONS
// =====================================================

router.get("/", async (req, res) => {

    try {

        const db = req.app.locals.db;

        const snapshot = await db
            .collection("discussions")
            .orderBy("createdAt", "desc")
            .get();

        const discussions = [];

        snapshot.forEach((doc) => {

            discussions.push({
                id: doc.id,
                ...doc.data()
            });

        });

        res.json({
            success: true,
            discussions
        });

    } catch (error) {

        console.error("GET DISCUSSIONS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load discussions"
        });
    }
});


// =====================================================
// GET ONE DISCUSSION
// =====================================================

router.get("/:id", async (req, res) => {

    try {

        const db = req.app.locals.db;

        const discussionRef = db
            .collection("discussions")
            .doc(req.params.id);

        const discussionDoc = await discussionRef.get();

        if (!discussionDoc.exists) {

            return res.status(404).json({
                success: false,
                message: "Discussion not found"
            });
        }

        // Get answers
        const answersSnapshot = await discussionRef
            .collection("answers")
            .orderBy("createdAt", "asc")
            .get();

        const answers = [];

        answersSnapshot.forEach((doc) => {

            answers.push({
                id: doc.id,
                ...doc.data()
            });

        });

        res.json({
            success: true,

            discussion: {
                id: discussionDoc.id,
                ...discussionDoc.data(),
                answers
            }
        });

    } catch (error) {

        console.error("GET DISCUSSION ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load discussion"
        });
    }
});


// =====================================================
// CREATE DISCUSSION
// =====================================================

router.post("/", authenticate, async (req, res) => {

    try {

        const {
            question,
            tag
        } = req.body;

        if (!question || !question.trim()) {

            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const db = req.app.locals.db;

        const discussionData = {

            q: question.trim(),

            tag: tag || "General",

            userId: req.user.uid,

            userName:
                req.user.name ||
                req.user.email ||
                "Student",

            answers: 0,

            createdAt: new Date(),

            updatedAt: new Date()
        };

        const docRef = await db
            .collection("discussions")
            .add(discussionData);

        res.status(201).json({

            success: true,

            message: "Question posted successfully",

            discussion: {
                id: docRef.id,
                ...discussionData
            }
        });

    } catch (error) {

        console.error("CREATE DISCUSSION ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create discussion"
        });
    }
});


// =====================================================
// ADD ANSWER
// =====================================================

router.post(
    "/:id/answers",
    authenticate,
    async (req, res) => {

        try {

            const {
                answer
            } = req.body;

            if (!answer || !answer.trim()) {

                return res.status(400).json({
                    success: false,
                    message: "Answer is required"
                });
            }

            const db = req.app.locals.db;

            const FieldValue =
                req.app.locals.FieldValue;

            const discussionRef = db
                .collection("discussions")
                .doc(req.params.id);

            const discussionDoc =
                await discussionRef.get();

            if (!discussionDoc.exists) {

                return res.status(404).json({
                    success: false,
                    message: "Discussion not found"
                });
            }

            const answerData = {

                answer: answer.trim(),

                userId: req.user.uid,

                userName:
                    req.user.name ||
                    req.user.email ||
                    "Student",

                createdAt: new Date()
            };

            await discussionRef
                .collection("answers")
                .add(answerData);

            await discussionRef.update({

                answers:
                    FieldValue.increment(1),

                updatedAt:
                    new Date()
            });

            res.status(201).json({

                success: true,

                message: "Answer posted successfully",

                answer: answerData
            });

        } catch (error) {

            console.error("ADD ANSWER ERROR:", error);

            res.status(500).json({
                success: false,
                message: "Failed to post answer"
            });
        }
    }
);


// =====================================================
// DELETE DISCUSSION
// =====================================================

router.delete(
    "/:id",
    authenticate,
    async (req, res) => {

        try {

            const db = req.app.locals.db;

            const discussionRef = db
                .collection("discussions")
                .doc(req.params.id);

            const discussionDoc =
                await discussionRef.get();

            if (!discussionDoc.exists) {

                return res.status(404).json({
                    success: false,
                    message: "Discussion not found"
                });
            }

            const discussion =
                discussionDoc.data();

            // Only the person who created it can delete it
            if (
                discussion.userId !==
                req.user.uid
            ) {

                return res.status(403).json({
                    success: false,
                    message:
                        "You can only delete your own discussion"
                });
            }

            // Delete answers first
            const answersSnapshot =
                await discussionRef
                    .collection("answers")
                    .get();

            const batch = db.batch();

            answersSnapshot.forEach((doc) => {

                batch.delete(doc.ref);

            });

            await batch.commit();

            // Delete discussion
            await discussionRef.delete();

            res.json({

                success: true,

                message:
                    "Discussion deleted successfully"
            });

        } catch (error) {

            console.error("DELETE DISCUSSION ERROR:", error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete discussion"
            });
        }
    }
);


module.exports = router;