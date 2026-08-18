const notes = [
  {
    id: 1, title: "Data Structures – Unit 3", subject: "Data Structures", branch: "CSE", semester: 3,
    chapter: "Unit 3 · Trees & Graphs", type: "PDF", tags: ["trees", "BST", "graphs", "traversal"],
    desc: "Covers binary trees, BST operations, graph representations and BFS/DFS with worked examples.",
    uploader: "Aditya R.", date: "2026-06-02", downloads: 1284, rating: 4.8, ratingCount: 96,
    reviews: [
      { name: "Meera", stars: 5, text: "Saved me before my mid-sem. Clear diagrams." },
      { name: "Karan", stars: 4, text: "Good, could use more BFS examples." }
    ],
    summary: [
      "Binary trees: definitions, traversal (in/pre/post-order) with recursion patterns.",
      "BST insertion, deletion and search complexity — average vs worst case.",
      "Graph representations: adjacency matrix vs adjacency list trade-offs.",
      "BFS and DFS walkthroughs with step-by-step traversal order."
    ],
    examQs: [
      "Derive the time complexity of BST deletion in the worst case.",
      "Compare adjacency list vs matrix for sparse graphs.",
      "Trace BFS traversal on a given graph and list visit order."
    ],
    quiz: [
      { q: "What is the worst-case time complexity of search in an unbalanced BST?", options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"], answer: 1 },
      { q: "Which traversal visits the root node first?", options: ["In-order", "Post-order", "Pre-order", "Level-order"], answer: 2 },
      { q: "Which structure is more space-efficient for a sparse graph?", options: ["Adjacency matrix", "Adjacency list", "Both equal", "Depends on language"], answer: 1 }
    ]
  },
  {
    id: 2, title: "Basic Electrical Engineering – Module 2", subject: "Basic Electrical Engineering", branch: "Common", semester: 1,
    chapter: "Module 2 · Circuit Laws", type: "PDF", tags: ["Kirchhoff's law", "circuits", "ohm's law"],
    desc: "Kirchhoff's Current & Voltage Laws, series-parallel circuits, and solved numerical problems.",
    uploader: "Sana K.", date: "2026-05-20", downloads: 2043, rating: 4.9, ratingCount: 151,
    reviews: [
      { name: "Rohit", stars: 5, text: "Best module 2 notes on the shelf, hands down." },
      { name: "Priya", stars: 5, text: "The solved numericals are gold." }
    ],
    summary: [
      "Kirchhoff's Current Law (KCL): sum of currents at a node equals zero.",
      "Kirchhoff's Voltage Law (KVL): sum of voltages around a closed loop equals zero.",
      "Series and parallel circuit reduction techniques.",
      "Five fully solved numerical problems using mesh analysis."
    ],
    examQs: [
      "State KVL and apply it to a two-loop circuit.",
      "Find equivalent resistance for a mixed series-parallel network.",
      "Explain the sign convention used in mesh analysis."
    ],
    quiz: [
      { q: "Kirchhoff's Current Law is based on conservation of:", options: ["Energy", "Charge", "Momentum", "Voltage"], answer: 1 },
      { q: "In a series circuit, current is:", options: ["Same everywhere", "Divided across branches", "Zero", "Doubled at each resistor"], answer: 0 },
      { q: "KVL states the sum of voltages around a closed loop is:", options: ["Maximum", "Zero", "Equal to source voltage only", "Undefined"], answer: 1 }
    ]
  },
  {
    id: 3, title: "Thermodynamics – Chapter 4", subject: "Thermodynamics", branch: "Mechanical", semester: 4,
    chapter: "Chapter 4 · Entropy", type: "PPT", tags: ["entropy", "second law", "carnot cycle"],
    desc: "Second law of thermodynamics, entropy change calculations, and the Carnot cycle explained with diagrams.",
    uploader: "Vikram S.", date: "2026-04-28", downloads: 876, rating: 4.6, ratingCount: 64,
    reviews: [{ name: "Ananya", stars: 5, text: "The Carnot cycle diagrams made it click for me." }],
    summary: [
      "Second law of thermodynamics stated via Kelvin-Planck and Clausius forms.",
      "Entropy as a measure of disorder; entropy change in reversible vs irreversible processes.",
      "Carnot cycle: four stages and efficiency derivation.",
      "Common numerical patterns for entropy change problems."
    ],
    examQs: [
      "State and explain the Clausius inequality.",
      "Derive the efficiency of a Carnot engine.",
      "Why is entropy of an isolated system non-decreasing?"
    ],
    quiz: [
      { q: "Carnot cycle consists of how many processes?", options: ["2", "3", "4", "5"], answer: 2 },
      { q: "Entropy of an isolated system over time:", options: ["Always decreases", "Stays constant only", "Never decreases", "Becomes negative"], answer: 2 },
      { q: "Carnot efficiency depends only on:", options: ["Working fluid", "Reservoir temperatures", "Piston size", "Cycle speed"], answer: 1 }
    ]
  },
  {
    id: 4, title: "Digital Electronics – Module 1", subject: "Digital Electronics", branch: "ECE", semester: 3,
    chapter: "Module 1 · Logic Gates", type: "DOC", tags: ["logic gates", "boolean algebra", "K-map"],
    desc: "Logic gates, Boolean algebra simplification, and Karnaugh map minimization with practice questions.",
    uploader: "Fatima N.", date: "2026-06-10", downloads: 654, rating: 4.5, ratingCount: 41,
    reviews: [{ name: "Dev", stars: 4, text: "K-map section is really well organized." }],
    summary: [
      "Basic logic gates: AND, OR, NOT, NAND, NOR, XOR with truth tables.",
      "Boolean algebra laws used for expression simplification.",
      "Karnaugh maps for 3 and 4 variable minimization.",
      "Practice problems with step-by-step K-map grouping."
    ],
    examQs: [
      "Simplify a given 4-variable Boolean expression using K-map.",
      "Prove De Morgan's theorem using truth tables.",
      "Design a half-adder using basic logic gates."
    ],
    quiz: [
      { q: "NAND gate output is HIGH when:", options: ["Both inputs are HIGH", "At least one input is LOW", "Both inputs are LOW", "Never"], answer: 1 },
      { q: "K-maps are primarily used for:", options: ["Speeding up clock cycles", "Boolean expression minimization", "Memory allocation", "Power calculation"], answer: 1 },
      { q: "XOR gate outputs HIGH when inputs are:", options: ["Same", "Different", "Both zero", "Both one"], answer: 1 }
    ]
  },
  {
    id: 5, title: "Organic Chemistry – Unit 5 (Handwritten)", subject: "Organic Chemistry", branch: "Common", semester: 2,
    chapter: "Unit 5 · Reaction Mechanisms", type: "IMG", tags: ["SN1", "SN2", "mechanisms"],
    desc: "Neatly scanned handwritten notes covering SN1/SN2 mechanisms with arrow-pushing diagrams.",
    uploader: "Ishaan T.", date: "2026-05-05", downloads: 512, rating: 4.4, ratingCount: 38,
    reviews: [{ name: "Neha", stars: 4, text: "Handwriting is clear, arrow diagrams are super helpful." }],
    summary: [
      "SN1 vs SN2 mechanisms — rate laws and stereochemical outcomes.",
      "Factors affecting mechanism choice: substrate, nucleophile, solvent.",
      "Arrow-pushing conventions for common substitution reactions.",
      "Worked examples comparing primary, secondary and tertiary substrates."
    ],
    examQs: [
      "Compare the rate laws of SN1 and SN2 reactions.",
      "Which substrate favors SN1 and why?",
      "Draw the mechanism for hydrolysis of tert-butyl bromide."
    ],
    quiz: [
      { q: "SN2 reactions proceed via:", options: ["Carbocation intermediate", "Concerted backside attack", "Radical intermediate", "No mechanism"], answer: 1 },
      { q: "SN1 reactions are favored by:", options: ["Primary substrates", "Tertiary substrates", "Strong nucleophiles only", "Gas phase only"], answer: 1 },
      { q: "SN2 reactions typically result in:", options: ["Racemization", "Inversion of configuration", "No stereochemical change", "Retention always"], answer: 1 }
    ]
  },
  {
    id: 6, title: "Operating Systems – Unit 2", subject: "Operating Systems", branch: "CSE", semester: 5,
    chapter: "Unit 2 · Process Scheduling", type: "PDF", tags: ["scheduling", "CPU burst", "round robin"],
    desc: "CPU scheduling algorithms — FCFS, SJF, Round Robin, Priority — with Gantt charts and numericals.",
    uploader: "Aditya R.", date: "2026-06-15", downloads: 945, rating: 4.7, ratingCount: 70,
    reviews: [{ name: "Simran", stars: 5, text: "Gantt chart examples are exactly exam style." }],
    summary: [
      "FCFS, SJF, Round Robin and Priority scheduling algorithms compared.",
      "Gantt chart construction for a given process set.",
      "Average waiting time and turnaround time calculations.",
      "Trade-offs: throughput vs fairness vs response time."
    ],
    examQs: [
      "Construct a Gantt chart for a given set of processes under Round Robin.",
      "Compare SJF (preemptive) and SJF (non-preemptive).",
      "Why can FCFS lead to the convoy effect?"
    ],
    quiz: [
      { q: "Round Robin scheduling uses a:", options: ["Priority queue", "Fixed time quantum", "Random selection", "Stack"], answer: 1 },
      { q: "SJF stands for:", options: ["Shortest Job First", "Slowest Job First", "Sequential Job Flow", "Scheduled Job Function"], answer: 0 },
      { q: "The convoy effect is most associated with:", options: ["Round Robin", "FCFS", "Priority scheduling", "SJF"], answer: 1 }
    ]
  },
  {
    id: 7, title: "Signals and Systems – Module 3", subject: "Signals and Systems", branch: "ECE", semester: 4,
    chapter: "Module 3 · Fourier Transform", type: "PDF", tags: ["Fourier transform", "frequency domain"],
    desc: "Fourier transform properties, common transform pairs, and application to LTI systems.",
    uploader: "Meera J.", date: "2026-05-30", downloads: 601, rating: 4.6, ratingCount: 45,
    reviews: [{ name: "Yash", stars: 4, text: "Property tables at the end are a lifesaver." }],
    summary: [
      "Fourier transform definition and convergence conditions.",
      "Key properties: linearity, time-shifting, frequency-shifting, convolution.",
      "Common transform pairs table for quick reference.",
      "Using Fourier transform to analyze LTI system response."
    ],
    examQs: [
      "State and prove the time-shifting property of the Fourier transform.",
      "Find the Fourier transform of a rectangular pulse.",
      "Explain how convolution in time maps to multiplication in frequency."
    ],
    quiz: [
      { q: "Convolution in time domain corresponds to which operation in frequency domain?", options: ["Addition", "Multiplication", "Division", "Differentiation"], answer: 1 },
      { q: "The Fourier transform of an impulse function is:", options: ["Zero", "A constant", "Infinite at one point", "Undefined"], answer: 1 },
      { q: "Time-shifting a signal affects its Fourier transform's:", options: ["Magnitude only", "Phase only", "Both magnitude and phase", "Neither"], answer: 1 }
    ]
  },
  {
    id: 8, title: "Engineering Mathematics – Module 4", subject: "Engineering Mathematics", branch: "Common", semester: 2,
    chapter: "Module 4 · Laplace Transform", type: "PDF", tags: ["Laplace transform", "differential equations"],
    desc: "Laplace transform basics, standard transform pairs, and solving linear ODEs using Laplace methods.",
    uploader: "Karan V.", date: "2026-06-08", downloads: 1102, rating: 4.7, ratingCount: 88,
    reviews: [{ name: "Divya", stars: 5, text: "Clear steps for solving ODEs, exactly what I needed." }],
    summary: [
      "Laplace transform definition and existence conditions.",
      "Standard transform pairs for common functions.",
      "Solving linear differential equations using Laplace transform.",
      "Inverse Laplace transform via partial fractions."
    ],
    examQs: [
      "Solve a second-order linear ODE using Laplace transform.",
      "Find the inverse Laplace transform of a given rational function.",
      "State the shifting theorem and apply it to an example."
    ],
    quiz: [
      { q: "Laplace transform converts differential equations into:", options: ["Integral equations", "Algebraic equations", "Partial differential equations", "Matrix equations"], answer: 1 },
      { q: "The inverse Laplace transform is typically found using:", options: ["Partial fractions", "Newton's method", "Gaussian elimination", "Taylor series"], answer: 0 },
      { q: "Laplace transform of a constant 'a' is:", options: ["a", "a/s", "s/a", "1/a"], answer: 1 }
    ]
  }
];

let discussions = [
  { id: 1, q: "Can someone explain Kirchhoff's Voltage Law in simple terms?", tag: "Basic Electrical Engineering", answers: 6, date: "2 days ago" },
  { id: 2, q: "What's the actual difference between SN1 and SN2 mechanisms — is it just about the intermediate?", tag: "Organic Chemistry", answers: 4, date: "3 days ago" },
  { id: 3, q: "For Round Robin scheduling, how do you pick the 'right' time quantum in a numerical problem?", tag: "Operating Systems", answers: 3, date: "5 days ago" },
  { id: 4, q: "Is there a quick trick to remember Fourier transform pairs before an exam?", tag: "Signals and Systems", answers: 8, date: "1 week ago" }
];

/* =====================================================
   2. APP STATE
   Just a few variables to remember what's selected right now.
===================================================== */
let currentUser = null;          // { name, email } once "logged in"
let bookmarkedIds = [];          // list of note ids the user bookmarked
let selectedBranches = [];       // filters chosen on the left sidebar
let selectedSemesters = [];
let selectedTypes = [];
let searchTerm = '';
let authMode = 'login';          // 'login' or 'signup'
let activeNoteId = null;         // which note's modal is open
let tempRating = 0;              // star rating being picked right now

// Quiz progress
let quizNoteId = null;
let quizQuestionIndex = 0;
let quizScore = 0;

/* =====================================================
   3. SMALL HELPER FUNCTIONS
===================================================== */
function showToast(message) {
  const toastBox = document.getElementById('toast');
  toastBox.textContent = message;
  toastBox.classList.add('show');
  setTimeout(function () {
    toastBox.classList.remove('show');
  }, 2400);
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}
function scrollToId(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function starsAsText(rating) {
  const fullStars = Math.round(rating);
  return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
}

function getInitials(name) {
  const parts = name.split(' ');
  let letters = '';
  for (let i = 0; i < parts.length && i < 2; i++) {
    letters += parts[i][0];
  }
  return letters.toUpperCase();
}

// Find one note by its id (used everywhere we need note details)
function findNoteById(id) {
  return notes.find(function (note) {
    return note.id === id;
  });
}

/* =====================================================
   4. LOGIN / SIGNUP
===================================================== */
function updateAuthUI() {
  const box = document.getElementById('navActions');

  if (currentUser) {
    box.innerHTML =
      '<button class="btn btn-ghost btn-sm" onclick="openUploadModal()">Upload</button>' +
      '<div class="user-chip" onclick="logout()">' +
      '<span class="avatar">' + getInitials(currentUser.name) + '</span>' +
      currentUser.name.split(' ')[0] + ' · Log out' +
      '</div>';
  } else {
    box.innerHTML =
      '<button class="btn btn-ghost btn-sm" onclick="openAuthModal(\'login\')">Log in</button>' +
      '<button class="btn btn-primary btn-sm" onclick="openAuthModal(\'signup\')">Get started</button>';
  }
}

function openAuthModal(mode) {
  switchAuthTab(mode);
  openModal('authOverlay');
}

function switchAuthTab(mode) {
  authMode = mode;
  document.getElementById('tabLogin').classList.toggle('active', mode === 'login');
  document.getElementById('tabSignup').classList.toggle('active', mode === 'signup');
  document.getElementById('nameField').style.display = mode === 'signup' ? 'block' : 'none';
  document.getElementById('authTitle').textContent = mode === 'signup' ? 'Create your account' : 'Welcome back';
  document.getElementById('authSubmitBtn').textContent = mode === 'signup' ? 'Sign up' : 'Log in';
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  const nameInput = document.getElementById('authName').value;
  const name = authMode === 'signup' ? (nameInput || 'Student') : email.split('@')[0];

  currentUser = { name: name, email: email };
  updateAuthUI();
  closeModal('authOverlay');

  if (authMode === 'signup') {
    showToast('Welcome to Inkshelf, ' + currentUser.name.split(' ')[0] + '!');
  } else {
    showToast('Welcome back, ' + currentUser.name.split(' ')[0] + '!');
  }
  return false;
}

function logout() {
  currentUser = null;
  updateAuthUI();
  showToast('Logged out.');
}

// Many actions require login first (bookmark, upload, review, ask doubt)
function requireLogin() {
  if (!currentUser) {
    openAuthModal('login');
    showToast('Log in to continue.');
    return false;
  }
  return true;
}

/* =====================================================
   5. FILTERS + SEARCH + NOTES GRID
===================================================== */
const BRANCH_OPTIONS = ["CSE", "ECE", "Mechanical", "Common"];
const SEMESTER_OPTIONS = [1, 2, 3, 4, 5];
const TYPE_OPTIONS = ["PDF", "PPT", "DOC", "IMG"];

function buildFilterCheckboxes() {
  let branchHTML = '';
  for (let i = 0; i < BRANCH_OPTIONS.length; i++) {
    const b = BRANCH_OPTIONS[i];
    branchHTML += '<label class="filter-opt"><input type="checkbox" onchange="toggleBranchFilter(\'' + b + '\')">' + b + '</label>';
  }
  document.getElementById('filterBranch').innerHTML = branchHTML;

  let semesterHTML = '';
  for (let i = 0; i < SEMESTER_OPTIONS.length; i++) {
    const s = SEMESTER_OPTIONS[i];
    semesterHTML += '<label class="filter-opt"><input type="checkbox" onchange="toggleSemesterFilter(' + s + ')">Semester ' + s + '</label>';
  }
  document.getElementById('filterSemester').innerHTML = semesterHTML;

  let typeHTML = '';
  for (let i = 0; i < TYPE_OPTIONS.length; i++) {
    const t = TYPE_OPTIONS[i];
    typeHTML += '<label class="filter-opt"><input type="checkbox" onchange="toggleTypeFilter(\'' + t + '\')">' + t + '</label>';
  }
  document.getElementById('filterType').innerHTML = typeHTML;
}

// Each filter group has its own simple toggle function —
// easier to read than one generic function with extra parameters.
function toggleBranchFilter(branch) {
  const i = selectedBranches.indexOf(branch);
  if (i === -1) selectedBranches.push(branch);
  else selectedBranches.splice(i, 1);
  renderNotes();
}
function toggleSemesterFilter(semester) {
  const i = selectedSemesters.indexOf(semester);
  if (i === -1) selectedSemesters.push(semester);
  else selectedSemesters.splice(i, 1);
  renderNotes();
}
function toggleTypeFilter(type) {
  const i = selectedTypes.indexOf(type);
  if (i === -1) selectedTypes.push(type);
  else selectedTypes.splice(i, 1);
  renderNotes();
}

// Used by the hero chips ("CSE", "ECE", etc.) to jump straight to one filter
function quickFilter(branch) {
  selectedBranches = [branch];
  selectedSemesters = [];
  selectedTypes = [];
  document.querySelectorAll('.filters input[type=checkbox]').forEach(function (box) {
    box.checked = false;
  });
  document.querySelectorAll('#filterBranch input').forEach(function (box, i) {
    if (BRANCH_OPTIONS[i] === branch) box.checked = true;
  });
  scrollToId('browse');
  renderNotes();
}

function clearFilters() {
  selectedBranches = [];
  selectedSemesters = [];
  selectedTypes = [];
  searchTerm = '';
  document.getElementById('navSearchInput').value = '';
  document.getElementById('heroSearchInput').value = '';
  document.querySelectorAll('.filters input[type=checkbox]').forEach(function (box) {
    box.checked = false;
  });
  renderNotes();
}

function runSearch(term) {
  searchTerm = term.trim().toLowerCase();
  scrollToId('browse');
  renderNotes();
}

// Returns the notes that match the current filters + search + sort
function getVisibleNotes() {
  let result = notes.filter(function (note) {
    if (selectedBranches.length && selectedBranches.indexOf(note.branch) === -1) return false;
    if (selectedSemesters.length && selectedSemesters.indexOf(note.semester) === -1) return false;
    if (selectedTypes.length && selectedTypes.indexOf(note.type) === -1) return false;

    if (searchTerm) {
      const searchableText = (note.title + ' ' + note.subject + ' ' + note.chapter + ' ' + note.tags.join(' ') + ' ' + note.branch).toLowerCase();
      if (searchableText.indexOf(searchTerm) === -1) return false;
    }
    return true;
  });

  const sortBy = document.getElementById('sortBy').value;
  if (sortBy === 'rating') {
    result.sort(function (a, b) { return b.rating - a.rating; });
  } else if (sortBy === 'recent') {
    result.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  } else {
    result.sort(function (a, b) { return b.downloads - a.downloads; }); // popular (default)
  }
  return result;
}

function renderNotes() {
  const visibleNotes = getVisibleNotes();
  const hasActiveFilter = searchTerm || selectedBranches.length || selectedSemesters.length || selectedTypes.length;

  document.getElementById('resultsCount').textContent = hasActiveFilter
    ? visibleNotes.length + ' note' + (visibleNotes.length !== 1 ? 's' : '') + ' found'
    : 'Showing all ' + visibleNotes.length + ' notes';

  const grid = document.getElementById('notesGrid');

  if (visibleNotes.length === 0) {
    grid.innerHTML =
      '<div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--ink-soft);">' +
      '<div style="font-family:var(--font-hand); font-size:24px; color:var(--coral-deep); margin-bottom:8px;">Nothing on the shelf yet.</div>' +
      'Try clearing a filter, or be the first to upload notes for this topic.</div>';
    return;
  }

  let html = '';
  for (let i = 0; i < visibleNotes.length; i++) {
    const note = visibleNotes[i];
    const isBookmarked = bookmarkedIds.indexOf(note.id) !== -1;

    html += '<div class="note-card">' +
      '<div class="perf"></div>' +
      '<div class="note-top">' +
      '<span class="note-type type-' + note.type + '">' + note.type + '</span>' +
      '<button class="bookmark-btn ' + (isBookmarked ? 'active' : '') + '" onclick="toggleBookmark(' + note.id + ')" title="Bookmark">' +
      '<svg class="icon" viewBox="0 0 24 24" fill="' + (isBookmarked ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
      '</button>' +
      '</div>' +
      '<div class="note-title">' + note.title + '</div>' +
      '<div class="note-meta">' + note.branch + ' · Semester ' + note.semester + ' · ' + note.chapter + '</div>' +
      '<div class="note-tags">' + note.tags.slice(0, 3).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
      '<div class="note-stats">' +
      '<span class="stars">' + starsAsText(note.rating) + '</span>' +
      '<span>' + note.rating + ' (' + note.ratingCount + ')</span>' +
      '<span>· ' + note.downloads.toLocaleString() + ' downloads</span>' +
      '</div>' +
      '<div class="note-actions">' +
      '<button class="btn btn-ghost btn-sm" onclick="openDetail(' + note.id + ')">View</button>' +
      '<button class="btn btn-accent btn-sm" onclick="openAISummary(' + note.id + ')">✨ AI Summary</button>' +
      '</div>' +
      '</div>';
  }
  grid.innerHTML = html;
}

function toggleBookmark(id) {
  if (!requireLogin()) return;
  const i = bookmarkedIds.indexOf(id);
  if (i === -1) {
    bookmarkedIds.push(id);
    showToast('Bookmarked — find it anytime in your dashboard.');
  } else {
    bookmarkedIds.splice(i, 1);
    showToast('Removed from bookmarks.');
  }
  renderNotes();
}

/* =====================================================
   6. NOTE DETAIL MODAL (view, rate, download)
===================================================== */
function openDetail(id) {
  const note = findNoteById(id);
  activeNoteId = id;

  document.getElementById('detailTitle').textContent = note.title;

  const formattedDate = new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    starsHTML += '<span onclick="setRating(' + i + ')" id="rs-' + i + '">★</span>';
  }

  document.getElementById('detailBody').innerHTML =
    '<div class="note-meta" style="margin-bottom:14px;">' + note.branch + ' · Semester ' + note.semester + ' · ' + note.chapter + ' · Uploaded by ' + note.uploader + ' on ' + formattedDate + '</div>' +
    '<p style="font-size:14.5px; line-height:1.6; margin-bottom:16px;">' + note.desc + '</p>' +
    '<div class="note-tags" style="margin-bottom:18px;">' + note.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
    '<div class="note-stats" style="margin-bottom:20px;">' +
    '<span class="stars">' + starsAsText(note.rating) + '</span><span>' + note.rating + ' · ' + note.ratingCount + ' ratings</span>' +
    '<span>· ' + note.downloads.toLocaleString() + ' downloads</span>' +
    '</div>' +
    '<div style="display:flex; gap:10px; margin-bottom:26px;">' +
    '<button class="btn btn-primary" style="flex:1;" onclick="downloadNote(' + note.id + ')">⬇ Download ' + note.type + '</button>' +
    '<button class="btn btn-accent" style="flex:1;" onclick="closeModal(\'detailOverlay\'); openAISummary(' + note.id + ');">✨ AI Summary</button>' +
    '</div>' +
    '<h4 style="font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:var(--pencil); margin-bottom:12px;">Rate these notes</h4>' +
    '<div class="stars-input" id="rateStars" style="margin-bottom:14px;">' + starsHTML + '</div>' +
    '<textarea id="reviewText" rows="2" placeholder="Leave a short review (optional)" style="width:100%; padding:10px; border:1px solid var(--line); border-radius:9px; font-family:var(--font-body); margin-bottom:10px;"></textarea>' +
    '<button class="btn btn-ghost btn-sm" onclick="submitReview(' + note.id + ')">Submit rating</button>' +
    '<h4 style="font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:var(--pencil); margin:22px 0 12px;">Reviews (' + note.reviews.length + ')</h4>' +
    '<div id="reviewsList">' + renderReviewsHTML(note) + '</div>';

  tempRating = 0;
  openModal('detailOverlay');
}

function renderReviewsHTML(note) {
  let html = '';
  for (let i = 0; i < note.reviews.length; i++) {
    const r = note.reviews[i];
    html += '<div style="padding:12px 0; border-bottom:1px solid var(--line);">' +
      '<div style="display:flex; justify-content:space-between;"><strong style="font-size:13.5px;">' + r.name + '</strong><span style="color:var(--yellow-deep); font-size:13px;">' + '★'.repeat(r.stars) + '</span></div>' +
      '<p style="font-size:13.5px; color:var(--ink-soft); margin-top:4px;">' + r.text + '</p>' +
      '</div>';
  }
  return html;
}

function setRating(stars) {
  tempRating = stars;
  for (let s = 1; s <= 5; s++) {
    document.getElementById('rs-' + s).classList.toggle('active', s <= stars);
  }
}

function submitReview(id) {
  if (!requireLogin()) return;
  if (!tempRating) {
    showToast('Pick a star rating first.');
    return;
  }

  const note = findNoteById(id);
  const text = document.getElementById('reviewText').value.trim();

  note.reviews.unshift({ name: currentUser.name.split(' ')[0], stars: tempRating, text: text || '(no comment left)' });
  note.ratingCount = note.ratingCount + 1;
  note.rating = Math.round(((note.rating * (note.ratingCount - 1) + tempRating) / note.ratingCount) * 10) / 10;

  document.getElementById('reviewsList').innerHTML = renderReviewsHTML(note);
  showToast('Thanks for rating!');
  renderNotes();
}

function downloadNote(id) {
  const note = findNoteById(id);
  note.downloads = note.downloads + 1;
  showToast('Downloading "' + note.title + '" (demo — no real file attached).');
  renderNotes();
  updateStats();
}

/* =====================================================
   7. AI SUMMARY + QUIZ
   (This is "fake AI" — it just displays the summary/examQs/quiz
   text already stored on the note object above.)
===================================================== */
function openAISummary(id) {
  activeNoteId = id;
  const note = findNoteById(id);

  document.getElementById('aiBody').innerHTML =
    '<div class="loading-box">' +
    '<div class="spinner"></div>' +
    '<div class="loading-step" id="aiLoadingStep">Reading "' + note.title + '"…</div>' +
    '</div>';
  openModal('aiOverlay');

  const steps = ['Reading "' + note.title + '"…', 'Extracting key concepts…', 'Highlighting exam-focused topics…', 'Almost done…'];
  let stepIndex = 0;

  const timer = setInterval(function () {
    stepIndex++;
    const stepEl = document.getElementById('aiLoadingStep');
    if (stepEl) stepEl.textContent = steps[Math.min(stepIndex, steps.length - 1)];
    if (stepIndex >= steps.length) {
      clearInterval(timer);
      renderAISummary(note);
    }
  }, 480);
}

function renderAISummary(note) {
  const summaryItems = note.summary.map(function (s) { return '<li>' + s + '</li>'; }).join('');
  const examQItems = note.examQs.map(function (s) { return '<li>' + s + '</li>'; }).join('');

  document.getElementById('aiBody').innerHTML =
    '<div class="summary-block"><h4>Concise summary</h4><ul>' + summaryItems + '</ul></div>' +
    '<div class="summary-block"><h4>Likely exam questions</h4><ul>' + examQItems + '</ul></div>' +
    '<button class="btn btn-accent" style="width:100%; padding:13px;" onclick="closeModal(\'aiOverlay\'); startQuiz(' + note.id + ');">Take the quick quiz →</button>' +
    '<p class="form-note" style="text-align:center; margin-top:10px;">Generated for this demo from the note\'s stored data — a live build would call an LLM on the actual file text.</p>';
}

function startQuiz(id) {
  quizNoteId = id;
  quizQuestionIndex = 0;
  quizScore = 0;
  openModal('quizOverlay');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const note = findNoteById(quizNoteId);
  const question = note.quiz[quizQuestionIndex];

  let optionsHTML = '';
  for (let i = 0; i < question.options.length; i++) {
    optionsHTML += '<div class="quiz-opt" onclick="answerQuiz(' + i + ')">' + question.options[i] + '</div>';
  }

  document.getElementById('quizBody').innerHTML =
    '<div class="quiz-progress">Question ' + (quizQuestionIndex + 1) + ' of ' + note.quiz.length + '</div>' +
    '<div class="quiz-q">' + question.q + '</div>' +
    '<div id="quizOpts">' + optionsHTML + '</div>';
}

function answerQuiz(chosenIndex) {
  const note = findNoteById(quizNoteId);
  const question = note.quiz[quizQuestionIndex];
  const optionEls = document.querySelectorAll('#quizOpts .quiz-opt');

  optionEls.forEach(function (el, i) {
    el.onclick = null; // lock further clicks
    if (i === question.answer) el.classList.add('correct');
    else if (i === chosenIndex) el.classList.add('wrong');
  });

  if (chosenIndex === question.answer) quizScore++;

  setTimeout(function () {
    quizQuestionIndex++;
    if (quizQuestionIndex < note.quiz.length) {
      renderQuizQuestion();
    } else {
      finishQuiz(note);
    }
  }, 900);
}

function finishQuiz(note) {
  const percent = Math.round((quizScore / note.quiz.length) * 100);
  let message = 'Worth another read-through of the notes before test day.';
  if (percent >= 80) message = 'Sharp — you know this chapter well.';
  else if (percent >= 50) message = 'Solid start. Revisit the summary before the exam.';

  document.getElementById('quizBody').innerHTML =
    '<div style="text-align:center; padding:16px 4px;">' +
    '<div style="font-family:var(--font-hand); font-size:30px; color:var(--coral-deep);">' + quizScore + ' / ' + note.quiz.length + ' correct</div>' +
    '<p style="margin-top:10px; color:var(--ink-soft); font-size:14.5px;">' + message + '</p>' +
    '<button class="btn btn-primary" style="margin-top:20px;" onclick="closeModal(\'quizOverlay\')">Done</button>' +
    '</div>';
}

/* =====================================================
   8. UPLOAD A NOTE
===================================================== */
function openUploadModal() {
  if (!requireLogin()) return;
  document.getElementById('fileInput').value = '';
  document.getElementById('dropzoneLabel').textContent = 'Click to choose a file';
  openModal('uploadOverlay');
}

function handleFileChosen(input) {
  if (input.files && input.files[0]) {
    document.getElementById('dropzoneLabel').textContent = input.files[0].name;
  }
}

function handleUpload(e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  let type = 'PDF';
  if (fileInput.files[0]) {
    const ext = fileInput.files[0].name.split('.').pop().toLowerCase();
    if (ext === 'ppt' || ext === 'pptx') type = 'PPT';
    else if (ext === 'doc' || ext === 'docx') type = 'DOC';
    else if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif') type = 'IMG';
  }

  const tagsRaw = document.getElementById('upTags').value;
  const tags = tagsRaw.split(',').map(function (t) { return t.trim(); }).filter(function (t) { return t; });

  const newNote = {
    id: Date.now(), // simple way to get a unique id in a local demo
    title: document.getElementById('upTitle').value,
    subject: document.getElementById('upSubject').value,
    branch: document.getElementById('upBranch').value,
    semester: parseInt(document.getElementById('upSemester').value),
    chapter: document.getElementById('upChapter').value || 'General',
    type: type,
    tags: tags.length ? tags : ['general'],
    desc: document.getElementById('upDesc').value || 'No description provided.',
    uploader: currentUser ? currentUser.name : 'You',
    date: new Date().toISOString().slice(0, 10),
    downloads: 0, rating: 0, ratingCount: 0, reviews: [],
    summary: ["AI is still processing this upload — check back shortly for the full summary."],
    examQs: ["Summary pending."],
    quiz: [{ q: "Quiz will unlock once this note has been processed.", options: ["OK", "OK", "OK", "OK"], answer: 0 }]
  };

  notes.unshift(newNote);
  closeModal('uploadOverlay');
  e.target.reset();
  showToast('Notes published to the shelf!');
  renderNotes();
  updateStats();
  scrollToId('browse');
  return false;
}

/* =====================================================
   9. DOUBT DISCUSSION
===================================================== */
function renderDiscussions() {
  let html = '';
  for (let i = 0; i < discussions.length; i++) {
    const d = discussions[i];
    html += '<div class="doubt-card">' +
      '<div class="doubt-top">' +
      '<div>' +
      '<div class="doubt-q">' + d.q + '</div>' +
      '<div class="doubt-meta">' + d.tag + ' · asked ' + d.date + '</div>' +
      '</div>' +
      '<div class="doubt-answers">' + d.answers + ' answers</div>' +
      '</div>' +
      '</div>';
  }
  document.getElementById('discussList').innerHTML = html;
}

function openDoubtModal() {
  if (!requireLogin()) return;
  openModal('doubtOverlay');
}

function handleDoubtSubmit(e) {
  e.preventDefault();
  const question = document.getElementById('doubtQ').value;
  const tag = document.getElementById('doubtTag').value || 'General';

  discussions.unshift({ id: Date.now(), q: question, tag: tag, answers: 0, date: 'just now' });
  closeModal('doubtOverlay');
  e.target.reset();
  showToast("Question posted — hope someone helps you out soon!");
  renderDiscussions();
  scrollToId('discuss');
  return false;
}

/* =====================================================
   10. STATS + STARTING THE APP
===================================================== */
function updateStats() {
  document.getElementById('statNotes').textContent = notes.length.toLocaleString() + '+';
  let totalDownloads = 0;
  for (let i = 0; i < notes.length; i++) {
    totalDownloads += notes[i].downloads;
  }
  document.getElementById('statDownloads').textContent = totalDownloads.toLocaleString();
}

// Close a modal if you click the dark overlay outside it
document.querySelectorAll('.overlay').forEach(function (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});
// Close a modal by pressing Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay.open').forEach(function (o) {
      o.classList.remove('open');
    });
  }
});

// Run everything once the page loads
buildFilterCheckboxes();
updateAuthUI();
renderNotes();
renderDiscussions();
updateStats();
