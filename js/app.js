import { 
    dataKamar, 
    dataTransaksi, 
    belanjaKamar, 
    hitungSisaHari, 
    hitungTotalKas, 
    dapatkanKamarJatuhTempo 
} from './dataManager.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("Aplikasi Dashboard Admin Kost Berhasil Dimuat.");

    renderTabelKamar();
    renderCatatanBelanja();
    renderJatuhTempo();
    renderKeuangan();
    initButtonEvents();
});

// Render Daftar Kamar ke Tabel HTML (Tanpa Kolom Tipe)
function renderTabelKamar() {
    const tbodyKamar = document.getElementById("tabel-kamar-body");
    if (!tbodyKamar) return;

    try {
        tbodyKamar.innerHTML = dataKamar.map(kamar => `
            <tr>
                <td>${kamar.id}</td>
                <td>
                    <span class="badge ${kamar.status === 'Terisi' ? 'warning' : ''}">
                        ${kamar.status}
                    </span>
                </td>
                <td>${kamar.penghuni}</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Gagal memuat data kamar:", error.message);
    }
}

function renderCatatanBelanja() {
    const listContainer = document.querySelector(".todo-list");
    if (!listContainer) return;

    listContainer.innerHTML = belanjaKamar.map(item => `
        <li>
            <input type="checkbox" id="item${item.id}" ${item.selesai ? 'checked' : ''}>
            <label for="item${item.id}">${item.namaBarang}</label>
        </li>
    `).join("");
}

function renderJatuhTempo() {
    const cardJatuhTempo = document.querySelector("#kalender .card");
    if (!cardJatuhTempo) return;

    const kamarJatuhTempo = dapatkanKamarJatuhTempo();
    const existingAlerts = cardJatuhTempo.querySelectorAll(".alert-box");
    existingAlerts.forEach(el => el.remove());

    const btn = cardJatuhTempo.querySelector(".btn");

    kamarJatuhTempo.forEach(kamar => {
        const sisaHari = hitungSisaHari(kamar.tglHabis);
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert-box";
        alertDiv.innerHTML = `
            <p><strong>${kamar.penghuni} (Kamar ${kamar.id})</strong></p>
            <p>Tgl Habis: ${kamar.tglHabis}</p>
            <span class="badge warning">Sisa ${sisaHari} Hari</span>
        `;
        cardJatuhTempo.insertBefore(alertDiv, btn);
    });
}

function renderKeuangan() {
    const totalKasElement = document.querySelector(".total-saldo span");
    const tbodyKeuangan = document.getElementById("tabel-transaksi-body");

    const totalSaldo = hitungTotalKas();
    if (totalKasElement) {
        totalKasElement.textContent = `Total Kas: Rp ${totalSaldo.toLocaleString('id-ID')}`;
    }

    if (tbodyKeuangan) {
        tbodyKeuangan.innerHTML = dataTransaksi.map(tr => `
            <tr>
                <td>${tr.ket}</td>
                <td><span class="${tr.jenis === 'Masuk' ? 'text-success' : 'text-danger'}">${tr.jenis}</span></td>
                <td>Rp ${tr.nominal.toLocaleString('id-ID')}</td>
            </tr>
        `).join("");
    }
}

function initButtonEvents() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            alert(`Fitur Detail Bagian ${index + 1} sedang dikembangkan!`);
        });
    });
}