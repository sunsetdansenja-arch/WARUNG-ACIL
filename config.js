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

  // Alias agar tetap terbaca jika script lain memanggil CONFIG.BRANCHES
  get BRANCHES() {
    return this.BRANCH_MAP;
  },

  // Konfigurasi Printer Thermal Bluetooth (RPP02N / 58mm Generic)
  PRINTER: {
    // Service UUID standar untuk printer Bluetooth ESC/POS
    SERVICE_UUID: '000018f0-0000-1000-8000-00805f9b34fb',
    CHARACTERISTIC_UUID: '00002af1-0000-1000-8000-00805f9b34fb',
    
    // Daftar Service cadangan yang sering digunakan printer 58mm
    OPTIONAL_SERVICES: [
      '000018f0-0000-1000-8000-00805f9b34fb',
      '0000e025-0000-1000-8000-00805f9b34fb',
      '00001101-0000-1000-8000-00805f9b34fb'
    ]
  },

  // Helper untuk mendapatkan nama cabang berdasarkan kode akses
  getBranchName: function(aksesCode) {
    return this.BRANCH_MAP[String(aksesCode)] || `Cabang ${aksesCode}`;
  }
};
