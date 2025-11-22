document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. WELCOME MODAL & TYPING EFFECT ---
    const welcomeModal = document.getElementById("welcomeModal");
    const nameInput = document.getElementById("nameInput");
    const saveBtn = document.getElementById("saveNameBtn");
    const welcomeText = document.getElementById("welcomeText");

    function typeWriter(text, element, speed = 80) {
        element.textContent = "";
        element.style.borderRight = "3px solid #fff";
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.style.borderRight = "none"; 
            }
        }
        type();
    }

    setTimeout(() => {
        welcomeModal.classList.add("show");
        nameInput.focus();
    }, 800);

    function submitName() {
        const userName = nameInput.value.trim();
        if (userName) {
            welcomeModal.classList.remove("show");
            setTimeout(() => {
                welcomeModal.style.display = "none";
                const newText = `Hi ${userName}, Welcome to Aksara Tech!`;
                typeWriter(newText, welcomeText);
            }, 500);
        } else {
            nameInput.style.borderColor = "red";
            setTimeout(() => nameInput.style.borderColor = "#ddd", 500);
        }
    }
    saveBtn.addEventListener("click", submitName);
    nameInput.addEventListener("keypress", (e) => { if (e.key === "Enter") submitName(); });

    // --- 2. SCROLL ANIMATION & STICKY NAVBAR ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-text, .profile-banner').forEach(el => observer.observe(el));

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // --- 3. CONTACT FORM (LOGIC BARU) ---
    const contactForm = document.getElementById("contactForm");
    const successModal = document.getElementById("successModal");
    const closeSuccessBtn = document.getElementById("closeSuccessBtn");
    const resultContent = document.getElementById("resultContent"); // Target Kartu Preview

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // A. Ambil Data dari Form
        const name = document.getElementById("contactName").value;
        const dob = document.getElementById("contactDob").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const message = document.getElementById("contactMessage").value;

        // Format Tanggal
        const dateObj = new Date(dob);
        const dateString = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        // B. Update Kartu Preview (Di Sebelah Kanan)
        resultContent.innerHTML = `
            <div class="result-item">
                <strong>Nama:</strong>
                <span>${name}</span>
            </div>
            <div class="result-item">
                <strong>Tgl Lahir:</strong>
                <span>${dateString}</span>
            </div>
            <div class="result-item">
                <strong>Gender:</strong>
                <span>${gender}</span>
            </div>
            <div style="margin-top: 20px;">
                <strong style="color: var(--primary-color); display:block; margin-bottom:5px;">Pesan:</strong>
                <p style="background: #f9f9f9; padding: 10px; border-radius: 5px; font-size: 0.9rem; border:1px solid #eee;">${message}</p>
            </div>
            <div style="margin-top:auto; padding-top:20px; text-align:center; color:#aaa; font-size:0.8rem;">
                Data diperbarui: ${new Date().toLocaleTimeString()}
            </div>
        `;

        // C. Tampilkan Modal Notifikasi Sukses
        successModal.classList.add("show");

        // Reset Form
        contactForm.reset();
    });

    // Tutup Modal Sukses
    closeSuccessBtn.addEventListener("click", () => {
        successModal.classList.remove("show");
    });

    // --- 4. MOBILE MENU ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
});