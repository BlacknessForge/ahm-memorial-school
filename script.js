const routineData = {
    class8: [
        { subject: "Mathematics", teacher: "Jahidul Sir", period: "1st Period" },
        { subject: "English", teacher: "Nasrin Mam", period: "2nd Period" },
        { subject: "Bangla", teacher: "Rahim Sir", period: "3rd Period" }
    ],
    class9: [
        { subject: "Physics", teacher: "Dr. Asif Sir", period: "1st Period" },
        { subject: "Higher Math", teacher: "Jahidul Sir", period: "2nd Period" },
        { subject: "English", teacher: "Nasrin Mam", period: "3rd Period" }
    ],
    class10: [
        { subject: "Chemistry", teacher: "Farhana Mam", period: "1st Period" },
        { subject: "Biology", teacher: "Kabir Sir", period: "2nd Period" },
        { subject: "Mathematics", teacher: "Jahidul Sir", period: "3rd Period" }
    ]
};

// Student Database
const studentsData = [
    { 
        roll: "01", 
        class: "Class 8",
        name: "Sumaiya Akter", 
        father: "Md. Delwar Hossain",
        mother: "Shahana Begum",
        contact: "+8801711000000", 
        exam: "First Term 2026",
        gpa: "4.75", 
        grade: "A",
        marks: [
            { subject: "Bangla", marks: 88, gpa: "5.00", grade: "A+" },
            { subject: "English", marks: 80, gpa: "4.00", grade: "A" },
            { subject: "Mathematics", marks: 92, gpa: "5.00", grade: "A+" },
            { subject: "Science", marks: 85, gpa: "4.00", grade: "A" },
            { subject: "Social Science", marks: 90, gpa: "5.00", grade: "A+" }
        ]
    },
    { 
        roll: "801", 
        class: "Class 8",
        name: "Tanvir Hossain", 
        father: "Md. Delwar Hossain",
        mother: "Shahana Begum",
        contact: "+8801711000000", 
        exam: "First Term 2026",
        gpa: "5.00", 
        grade: "A+",
        marks: [
            { subject: "Bangla", marks: 90, gpa: "5.00", grade: "A+" },
            { subject: "English", marks: 88, gpa: "5.00", grade: "A+" },
            { subject: "Mathematics", marks: 95, gpa: "5.00", grade: "A+" },
            { subject: "Science", marks: 91, gpa: "5.00", grade: "A+" }
        ]
    },
    { 
        roll: "901", 
        class: "Class 9",
        name: "Naimur Rahman", 
        father: "Mizanur Rahman",
        mother: "Rokeya Parveen",
        contact: "+8801933000000", 
        exam: "First Term 2026",
        gpa: "4.50", 
        grade: "A",
        marks: [
            { subject: "Physics", marks: 82, gpa: "4.50", grade: "A" },
            { subject: "Higher Math", marks: 88, gpa: "5.00", grade: "A+" },
            { subject: "English", marks: 78, gpa: "4.00", grade: "A" }
        ]
    }
];

const facultyData = [
    { name: "Jahidul Sir", subject: "Mathematics & Higher Math", classes: "Class 8, 9, 10" },
    { name: "Nasrin Mam", subject: "English Literature", classes: "Class 8, 9" },
    { name: "Dr. Asif Sir", subject: "Physics", classes: "Class 9, 10" },
    { name: "Farhana Mam", subject: "Chemistry", classes: "Class 10" }
];

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();

    if (document.getElementById('routineGrid')) renderRoutine('class8');
    if (document.getElementById('studentTable')) renderStudents(studentsData);
    if (document.getElementById('teacherGrid')) renderTeachers();

    // Mobile Navigation & Icon Switch
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileBtn && navLinks && menuIcon) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
    }

    // Theme Switch & Icon
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.className = savedTheme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }

    if (themeBtn && themeIcon) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeIcon.className = next === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        });
    }

    // Language Toggle & Text Updates
    const langBtn = document.getElementById('langBtn');
    const langText = document.getElementById('langText');
    let currentLang = localStorage.getItem('lang') || 'en';
    
    applyLanguage(currentLang);
    if (langText) langText.textContent = currentLang.toUpperCase();

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'bn' : 'en';
            localStorage.setItem('lang', currentLang);
            applyLanguage(currentLang);
            if (langText) langText.textContent = currentLang.toUpperCase();
        });
    }
});

function highlightActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function applyLanguage(lang) {
    document.querySelectorAll('.lang-text').forEach(el => {
        if (el.getAttribute(`data-${lang}`)) {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        }
    });
}

