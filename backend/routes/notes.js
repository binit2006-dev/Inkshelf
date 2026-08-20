const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();


// =====================================================
// UPLOAD DIRECTORY
// =====================================================

const uploadDirectory =
    path.join(__dirname, "..", "..", "uploads");


// Create uploads folder if it doesn't exist

if (!fs.existsSync(uploadDirectory)) {

    fs.mkdirSync(
        uploadDirectory,
        {
            recursive: true
        }
    );

}


// =====================================================
// MULTER
// =====================================================

const storage =
    multer.diskStorage({

        destination: function (req, file, cb) {

            cb(
                null,
                uploadDirectory
            );

        },


        filename: function (req, file, cb) {

            const extension =
                path.extname(
                    file.originalname
                );

            const name =
                path.basename(
                    file.originalname,
                    extension
                )
                    .replace(
                        /[^a-zA-Z0-9_-]/g,
                        "_"
                    );


            const filename =
                `${Date.now()}_${name}${extension}`;


            cb(
                null,
                filename
            );

        }

    });


const upload =
    multer({

        storage: storage,

        limits: {

            fileSize:
                20 * 1024 * 1024

        }

    });


// =====================================================
// GET ALL NOTES
// =====================================================

router.get("/", async (req, res) => {

    try {

        const db =
            req.app.locals.db;


        const snapshot =
            await db
                .collection("notes")
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
            "GET NOTES ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to load notes"

        });

    }

});


// =====================================================
// UPLOAD NOTE
// =====================================================

router.post(
    "/upload",
    upload.single("file"),
    async (req, res) => {

        try {

            const db =
                req.app.locals.db;

            const FieldValue =
                req.app.locals.FieldValue;


            // -----------------------------------------
            // CHECK FILE
            // -----------------------------------------

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please select a file."

                });

            }


            // -----------------------------------------
            // FORM DATA
            // -----------------------------------------

            const {
                title,
                subject,
                branch,
                semester,
                chapter,
                tags,
                description
            } = req.body;


            if (!title || !subject) {

                // Delete uploaded file
                fs.unlink(
                    req.file.path,
                    () => { }
                );


                return res.status(400).json({

                    success: false,

                    message:
                        "Title and subject are required."

                });

            }


            // -----------------------------------------
            // FILE INFORMATION
            // -----------------------------------------

            const originalName =
                req.file.originalname;


            const extension =
                path.extname(
                    originalName
                )
                    .toLowerCase();


            let fileType = "FILE";


            if (extension === ".pdf") {

                fileType = "PDF";

            }
            else if (
                extension === ".ppt" ||
                extension === ".pptx"
            ) {

                fileType = "PPT";

            }
            else if (
                extension === ".doc" ||
                extension === ".docx"
            ) {

                fileType = "DOC";

            }
            else if (
                extension === ".jpg" ||
                extension === ".jpeg" ||
                extension === ".png" ||
                extension === ".webp"
            ) {

                fileType = "IMAGE";

            }


            // -----------------------------------------
            // TAGS
            // -----------------------------------------

            const tagArray =
                tags
                    ? tags
                        .split(",")
                        .map(
                            tag => tag.trim()
                        )
                        .filter(Boolean)
                    : [];


            // -----------------------------------------
            // LOCAL FILE URL
            // -----------------------------------------

            const fileUrl =
                `/uploads/${req.file.filename}`;


            // -----------------------------------------
            // FIRESTORE DATA
            // -----------------------------------------

            const noteData = {

                title:
                    title.trim(),

                subject:
                    subject.trim(),

                branch:
                    branch || "Common",

                semester:
                    Number(semester) || 1,

                chapter:
                    chapter || "",

                tags:
                    tagArray,

                description:
                    description || "",

                fileType:

                    fileType,

                fileName:
                    req.file.filename,

                originalFileName:
                    originalName,

                fileUrl:

                    fileUrl,

                downloads:
                    0,

                rating:
                    0,

                createdAt:
                    FieldValue
                        .serverTimestamp(),

                updatedAt:
                    FieldValue
                        .serverTimestamp()

            };


            // -----------------------------------------
            // SAVE TO FIRESTORE
            // -----------------------------------------

            const docRef =
                await db
                    .collection("notes")
                    .add(noteData);


            // -----------------------------------------
            // RESPONSE
            // -----------------------------------------

            res.status(201).json({

                success: true,

                message:
                    "Note uploaded successfully.",

                note: {

                    id:
                        docRef.id,

                    ...noteData,

                    // Useful full URL
                    fileUrl:
                        `http://localhost:5000${fileUrl}`

                }

            });


        }
        catch (error) {

            console.error(
                "UPLOAD NOTE ERROR:",
                error
            );


            // If Firestore fails after
            // file was uploaded, remove
            // the local file.

            if (
                req.file &&
                req.file.path
            ) {

                fs.unlink(
                    req.file.path,
                    () => { }
                );

            }


            res.status(500).json({

                success: false,

                message:
                    "Failed to upload note.",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// DOWNLOAD NOTE
// =====================================================

router.get(
    "/download/:id",
    async (req, res) => {

        try {

            const db =
                req.app.locals.db;

            const FieldValue =
                req.app.locals.FieldValue;



            const doc =
                await db
                    .collection("notes")
                    .doc(req.params.id)
                    .get();


            if (!doc.exists) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Note not found."

                });

            }


            const note =
                doc.data();


            if (!note.fileName) {

                return res.status(404).json({

                    success: false,

                    message:
                        "File not found."

                });

            }


            const filePath =
                path.join(
                    uploadDirectory,
                    note.fileName
                );


            if (
                !fs.existsSync(filePath)
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "File no longer exists."

                });

            }


            // Increase download count

            await db
                .collection("notes")
                .doc(req.params.id)
                .update({

                    downloads:
                        FieldValue.increment(1)

                });


            res.download(
                filePath,
                note.originalFileName
            );


        }
        catch (error) {

            console.error(
                "DOWNLOAD ERROR:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to download note."

            });

        }

    }
);


module.exports = router;