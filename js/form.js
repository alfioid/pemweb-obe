document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initFormHandlers();
});

function initTabs() {
    const tabPendaftaran = document.getElementById("tab-pendaftaran");
    const tabPengaduan = document.getElementById("tab-pengaduan");
    const panelPendaftaran = document.getElementById("panel-pendaftaran");
    const panelPengaduan = document.getElementById("panel-pengaduan");

    if (!tabPendaftaran || !tabPengaduan) return;

    tabPendaftaran.addEventListener("click", () => {
        tabPendaftaran.classList.add("active");
        tabPendaftaran.setAttribute("aria-selected", "true");
        tabPengaduan.classList.remove("active");
        tabPengaduan.setAttribute("aria-selected", "false");

        panelPendaftaran.style.display = "block";
        panelPengaduan.style.display = "none";
        clearAllErrors(document.getElementById("form-pendaftaran-sewa"));
    });

    tabPengaduan.addEventListener("click", () => {
        tabPengaduan.classList.add("active");
        tabPengaduan.setAttribute("aria-selected", "true");
        tabPendaftaran.classList.remove("active");
        tabPendaftaran.setAttribute("aria-selected", "false");

        panelPengaduan.style.display = "block";
        panelPendaftaran.style.display = "none";
        clearAllErrors(document.getElementById("form-pengaduan-kendala"));
    });
}

function initFormHandlers() {
    const formPendaftaran = document.getElementById("form-pendaftaran-sewa");
    const formPengaduan = document.getElementById("form-pengaduan-kendala");

    if (formPendaftaran) {
        formPendaftaran.addEventListener("submit", (e) => {
            e.preventDefault();
            handleFormSubmit(formPendaftaran, "Pendaftaran sewa kamar berhasil dikirim!");
        });
    }

    if (formPengaduan) {
        formPengaduan.addEventListener("submit", (e) => {
            e.preventDefault();
            handleFormSubmit(formPengaduan, "Laporan kendala berhasil dikirim!");
        });
    }
}

function handleFormSubmit(formElement, successMsg) {
    clearAllErrors(formElement);
    const errors = validateForm(formElement);

    if (errors.length > 0) {
        // Render Error Summary di Atas Form
        showErrorSummary(formElement, errors);

        // Render Pesan Error Dekat Masing-Masing Field
        errors.forEach(err => showFieldError(err.element, err.message));

        // Fokuskan Kursor ke Error Pertama
        errors[0].element.focus();
    } else {
        showSuccessSummary(formElement, successMsg);
        formElement.reset();
    }
}

// ==========================================================
// LOGIKA VALIDASI 5 ATURAN
// ==========================================================
function validateForm(formElement) {
    const errors = [];

    // Aturan 1: Wajib diisi (Required Check)
    const requiredInputs = formElement.querySelectorAll("[required]");
    requiredInputs.forEach(input => {
        if (input.type === "checkbox" && !input.checked) {
            errors.push({ element: input, message: "Anda harus menyetujui persyaratan ini." });
        } else if (input.type !== "checkbox" && !input.value.trim()) {
            const label = formElement.querySelector(`label[for="${input.id}"]`);
            const fieldName = label ? label.innerText.replace("*", "").trim() : "Bidang ini";
            errors.push({ element: input, message: `${fieldName} tidak boleh kosong.` });
        }
    });

    // Aturan 2: Validasi Panjang Minimal Nama (Minimal 3 Karakter)
    const namaInput = formElement.querySelector("#nama-penyewa, #nama-penghuni-lapor");
    if (namaInput && namaInput.value.trim() && namaInput.value.trim().length < 3) {
        errors.push({ element: namaInput, message: "Nama terlalu pendek (minimal 3 karakter)." });
    }

    // Aturan 3: Validasi Format Email / Nomor Kontak
    const emailInput = formElement.querySelector("#email-penyewa");
    if (emailInput && emailInput.value.trim()) {
        const val = emailInput.value.trim();
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isPhone = /^[0-9]{10,14}$/.test(val);
        if (!isEmail && !isPhone) {
            errors.push({ element: emailInput, message: "Format harus berupa email valid atau nomor HP (10-14 digit angka)." });
        }
    }

    // Aturan 4: Validasi Durasi Sewa (Minimal 1 Bulan)
    const durasiInput = formElement.querySelector("#durasi-sewa");
    if (durasiInput && durasiInput.value) {
        if (parseInt(durasiInput.value) < 1) {
            errors.push({ element: durasiInput, message: "Durasi sewa minimal adalah 1 bulan." });
        }
    }

    // Aturan 5: Validasi Tanggal Tidak Boleh Masa Lalu
    const tglInput = formElement.querySelector("#tgl-masuk, #tgl-kejadian");
    if (tglInput && tglInput.value) {
        const inputDate = new Date(tglInput.value);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (inputDate < today) {
            errors.push({ element: tglInput, message: "Tanggal tidak boleh berada di masa lalu." });
        }
    }

    return errors;
}

// ==========================================================
// TAMPILKAN ERROR & FEEDBACK UI
// ==========================================================
function showFieldError(element, message) {
    element.classList.add("input-error");
    
    // Buat/Tampilkan Pesan Error Tepat Dekat Field
    const errorSpan = document.createElement("span");
    errorSpan.className = "field-error-msg";
    errorSpan.style.color = "#e53e3e";
    errorSpan.style.fontSize = "12px";
    errorSpan.style.marginTop = "4px";
    errorSpan.style.display = "block";
    errorSpan.textContent = message;

    element.parentNode.appendChild(errorSpan);
}

function showErrorSummary(formElement, errors) {
    let summaryBox = formElement.querySelector(".error-summary-box");
    if (!summaryBox) {
        summaryBox = document.createElement("div");
        summaryBox.className = "alert-box alert-error error-summary-box";
        summaryBox.style.marginBottom = "16px";
        formElement.insertBefore(summaryBox, formElement.firstChild);
    }

    summaryBox.innerHTML = `
        <strong>Terdapat ${errors.length} kesalahan pada form:</strong>
        <ul style="margin-top: 6px; padding-left: 20px;">
            ${errors.map(e => `<li>${e.message}</li>`).join('')}
        </ul>
    `;
    summaryBox.style.display = "block";
}

function showSuccessSummary(formElement, message) {
    let summaryBox = formElement.querySelector(".error-summary-box");
    if (!summaryBox) {
        summaryBox = document.createElement("div");
        summaryBox.className = "alert-box alert-success error-summary-box";
        summaryBox.style.marginBottom = "16px";
        formElement.insertBefore(summaryBox, formElement.firstChild);
    }
    summaryBox.className = "alert-box alert-success error-summary-box";
    summaryBox.innerHTML = `<strong>Berhasil!</strong> ${message}`;
    summaryBox.style.display = "block";
}

function clearAllErrors(formElement) {
    if (!formElement) return;
    
    const summaryBox = formElement.querySelector(".error-summary-box");
    if (summaryBox) summaryBox.remove();

    const fieldErrors = formElement.querySelectorAll(".field-error-msg");
    fieldErrors.forEach(el => el.remove());

    const errorInputs = formElement.querySelectorAll(".input-error");
    errorInputs.forEach(el => el.classList.remove("input-error"));
}