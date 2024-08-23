import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Swal from "sweetalert2";
import { addNewEntry } from "./config/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const DataTable = ({ formObj, data, handleRemove}) => {
  const navigate = useNavigate();

  const handleAddEntries = () => {
    const entries = formObj.map((formData) => ({
      createdBy: formData.createdBy,
      month: formData.month,
      date: formData.date,
      sarin: formData.sarin,
      sarinW: formData.sarinW,
      inclu: formData.inclu,
      incluW: formData.incluW,
      fourp: formData.fourp,
      fourpNote: formData.fourpNote,
      galaxy4p: formData.galaxy4p,
      galaxy4pNote: formData.galaxy4pNote,
      recute: formData.recute,
      recuteNote: formData.recuteNote,
      markin: formData.markin,
      aq: formData.aq,
      ls: formData.ls,
    }));
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    axios({
      method: "POST",
      url: addNewEntry,
      data: entries,
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.close();
          Swal.fire({
            icon: "success",
            text: response.data.message,
            timer: 2000, // 2 seconds timer
            showConfirmButton: false, // Hide the confirmation button
            allowOutsideClick: false,
            willClose: () => {
              navigate("/details", { state: data });
            },
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            text: response.data.message,
          });
        }
      })
      .catch((_errors) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          text: "Something goes wrong please try again..",
        });
      });
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 475 }}>
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHead
            className="bg-teal-800"
            style={{ position: "sticky", top: "0", zIndex: "1" }}
          >
            <TableRow>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Date
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Sarin
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                SarinW
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Inclu
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                IncluW
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Markin
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                AQ
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                FourP
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                FourP Note
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Galaxy4P
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Galaxy4P Note
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Recute
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Recute Note
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                LS
              </TableCell>
              <TableCell
                className="text-xs uppercase tracking-wider"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                REMOVE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white divide-y divide-gray-200">
            {formObj.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100"
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.date ? row.date : "-"}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.sarin}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.sarinW ? row.sarinW : "-"}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.inclu}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.incluW ? row.incluW : "-"}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.markin}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.aq}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.fourp}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.fourpNote ? row.fourpNote : "-"}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.galaxy4p}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.galaxy4pNote ? row.galaxy4pNote : "-"}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.recute}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.recuteNote ? row.recuteNote : "-"}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  {row.ls}
                </TableCell>
                <TableCell
                  className="text-xs uppercase tracking-wider"
                  sx={{ textAlign: "center" }}
                >
                  <Tooltip title="Remove" placement="bottom">
                    <RemoveCircleIcon
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: { delay: 0.2 },
                      }}
                      className="text-22 md:text-50"
                      onClick={(event) => handleRemove(row.id)}
                      sx={{ cursor: "pointer", color: "#d83333" }}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end mt-2">
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleAddEntries}
          color="success"
        >
          SAVE
        </Button>
      </div>
    </>
  );
};

export default DataTable;
