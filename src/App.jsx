/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-duplicate-props */
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
    jumlahSaudara: "",
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

  console.log('formdat', formData);
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
  const [urlFoto, setUrlFoto] = useState("");



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
  const handleProvinsiChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    // Filter provinsiBertemu berdasarkan id yang dipilih
    const filtering = provinsiBertemu.find((e) => e.id === kabKotaId);
    console.log('kabkot', filtering);
  
    setSelectedProvinsiBertemu(kabKotaId);
  
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKabKot`, {
      province_id: kabKotaId
    })
      .then((response) => {
        console.log('kottta', response.data);
        // Update formData untuk formList dengan index yang sesuai
        const updatedFormData = [...formList];
        updatedFormData[index] = {
          ...updatedFormData[index],
          provinsiBertemu: filtering ? filtering.name : ''
        };
        setFormList(updatedFormData);
  
        setKabupatenKota(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };
  


  const handleKabupatenChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    // Filter kabupatenKota berdasarkan id yang dipilih
    const filtering = kabupatenKota.find((e) => e.id === kabKotaId);
    console.log('kabkot', filtering);
  
    setSelectedKabupatenBertemu(kabKotaId);
  
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKecamatan`, {
      kabkot_id: kabKotaId
    })
      .then((response) => {
        console.log('kecamatan', response.data);
        // Update formData untuk formList dengan index yang sesuai
        const updatedFormData = [...formList];
        updatedFormData[index] = {
          ...updatedFormData[index],
          kabupatenBertemu: filtering ? filtering.name : ''
        };
        setFormList(updatedFormData);
  
        setKecamatans(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };
  


  const handleKecamatanChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    // Filter kecamatans berdasarkan id yang dipilih
    const filtering = kecamatans.find((e) => e.id === kabKotaId);
    console.log('kabkot', filtering);
  
    setSelectedKecamatanBertemu(kabKotaId);
  
    // Ambil data Kelurahan berdasarkan Kecamatan yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKelurahan`, {
      kecamatan_id: kabKotaId
    })
      .then((response) => {
        console.log('kelurahan', response.data);
        // Update formData untuk formList dengan index yang sesuai
        const updatedFormData = [...formList];
        updatedFormData[index] = {
          ...updatedFormData[index],
          kecamatanBertemu: filtering ? filtering.name : ''
        };
        setFormList(updatedFormData);
  
        setKelurahan(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kelurahan:", error);
      });
  };
  


  const handleKelurahanChange = (e, index) => {
    const kelurahanId = e.target.value;
  
    // Filter kelurahan berdasarkan id yang dipilih
    const filtering = kelurahan.find((e) => e.id === kelurahanId);
    console.log('kelurahan', filtering);
  
    setSelectedKelurahanBertemu(kelurahanId);
  
    // Update formData untuk formList dengan index yang sesuai
    const updatedFormData = [...formList];
    updatedFormData[index] = {
      ...updatedFormData[index],
      kelurahanBertemu: filtering ? filtering.name : ''
    };
    setFormList(updatedFormData);
  };
  



  //PEMISAH

  const handleProvinsiDomisiliChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = provinsiDomisili.filter((e) => e.id == kabKotaId);
  
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKabKot`, {
      "province_id": kabKotaId
    })
      .then((response) => {
        setFormList(prevList => {
          const newList = [...prevList];
          newList[index].provinsiDomisili = filtering[0].name;
          return newList;
        });
        setKabupatenKotaDomisili(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error.response);
      });
  };
  
  

  const [formList, setFormList] = useState([formData]);
  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const newFormList = [...formList];
  
    // Cek apakah input adalah file
    if (files) {
      newFormList[index][name] = files[0]; // Simpan file pertama dari input
    } else {
      newFormList[index][name] = value; // Simpan nilai teks atau lainnya
    }
  
    setFormList(newFormList);
  };
  

  const handleAddForm = () => {
    setFormList([...formList, formData]);
  };

  const handleKabupatenDomisiliChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = kabupatenKotaDomisili.filter((e) => e.id == kabKotaId);
  
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKecamatan`, {
      "kabkot_id": kabKotaId
    })
      .then((response) => {
        setFormList(prevList => {
          const newList = [...prevList];
          newList[index].kabupatenDomisili = filtering[0].name;
          return newList;
        });
        setKecamatansDomisili(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };
  

  const handleKecamatanDomisiliChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = kecamatansDomisili.filter((e) => e.id == kabKotaId);
  
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKelurahan`, {
      "kecamatan_id": kabKotaId
    })
      .then((response) => {
        setFormList(prevList => {
          const newList = [...prevList];
          newList[index].kecamatanDomisili = filtering[0].name;
          return newList;
        });
        setKelurahanDomisili(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };
  


  const handleKelurahanDomisiliChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = kelurahanDomisili.filter((e) => e.id == kabKotaId);
  
    setFormList(prevList => {
      const newList = [...prevList];
      newList[index].kelurahanDomisili = filtering[0].name;
      return newList;
    });
  };
  
  

  //PEMISAH

  const handleProvinsiKTPChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = provinsiKTP.filter((e) => e.id == kabKotaId);
  
    axios.post(`http://103.196.155.202:8080/filterKabKot`, {
      "province_id": kabKotaId
    })
    .then((response) => {
      setFormList(prevList => {
        const newList = [...prevList];
        newList[index].provinsiKTP = filtering[0].name;
        return newList;
      });
      setKabupatenKotaKTP(response.data);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat mengambil data kecamatan:", error.response);
    });
  };
  
  

  const handleKabupatenKTPChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = kabupatenKotaKTP.filter((e) => e.id == kabKotaId);
  
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKecamatan`, {
      "kabkot_id": kabKotaId
    })
      .then((response) => {
        setFormList(prevList => {
          const newList = [...prevList];
          newList[index].kabupatenKTP = filtering[0].name;
          return newList;
        });
        setKecamatansKTP(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };
  
  
  


  const handleKecamatanKTPChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = kecamatansKTP.filter((e) => e.id == kabKotaId);
  
    // Ambil data Kecamatan berdasarkan Kabupaten/Kota yang dipilih
    axios.post(`http://103.196.155.202:8080/filterKelurahan`, {
      "kecamatan_id": kabKotaId
    })
      .then((response) => {
        setFormList(prevList => {
          const newList = [...prevList];
          newList[index].kecamatanKTP = filtering[0].name;
          return newList;
        });
        setKelurahanKTP(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data kecamatan:", error);
      });
  };
  
  


  const handleKelurahanKTPChange = (e, index) => {
    const kabKotaId = e.target.value;
  
    const filtering = kelurahanKTP.filter((e) => e.id == kabKotaId);
  
    setFormList(prevList => {
      const newList = [...prevList];
      newList[index].kelurahanKTP = filtering[0].name;
      return newList;
    });
  };
  
  


  
 

  const handleUpload = async (datas) => {
    console.log('dd', datas);
    
    if (!datas.foto) {
      alert("Silakan pilih foto terlebih dahulu.");
      return;
    }
  
    const data = new FormData();
    data.append("photo", datas.foto); // Pastikan key sesuai dengan yang diterima server
  
    console.log('dataPHOT', data);
    

    try {
      // Kirim permintaan upload foto
      const response = await axios.post("http://103.196.155.202:4000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Header khusus untuk FormData
        },
      });
  
      if (response.status === 200 && response.data.fileUrl) {
        console.log("Foto berhasil diunggah:", response.data.fileUrl);
        setUrlFoto(response.data.fileUrl)
        // Kirim pesan dengan foto yang diunggah
        const sendMessageResponse = await axios.post("http://103.196.155.202:8111/sendMessageImage", {
          // remoteJid: "120363387652160802@g.us",
      "remoteJid": "120363390123597612@g.us",

          text: `DATA LAPORAN ${datas.namaLengkap}`,
          imageUrl: response.data.fileUrl,
        });
  
        console.log("Response dari sendMessageImage:", sendMessageResponse.data);
        alert("Foto berhasil diunggah dan pesan terkirim!");
        setUploadStatus("Foto berhasil diunggah!");
      } else {
        throw new Error(`Upload gagal: ${response.statusText || "URL file tidak ditemukan"}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response dari server:", error.response);
        setUploadStatus(`Gagal mengunggah foto: ${error.response.data || error.response.statusText}`);
      } else if (error.request) {
        console.error("Tidak ada respon dari server:", error.request);
        setUploadStatus("Tidak ada respon dari server. Periksa koneksi Anda.");
      } else {
        console.error("Kesalahan lain:", error.message);
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
  
    const tanggal = new Date(formList[0].tanggalBertemu);
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long', // Nama hari
      day: 'numeric', // Tanggal
      month: 'long', // Nama bulan
      year: 'numeric' // Tahun
    }).format(tanggal);
    const currentHour = new Date().getHours(); // Mendapatkan jam saat ini
    console.log('currenthour', currentHour);
    
let greeting = "Permisi pak"; // Default sapaanx

// Menentukan sapaan berdasarkan jam
if (currentHour >= 3 && currentHour < 10) {
  greeting = "Selamat Pagi pak";
} else if (currentHour >= 10 && currentHour < 15) {
  greeting = "Selamat Siang pak";
}
  else if (currentHour >= 15 && currentHour < 18) {
    greeting = "Selamat Sore pak";
    
} else if (currentHour >= 18 || currentHour < 1) {
  greeting = "Selamat Malam pak";
}

const headerMessage = `*${greeting},*\nizin melaporkan pertemuan di ${
  formList[0].lokasiBertemu +
  " " +
  formList[0].kelurahanBertemu +
  " Kec." +
  formList[0].kecamatanBertemu +
  " " +
  formList[0].kabupatenBertemu +
  " Provinsi " +
  formList[0].provinsiBertemu
}\n\nHari/Tanggal: ${formattedDate}\nJam: ${formList[0].jamBertemu} WIB`;
    const formattedData = formList.map((data, index) => {
      // const tanggal = new Date(data.tanggalBertemu);
      // const formattedDate = new Intl.DateTimeFormat('id-ID', {
      //   weekday: 'long', // Nama hari
      //   day: 'numeric', // Tanggal
      //   month: 'long', // Nama bulan
      //   year: 'numeric' // Tahun
      // }).format(tanggal);
  
      const formattedTglLahir = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric', // Tanggal
        month: 'long', // Nama bulan
        year: 'numeric' // Tahun
      }).format(new Date(data.tanggalLahir));
  
      return index == 0 ? headerMessage + "\n" + `\nBertemu An :\n\n${index + 1}.Nama:*${data.namaLengkap}* ${data.agama == "Islam" ? data.jenisKelamin == "Laki-Laki" ? "Bin" : "Binti" : ""} ${data.agama == "Islam" ? data.statusBapak == "Meninggal" ? data.namaBapak + "(Alm)" : data.namaBapak : ""}\nNIK: ${data.nik}\nTTL: ${data.tempatLahir + ", " + formattedTglLahir}\nAgama: ${data.agama}\nPekerjaan: ${data.pekerjaan}\nJenis Kelamin: ${data.jenisKelamin}\nAlamat Domisili: ${data.alamatDomisili + " " + data.kelurahanDomisili + " Kec." + data.kecamatanDomisili + " " + data.kabupatenDomisili + " Provinsi " + data.provinsiDomisili}\nAlamat KTP: ${data.alamatKTP + " " + data.kelurahanKTP + " Kec." + data.kecamatanKTP + " " + data.kabupatenKTP + " Provinsi " + data.provinsiKTP}\nPendidikan Terakhir: ${data.pendidikanTerakhir + " ("+ `${data.statusPendidikan}`+ ")" }\nStatus Perkawinan: ${data.statusPerkawinan}\nIstri: ${data.punyaIstri}\nPutra: ${data.jumlahPutra}\nPutri: ${data.jumlahPutri}\nPosisi Anak dalam Keluarga: ${data.posAnak} dari ${data.jumlahSaudara} \nNama Bapak: ${data.namaBapak} ${data.statusBapak == "Meninggal" ? "(Alm)" : ""}\nNama Ibu: ${data.namaIbu} ${data.statusIbu == "Meninggal" ? "(Almh)" : ""}\n\n${index.length < 1 ? "Perkembangan selanjutnya akan di laporkan kembali." : ""}` 
      : `${index + 1}.Nama:*${data.namaLengkap}* ${data.agama == "Islam" ? data.jenisKelamin == "Laki-Laki" ? "Bin" : "Binti" : ""} ${data.agama == "Islam" ? data.statusBapak == "Meninggal" ? data.namaBapak + "(Alm)" : data.namaBapak : ""}\nNIK: ${data.nik}\nTTL: ${data.tempatLahir + ", " + formattedTglLahir}\nAgama: ${data.agama}\nPekerjaan: ${data.pekerjaan}\nJenis Kelamin: ${data.jenisKelamin}\nAlamat Domisili: ${data.alamatDomisili + " " + data.kelurahanDomisili + " Kec." + data.kecamatanDomisili + " " + data.kabupatenDomisili + " Provinsi " + data.provinsiDomisili}\nAlamat KTP: ${data.alamatKTP + " " + data.kelurahanKTP + " Kec." + data.kecamatanKTP + " " + data.kabupatenKTP + " Provinsi " + data.provinsiKTP}\nPendidikan Terakhir: ${data.pendidikanTerakhir + " ("+ `${data.statusPendidikan}`+ ")" }\nStatus Perkawinan: ${data.statusPerkawinan}\nIstri: ${data.punyaIstri}\nPutra: ${data.jumlahPutra}\nPutri: ${data.jumlahPutri}\nPosisi Anak dalam Keluarga: ${data.posAnak} dari ${data.jumlahSaudara}\nNama Bapak: ${data.namaBapak} ${data.statusBapak == "Meninggal" ? "(Alm)" : ""}\nNama Ibu: ${data.namaIbu} ${data.statusIbu == "Meninggal" ? "(Almh)" : ""}\n\nPerkembangan selanjutnya akan di laporkan kembali.`;
  });
  
   
  const jsonst =  formattedData.join("\n");

  
    await axios.post('http://103.196.155.202:8111/sendMessage', {
      "remoteJid": "120363390123597612@g.us",
          // remoteJid: "120363387652160802@g.us",


      "text": jsonst
    }).then(async (res) => {
      console.log('response', res.data);
      await axios.post('http://103.196.155.202:8111/sendMessage', {
        // "remoteJid": "120363390123597612@g.us",
            remoteJid: "120363387652160802@g.us",
  
  
        "text": jsonst
      }).then(async(res) => {
       
        const dataKirim = formList.map((item) => ({
          "formData": {
            "tanggalBertemu": formattedDate, // Tanggal pertemuan yang diformat
            "jamBertemu": item.jamBertemu, // Jam pertemuan dari item dalam formList
            "lokasiBertemu":
              item.lokasiBertemu +
              " " +
              item.kelurahanBertemu +
              " Kec." +
              item.kecamatanBertemu +
              " " +
              item.kabupatenBertemu +
              " Provinsi " +
              item.provinsiBertemu, // Lokasi lengkap dari item dalam formList
            "namaLengkap": item.namaLengkap, // Nama lengkap dari formData
            "nik": item.nik, // Data statis
            "pekerjaan": item.pekerjaan, // Data statis
            "jenisKelamin": item.jenisKelamin, // Data statis
            "agama": item.agama, // Agama dari formData
            "tanggalLahir": item.tempatLahir + ", " + "01-01-1990", // Tempat dan tanggal lahir yang diformat
            "punyaIstri": item.punyaIstri, // Data statis
            "jumlahPutra": item.jumlahPutra, // Data statis
            "jumlahPutri": item.jumlahPutri, // Data statis
            "posAnak": `${item.posAnak} dari ${item.jumlahSaudara}`, // Data stati
            "alamatDomisili":
              item.alamatDomisili +
              " " +
              item.kelurahanDomisili +
              " Kec." +
              item.kecamatanDomisili +
              " " +
              item.kabupatenDomisili +
              " Provinsi " +
              item.provinsiDomisili, // Data statis
            "alamatKTP":
              item.alamatKTP +
              " " +
              item.kelurahanKTP +
              " Kec." +
              item.kecamatanKTP +
              " " +
              item.kabupatenKTP +
              " Provinsi " +
              item.provinsiKTP, // Data statis
            "statusPerkawinan": item.statusPerkawinan, 
            "pendidikanTerakhir": item.pendidikanTerakhir, 
            "statusPendidikan": item.statusPendidikan, 
            "namaBapak": item.statusBapak === "Meninggal" ? item.namaBapak + " (Alm)" : item.namaBapak, // Perbaikan di sini
            "namaIbu": item.statusIbu === "Meninggal" ? item.namaIbu + " (Almh)" : item.namaIbu // Perbaikan di sini
          }
        }));
        
        console.log('dataKirim:', dataKirim);
        
        try {
          const response = await axios.post('http://localhost:3001/api/save-to-sheets', { formData: dataKirim });
          console.log('response data:', response.data);
        } catch (error) {
          console.error('Error while saving data to Sheets:', error);
        }
        
        
        
        console.log('response', res.data);
        alert('Berhasil');
      }).catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
      alert('Berhasil');
    }).catch((error) => {
      console.error('Terjadi kesalahan:', error);
    });
  }
  

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
          {formList.map((formData, index) => (
    <form onSubmit={handleSubmit}>
   
    {/* Tanggal dan Waktu Bertemu */}
    {index === 0 && (
                <>
                  <TextField
                    label="Tanggal Bertemu"
                    type="date"
                    name="tanggalBertemu"
                    value={formData.tanggalBertemu}
                    onChange={(e) => handleChange(index, e)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Jam Bertemu"
                    type="time"
                    name="jamBertemu"
                    value={formData.jamBertemu}
                    onChange={(e) => handleChange(index, e)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}

    {/* Lokasi Bertemu */}
  

  {index === 0 && (

    <>
    
    <Typography variant="subtitle1" sx={{ mt: 2 }}>
     Lokasi Bertemu
    </Typography>


   {/* Pilih Provinsi Bertemu */}
<FormControl fullWidth margin="normal">
  <InputLabel>Provinsi</InputLabel>
  <Select
    key={index}
    value={formData.provinsiBertemu}
    onChange={(e) => handleProvinsiChange(e, index)}
    renderValue={(selected) => (
      <span style={{ color: 'blue', fontWeight: 'bold' }}>
        {selected}
      </span>
    )}
  >
    {provinsiBertemu.map((wilayah, idx) => (
      <MenuItem key={idx} value={wilayah.id}>
        {wilayah.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

{/* Pilih Kabupaten / Kota Bertemu */}
{formData.provinsiBertemu !== "" &&
  <FormControl fullWidth margin="normal">
    <InputLabel>Kabupaten / Kota</InputLabel>
    <Select
      key={index}
      value={formData.kabupatenBertemu}
      onChange={(e) => handleKabupatenChange(e, index)}
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {selected}
        </span>
      )}
    >
      {kabupatenKota.map((wilayah, idx) => (
        <MenuItem key={idx} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih Kecamatan Bertemu */}
{formData.kabupatenBertemu !== "" &&
  <FormControl fullWidth margin="normal">
    <InputLabel>Kecamatan</InputLabel>
    <Select
      name="kecamatan"
      value={formData.kecamatanBertemu}
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {selected}
        </span>
      )}
      onChange={(e) => handleKecamatanChange(e, index)}
    >
      {kecamatans.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

{/* Pilih Kelurahan Bertemu */}
{formData.kecamatanBertemu !== "" &&
  <FormControl fullWidth margin="normal">
    <InputLabel>Kelurahan</InputLabel>
    <Select
      name="kelurahan"
      value={formData.kelurahanBertemu}
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {selected}
        </span>
      )}
      onChange={(e) => handleKelurahanChange(e, index)}
    >
      {kelurahan.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  
}
<TextField
                  label="Alamat Lengkap (Lokasi Bertemu)"
                  type="text"
                  name="lokasiBertemu"
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />
    </>
  )}
 



            {/* Pilih Kelurahan  Bertemu*/}
     



                {/* Nama dan Identitas */}
                <TextField
                  label="Nama Lengkap"
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="NIK"
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Pekerjaan"
                  type="text"
                  name="pekerjaan"
                  value={formData.pekerjaan}
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />



                {/* Jenis Kelamin */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Jenis Kelamin</InputLabel>
                  <Select
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={(e) => handleChange(index, e)}
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
                    onChange={(e) => handleChange(index, e)}
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
            onChange={(e) => handleChange(index, e)}
            fullWidth
            margin="normal"
            />

            <TextField
            label="Tanggal Lahir"
            type="date"
            name="tanggalLahir"
            value={formData.tglLahir}
            onChange={(e) => handleChange(index, e)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            />


            <TextField
            label="Nama Istri"
            type="text"
            name="punyaIstri"
            value={formData.punyaIstri}
            onChange={(e) => handleChange(index, e)}
            fullWidth
            margin="normal"
            />


            <TextField
            label="Jumlah Putra"
            type="number"
            name="jumlahPutra"
            value={formData.jumlahPutra}
            onChange={(e) => handleChange(index, e)}
            fullWidth
            margin="normal"
            />

            {/* Jumlah Putri */}
            <TextField
            label="Jumlah Putri"
            type="number"
            name="jumlahPutri"
            value={formData.jumlahPutri}
            onChange={(e) => handleChange(index, e)}
            fullWidth
            margin="normal"
            />
          <FormControl fullWidth margin="normal">
  <InputLabel>Posisi Anak dalam Keluarga</InputLabel>
  <Select
    name="posAnak"
    value={formData.posAnak}
    onChange={(e) => handleChange(index, e)}
  >
    <MenuItem value="Anak Pertama">Anak Pertama</MenuItem>
    <MenuItem value="Anak Kedua">Anak Kedua</MenuItem>
    <MenuItem value="Anak Ketiga">Anak Ketiga</MenuItem>
    <MenuItem value="Anak Terakhir">Anak Terakhir</MenuItem>
  </Select>
</FormControl>

<FormControl fullWidth margin="normal">
  <InputLabel>Jumlah Saudara</InputLabel>
  <Select
    name="jumlahSaudara"
    value={formData.jumlahSaudara}
    onChange={(e) => handleChange(index, e)}
  >
    <MenuItem value="1 Saudara">1 Saudara</MenuItem>
    <MenuItem value="2 Saudara">2 Saudara</MenuItem>
    <MenuItem value="3 Saudara">3 Saudara</MenuItem>
    <MenuItem value="4 Saudara">4 Saudara</MenuItem>
    <MenuItem value="5 Saudara">5 Saudara</MenuItem>
    <MenuItem value="Lebih dari 5 Saudara">Lebih dari 5 Saudara</MenuItem>
  </Select>
</FormControl>






                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Alamat Domisili
                </Typography>

                <FormControl fullWidth margin="normal">
  {/* Pilih Provinsi Domisili */}
  <InputLabel>Provinsi</InputLabel>
  <Select
    name="provinsi"
    value={formData.provinsiDomisili}
    renderValue={(selected) => (
      <span style={{ color: 'blue', fontWeight: 'bold' }}>
        {selected}
      </span>
    )}
    onChange={(e) => handleProvinsiDomisiliChange(e, index)}
  >
    {provinsiDomisili.map((wilayah, idx) => (
      <MenuItem key={idx} value={wilayah.id}>
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
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {selected}
        </span>
      )}
      onChange={(e) => handleKabupatenDomisiliChange(e, index)}
    >
      {kabupatenKotaDomisili.map((wilayah, idx) => (
        <MenuItem key={idx} value={wilayah.id}>
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
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {selected}
        </span>
      )}
      onChange={(e) => handleKecamatanDomisiliChange(e, index)}
    >
      {kecamatansDomisili.map((wilayah, idx) => (
        <MenuItem key={idx} value={wilayah.id}>
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
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {selected}
        </span>
      )}
      onChange={(e) => handleKelurahanDomisiliChange(e, index)}
    >
      {kelurahanDomisili.map((wilayah, idx) => (
        <MenuItem key={idx} value={wilayah.id}>
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
                  onChange={(e) => handleChange(index, e)}
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
    renderValue={(selected) => (
      <span style={{ color: 'blue', fontWeight: 'bold' }}>
        {selected}
      </span>
    )}
    onChange={(e) => handleProvinsiKTPChange(e, index)}
  >
    {provinsiKTP.map((wilayah, idx) => (
      <MenuItem key={idx} value={wilayah.id}>
        {wilayah.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>



            {/* Pilih Provinsi Domisili */}


            {/* Pilih KabKOt Domisili */}


            {formData.provinsiKTP !== "" && (
  <FormControl fullWidth margin="normal">
    <InputLabel>Kabupaten / Kota</InputLabel>
    <Select
      name="kabupatenKota"
      value={formData.kabupatenKTP}
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>{selected}</span>
      )}
      onChange={(e) => handleKabupatenKTPChange(e, index)}
    >
      {kabupatenKotaKTP.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}


            {/* Pilih KabKOt Domisili*/}


            {/* Pilih Kec Domisili*/}

            {formData.kabupatenKTP !== "" && (
  <FormControl fullWidth margin="normal">
    <InputLabel>Kecamatan</InputLabel>
    <Select
      name="kecamatan"
      value={formData.kecamatanKTP}
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>{selected}</span>
      )}
      onChange={(e) => handleKecamatanKTPChange(e, index)}
    >
      {kecamatansKTP.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}


            {/* Pilih Kec Domisili*/}


            {/* Pilih Kelurahan Domisili */}
            {formData.kecamatanKTP !== "" && (
  <FormControl fullWidth margin="normal">
    <InputLabel>Kelurahan</InputLabel>
    <Select
      name="kelurahan"
      value={formData.kelurahanKTP}
      renderValue={(selected) => (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>{selected}</span>
      )}
      onChange={(e) => handleKelurahanKTPChange(e, index)}
    >
      {kelurahanKTP.map((wilayah, index) => (
        <MenuItem key={index} value={wilayah.id}>
          {wilayah.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}



                <TextField
                  label="Alamat KTP"
                  type="text"
                  name="alamatKTP"
                  value={formData.alamatKTP}
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />

                {/* Pendidikan */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Pendidikan Terakhir</InputLabel>
                  <Select
                    name="pendidikanTerakhir"
                    value={formData.pendidikanTerakhir}
                    onChange={(e) => handleChange(index, e)}
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
                    onChange={(e) => handleChange(index, e)}
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
                    onChange={(e) => handleChange(index, e)}
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
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Status Bapak</InputLabel>
                  <Select
                    name="statusBapak"
                    value={formData.statusBapak}
                    onChange={(e) => handleChange(index, e)}
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
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Status Ibu</InputLabel>
                  <Select
                    name="statusIbu"
                    value={formData.statusIbu}
                    onChange={(e) => handleChange(index, e)}
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
            onChange={(e) => handleChange(index, e)}
            fullWidth
            margin="normal"
            InputProps={{
              inputProps: {
                accept: "image/*",
                capture: "environment", // Membuka kamera belakang secara default
              },
            }}
            />
            {formData.foto && (
            <Typography sx={{ mt: 1 }}>Foto Terpilih: {formData.foto.name}</Typography>
            )}
            <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpload(formData)}
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
                <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddForm}
                sx={{ mt: 3 }}
              >
                Tambah Data
              </Button>
              </form>
                      ))}
                  
                    </Container>
                  </Box>
                </>
              );
            };

            export default App;