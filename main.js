/**
 * Graceville Elementary School (GES) Management System
 * Mirroring Logic & View Control
 */

// Initial student data store (Reflecting Primary School context)
const initialStudents = [
    { id: "GES-101", name: "Chisom Okafor", class: "Primary 1", fees: "Paid", attendance: "98%" },
    { id: "GES-102", name: "Afolabi Adekunle", class: "Nursery 2", fees: "Pending", attendance: "94%" },
    { id: "GES-103", name: "Zainab Ibrahim", class: "Reception", classType: "Early Years", fees: "Paid", attendance: "91%" },
    { id: "GES-104", name: "Eze Emeka", class: "Primary 5", fees: "Paid", attendance: "96%" },
    { id: "GES-105", name: "Olivia Nsukka", class: "Primary 3", fees: "Scholarship", attendance: "89%" },
    { id: "GES-106", name: "Bello Hassan", class: "Nursery 1", fees: "Paid", attendance: "95%" },
    { id: "GES-107", name: "Adaobi Uzoamaka", class: "Primary 4", fees: "Paid", attendance: "92%" },
];

// DOM elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');
const landingView = document.getElementById('landing-view');
const dashboardView = document.getElementById('dashboard-view');
const studentsView = document.getElementById('students-view');
const gradesView = document.getElementById('grades-view');
const portalLinks = document.querySelector('.portal-links');
const mainNav = document.querySelector('.main-navigation');
const navLinks = document.querySelectorAll('.nav-link');
const studentTableBody = document.getElementById('student-table-body');

// State management
let currentUser = null;
let currentView = 'landing';

// View Control
function switchView(viewName) {
    const views = {
        'landing': landingView,
        'dashboard': dashboardView,
        'students': studentsView,
        'grades': gradesView
    };

    // Hide all views
    Object.values(views).forEach(v => {
        if (v) v.classList.add('hidden');
    });

    // Show target view
    const target = views[viewName];
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
        currentView = viewName;
    }

    // Update Nav Active state
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-view') === viewName) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Data population
function renderStudents() {
    if (!studentTableBody) return;
    studentTableBody.innerHTML = '';
    initialStudents.forEach(student => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #eee';
        tr.innerHTML = `
            <td style="padding: 1rem;">${student.id}</td>
            <td style="font-weight: 700; color: var(--primary);">${student.name}</td>
            <td style="color: var(--text-muted);">${student.class}</td>
            <td><span style="color: ${student.fees === 'Paid' ? '#22c55e' : '#f59e0b'}; font-weight: 600;">${student.fees}</span></td>
            <td>
                <button style="background: var(--primary); color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 4px; cursor: pointer;">Action</button>
            </td>
        `;
        studentTableBody.appendChild(tr);
    });
}

// Event Listeners
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        loginModal.classList.add('hidden');
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate login
        currentUser = { name: 'Graceville Admin', role: 'Staff' };
        loginModal.classList.add('hidden');

        // Toggle Nav context
        mainNav.classList.add('hidden');
        portalLinks.classList.remove('hidden');

        // Switch to Portal Dashboard
        switchView('dashboard');
        console.log('GES Portal: Logged in successfully.');
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = null;
        mainNav.classList.remove('hidden');
        portalLinks.classList.add('hidden');
        switchView('landing');
    });
}

// Portal Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const view = link.getAttribute('data-view');
        if (view) {
            e.preventDefault();
            switchView(view);
            if (view === 'students') renderStudents();
        }
    });
});

// Auto-populate on first load if already in portal state (e.g. refresh)
if (currentUser) {
    switchView('dashboard');
}

console.log('Graceville Elementary School (GES) System Mirroring Ready');
