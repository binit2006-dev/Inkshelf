// =====================================================
// INKSHELF - FRONTEND SCRIPT
// Node.js + Firebase Firestore backend
// =====================================================

let notes = [];

const API_BASE_URL = "http://localhost:5000";


// =====================================================
// 1. NORMALIZE FIRESTORE NOTE
// =====================================================

function normalizeNote(note) {

    const created = note.createdAt;

    let date = note.date || "";

    if (!date && created) {

        if (typeof created === "string") {

            date = created.slice(0, 10);

        } else if (created._seconds) {

            date =
                new Date(
                    created._seconds * 1000
                )
                .toISOString()
                .slice(0, 10);
        }
    }


    const rawType =
        note.type ||
        note.fileType ||
        note.FileType ||
        "FILE";


    const type =
        rawType === "IMAGE"
            ? "IMG"
            : rawType;


    return {

        id:
            note.id,

        title:
            note.title ||
            "Untitled note",

        subject:
            note.subject ||
            "General",

        branch:
            note.branch ||
            "Common",

        semester:
            Number(note.semester) ||
            1,

        chapter:
            note.chapter ||
            "General",

        type:

            type,

        fileType:
            note.fileType ||
            note.FileType ||
            type,

        tags:
            Array.isArray(note.tags)
                ? note.tags
                : [],

        desc:
            note.desc ||
            note.description ||
            "No description provided.",

        description:
            note.description ||
            note.desc ||
            "No description provided.",

        uploader:
            note.uploader ||
            "Inkshelf user",

        date:

            date,

        downloads:
            Number(note.downloads) ||
            0,

        rating:
            Number(note.rating) ||
            0,

        ratingCount:
            Number(note.ratingCount) ||
            0,

        reviews:
            Array.isArray(note.reviews)
                ? note.reviews
                : [],

        summary:
            Array.isArray(note.summary)
                ? note.summary
                : [
                    "AI summary is not available for this uploaded note yet."
                ],

        examQs:
            Array.isArray(note.examQs)
                ? note.examQs
                : [],

        quiz:
            Array.isArray(note.quiz)
                ? note.quiz
                : [],

        fileUrl:
            note.fileUrl ||
            "",

        fileName:
            note.fileName ||
            "",

        originalFileName:
            note.originalFileName ||
            ""
    };
}


// =====================================================
// 2. LOAD NOTES FROM NODE.JS
// =====================================================

