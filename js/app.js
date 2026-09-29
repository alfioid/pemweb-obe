import { dataKamar, hitungTotalKas } from './dataManager.js';

let statusFilter = "Semua";
let searchQuery = "";

// 1. Dapatkan limit dari localStorage jika ada, jika tidak default 'all'
let limitItems = localStorage.getItem('limitPenghuni') || "all";

document.addEventListener("DOMContentLoaded", () => {
    // Set nilai dropdown limit sesuai dengan localStorage yang tersimpan
    const limitSelect = document.getElementById("limit-select");
    if (limitSelect) {
        limitSelect.value = limitItems;
    }

    updateDashboardUI();
    renderPenghuniGrid();
    setupEventListeners();
});

function updateDashboardUI() {
    const statPemasukan = document.getElementById("stat-pemasukan");
    const statKamar = document.getElementById("stat-kamar");

    if (statPemasukan) {
        statPemasukan.textContent = `Rp ${hitungTotalKas().toLocaleString('id-ID')}`;
    }

    if (statKamar) {
        const kamarKosong = dataKamar.filter(k => k.status === "Kosong").length;
        statKamar.textContent = `${kamarKosong} Kamar`;
    }
}

function renderPenghuniGrid() {
    const gridContainer = document.getElementById("penghuni-grid");
    if (!gridContainer) return;

    let filteredData = dataKamar.filter(item => {
        const matchStatus = statusFilter === "Semua" || item.status === statusFilter;
        const matchSearch = item.penghuni.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            `kamar ${item.id}`.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchSearch;
    });

    if (limitItems !== "all") {
        filteredData = filteredData.slice(0, parseInt(limitItems));
    }

    if (filteredData.length === 0) {
        gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 20px;">Data tidak ditemukan.</p>`;
        return;
    }

    gridContainer.innerHTML = filteredData.map(item => `
        <div class="card-item">
            <div class="card-header">
                <h3 class="card-title">Kamar ${item.id}</h3>
                <span class="badge ${item.status === 'Terisi' ? 'badge-terisi' : 'badge-kosong'}">${item.status}</span>
            </div>
            
            <div class="card-info-list">
                <div class="info-row">
                    <span class="info-label">Nama Penghuni</span>
                    <span class="info-value">${item.penghuni}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tanggal Bayar</span>
                    <span class="info-value">${item.tglBayar || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tenggat Bayar</span>
                    <span class="info-value">${item.tglHabis}</span>
                </div>
                <div class="info-row" style="margin-top: 4px; padding-top: 6px; border-top: 1px dashed #e2e8f0;">
                    <span class="info-label">Harga Sewa</span>
                    <span class="info-value" style="color: var(--color-primary);">Rp ${item.harga.toLocaleString('id-ID')} / bln</span>
                </div>
            </div>

            <!-- Tambahkan data-id untuk Event Delegation -->
            <button class="btn-action btn-detail" data-id="${item.id}">Detail Penghuni</button>
        </div>
    `).join('');
}

function setupEventListeners() {
    // 1. Event Input Pencarian
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderPenghuniGrid();
        });
    }

    // 2. Event Filter Status
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            statusFilter = e.target.getAttribute("data-status");
            renderPenghuniGrid();
        });
    });

    // 3. Event Limit Tampilan + SIMPAN KE LOCALSTORAGE
    const limitSelect = document.getElementById("limit-select");
    if (limitSelect) {
        limitSelect.addEventListener("change", (e) => {
            limitItems = e.target.value;
            localStorage.setItem('limitPenghuni', limitItems); // Simpan ke Web Storage
            renderPenghuniGrid();
        });
    }

    // 4. EVENT DELEGATION pada Induk Container (#penghuni-grid)
    const gridContainer = document.getElementById("penghuni-grid");
    if (gridContainer) {
        gridContainer.addEventListener("click", (e) => {
            const btnDetail = e.target.closest(".btn-detail");
            if (btnDetail) {
                const kamarId = btnDetail.getAttribute("data-id");
                const item = dataKamar.find(k => k.id == kamarId);
                
                if (item) {
                    alert(`=== DETAIL PENGHUNI ===\n` +
                          `Kamar: Kamar ${item.id}\n` +
                          `Status: ${item.status}\n` +
                          `Penghuni: ${item.penghuni}\n` +
                          `Tenggat Bayar: ${item.tglHabis}\n` +
                          `Harga Sewa: Rp ${item.harga.toLocaleString('id-ID')}`);
                }
            }
        });
    }
}