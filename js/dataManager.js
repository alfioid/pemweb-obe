export const dataKamar = [
    { 
        id: 101, 
        penghuni: "Budi S.", 
        status: "Terisi", 
        tglBayar: "2026-09-01", 
        tglHabis: "2026-10-01", 
        harga: 1500000 
    },
    { 
        id: 102, 
        penghuni: "Siti A.", 
        status: "Terisi", 
        tglBayar: "2026-09-03", 
        tglHabis: "2026-10-03", 
        harga: 1500000 
    },
    { 
        id: 103, 
        penghuni: "-", 
        status: "Kosong", 
        tglBayar: "-", 
        tglHabis: "-", 
        harga: 1500000 
    },
    { 
        id: 104, 
        penghuni: "Andi W.", 
        status: "Terisi", 
        tglBayar: "2026-09-10", 
        tglHabis: "2026-10-10", 
        harga: 1500000 
    }
];

export const dataTransaksi = [
    { id: 1, ket: "Sewa Kamar 101", jenis: "Masuk", nominal: 1500000 },
    { id: 2, ket: "Beli Perlengkapan", jenis: "Keluar", nominal: 200000 }
];

export const hitungTotalKas = () => {
    return dataTransaksi.reduce((total, tr) => {
        return tr.jenis === "Masuk" ? total + tr.nominal : total - tr.nominal;
    }, 0);
};