async function loadNotes() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/notes`
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Failed to load notes"
            );

        }


        notes =
            (data.notes || [])
                .map(normalizeNote);


        renderNotes();

        updateStats();


    } catch (error) {

        console.error(
            "LOAD NOTES ERROR:",
            error
        );


        showToast(
            "Could not load notes from the backend."
        );

    }

}


// =====================================================
// 3. DISCUSSIONS
// =====================================================

let discussions = [

    {
        id: 1,
        q: "Can someone explain Kirchhoff's Voltage Law in simple terms?",
        tag: "Basic Electrical Engineering",
        answers: 6,
        date: "2 days ago"
    },

    {
        id: 2,
        q: "What's the actual difference between SN1 and SN2 mechanisms — is it just about the intermediate?",
        tag: "Organic Chemistry",
        answers: 4,
        date: "3 days ago"
    },

    {
        id: 3,
        q: "For Round Robin scheduling, how do you pick the 'right' time quantum in a numerical problem?",
        tag: "Operating Systems",
        answers: 3,
        date: "5 days ago"
    },

    {
        id: 4,
        q: "Is there a quick trick to remember Fourier transform pairs before an exam?",
        tag: "Signals and Systems",
        answers: 8,
        date: "1 week ago"
    }

];


// =====================================================
// 4. APP STATE
// =====================================================

let currentUser = null;

let bookmarkedIds = [];

let selectedBranches = [];

let selectedSemesters = [];

let selectedTypes = [];

let searchTerm = "";

let authMode = "login";

let activeNoteId = null;

let tempRating = 0;


// Quiz state

let quizNoteId = null;

let quizQuestionIndex = 0;

let quizScore = 0;


// =====================================================
// 5. HELPER FUNCTIONS
// =====================================================

function showToast(message) {

    const toastBox =
        document.getElementById("toast");


    if (!toastBox) return;


    toastBox.textContent =
        message;


    toastBox.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toastBox.classList.remove(
                "show"
            );

        },
        2400
    );

}


function openModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );


    if (modal) {

        modal.classList.add(
            "open"
        );

    }

}


function closeModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );

    }

}


function scrollToId(sectionId) {

    const element =
        document.getElementById(
            sectionId
        );


    if (element) {

        element.scrollIntoView({
            behavior: "smooth"
        });

    }

}


function starsAsText(rating) {

    const fullStars =
        Math.round(
            Number(rating) || 0
        );


    return (
        "★".repeat(fullStars) +
        "☆".repeat(
            5 - fullStars
        )
    );

}


function getInitials(name) {

    name =
        name ||
        "Student";


    const parts =
        name.trim().split(" ");


    let letters = "";


    for (
        let i = 0;
        i < parts.length &&
        i < 2;
        i++
    ) {

        if (parts[i][0]) {

            letters +=
                parts[i][0];

        }

    }


    return letters.toUpperCase();

}


// =====================================================
// FIND NOTE
// =====================================================

function findNoteById(id) {

    return notes.find(
        function (note) {

            return (
                String(note.id) ===
                String(id)
            );

        }
    );

}


// =====================================================
// 6. LOGIN / SIGNUP UI
// =====================================================

function updateAuthUI() {

    const box =
        document.getElementById(
            "navActions"
        );


    if (!box) return;


    if (currentUser) {

        box.innerHTML =

            '<button class="btn btn-ghost btn-sm" onclick="openUploadModal()">Upload</button>' +

            '<div class="user-chip" onclick="logout()">' +

            '<span class="avatar">' +

            getInitials(
                currentUser.name
            ) +

            "</span>" +

            currentUser.name
                .split(" ")[0] +

            " · Log out" +

            "</div>";

    } else {

        box.innerHTML =

            '<button class="btn btn-ghost btn-sm" onclick="openAuthModal(\'login\')">Log in</button>' +

            '<button class="btn btn-primary btn-sm" onclick="openAuthModal(\'signup\')">Get started</button>';

    }

}


function openAuthModal(mode) {

    switchAuthTab(mode);

    openModal(
        "authOverlay"
    );

}


function switchAuthTab(mode) {

    authMode =
        mode;


    const tabLogin =
        document.getElementById(
            "tabLogin"
        );


    const tabSignup =
        document.getElementById(
            "tabSignup"
        );


    const nameField =
        document.getElementById(
            "nameField"
        );


    const authTitle =
        document.getElementById(
            "authTitle"
        );


    const submitButton =
        document.getElementById(
            "authSubmitBtn"
        );


    if (tabLogin) {

        tabLogin.classList.toggle(
            "active",
            mode === "login"
        );

    }


    if (tabSignup) {

        tabSignup.classList.toggle(
            "active",
            mode === "signup"
        );

    }


    if (nameField) {

        nameField.style.display =
            mode === "signup"
                ? "block"
                : "none";

    }


    if (authTitle) {

        authTitle.textContent =
            mode === "signup"
                ? "Create your account"
                : "Welcome back";

    }


    if (submitButton) {

        submitButton.textContent =
            mode === "signup"
                ? "Sign up"
                : "Log in";

    }

}


// =====================================================
// FIREBASE AUTH
// =====================================================

async function handleAuth(e) {

    e.preventDefault();


    const emailElement =
        document.getElementById(
            "authEmail"
        );


    const passwordElement =
        document.getElementById(
            "authPassword"
        );


    const nameElement =
        document.getElementById(
            "authName"
        );


    const errorElement =
        document.getElementById(
            "authError"
        );


    const email =
        emailElement
            ? emailElement.value.trim()
            : "";


    const password =
        passwordElement
            ? passwordElement.value
            : "";


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";


    if (errorElement) {

        errorElement.textContent =
            "";

    }


    try {

        // -----------------------------------------
        // FIREBASE AUTH AVAILABLE
        // -----------------------------------------

        if (
            typeof auth !== "undefined" &&
            auth
        ) {

            // SIGN UP

            if (
                authMode ===
                "signup"
            ) {

                if (!name) {

                    if (errorElement) {

                        errorElement.textContent =
                            "Please enter your full name.";

                    }

                    return false;

                }


                const userCredential =
                    await auth
                        .createUserWithEmailAndPassword(
                            email,
                            password
                        );


                const user =
                    userCredential.user;


                if (
                    user.updateProfile
                ) {

                    await user.updateProfile({

                        displayName:
                            name

                    });

                }


                const token =
                    await user.getIdToken();


                const response =
                    await fetch(
                        `${API_BASE_URL}/api/users/me`,
                        {

                            method: "GET",

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to create user profile"
                    );

                }


                currentUser =
                    data.user || {

                        name:
                            name,

                        email:
                            email

                    };


                updateAuthUI();

                closeModal(
                    "authOverlay"
                );


                showToast(
                    "Account created successfully!"
                );


                return false;

            }


            // LOGIN

            const userCredential =
                await auth
                    .signInWithEmailAndPassword(
                        email,
                        password
                    );


            const user =
                userCredential.user;


            const token =
                await user.getIdToken();


            const response =
                await fetch(
                    `${API_BASE_URL}/api/users/me`,
                    {

                        method: "GET",

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load user profile"
                );

            }


            currentUser =
                data.user || {

                    name:
                        user.displayName ||
                        email.split("@")[0],

                    email:
                        email

                };


            updateAuthUI();

            closeModal(
                "authOverlay"
            );


            showToast(
                "Logged in successfully!"
            );


            return false;

        }


        // -----------------------------------------
        // FALLBACK DEMO AUTH
        // -----------------------------------------

        currentUser = {

            name:
                authMode === "signup"
                    ? (name || "Student")
                    : email.split("@")[0],

            email:
                email

        };


        updateAuthUI();

        closeModal(
            "authOverlay"
        );


        showToast(
            authMode === "signup"
                ? "Welcome to Inkshelf!"
                : "Welcome back!"
        );


    } catch (error) {

        console.error(
            "AUTHENTICATION ERROR:",
            error
        );


        let message =
            "Authentication failed.";


        switch (
            error.code
        ) {

            case "auth/email-already-in-use":

                message =
                    "This email is already registered.";

                break;


            case "auth/invalid-email":

                message =
                    "Please enter a valid email address.";

                break;


            case "auth/weak-password":

                message =
                    "Password must be at least 6 characters.";

                break;


            case "auth/invalid-credential":

            case "auth/wrong-password":

            case "auth/user-not-found":

                message =
                    "Incorrect email or password.";

                break;


            case "auth/too-many-requests":

                message =
                    "Too many attempts. Please try again later.";

                break;


            default:

                message =
                    error.message ||
                    message;

        }


        if (errorElement) {

            errorElement.textContent =
                message;

        } else {

            showToast(message);

        }

    }


    return false;

}


function logout() {

    if (
        typeof auth !== "undefined" &&
        auth &&
        auth.signOut
    ) {

        auth.signOut()
            .catch(
                function (error) {

                    console.error(
                        "LOGOUT ERROR:",
                        error
                    );

                }
            );

    }


    currentUser = null;

    updateAuthUI();

    showToast(
        "Logged out."
    );

}


function requireLogin() {

    if (!currentUser) {

        openAuthModal(
            "login"
        );


        showToast(
            "Log in to continue."
        );


        return false;

    }


    return true;

}


// =====================================================
// 7. FILTERS
// =====================================================

const BRANCH_OPTIONS = [

    "CSE",
    "ECE",
    "Mechanical",
    "Common"

];


const SEMESTER_OPTIONS = [

    1,
    2,
    3,
    4,
    5

];


const TYPE_OPTIONS = [

    "PDF",
    "PPT",
    "DOC",
    "IMG"

];


function buildFilterCheckboxes() {

    const branchElement =
        document.getElementById(
            "filterBranch"
        );


    if (branchElement) {

        let branchHTML = "";


        for (
            let i = 0;
            i < BRANCH_OPTIONS.length;
            i++
        ) {

            const b =
                BRANCH_OPTIONS[i];


            branchHTML +=

                '<label class="filter-opt">' +

                '<input type="checkbox" onchange="toggleBranchFilter(\'' +
                b +
                '\')">' +

                b +

                "</label>";

        }


        branchElement.innerHTML =
            branchHTML;

    }


    const semesterElement =
        document.getElementById(
            "filterSemester"
        );


    if (semesterElement) {

        let semesterHTML =
            "";


        for (
            let i = 0;
            i < SEMESTER_OPTIONS.length;
            i++
        ) {

            const s =
                SEMESTER_OPTIONS[i];


            semesterHTML +=

                '<label class="filter-opt">' +

                '<input type="checkbox" onchange="toggleSemesterFilter(' +
                s +
                ')">' +

                "Semester " +
                s +

                "</label>";

        }


        semesterElement.innerHTML =
            semesterHTML;

    }


    const typeElement =
        document.getElementById(
            "filterType"
        );


    if (typeElement) {

        let typeHTML =
            "";


        for (
            let i = 0;
            i < TYPE_OPTIONS.length;
            i++
        ) {

            const t =
                TYPE_OPTIONS[i];


            typeHTML +=

                '<label class="filter-opt">' +

                '<input type="checkbox" onchange="toggleTypeFilter(\'' +
                t +
                '\')">' +

                t +

                "</label>";

        }


        typeElement.innerHTML =
            typeHTML;

    }

}


function toggleBranchFilter(
    branch
) {

    const i =
        selectedBranches.indexOf(
            branch
        );


    if (i === -1) {

        selectedBranches.push(
            branch
        );

    } else {

        selectedBranches.splice(
            i,
            1
        );

    }


    renderNotes();

}


function toggleSemesterFilter(
    semester
) {

    const i =
        selectedSemesters.indexOf(
            semester
        );


    if (i === -1) {

        selectedSemesters.push(
            semester
        );

    } else {

        selectedSemesters.splice(
            i,
            1
        );

    }


    renderNotes();

}


function toggleTypeFilter(
    type
) {

    const i =
        selectedTypes.indexOf(
            type
        );


    if (i === -1) {

        selectedTypes.push(
            type
        );

    } else {

        selectedTypes.splice(
            i,
            1
        );

    }


    renderNotes();

}


function quickFilter(
    branch
) {

    selectedBranches = [
        branch
    ];

    selectedSemesters = [];

    selectedTypes = [];


    document
        .querySelectorAll(
            ".filters input[type=checkbox]"
        )
        .forEach(
            function (box) {

                box.checked =
                    false;

            }
        );


    document
        .querySelectorAll(
            "#filterBranch input"
        )
        .forEach(
            function (box, i) {

                if (
                    BRANCH_OPTIONS[i] ===
                    branch
                ) {

                    box.checked =
                        true;

                }

            }
        );


    scrollToId(
        "browse"
    );


    renderNotes();

}


function clearFilters() {

    selectedBranches = [];

    selectedSemesters = [];

    selectedTypes = [];

    searchTerm = "";


    const navSearch =
        document.getElementById(
            "navSearchInput"
        );


    const heroSearch =
        document.getElementById(
            "heroSearchInput"
        );


    if (navSearch) {

        navSearch.value =
            "";

    }


    if (heroSearch) {

        heroSearch.value =
            "";

    }


    document
        .querySelectorAll(
            ".filters input[type=checkbox]"
        )
        .forEach(
            function (box) {

                box.checked =
                    false;

            }
        );


    renderNotes();

}


function runSearch(
    term
) {

    searchTerm =
        term
            .trim()
            .toLowerCase();


    scrollToId(
        "browse"
    );


    renderNotes();

}


// =====================================================
// 8. FILTER NOTES
// =====================================================

function getVisibleNotes() {

    let result =
        notes.filter(
            function (note) {

                if (
                    selectedBranches.length &&
                    selectedBranches.indexOf(
                        note.branch
                    ) === -1
                ) {

                    return false;

                }


                if (
                    selectedSemesters.length &&
                    selectedSemesters.indexOf(
                        note.semester
                    ) === -1
                ) {

                    return false;

                }


                if (
                    selectedTypes.length &&
                    selectedTypes.indexOf(
                        note.type
                    ) === -1
                ) {

                    return false;

                }


                if (searchTerm) {

                    const searchableText =

                        (

                            note.title +
                            " " +
                            note.subject +
                            " " +
                            note.chapter +
                            " " +
                            note.tags.join(" ") +
                            " " +
                            note.branch

                        )
                        .toLowerCase();


                    if (
                        searchableText.indexOf(
                            searchTerm
                        ) === -1
                    ) {

                        return false;

                    }

                }


                return true;

            }
        );


    const sortElement =
        document.getElementById(
            "sortBy"
        );


    const sortBy =
        sortElement
            ? sortElement.value
            : "popular";


    if (
        sortBy ===
        "rating"
    ) {

        result.sort(
            function (a, b) {

                return (
                    b.rating -
                    a.rating
                );

            }
        );

    } else if (
        sortBy ===
        "recent"
    ) {

        result.sort(
            function (a, b) {

                return (
                    new Date(b.date) -
                    new Date(a.date)
                );

            }
        );

    } else {

        result.sort(
            function (a, b) {

                return (
                    b.downloads -
                    a.downloads
                );

            }
        );

    }


    return result;

}


// =====================================================
// 9. RENDER NOTES
// =====================================================

function renderNotes() {

    const visibleNotes =
        getVisibleNotes();


    const hasActiveFilter =
        searchTerm ||
        selectedBranches.length ||
        selectedSemesters.length ||
        selectedTypes.length;


    const resultsCount =
        document.getElementById(
            "resultsCount"
        );


    if (resultsCount) {

        resultsCount.textContent =
            hasActiveFilter

                ?

                visibleNotes.length +
                " note" +
                (
                    visibleNotes.length !== 1
                        ? "s"
                        : ""
                ) +
                " found"

                :

                "Showing all " +
                visibleNotes.length +
                " notes";

    }


    const grid =
        document.getElementById(
            "notesGrid"
        );


    if (!grid) return;


    if (
        visibleNotes.length === 0
    ) {

        grid.innerHTML =

            '<div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--ink-soft);">' +

            '<div style="font-family:var(--font-hand); font-size:24px; color:var(--coral-deep); margin-bottom:8px;">Nothing on the shelf yet.</div>' +

            "Try clearing a filter, or be the first to upload notes for this topic." +

            "</div>";


        return;

    }


    let html = "";


    for (
        let i = 0;
        i < visibleNotes.length;
        i++
    ) {

        const note =
            visibleNotes[i];


        const isBookmarked =
            bookmarkedIds.indexOf(
                note.id
            ) !== -1;


        const safeId =
            JSON.stringify(
                String(note.id)
            );


        html +=

            '<div class="note-card">' +

            '<div class="perf"></div>' +

            '<div class="note-top">' +

            '<span class="note-type type-' +
            note.type +
            '">' +
            note.type +
            "</span>" +

            '<button class="bookmark-btn ' +
            (
                isBookmarked
                    ? "active"
                    : ""
            ) +
            '" onclick="toggleBookmark(' +
            safeId +
            ')" title="Bookmark">' +

            '<svg class="icon" viewBox="0 0 24 24" fill="' +
            (
                isBookmarked
                    ? "currentColor"
                    : "none"
            ) +
            '" stroke="currentColor" stroke-width="2">' +

            '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>' +

            "</svg>" +

            "</button>" +

            "</div>" +


            '<div class="note-title">' +
            escapeHTML(note.title) +
            "</div>" +


            '<div class="note-meta">' +
            escapeHTML(note.branch) +
            " · Semester " +
            note.semester +
            " · " +
            escapeHTML(note.chapter) +
            "</div>" +


            '<div class="note-tags">' +

            note.tags
                .slice(0, 3)
                .map(
                    function (t) {

                        return (
                            '<span class="tag">' +
                            escapeHTML(t) +
                            "</span>"
                        );

                    }
                )
                .join("") +

            "</div>" +


            '<div class="note-stats">' +

            '<span class="stars">' +
            starsAsText(note.rating) +
            "</span>" +

            "<span>" +
            note.rating +
            " (" +
            note.ratingCount +
            ")</span>" +

            "<span>· " +
            note.downloads.toLocaleString() +
            " downloads</span>" +

            "</div>" +


            '<div class="note-actions">' +

            '<button class="btn btn-ghost btn-sm" onclick="openDetail(' +
            safeId +
            ')">View</button>' +

            '<button class="btn btn-accent btn-sm" onclick="openAISummary(' +
            safeId +
            ')">✨ AI Summary</button>' +

            "</div>" +


            '<div class="note-actions">' +

            '<button class="btn btn-primary btn-sm" style="width:100%;" onclick="downloadNote(' +
            safeId +
            ')">↓ Download note</button>' +

            "</div>" +

            "</div>";

    }


    grid.innerHTML =
        html;

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

    return String(value || "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// =====================================================
// 10. BOOKMARK
// =====================================================

function toggleBookmark(
    id
) {

    if (!requireLogin()) return;


    const i =
        bookmarkedIds.indexOf(
            id
        );


    if (i === -1) {

        bookmarkedIds.push(
            id
        );


        showToast(
            "Bookmarked — find it anytime in your dashboard."
        );

    } else {

        bookmarkedIds.splice(
            i,
            1
        );


        showToast(
            "Removed from bookmarks."
        );

    }


    renderNotes();

}


// =====================================================
// 11. NOTE DETAIL
// =====================================================

function openDetail(
    id
) {

    const note =
        findNoteById(id);


    if (!note) {

        showToast(
            "Note not found."
        );

        return;

    }


    activeNoteId =
        id;


    document.getElementById(
        "detailTitle"
    ).textContent =
        note.title;


    const formattedDate =
        note.date

            ?

            new Date(
                note.date
            ).toLocaleDateString(
                "en-US",
                {
                    month:
                        "short",

                    day:
                        "numeric",

                    year:
                        "numeric"
                }
            )

            :

            "Recently";


    let starsHTML =
        "";


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        starsHTML +=

            '<span onclick="setRating(' +
            i +
            ')" id="rs-' +
            i +
            '">★</span>';

    }


    document.getElementById(
        "detailBody"
    ).innerHTML =

        '<div class="note-meta" style="margin-bottom:14px;">' +

        escapeHTML(note.branch) +

        " · Semester " +

        note.semester +

        " · " +

        escapeHTML(note.chapter) +

        " · Uploaded by " +

        escapeHTML(note.uploader) +

        " on " +

        formattedDate +

        "</div>" +


        '<p style="font-size:14.5px; line-height:1.6; margin-bottom:16px;">' +

        escapeHTML(note.desc) +

        "</p>" +


        '<div class="note-tags" style="margin-bottom:18px;">' +

        note.tags
            .map(
                function (t) {

                    return (
                        '<span class="tag">' +
                        escapeHTML(t) +
                        "</span>"
                    );

                }
            )
            .join("") +

        "</div>" +


        '<div class="note-stats" style="margin-bottom:20px;">' +

        '<span class="stars">' +
        starsAsText(note.rating) +
        "</span>" +

        "<span>" +
        note.rating +
        " · " +
        note.ratingCount +
        " ratings</span>" +

        "<span>· " +
        note.downloads.toLocaleString() +
        " downloads</span>" +

        "</div>" +


        '<div style="display:flex; gap:10px; margin-bottom:26px;">' +

        '<button class="btn btn-primary" style="flex:1;" onclick="downloadNote(' +
        JSON.stringify(String(note.id)) +
        ')">⬇ Download ' +
        escapeHTML(note.type) +
        "</button>" +

        '<button class="btn btn-accent" style="flex:1;" onclick="closeModal(\'detailOverlay\'); openAISummary(' +
        JSON.stringify(String(note.id)) +
        ');">✨ AI Summary</button>' +

        "</div>" +


        '<h4 style="font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:var(--pencil); margin-bottom:12px;">Rate these notes</h4>' +


        '<div class="stars-input" id="rateStars" style="margin-bottom:14px;">' +

        starsHTML +

        "</div>" +


        '<textarea id="reviewText" rows="2" placeholder="Leave a short review (optional)" style="width:100%; padding:10px; border:1px solid var(--line); border-radius:9px; font-family:var(--font-body); margin-bottom:10px;"></textarea>' +


        '<button class="btn btn-ghost btn-sm" onclick="submitReview(' +
        JSON.stringify(String(note.id)) +
        ')">Submit rating</button>' +


        '<h4 style="font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:var(--pencil); margin:22px 0 12px;">Reviews (' +
        note.reviews.length +
        ")</h4>" +


        '<div id="reviewsList">' +

        renderReviewsHTML(note) +

        "</div>";


    tempRating =
        0;


    openModal(
        "detailOverlay"
    );

}


// =====================================================
// REVIEWS
// =====================================================

function renderReviewsHTML(
    note
) {

    let html =
        "";


    for (
        let i = 0;
        i < note.reviews.length;
        i++
    ) {

        const r =
            note.reviews[i];


        html +=

            '<div style="padding:12px 0; border-bottom:1px solid var(--line);">' +

            '<div style="display:flex; justify-content:space-between;">' +

            '<strong style="font-size:13.5px;">' +

            escapeHTML(
                r.name
            ) +

            "</strong>" +

            '<span style="color:var(--yellow-deep); font-size:13px;">' +

            "★".repeat(
                Number(r.stars) || 0
            ) +

            "</span>" +

            "</div>" +

            '<p style="font-size:13.5px; color:var(--ink-soft); margin-top:4px;">' +

            escapeHTML(
                r.text
            ) +

            "</p>" +

            "</div>";

    }


    return html;

}


// =====================================================
// SET RATING
// =====================================================

function setRating(
    stars
) {

    tempRating =
        stars;


    for (
        let s = 1;
        s <= 5;
        s++
    ) {

        const element =
            document.getElementById(
                "rs-" + s
            );


        if (element) {

            element.classList.toggle(
                "active",
                s <= stars
            );

        }

    }

}


// =====================================================
// SUBMIT REVIEW
// =====================================================

function submitReview(
    id
) {

    if (!requireLogin())
        return;


    if (!tempRating) {

        showToast(
            "Pick a star rating first."
        );

        return;

    }


    const note =
        findNoteById(id);


    if (!note) {

        showToast(
            "Note not found."
        );

        return;

    }


    const reviewText =
        document.getElementById(
            "reviewText"
        );


    const text =
        reviewText
            ? reviewText.value.trim()
            : "";


    note.reviews.unshift({

        name:
            currentUser.name
                .split(" ")[0],

        stars:
            tempRating,

        text:
            text ||
            "(no comment left)"

    });


    note.ratingCount =
        note.ratingCount + 1;


    note.rating =
        Math.round(

            (

                note.rating *
                (
                    note.ratingCount -
                    1
                ) +

                tempRating

            ) /

            note.ratingCount *

            10

        ) / 10;


    const reviewsList =
        document.getElementById(
            "reviewsList"
        );


    if (reviewsList) {

        reviewsList.innerHTML =
            renderReviewsHTML(
                note
            );

    }


    showToast(
        "Thanks for rating!"
    );


    renderNotes();

}


// =====================================================
// 12. DOWNLOAD NOTE
// =====================================================

async function downloadNote(
    id
) {

    if (!id) {

        showToast(
            "Invalid note."
        );

        return;

    }


    const note =
        findNoteById(id);


    if (!note) {

        showToast(
            "Note not found."
        );

        return;

    }


    try {

        const url =
            `${API_BASE_URL}/api/notes/download/${encodeURIComponent(id)}`;


        // Browser starts the actual download.
        window.location.href =
            url;


        // Backend increments downloads.
        // Reload the notes shortly afterwards.

        setTimeout(
            function () {

                loadNotes();

            },
            1000
        );


    } catch (error) {

        console.error(
            "DOWNLOAD ERROR:",
            error
        );


        showToast(
            "Download failed."
        );

    }

}


// =====================================================
// 13. AI SUMMARY
// =====================================================

function openAISummary(
    id
) {

    activeNoteId =
        id;


    const note =
        findNoteById(id);


    if (!note) {

        showToast(
            "Note not found."
        );

        return;

    }


    document.getElementById(
        "aiBody"
    ).innerHTML =

        '<div class="loading-box">' +

        '<div class="spinner"></div>' +

        '<div class="loading-step" id="aiLoadingStep">' +

        'Reading "' +
        escapeHTML(note.title) +
        '"…' +

        "</div>" +

        "</div>";


    openModal(
        "aiOverlay"
    );


    const steps = [

        'Reading "' +
        note.title +
        '"…',

        "Extracting key concepts…",

        "Highlighting exam-focused topics…",

        "Almost done…"

    ];


    let stepIndex =
        0;


    const timer =
        setInterval(
            function () {

                stepIndex++;


                const stepElement =
                    document.getElementById(
                        "aiLoadingStep"
                    );


                if (stepElement) {

                    stepElement.textContent =
                        steps[
                            Math.min(
                                stepIndex,
                                steps.length - 1
                            )
                        ];

                }


                if (
                    stepIndex >=
                    steps.length
                ) {

                    clearInterval(
                        timer
                    );


                    renderAISummary(
                        note
                    );

                }

            },
            480
        );

}


function renderAISummary(
    note
) {

    const summaryItems =
        note.summary
            .map(
                function (s) {

                    return (
                        "<li>" +
                        escapeHTML(s) +
                        "</li>"
                    );

                }
            )
            .join("");


    const examQItems =
        note.examQs
            .map(
                function (s) {

                    return (
                        "<li>" +
                        escapeHTML(s) +
                        "</li>"
                    );

                }
            )
            .join("");


    document.getElementById(
        "aiBody"
    ).innerHTML =

        '<div class="summary-block">' +

        "<h4>Concise summary</h4>" +

        "<ul>" +
        summaryItems +
        "</ul>" +

        "</div>" +


        '<div class="summary-block">' +

        "<h4>Likely exam questions</h4>" +

        "<ul>" +
        examQItems +
        "</ul>" +

        "</div>" +


        '<button class="btn btn-accent" style="width:100%; padding:13px;" onclick="closeModal(\'aiOverlay\'); startQuiz(' +
        JSON.stringify(String(note.id)) +
        ')">Take the quick quiz →</button>' +


        '<p class="form-note" style="text-align:center; margin-top:10px;">Generated for this demo from the note\'s stored data — a live build would call an LLM on the actual file text.</p>';

}


// =====================================================
// 14. QUIZ
// =====================================================

function startQuiz(
    id
) {

    quizNoteId =
        id;


    quizQuestionIndex =
        0;


    quizScore =
        0;


    const note =
        findNoteById(id);


    if (
        !note ||
        !note.quiz ||
        !note.quiz.length
    ) {

        showToast(
            "Quiz is not available for this note yet."
        );

        return;

    }


    openModal(
        "quizOverlay"
    );


    renderQuizQuestion();

}


function renderQuizQuestion() {

    const note =
        findNoteById(
            quizNoteId
        );


    if (
        !note ||
        !note.quiz ||
        !note.quiz.length
    ) {

        return;

    }


    const question =
        note.quiz[
            quizQuestionIndex
        ];


    if (!question) {

        finishQuiz(
            note
        );

        return;

    }


    let optionsHTML =
        "";


    for (
        let i = 0;
        i < question.options.length;
        i++
    ) {

        optionsHTML +=

            '<div class="quiz-opt" onclick="answerQuiz(' +
            i +
            ')">' +

            escapeHTML(
                question.options[i]
            ) +

            "</div>";

    }


    document.getElementById(
        "quizBody"
    ).innerHTML =

        '<div class="quiz-progress">Question ' +

        (
            quizQuestionIndex +
            1
        ) +

        " of " +

        note.quiz.length +

        "</div>" +


        '<div class="quiz-q">' +

        escapeHTML(
            question.q
        ) +

        "</div>" +


        '<div id="quizOpts">' +

        optionsHTML +

        "</div>";

}


function answerQuiz(
    chosenIndex
) {

    const note =
        findNoteById(
            quizNoteId
        );


    if (!note) return;


    const question =
        note.quiz[
            quizQuestionIndex
        ];


    const optionElements =
        document.querySelectorAll(
            "#quizOpts .quiz-opt"
        );


    optionElements.forEach(
        function (element, i) {

            element.onclick =
                null;


            if (
                i ===
                question.answer
            ) {

                element.classList.add(
                    "correct"
                );

            } else if (
                i ===
                chosenIndex
            ) {

                element.classList.add(
                    "wrong"
                );

            }

        }
    );


    if (
        chosenIndex ===
        question.answer
    ) {

        quizScore++;

    }


    setTimeout(
        function () {

            quizQuestionIndex++;


            if (
                quizQuestionIndex <
                note.quiz.length
            ) {

                renderQuizQuestion();

            } else {

                finishQuiz(
                    note
                );

            }

        },
        900
    );

}


function finishQuiz(
    note
) {

    const percent =
        note.quiz.length
            ? Math.round(
                (
                    quizScore /
                    note.quiz.length
                ) *
                100
            )
            : 0;


    let message =
        "Worth another read-through of the notes before test day.";


    if (
        percent >= 80
    ) {

        message =
            "Sharp — you know this chapter well.";

    } else if (
        percent >= 50
    ) {

        message =
            "Solid start. Revisit the summary before the exam.";

    }


    document.getElementById(
        "quizBody"
    ).innerHTML =

        '<div style="text-align:center; padding:16px 4px;">' +

        '<div style="font-family:var(--font-hand); font-size:30px; color:var(--coral-deep);">' +

        quizScore +

        " / " +

        note.quiz.length +

        " correct</div>" +


        '<p style="margin-top:10px; color:var(--ink-soft); font-size:14.5px;">' +

        message +

        "</p>" +


        '<button class="btn btn-primary" style="margin-top:20px;" onclick="closeModal(\'quizOverlay\')">Done</button>' +

        "</div>";

}


// =====================================================
// 15. UPLOAD NOTE
// =====================================================

function openUploadModal() {

    if (!requireLogin())
        return;


    const fileInput =
        document.getElementById(
            "fileInput"
        );


    const dropzoneLabel =
        document.getElementById(
            "dropzoneLabel"
        );


    if (fileInput) {

        fileInput.value =
            "";

    }


    if (dropzoneLabel) {

        dropzoneLabel.textContent =
            "Click to choose a file";

    }


    openModal(
        "uploadOverlay"
    );

}


function handleFileChosen(
    input
) {

    if (
        input.files &&
        input.files[0]
    ) {

        document.getElementById(
            "dropzoneLabel"
        ).textContent =
            input.files[0].name;

    }

}


// =====================================================
// HANDLE UPLOAD
// =====================================================

async function handleUpload(
    e
) {

    e.preventDefault();


    if (!requireLogin())
        return false;


    const fileInput =
        document.getElementById(
            "fileInput"
        );


    if (
        !fileInput ||
        !fileInput.files ||
        !fileInput.files[0]
    ) {

        showToast(
            "Please select a file first."
        );

        return false;

    }


    const file =
        fileInput.files[0];


    const maxSize =
        20 * 1024 * 1024;


    if (
        file.size >
        maxSize
    ) {

        showToast(
            "File must be smaller than 20 MB."
        );

        return false;

    }


    const formData =
        new FormData();


    formData.append(
        "file",
        file
    );


    formData.append(
        "title",
        document
            .getElementById(
                "upTitle"
            )
            .value
            .trim()
    );


    formData.append(
        "subject",
        document
            .getElementById(
                "upSubject"
            )
            .value
            .trim()
    );


    formData.append(
        "branch",
        document
            .getElementById(
                "upBranch"
            )
            .value
    );


    formData.append(
        "semester",
        document
            .getElementById(
                "upSemester"
            )
            .value
    );


    formData.append(
        "chapter",
        document
            .getElementById(
                "upChapter"
            )
            .value
            .trim()
    );


    formData.append(
        "tags",
        document
            .getElementById(
                "upTags"
            )
            .value
            .trim()
    );


    formData.append(
        "description",
        document
            .getElementById(
                "upDesc"
            )
            .value
            .trim()
    );


    const submitButton =
        e.target.querySelector(
            'button[type="submit"]'
        );


    const oldText =
        submitButton
            ? submitButton.textContent
            : "";


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Uploading…";

    }


    try {

        let headers = {};


        // Firebase ID token if available

        if (
            typeof auth !==
                "undefined" &&
            auth &&
            auth.currentUser
        ) {

            const token =
                await auth
                    .currentUser
                    .getIdToken();


            headers.Authorization =
                `Bearer ${token}`;

        }


        const response =
            await fetch(
                `${API_BASE_URL}/api/notes/upload`,
                {

                    method:
                        "POST",

                    headers:
                        headers,

                    body:
                        formData

                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Upload failed."
            );

        }


        closeModal(
            "uploadOverlay"
        );


        e.target.reset();


        const dropzoneLabel =
            document.getElementById(
                "dropzoneLabel"
            );


        if (dropzoneLabel) {

            dropzoneLabel.textContent =
                "Click to choose a file";

        }


        showToast(
            "Notes published to the shelf!"
        );


        await loadNotes();


        scrollToId(
            "browse"
        );


    } catch (error) {

        console.error(
            "UPLOAD ERROR:",
            error
        );


        showToast(
            error.message ||
            "Failed to upload note."
        );


    } finally {

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                oldText;

        }

    }


    return false;

}


// =====================================================
// 16. DISCUSSIONS
// =====================================================

function renderDiscussions() {

    const discussionList =
        document.getElementById(
            "discussList"
        );


    if (!discussionList)
        return;


    let html =
        "";


    for (
        let i = 0;
        i < discussions.length;
        i++
    ) {

        const d =
            discussions[i];


        html +=

            '<div class="doubt-card">' +

            '<div class="doubt-top">' +

            "<div>" +

            '<div class="doubt-q">' +

            escapeHTML(
                d.q
            ) +

            "</div>" +

            '<div class="doubt-meta">' +

            escapeHTML(
                d.tag
            ) +

            " · asked " +

            escapeHTML(
                d.date
            ) +

            "</div>" +

            "</div>" +

            '<div class="doubt-answers">' +

            d.answers +

            " answers</div>" +

            "</div>" +

            "</div>";

    }


    discussionList.innerHTML =
        html;

}


function openDoubtModal() {

    if (!requireLogin())
        return;


    openModal(
        "doubtOverlay"
    );

}


function handleDoubtSubmit(
    e
) {

    e.preventDefault();


    const question =
        document
            .getElementById(
                "doubtQ"
            )
            .value
            .trim();


    const tag =
        document
            .getElementById(
                "doubtTag"
            )
            .value ||
        "General";


    if (!question) {

        showToast(
            "Please enter your question."
        );

        return false;

    }


    discussions.unshift({

        id:
            Date.now(),

        q:
            question,

        tag:
            tag,

        answers:
            0,

        date:
            "just now"

    });


    closeModal(
        "doubtOverlay"
    );


    e.target.reset();


    showToast(
        "Question posted — hope someone helps you out soon!"
    );


    renderDiscussions();


    scrollToId(
        "discuss"
    );


    return false;

}


// =====================================================
// 17. STATS
// =====================================================

function updateStats() {

    const statNotes =
        document.getElementById(
            "statNotes"
        );


    const statDownloads =
        document.getElementById(
            "statDownloads"
        );


    if (statNotes) {

        statNotes.textContent =
            notes.length
                .toLocaleString() +
            "+";

    }


    let totalDownloads =
        0;


    for (
        let i = 0;
        i < notes.length;
        i++
    ) {

        totalDownloads +=
            notes[i].downloads;

    }


    if (statDownloads) {

        statDownloads.textContent =
            totalDownloads.toLocaleString();

    }

}


// =====================================================
// 18. MODAL HANDLING
// =====================================================

document
    .querySelectorAll(
        ".overlay"
    )
    .forEach(
        function (overlay) {

            overlay.addEventListener(
                "click",
                function (e) {

                    if (
                        e.target ===
                        overlay
                    ) {

                        overlay.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }
    );


document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key ===
            "Escape"
        ) {

            document
                .querySelectorAll(
                    ".overlay.open"
                )
                .forEach(
                    function (overlay) {

                        overlay.classList.remove(
                            "open"
                        );

                    }
                );

        }

    }
);


// =====================================================
// 19. START APPLICATION
// =====================================================

buildFilterCheckboxes();

updateAuthUI();

renderDiscussions();

updateStats();

loadNotes();


// =====================================================
// 20. FIREBASE AUTH STATE
// =====================================================

if (
    typeof auth !==
        "undefined" &&
    auth &&
    auth.onAuthStateChanged
) {

    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser = {

                    name:
                        user.displayName ||
                        user.email.split("@")[0],

                    email:
                        user.email

                };


                // Try to get the profile
                // from our Node.js backend.

                try {

                    const token =
                        await user.getIdToken();


                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/users/me`,
                            {

                                headers: {

                                    Authorization:
                                        `Bearer ${token}`

                                }

                            }
                        );


                    if (response.ok) {

                        const data =
                            await response.json();


                        if (
                            data.success &&
                            data.user
                        ) {

                            currentUser =
                                data.user;

                        }

                    }

                } catch (error) {

                    console.error(
                        "PROFILE LOAD ERROR:",
                        error
                    );

                }


            } else {

                currentUser =
                    null;

            }


            updateAuthUI();

        }
    );

}