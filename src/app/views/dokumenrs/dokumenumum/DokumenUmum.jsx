import { Button, Card, CardContent, InputAdornment, TextField } from "@mui/material";
import PaginationTable from "app/components/PaginationTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useState, useEffect } from "react";
import {
  deleteDokumenUmumService,
  getDokumenUmumService,
  getJenisDokumenUmumService,
  getPokja,
  postDokumenUmumService
} from "app/service/dokumenUmum/dokumenUmum.service";
import ModalUploadDokumen from "app/components/ModalLayout/ModalUploadDokumen";
import ModalConfirm from "app/components/ModalLayout/ModalConfirm";
import LayoutDokumen from "../LayoutDokumen";
import useAuth from "app/hooks/useAuth";

const DokumenUmum = () => {
  // import id staff at .env
  const idStaff = import.meta.env.VITE_ID_JABATAN_STAFF;
  // import url from .env and add endpoint for download dokumen
  const urlDownload = `${import.meta.env.VITE_API_URL}getDokumenUmum/download/`;
  //state user and token
  const { user } = useAuth();

  // get token from local storage
  const token = localStorage.getItem("accessToken");
  //state date
  const date = new Date();

  //state data dokumen
  const [stateData, setStateData] = useState({
    id: "",
    isLoading: false,
    noDokumen: "",
    name: "",
    file: "",
    selectedOption: "",
    selectedPokja: "",
    selectedDate: date,
    dokumenUmum: "",
    search: "",
    jenisDokumenUmum: "",
    pokja: ""
  });

  //format date
  const todayFormatted =
    stateData.selectedDate.getFullYear() +
    "-" +
    String(stateData.selectedDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(stateData.selectedDate.getDate()).padStart(2, "0");

  //state open snackbar
  const [openSnackBar, setOpenSnackBar] = useState({
    successDokumen: false,
    successConfirm: false,
    failedDokumen: false,
    failedConfirm: false,
    vertical: "bottom",
    horizontal: "right"
  });

  //state open modal
  const [stateOpen, setStateOpen] = useState({
    openModalUploadDokumen: false,
    openModalConfirm: false
  });

  //function to handle open modal
  const handleOpenModalDokumen = () => setStateOpen({ ...stateOpen, openModalUploadDokumen: true });

  //function to handle close modal dokumen
  const handleCloseModalDokumen = () =>
    setStateOpen({ ...stateOpen, openModalUploadDokumen: false });

  //function to handle open modal confirm
  const handleOpenModalConfirm = (id) => {
    setStateOpen({ ...stateOpen, openModalConfirm: true });
    setStateData({ ...stateData, id: id });
  };

  //function to handle close modal confirm
  const handleCloseModalConfirm = () => setStateOpen({ ...stateOpen, openModalConfirm: false });

  //function to handle close snackbar document
  const handleCloseSnackBarSuccesDocument = () =>
    setOpenSnackBar({ ...openSnackBar, successDokumen: false });
  const handleCloseSnackBarfailedDocument = () =>
    setOpenSnackBar({ ...openSnackBar, failedDokumen: false });

  //function to handle close snackbar confirm
  const handleCloseSnackBarSuccesConfirm = () =>
    setOpenSnackBar({ ...openSnackBar, successConfirm: false });
  const handleCloseSnackBarfailedConfirm = () =>
    setOpenSnackBar({ ...openSnackBar, failedConfirm: false });

  //function to handle change date
  const handleDateChange = (date) => setStateData({ ...stateData, selectedDate: date });

  //function to handle change option select
  const handleChangeOption = (e) => setStateData({ ...stateData, selectedOption: e.target.value });

  //function to handle change option select
  const handleChangeOptionPokja = (e) =>
    setStateData({ ...stateData, selectedPokja: e.target.value });

  //function to handle no dokumen
  const handleNoDokumen = (e) => setStateData({ ...stateData, noDokumen: e.target.value });

  //function to handle nama dokumen
  const handleNamaDokumen = (e) => setStateData({ ...stateData, name: e.target.value });

  //function to handle file dokumen
  const handleFileDokumen = (e) => {
    if (e.currentTarget.files) {
      setStateData({ ...stateData, file: e.currentTarget.files[0] });
    }
  };

  //function to handle search
  const handleSearch = (e) => setStateData({ ...stateData, search: e.target.value });

  //function to get search document umum
  const searchDokumenUmum = async () => {
    try {
      setStateData((prev) => ({ ...prev, isLoading: true }));
      const { data } = await getDokumenUmum(token, stateData.search);

      setStateData((prev) => ({ ...prev, dokumenUmum: data, isLoading: false }));
    } catch (error) {
      error;
      setStateData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  //function to handle keypress Enter in keyboard on input search
  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchDokumenUmum();
    }
  };

  //function to get document umum
  const getDokumenUmum = async () => {
    try {
      setStateData({ ...stateData, isLoading: true });
      const { data } = await getDokumenUmumService(token, stateData.search);
      setStateData((prev) => ({ ...prev, dokumenUmum: data, isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  //function handle get jenis dokumen
  const getJenisDokumenData = async () => {
    try {
      const { data } = await getJenisDokumenUmumService(token);
      setStateData((prev) => ({ ...prev, jenisDokumenUmum: data }));
    } catch (error) {
      console.log(error);
    }
  };

  //function to get data pokja
  const getPokjaData = async () => {
    try {
      const { data } = await getPokja(token);
      setStateData((prev) => ({ ...prev, pokja: data }));
    } catch (error) {
      console.log(error);
    }
  };

  //store and manage data entered by users through forms
  const dataForm = new FormData();
  dataForm.append("jenis_dokumen", stateData.selectedOption);
  dataForm.append("no_dokumen", stateData.noDokumen);
  dataForm.append("tanggal_terbit", todayFormatted);
  dataForm.append("nama_dokumen", stateData.name);
  dataForm.append("pokja_id", stateData.selectedPokja);
  dataForm.append("file_dokumen", stateData.file);

  //function to handle post data dokumen khusus
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStateData({ ...stateData, isLoading: true });
      await postDokumenUmumService(token, dataForm);
      setOpenSnackBar({ ...openSnackBar, successDokumen: true });
      await getDokumenUmum();
      setStateData((prev) => ({ ...prev, isLoading: false }));
      handleCloseModalDokumen();
    } catch (error) {
      console.log(error);
      alert(error);
      setStateOpen({ ...stateOpen, openModalUploadDokumen: false });
      setOpenSnackBar({ ...openSnackBar, failed: true });
    }
  };

  //function to handle delete document
  const handleDelete = async () => {
    try {
      setStateData({ ...stateData, isLoading: true });
      await deleteDokumenUmumService(token, stateData.id);
      setOpenSnackBar({ ...openSnackBar, successConfirm: true });
      await getDokumenUmum();
      setStateData((prev) => ({ ...prev, isLoading: false }));
      handleCloseModalConfirm();
    } catch (error) {
      console.log(error);
    }
  };
  // to run the function after render the component
  useEffect(() => {
    getDokumenUmum();
    getJenisDokumenData();
    getPokjaData();
  }, []);
  return (
    <>
      <LayoutDokumen token={token}>
        {/** Begin card content search */}
        <Card sx={{ width: "100%" }}>
          <CardContent style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}>
            {/** Begin input search */}
            <TextField
              fullWidth
              onKeyDown={handleEnterSearch}
              type="text"
              name="search"
              placeholder="Cari Dokumen"
              onChange={handleSearch}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  )
                }
              }}
              size="small"
            />
            {/** End input search */}
            {/** Begin button click for search */}
            <Button variant="outlined" color="ochre" onClick={searchDokumenUmum}>
              <SearchOutlinedIcon color="ochre" />
            </Button>
            {/** End button click for search */}
            {/** Begin open modal upload dokumen */}
            {user.jabatan !== idStaff && user.jabatan !== "" && (
              <Button variant="outlined" onClick={handleOpenModalDokumen}>
                <ArticleOutlinedIcon />
              </Button>
            )}
            {/** End open modal upload dokumen */}
          </CardContent>
        </Card>
        {/** End card content search */}
        {/** Begin Table */}
        <Card>
          <PaginationTable
            key={JSON.stringify(stateData.dokumenUmum)}
            stateData={stateData}
            data={stateData.dokumenUmum}
            idStaff={idStaff}
            handleDelete={handleOpenModalConfirm}
            urlDownload={urlDownload}
          />
        </Card>
        {/** End Table */}
      </LayoutDokumen>
      {/** Begin Modal Upload Dokumen */}
      <ModalUploadDokumen
        open={stateOpen.openModalUploadDokumen}
        data={stateData}
        title={"Dokumen Umum"}
        handleClose={handleCloseModalDokumen}
        handleChangeOption={handleChangeOption}
        handleChangeOptionPokja={handleChangeOptionPokja}
        handleDateChange={handleDateChange}
        handleNoDokumen={handleNoDokumen}
        handleNamaDokumen={handleNamaDokumen}
        handleFileDokumen={handleFileDokumen}
        openSnackBar={openSnackBar}
        handleSubmit={handleSubmit}
        titleSnackBarSuccess={"Dokumen Berhasil Tersimpan !"}
        titleSnackBarFailed={"Dokumen Gagal Tersimpan !"}
        handleCloseSnackBarSuccesDocument={handleCloseSnackBarSuccesDocument}
        handleCloseSnackBarfailedDocument={handleCloseSnackBarfailedDocument}
      />

      {/** End Modal Upload Dokumen */}
      {/** Begin Modal Confirm */}
      <ModalConfirm
        open={stateOpen.openModalConfirm}
        handleClose={handleCloseModalConfirm}
        openSnackBar={openSnackBar}
        title={"Hapus Dokumen"}
        titleButton={"Hapus"}
        titleSnackBarSuccess={"Dokumen Berhasil Terhapus !"}
        titleSnackBarFailed={"Dokumen Gagal Terhapus !"}
        handleCloseSnackBarSuccesConfirm={handleCloseSnackBarSuccesConfirm}
        handleCloseSnackBarfailedConfirm={handleCloseSnackBarfailedConfirm}
        handleSubmit={handleDelete}
        textContent={"apakah anda yakin ingin menghapus dokumen ini ?"}
      />
      {/** End Modal Confirm */}
    </>
  );
};

export default DokumenUmum;
