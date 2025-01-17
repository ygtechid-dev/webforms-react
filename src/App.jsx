import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import {

  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Select,
  InputLabel,
  FormControl,
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import moment from 'moment';
import 'moment/locale/id'; // Impor lokal Indonesia



const App = () => {
moment.locale('id'); // Atur lokal ke Indonesia

  const [formData, setFormData] = useState({
    tanggalBertemu: "",
    jamBertemu: "",
    lokasiBertemu:"",
    provinsiBertemu: "",
    kabupatenBertemu:"",
    kecamatanBertemu: "",
    kelurahanBertemu: "",
    agama: "",
    tempatLahir: "",
    tanggalLahir: "",
    punyaIstri: "",
    posAnak: "",
    jumlahPutra: 0,
    jumlahPutri: 0,
    namaLengkap: "",
    nik: "",
    pekerjaan: "",
    jenisKelamin: "",
    provinsiDomisili: "",
    kabupatenDomisili:"",
    kecamatanDomisili: "",
    kelurahanDomisili: "",
    alamatDomisili: "",
    provinsiKTP: "",
    kabupatenKTP:"",
    kecamatanKTP: "",
    kelurahanKTP: "",
    alamatKTP: "",
    statusPerkawinan: "",
    pendidikanTerakhir: "",
    statusPendidikan: "",
    namaBapak: "",
    statusBapak: "",
    namaIbu: "",
    statusIbu: "",
    foto: null, // Tambahkan state untuk foto
  });

  console.log('formdat', formData.foto);
  const [provinsiBertemu, setProvinsiBertemu] = useState([]);
  const [kabupatenKota, setKabupatenKota] = useState([]);
  const [kecamatans, setKecamatans] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const [provinsiDomisili, setProvinsiDomisili] = useState([]);
  const [kabupatenKotaDomisili, setKabupatenKotaDomisili] = useState([]);
  const [kecamatansDomisili, setKecamatansDomisili] = useState([]);
  const [kelurahanDomisili, setKelurahanDomisili] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [provinsiKTP, setProvinsiKTP] = useState([]);
  const [kabupatenKotaKTP, setKabupatenKotaKTP] = useState([]);
  const [kecamatansKTP, setKecamatansKTP] = useState([]);
  const [kelurahanKTP, setKelurahanKTP] = useState([]);


  const [selectedProvinsiBertemu, setSelectedProvinsiBertemu] = useState("");
  const [selectedKabupatenBertemu, setSelectedKabupatenBertemu] = useState("");
  const [selectedKecamatanBertemu, setSelectedKecamatanBertemu] = useState("");
  const [selectedKelurahanBertemu, setSelectedKelurahanBertemu] = useState("");


  const pendidikanOptions = [
    "Tidak Sekolah",
    "SD",
    "SMP",
    "SMA",
    "D1",
    "D2",
    "D3",
    "S1",
    "S2",
    "S3",
  ];

  const statusOrangTuaOptions = ["Hidup", "Meninggal"];

  useEffect(() => {
    // Ambil data prvbertemu menggunakan axios
    axios.get("http://103.196.155.202:8080/dataProvinsi")
      .then((response) => {
        console.log('Hasil1:', response.data);
        setProvinsiBertemu(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });


      axios.get("http://103.196.155.202:8080/dataProvinsi")
      .then((response) => {
        console.log('Hasil2:', response.data);
        setProvinsiDomisili(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });

      axios.get("http://103.196.155.202:8080/dataProvinsi")
      .then((response) => {
        console.log('Hasil3:', response.data);
        setProvinsiKTP(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, []);

  const handleProvinsiChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = provinsiBertemu.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);

    setSelectedProvinsiBertemu(kabKotaId);
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKabKot`, {
       "province_id" : kabKotaId
    })
      .then((response) => {
        console.log('kottta', response.data);
        setFormData({
          ...formData,
         provinsiBertemu: filtering[0].name

        })
        setKabupatenKota(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };


  const handleKabupatenChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kabupatenKota.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);

    setSelectedKabupatenBertemu(kabKotaId);
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKecamatan`,{
       "kabkot_id" : kabKotaId
    })
      .then((response) => {
        console.log('kecamatan', response.data);
        setFormData({
          ...formData,
         kabupatenBertemu: filtering[0].name

        })
        setKecamatans(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
    };


  const handleKecamatanChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kecamatans.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);

    setSelectedKecamatanBertemu(kabKotaId);
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKelurahan`, {
      "kecamatan_id" : kabKotaId
    })
      .then((response) => {
        console.log('kelurahan', response.data);
        setFormData({
          ...formData,
         kecamatanBertemu: filtering[0].name

        })
        setKelurahan(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };


  const handleKelurahanChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kelurahan.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);

    setSelectedKelurahanBertemu(kabKotaId);

    setFormData({
      ...formData,
     kelurahanBertemu: filtering[0].name

    })
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
   
  };



  //PEMISAH

  const handleProvinsiDomisiliChange = (e) => {

    const kabKotaId = e.target.value;
    setSelectedProvinsiBertemu(kabKotaId);
    
    const filtering = provinsiDomisili.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKabKot`, {
       "province_id" : kabKotaId
    })
      .then((response) => {
        console.log('kottta', response.data);
        setFormData({
          ...formData,
          provinsiDomisili: filtering[0].name

        })
        setKabupatenKotaDomisili(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error.response);
      });
  };


  const handleKabupatenDomisiliChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kabupatenKotaDomisili.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);

    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKecamatan`,{
       "kabkot_id" : kabKotaId
    })
      .then((response) => {
        console.log('kecamatan', response.data);
        setFormData({
          ...formData,
         kabupatenDomisili: filtering[0].name

        })
        setKecamatansDomisili(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
    };


  const handleKecamatanDomisiliChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kecamatansDomisili.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);

    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKelurahan`, {
      "kecamatan_id" : kabKotaId
    })
      .then((response) => {
        console.log('kelurahan', response.data);
        setFormData({
          ...formData,
         kecamatanDomisili: filtering[0].name

        })
        setKelurahanDomisili(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };


  const handleKelurahanDomisiliChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kelurahanDomisili.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);


    setFormData({
      ...formData,
     kelurahanDomisili: filtering[0].name

    })
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
   
  };
  

  //PEMISAH

  const handleProvinsiKTPChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = provinsiKTP.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKabKot`, {
       "province_id" : kabKotaId
    })
      .then((response) => {
        console.log('kottta', response.data);
        setFormData({
          ...formData,
          provinsiKTP: filtering[0].name

        })
        setKabupatenKotaKTP(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error.response);
      });
  };


  const handleKabupatenKTPChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kabupatenKotaKTP.filter((e) => e.id == kabKotaId)
    console.log('kabkot', kabKotaId);

    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKecamatan`,{
       "kabkot_id" : kabKotaId
    })
      .then((response) => {
        console.log('kecamatan', response.data);
        setFormData({
          ...formData,
         kabupatenKTP: filtering[0].name

        })
        setKecamatansKTP(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
    };


  const handleKecamatanKTPChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kecamatansKTP.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);

    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKelurahan`, {
      "kecamatan_id" : kabKotaId
    })
      .then((response) => {
        console.log('kelurahan', response.data);
        setFormData({
          ...formData,
         kecamatanKTP: filtering[0].name

        })
        setKelurahanKTP(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };


  const handleKelurahanKTPChange = (e) => {

    const kabKotaId = e.target.value;
    
    const filtering = kelurahanKTP.filter((e) => e.id == kabKotaId)
    console.log('kabkot', filtering);


    setFormData({
      ...formData,
     kelurahanKTP: filtering[0].name

    })
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
   
  };


  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Simpan file yang diupload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpload = async () => {
    if (!formData.foto) {
      alert("Silakan pilih foto terlebih dahulu.");
      return;
    }

    const data = new FormData();
    data.append("photo", formData.foto); // Key harus sama dengan yang diterima server

    try {
      const response = await axios.post("http://ygtechdev.my.id:4000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Mengatur header untuk FormData
        },
      });

      console.log('responsss', response.data.fileUrl);
      
  
      if (response.status === 200) {
        setUploadStatus("Foto berhasil diunggah!");
        await axios.post('http://localhost:8080/sendMessageImage', {
          "remoteJid": "120363387652160802@g.us",
            "text": "TEST FOTO",
            "imageUrl" : response.data.fileUrl
      }).then((res) => {
        console.log('response', res.data);
        
        alert('Berhasil')
      })
      
      // +120363387652160802 group B
      } else {
        setUploadStatus(`Gagal mengunggah foto: ${response.statusText}`);
      }
    } catch (error) {
      if (error.response) {
        // Jika server memberikan respon dengan kode error
        setUploadStatus(`Gagal mengunggah foto: ${error.response.data || error.response.statusText}`);
      } else if (error.request) {
        // Jika tidak ada respon dari server
        setUploadStatus("Tidak ada respon dari server. Periksa koneksi Anda.");
      } else {
        // Error lain
        setUploadStatus(`Terjadi kesalahan: ${error.message}`);
      }
    }
  };


  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Tambahkan spasi sebelum huruf kapital
      .replace(/^./, (str) => str.toUpperCase()); // Kapitalisasi huruf pertama
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = Object.entries(formData).map(([key, value]) => {
      return `${formatLabel(key)}: ${value ? value : "Tidak diisi"}`;
    });
  
    console.log("Form Data Submitted:\n" + formattedData.join("\n"));
    const tanggal = new Date(formData.tanggalBertemu);
    const tanggalLahirs = new Date(formData.tanggalLahir);

    const formatter = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long', // Nama hari
      day: 'numeric', // Tanggal
      month: 'long', // Nama bulan
      year: 'numeric' // Tahun
    });

    const formatterLahir = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', // Tanggal
      month: 'long', // Nama bulan
      year: 'numeric' // Tahun
    });
    const formattedDate = formatter.format(tanggal);

   
    const formattedTglLahir = formatterLahir.format(tanggalLahirs)


    const dataKirimWA = `*Permisi pak,*\nizin melaporkan pertemuan di ${formData.lokasiBertemu + " " + formData.kelurahanBertemu + " Kec." + formData.kecamatanBertemu + " " + formData.kabupatenBertemu + " Provinsi " + formData.provinsiBertemu}\n\nHari/Tanggal: ${formattedDate}\nJam: ${formData.jamBertemu} WIB\n\nBertemu An :\n\nNama: *${formData.namaLengkap}* ${formData.agama == "Islam" ? formData.jenisKelamin == "Laki-Laki" ? "Bin": "Binti" : ""} ${formData.agama == "Islam" ? formData.statusBapak == "Meninggal" ? formData.namaBapak + "(Alm)" : formData.namaBapak : ""}\nNIK: ${formData.nik}\nTTL: ${formData.tempatLahir + ", " + formattedTglLahir}\nAgama: ${formData.agama}\nPekerjaan: ${formData.pekerjaan}\nJenis Kelamin:${formData.jenisKelamin}\nAlamat Domisili: ${formData.alamatDomisili + " " + formData.kelurahanDomisili + " Kec." + formData.kecamatanDomisili + " " + formData.kabupatenDomisili + " Provinsi " + formData.provinsiDomisili}\nAlamat KTP: ${formData.alamatKTP + " " + formData.kelurahanKTP + " Kec." + formData.kecamatanKTP + " " + formData.kabupatenKTP + " Provinsi " + formData.provinsiKTP}\nPendidikan Terakhir: ${formData.pendidikanTerakhir + " ("+ `${formData.statusPendidikan}`+ ")" }\nStatus Perkawinan: ${formData.statusPerkawinan}\nIstri: ${formData.punyaIstri}\nPutra: ${formData.jumlahPutra}\nPutri: ${formData.jumlahPutri}\nPosisi Anak dalam Keluarga: ${formData.posAnak}\nNama Bapak: ${formData.namaBapak} ${formData.statusBapak == "Meninggal" ? "(Alm)" : ""}\nNama Ibu: ${formData.namaIbu} ${formData.statusIbu == "Meninggal" ? "(Almh)" : ""}\n\nPerkembangan selanjutnya akan di laporkan kembali.`

    const ambil = formattedData.join("\n")
    const jsonst = JSON.stringify(ambil)
    await axios.post('http://localhost:8080/sendMessage', {
        "remoteJid": "120363390123597612@g.us",
          "text": dataKirimWA
    }).then((res) => {
      console.log('response', res.data);
      
      alert('Berhasil')
    })
    
    // +120363387652160802 group B
    // Anda dapat menambahkan logika untuk mengupload data ke server di sini
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form Pendaftaran Pertemuan
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          padding: { xs: 2, sm: 4 },
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Container
          sx={{
            padding: { xs: 2, sm: 4 },
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: "800px",
            width: " 100%", // Mengatur lebar penuh pada perangkat kecil
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Form Pertemuan
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Tanggal dan Waktu Bertemu */}
            <TextField
              label="Tanggal Bertemu"
              type="date"
              name="tanggalBertemu"
              value={formData.tanggalBertemu}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Jam Bertemu"
              type="time"
              name="jamBertemu"
              value={formData.jamBertemu}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            {/* Lokasi Bertemu */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
             Lokasi Bertemu
            </Typography>

            <FormControl fullWidth margin="normal">


{/* Pilih Provinsi Bertemu */}
  <InputLabel>Provinsi</InputLabel>
  <Select
    name="provinsi"
    value={formData.provinsiBertemu}
    renderValue={(selected) => {
      console.log('selectedd', selected);
      
      return (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
         {selected}
        </span>
      );
    }}
    onChange={handleProvinsiChange}
  >
    {provinsiBertemu.map((wilayah, index) => (
      <MenuItem key={index} value={wilayah.id}>
        {wilayah.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

{/* Pilih Provinsi Bertemu */}
{/* Pilih KabKOt Bertemu */}
{formData.provinsiBertemu !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kabupaten / Kota</InputLabel>
    <Select
      name="kabupatenKota"
      value={formData.kabupatenBertemu}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKabupatenChange}
    >
      {kabupatenKota.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}
{/* Pilih KabKOt Bertemu*/}
{/* Pilih Kec Bertemu*/}
{formData.kabupatenBertemu !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kecamatan</InputLabel>
    <Select
      name="kecamatan"
      value={formData.kecamatanBertemu}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKecamatanChange}
    >
      {kecamatans.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih Kec Bertemu*/}


{/* Pilih Kelurahan Bertemu */}

{formData.kecamatanBertemu !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kelurahan</InputLabel>
    <Select
      name="kelurahan"
      value={formData.kelurahanBertemu}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKelurahanChange}
    >
      {kelurahan.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}


{/* Pilih Kelurahan  Bertemu*/}
<TextField
              label="Alamat Lengkap (Lokasi Bertemu)"
              type="text"
              name="lokasiBertemu"
              value={formData.lokasiBertemu}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />



            {/* Nama dan Identitas */}
            <TextField
              label="Nama Lengkap"
              type="text"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="NIK"
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Pekerjaan"
              type="text"
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />



            {/* Jenis Kelamin */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Jenis Kelamin</InputLabel>
              <Select
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
              >
                <MenuItem value="Laki-Laki">Laki-Laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Agama</InputLabel>
              <Select
                name="agama"
                value={formData.agama}
                onChange={handleChange}
              >
                    <MenuItem value="Islam">Islam</MenuItem>
              <MenuItem value="Kristen Protestan">Kristen Protestan</MenuItem>
              <MenuItem value="Katolik">Katolik</MenuItem>
              <MenuItem value="Hindu">Hindu</MenuItem>
              <MenuItem value="Buddha">Buddha</MenuItem>
              <MenuItem value="Konghucu">Konghucu</MenuItem>
              </Select>
            </FormControl>

<TextField
    label="Tempat Lahir"
    type="text"
    name="tempatLahir"
    value={formData.tempatLahir}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />

<TextField
    label="Tanggal Lahir"
    type="date"
    name="tanggalLahir"
    value={formData.tglLahir}
    onChange={handleChange}
    fullWidth
    margin="normal"
    InputLabelProps={{ shrink: true }}
  />


<TextField
    label="Nama Istri"
    type="text"
    name="punyaIstri"
    value={formData.punyaIstri}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />


<TextField
    label="Jumlah Putra"
    type="number"
    name="jumlahPutra"
    value={formData.jumlahPutra}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />

  {/* Jumlah Putri */}
  <TextField
    label="Jumlah Putri"
    type="number"
    name="jumlahPutri"
    value={formData.jumlahPutri}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
   <TextField
    label="Posisi Anak dalam Keluarga"
    type="text"
    name="posAnak"
    value={formData.posAnak}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />



            <Typography variant="subtitle1" sx={{ mt: 2 }}>
             Alamat Domisili
            </Typography>

            <FormControl fullWidth margin="normal">


{/* Pilih Provinsi Domisili */}
  <InputLabel>Provinsi</InputLabel>
  <Select
    name="provinsi"
    value={formData.provinsiDomisili}
    renderValue={(selected) => {
      console.log('selectedd', selected);
      
      return (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
         {selected}
        </span>
      );
    }}
    onChange={handleProvinsiDomisiliChange}
  >
    {provinsiDomisili.map((wilayah, index) => (
      <MenuItem key={index} value={wilayah.id}>
        {wilayah.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

{/* Pilih Provinsi Domisili */}


{/* Pilih KabKOt Domisili */}


{formData.provinsiDomisili !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kabupaten / Kota</InputLabel>
    <Select
      name="kabupatenKota"
      value={formData.kabupatenDomisili}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKabupatenDomisiliChange}
    >
      {kabupatenKotaDomisili.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih KabKOt Domisili*/}


{/* Pilih Kec Domisili*/}

{formData.kabupatenDomisili !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kecamatan</InputLabel>
    <Select
      name="kecamatan"
      value={formData.kecamatanDomisili}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKecamatanDomisiliChange}
    >
      {kecamatansDomisili.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih Kec Domisili*/}


{/* Pilih Kelurahan Domisili */}

{formData.kecamatanDomisili !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kelurahan</InputLabel>
    <Select
      name="kelurahan"
      value={formData.kelurahanDomisili}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKelurahanDomisiliChange}
    >
      {kelurahanDomisili.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih Kelurahan Domisili */}


            {/* Alamat */}
            <TextField
              label="Alamat Lengkap Domisili"
              type="text"
              name="alamatDomisili"
              value={formData.alamatDomisili}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />


<Typography variant="subtitle1" sx={{ mt: 2 }}>
             Alamat KTP
            </Typography>

            <FormControl fullWidth margin="normal">


{/* Pilih Provinsi Domisili */}
  <InputLabel>Provinsi</InputLabel>
  <Select
    name="provinsi"
    value={formData.provinsiKTP}
    renderValue={(selected) => {
      console.log('selectedd', selected);
      
      return (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
         {selected}
        </span>
      );
    }}
    onChange={handleProvinsiKTPChange}
  >
    {provinsiKTP.map((wilayah, index) => (
      <MenuItem key={index} value={wilayah.id}>
        {wilayah.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

{/* Pilih Provinsi Domisili */}


{/* Pilih KabKOt Domisili */}


{formData.provinsiKTP !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kabupaten / Kota</InputLabel>
    <Select
      name="kabupatenKota"
      value={formData.kabupatenKTP}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKabupatenKTPChange}
    >
      {kabupatenKotaKTP.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih KabKOt Domisili*/}


{/* Pilih Kec Domisili*/}

{formData.kabupatenKTP !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kecamatan</InputLabel>
    <Select
      name="kecamatan"
      value={formData.kecamatanKTP}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKecamatanKTPChange}
    >
      {kecamatansKTP.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih Kec Domisili*/}


{/* Pilih Kelurahan Domisili */}

{formData.kecamatanKTP !== "" &&
    <FormControl fullWidth margin="normal">
    <InputLabel>Kelurahan</InputLabel>
    <Select
      name="kelurahan"
      value={formData.kelurahanKTP}
      renderValue={(selected) => {
        console.log('selectedd', selected);
        
        return (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
           {selected}
          </span>
        );
      }}
      onChange={handleKelurahanKTPChange}
    >
      {kelurahanKTP.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}


            <TextField
              label="Alamat KTP"
              type="text"
              name="alamatKTP"
              value={formData.alamatKTP}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {/* Pendidikan */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Pendidikan Terakhir</InputLabel>
              <Select
                name="pendidikanTerakhir"
                value={formData.pendidikanTerakhir}
                onChange={handleChange}
              >
                {pendidikanOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Status Pendidikan</InputLabel>
              <Select
                name="statusPendidikan"
                value={formData.statusPendidikan}
                onChange={handleChange}
              >
                <MenuItem value="Lulus">Lulus</MenuItem>
                <MenuItem value="Tidak Lulus">Tidak Lulus</MenuItem>
                <MenuItem value="Belum Lulus">Belum Lulus</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Status Perkawinan</InputLabel>
              <Select
                name="statusPerkawinan"
                value={formData.statusPerkawinan}
                onChange={handleChange}
              >
                <MenuItem value="Menikah">Menikah</MenuItem>
                <MenuItem value="Belum Menikah">Belum Menikah</MenuItem>
                <MenuItem value="Cerai Hidup">Cerai Hidup</MenuItem>
                <MenuItem value="Cerai Mati">Cerai Mati</MenuItem>

             
              </Select>
            </FormControl>


            {/* Data Orang Tua */}
            <TextField
              label="Nama Bapak"
              type="text"
              name="namaBapak"
              value={formData.namaBapak}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status Bapak</InputLabel>
              <Select
                name="statusBapak"
                value={formData.statusBapak}
                onChange={handleChange}
              >
                 {statusOrangTuaOptions.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>

            <TextField
              label="Nama Ibu"
              type="text"
              name="namaIbu"
              value={formData.namaIbu}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status Ibu</InputLabel>
              <Select
                name="statusIbu"
                value={formData.statusIbu}
                onChange={handleChange}
              >
                {statusOrangTuaOptions.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Upload Foto */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Upload Foto Diri
      </Typography>
      <TextField
        type="file"
        name="foto"
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ accept: "image/*", capture: "camera" }} // Membuka kamera saat memilih file
      />
      {formData.foto && (
        <Typography sx={{ mt: 1 }}>Foto Terpilih: {formData.foto.name}</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2 }}
      >
        Unggah Foto
      </Button>
      {uploadStatus && (
        <Typography sx={{ mt: 2 }} color={uploadStatus.startsWith("Gagal") || uploadStatus.startsWith("Terjadi") ? "error" : "success"}>
          {uploadStatus}
        </Typography>
      )}
            {/* Tombol Submit */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Kirim
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default App;