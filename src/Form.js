import { Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import DataTable from "./DataTable";
import { v4 as uuidv4 } from "uuid";

const defaultValues = {
  sarin: "",
  sarinW: "",
  inclu: "",
  incluW: "",
  markin: "",
  aq: "",
  fourp: "",
  fourpNote: "",
  galaxy4p: "",
  galaxy4pNote: "",
  recute: "",
  recuteNote: "",
  ls: "",
};

function Form() {
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
    mode: "all",
  });

  const [formObj, setFormObj] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MM-YYYY")
  );
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);

  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state;
  const sarinRef = useRef(null);

  const onAddSubmit = (formData) => {
    const mainData = {
      id: uuidv4(),
      createdBy: data._id,
      month: selectedMonth,
      date: selectedDate,
      sarin: formData.sarin || 0,
      sarinW: formData.sarinW,
      inclu: formData.inclu || 0,
      incluW: formData.incluW,
      markin: formData.markin || 0,
      aq: formData.aq || 0,
      fourp: formData.fourp || 0,
      fourpNote: formData.fourpNote,
      galaxy4p: formData.galaxy4p || 0,
      galaxy4pNote: formData.galaxy4pNote,
      recute: formData.recute || 0,
      recuteNote: formData.recuteNote,
      ls: formData.ls || 0,
    };

    setFormObj((prevFormObj) => [...prevFormObj, mainData]);
    if (sarinRef.current) {
      sarinRef.current.focus();
    }
    reset(defaultValues);
  };

  const handleArrowKeyNavigation = (event) => {
    if (event.key === "Enter") {
      handleSubmit(onAddSubmit)();
    }
  };

  const handleBack = () => {
    navigate("/details", { state: data });
  };

  const handleChangeDate = (newDate) => {
    if (newDate && newDate.isValid()) {
      const formattedDate = newDate.format("DD-MM-YYYY");
      setSelectedDate(formattedDate);
      setSelectedMonth(newDate.month() + 1);
    }
  };

  const handleRemove = (id) => {
    setFormObj((prevFormObj) => prevFormObj.filter((item) => item.id !== id));
  };

  return (
    <div className="h-full">
      <div className="bg-[#322f2f] h-20 flex justify-between fixed top-0 left-0 w-full z-10">
        <div>
          <img
            className="h-20 cursor-pointer"
            src="Sraddha.png"
            alt="Sraddha"
          />
        </div>
        <p className="text-2xl font-bold text-slate-200 my-4 uppercase">
          {data.name}
        </p>

        <div className="flex">
          <div className="mt-5 mr-4">
            <Button
              className="h-10"
              variant="contained"
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="h-full pt-24 p-4 overflow-x-auto">
        <form
          onSubmit={handleSubmit(onAddSubmit)}
          className="flex flex-wrap space-x-2"
          onKeyDown={handleArrowKeyNavigation}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              inputFormat="dd-MM-yyyy"
              className="w-32"
              mask="____-__-__"
              value={dayjs(
                moment(selectedDate, "DD-MM-YYYY").format("YYYY-MM-DD")
              )}
              onChange={handleChangeDate}
              renderInput={(params) => (
                <TextField className="datepickerCommon" {...params} />
              )}
              inputProps={{ readOnly: true }}
              maxDate={dayjs(moment().toDate())}
              minDate={dayjs(
                moment().subtract(2, "month").endOf("month").toDate()
              )}
            />
          </LocalizationProvider>
          <Controller
            name="sarin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                inputRef={sarinRef}
                label="Sarin"
                fullWidth
                type="number"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                autoComplete="off"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="sarinW"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sarin Weight"
                type="number"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                fullWidth
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="inclu"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inclu"
                fullWidth
                type="number"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                autoComplete="off"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="incluW"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inclu Weight"
                type="number"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                fullWidth
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="fourp"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="4P"
                fullWidth
                type="number"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                autoComplete="off"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="fourpNote"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="4P Note"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                fullWidth
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="markin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Markin"
                fullWidth
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                type="number"
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="aq"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="AQ"
                fullWidth
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                type="number"
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="ls"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="LS"
                fullWidth
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                type="number"
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="recute"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Recute"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                fullWidth
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                type="number"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="recuteNote"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Recute Note"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                fullWidth
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="galaxy4p"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Galaxy 4P"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                fullWidth
                type="number"
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="galaxy4pNote"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Galaxy 4P Note"
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
                autoComplete="off"
                fullWidth
                sx={{
                  "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type='number']": {
                    MozAppearance: "textfield",
                  },
                  width: "6.5%",
                }}
                variant="outlined"
              />
            )}
          />
        </form>
        <div className="mt-10">
          {formObj.length > 0 && (
            <DataTable
              formObj={formObj}
              data={data}
              handleRemove={handleRemove}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