function handleResultSearch(event) {
    event.preventDefault();
    const roll = document.getElementById('resultRoll').value.trim();
    const selectedClass = document.getElementById('resultClass').value;
    const card = document.getElementById('resultCard');

    const match = studentsData.find(s => 
        (parseInt(s.roll) === parseInt(roll) || s.roll === roll) && s.class === selectedClass
    );

    if (!match) {
        card.classList.remove('hidden');
        card.innerHTML = `<p style="color:#ef4444; text-align:center;"><i class="fa-solid fa-triangle-exclamation"></i> No results found for Roll <strong>${roll}</strong> in <strong>${selectedClass}</strong>.</p>`;
        return;
    }

    card.classList.remove('hidden');
    card.innerHTML = `
        <div class="result-header-box">
            <div class="exam-title">Exam: ${match.exam}</div>
            <div class="student-meta">${match.name} — ${match.class} (Roll: ${match.roll})</div>
            <div class="gpa-summary-grid">
                <div class="gpa-item">
                    <div class="lbl">GPA</div>
                    <div class="val">${match.gpa}</div>
                </div>
                <div class="gpa-item">
                    <div class="lbl">Grade</div>
                    <div class="val">${match.grade}</div>
                </div>
            </div>
        </div>

        <div class="subjects-title"><i class="fa-solid fa-chart-simple"></i> Subjects Breakdown</div>
        <div class="table-scroll">
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>GPA</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    ${match.marks.map(m => `
                        <tr>
                            <td><strong>${m.subject}</strong></td>
                            <td>${m.marks}</td>
                            <td>${m.gpa}</td>
                            <td><span class="grade-badge ${m.grade === 'A+' ? 'aplus' : 'a'}">${m.grade}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="result-footer-bar">
            <strong>Overall GPA: ${match.gpa}</strong> — Grade: <strong>${match.grade}</strong>
        </div>
    `;
}

function renderStudents(data) {
    const tbody = document.getElementById('studentTable');
    if (!tbody) return;
    tbody.innerHTML = data.map(s => `
        <tr>
            <td>${s.roll}</td>
            <td><strong>${s.name}</strong></td>
            <td>${s.class}</td>
            <td>${s.father}</td>
            <td><button class="table-btn glass-btn" type="button" onclick="openModal('${s.roll}')">View Profile</button></td>
        </tr>
    `).join('');
}

function filterStudentTable() {
    const queryInput = document.getElementById('studentFilterInput');
    const classSelect = document.getElementById('classFilterSelect');
    if (!queryInput || !classSelect) return;

    const query = queryInput.value.toLowerCase();
    const selectedClass = classSelect.value;

    const filtered = studentsData.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(query) || 
                             s.father.toLowerCase().includes(query) || 
                             s.mother.toLowerCase().includes(query);
        const matchesClass = selectedClass === 'all' || s.class === selectedClass;
        return matchesQuery && matchesClass;
    });

    renderStudents(filtered);
}

function openModal(roll) {
    const student = studentsData.find(s => s.roll === roll);
    const modal = document.getElementById('studentModal');
    if (!student || !modal) return;

    const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    document.getElementById('modalAvatar').textContent = initials;

    document.getElementById('modalName').textContent = student.name;
    document.getElementById('modalClassRoll').textContent = `${student.class} | Roll ID: ${student.roll}`;
    document.getElementById('modalClass').textContent = student.class;
    document.getElementById('modalRoll').textContent = student.roll;

    document.getElementById('modalFather').textContent = student.father;
    document.getElementById('modalMother').textContent = student.mother;
    document.getElementById('modalContact').textContent = student.contact;

    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('studentModal');
    if (modal) modal.classList.add('hidden');
}

function handleBackdropClick(event) {
    if (event.target.id === 'studentModal') closeModal();
}

function switchClass(className, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    renderRoutine(className);
}

function renderRoutine(className) {
    const grid = document.getElementById('routineGrid');
    if (!grid) return;
    grid.innerHTML = routineData[className].map(item => `
        <div class="box glass-card">
            <span class="badge-glow">${item.period}</span>
            <h3 style="margin-top:8px">${item.subject}</h3>
            <p style="color:var(--text-muted); font-size:0.9rem">Teacher: <strong>${item.teacher}</strong></p>
        </div>
    `).join('');
}

function renderTeachers() {
    const grid = document.getElementById('teacherGrid');
    if (!grid) return;
    grid.innerHTML = facultyData.map(t => `
        <div class="box glass-card">
            <h3>${t.name}</h3>
            <p style="color:var(--primary-color); font-weight:bold">${t.subject}</p>
            <p style="font-size:0.85rem; color:var(--text-muted)">Teaches: ${t.classes}</p>
        </div>
    `).join('');
}
