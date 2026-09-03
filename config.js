// ============================================================
// CONFIG.JS
// Sumber konfigurasi bersama untuk seluruh halaman kasir
// ============================================================

const CONFIG = {

  // ==========================================================
  // MAPPING AKSES → CABANG
  // ==========================================================

  BRANCH_MAP: {
    "1": "Warung Acil 2",
    "2": "Warung Acil 3",
    "3": "Warung Acil 4",
    "4": "Warung Lulu dan Acil 1",
    "5": "Warung Lulu dan Acil 2",
    "6": "Warung Lulu dan Acil 3",

    // Owner / Master
    "ALL": "Master Owner / All Branches"
  },


  // ==========================================================
  // DAFTAR CABANG
  // ==========================================================

  BRANCHES: {
    "1": "Warung Acil 2",
    "2": "Warung Acil 3",
    "3": "Warung Acil 4",
    "4": "Warung Lulu dan Acil 1",
    "5": "Warung Lulu dan Acil 2",
    "6": "Warung Lulu dan Acil 3"
  },


  // ==========================================================
  // MENDAPATKAN NAMA CABANG DARI KODE AKSES
  // ==========================================================

  getBranchName: function (aksesCode) {

    if (
      aksesCode === null ||
      aksesCode === undefined
    ) {
      return "";
    }

    const key = String(aksesCode).trim();

    return this.BRANCH_MAP[key] || "";
  },


  // ==========================================================
  // MENGECEK APAKAH AKSES ADALAH OWNER
  // ==========================================================

  isOwner: function (aksesCode) {

    if (
      aksesCode === null ||
      aksesCode === undefined
    ) {
      return false;
    }

    return String(aksesCode).trim().toUpperCase() === "ALL";
  },


  // ==========================================================
  // MENDAPATKAN CABANG DARI SESSION
  // ==========================================================

  getBranchFromSession: function (session) {

    if (!session) {
      return "";
    }

    const akses =
      session.akses ??
      session.AKSES ??
      session.access ??
      session.ACCESS ??
      "";

    return this.getBranchName(akses);
  },


  // ==========================================================
  // NORMALISASI NAMA CABANG
  // ==========================================================

  normalizeBranch: function (branch) {

    if (
      branch === null ||
      branch === undefined
    ) {
      return "";
    }

    const value =
      String(branch)
        .trim()
        .toUpperCase();

    const map = {

      "WARUNG ACIL 2":
        "Warung Acil 2",

      "WARUNG ACIL 3":
        "Warung Acil 3",

      "WARUNG ACIL 4":
        "Warung Acil 4",

      "WARUNG LULU DAN ACIL 1":
        "Warung Lulu dan Acil 1",

      "WARUNG LULU DAN ACIL 2":
        "Warung Lulu dan Acil 2",

      "WARUNG LULU DAN ACIL 3":
        "Warung Lulu dan Acil 3",

      "MASTER OWNER":
        "Master Owner / All Branches",

      "MASTER OWNER / ALL BRANCHES":
        "Master Owner / All Branches"

    };

    return map[value] || String(branch).trim();
  },


  // ==========================================================
  // VALIDASI CABANG
  // ==========================================================

  isValidBranch: function (branch) {

    const normalized =
      this.normalizeBranch(branch);

    if (!normalized) {
      return false;
    }

    return Object.values(this.BRANCHES)
      .includes(normalized);
  },


  // ==========================================================
  // PRINTER THERMAL BLUETOOTH
  // ==========================================================

  PRINTER: {

    SERVICE_UUID:
      "000018f0-0000-1000-8000-00805f9b34fb",

    CHARACTERISTIC_UUID:
      "00002af1-0000-1000-8000-00805f9b34fb",

    OPTIONAL_SERVICES: [

      "000018f0-0000-1000-8000-00805f9b34fb",

      "0000e025-0000-1000-8000-00805f9b34fb",

      "00001101-0000-1000-8000-00805f9b34fb"

    ]

  }

};
