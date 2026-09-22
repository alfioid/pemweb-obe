// ==========================================
// 1. DATA MASTER (Array of Objects)
// ==========================================
export const dataKamar = [
    { id: 101, penghuni: "Budi S.", status: "Terisi", tglHabis: "2026-10-01", harga: 1500000 },
    { id: 102, penghuni: "Siti A.", status: "Terisi", tglHabis: "2026-10-03", harga: 1500000 },
    { id: 103, penghuni: "-", status: "Kosong", tglHabis: "-", harga: 1500000 },
    { id: 104, penghuni: "Andi W.", status: "Terisi", tglHabis: "2026-10-10", harga: 1500000 }
];

export const dataTransaksi = [
    { id: 1, ket: "Sewa Kamar 101", jenis: "Masuk", nominal: 1500000 },
    { id: 2, ket: "Beli Perlengkapan", jenis: "Keluar", nominal: 200000 }
];

export const belanjaKamar = [
    { id: 1, kamarId: 101, namaBarang: "Lampu LED (2 pcs)", selesai: false },
    { id: 2, kamarId: 101, namaBarang: "Sapu & Pengki", selesai: true }
];

// ==========================================
// 2. FUNGSI LOGIKA & PENGOLAHAN DATA
// ==========================================

export const hitungSisaHari = (tglHabisStr) => {
    try {
        if (!tglHabisStr || tglHabisStr === "-") return null;
        
        const tglHabis = new Date(tglHabisStr);
        const tglSekarang = new Date();
        
        const selisihWaktu = tglHabis.getTime() - tglSekarang.getTime();
        const sisaHari = Math.ceil(selisihWaktu / (1000 * 3600 * 24));
        
        if (isNaN(sisaHari)) {
            throw new Error("Format tanggal tidak valid");
        }
        
        return sisaHari;
    } catch (error) {
        console.error("Error pada hitungSisaHari:", error.message);
        return null;
    }
};

export const hitungTotalKas = () => {
    try {
        if (!Array.isArray(dataTransaksi) || dataTransaksi.length === 0) {
            throw new Error("Data transaksi kosong!");
        }

        return dataTransaksi.reduce((total, tr) => {
            if (tr.jenis === "Masuk") {
                return total + tr.nominal;
            } else if (tr.jenis === "Keluar") {
                return total - tr.nominal;
            }
            return total;
        }, 0);
    } catch (error) {
        console.error("Gagal menghitung saldo kas:", error.message);
        return 0;
    }
};

export const dapatkanKamarJatuhTempo = () => {
    try {
        return dataKamar.filter(kamar => {
            if (kamar.status !== "Terisi") return false;
            const sisa = hitungSisaHari(kamar.tglHabis);
            return sisa !== null && sisa <= 14;
        });
    } catch (error) {
        console.error("Error saat memfilter kamar:", error.message);
        return [];
    }
};