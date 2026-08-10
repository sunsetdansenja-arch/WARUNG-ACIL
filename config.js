// config.js - Sumber data tunggal untuk seluruh file HTML

const CONFIG = {
  // Mapping Kode AKSES ke Nama Cabang Lengkap
  BRANCH_MAP: {
    "1": "Warung Acil 2",
    "2": "Warung Acil 3",
    "3": "Warung Acil 4",
    "4": "Warung Lulu dan Acil 1",
    "5": "Warung Lulu dan Acil 2",
    "6": "Warung Lulu dan Acil 3",
    "ALL": "Master Owner / All Branches"
  },

  // Helper untuk mendapatkan nama cabang berdasarkan kode akses
  getBranchName: function(aksesCode) {
    return this.BRANCH_MAP[String(aksesCode)] || "Cabang Tidak Terdaftar";
  }
};
