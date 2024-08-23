import React, { useRef, useEffect } from "react";
import axios from "axios";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { addNewEntry, singleEnties } from "./config/config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

const ExcelEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state;

  const hotTableComponent = useRef(null);
  const handleBack = () => {
    navigate("/details", { state: data });
  };

  const reverseTransformData = (transformedData) => {
    return transformedData.map((obj) => [
      obj.date,
      obj.sarin || 0,
      obj.sarinW || 0,
      obj.inclu || 0,
      obj.incluW || 0,
      obj.markin || 0,
      obj.aq || 0,
      obj.fourp || 0,
      obj.fourpNote,
      obj.galaxy4p || 0,
      obj.galaxy4pNote,
      obj.recute || 0,
      obj.recuteNote,
      obj.ls || 0,
    ]);
  };

  useEffect(() => {
    const hot = hotTableComponent.current?.hotInstance;

    axios({
      method: "GET",
      url: singleEnties + data._id + "/" + (moment().month() + 1),
    })
      .then((response) => {
        if (response.status === 200) {
          const reversedData = reverseTransformData(response.data);
          hot?.loadData(reversedData);
        } else {
          hot?.loadData([]);
        }
      })
      .catch((_errors) => {});
  }, [data]);

  const transformData = (dataArray, data) => {
    return dataArray.map((row) => ({
      id: uuidv4(),
      createdBy: data._id,
      month: moment().month() + 1,
      date: row[0] ? row[0] : moment().format("DD-MM-YYYY"),
      sarin: parseInt(row[1]) || 0,
      sarinW: parseInt(row[2]) || 0,
      inclu: parseInt(row[3]) || 0,
      incluW: parseInt(row[4]) || 0,
      markin: parseInt(row[5]) || 0,
      aq: parseInt(row[6]) || 0,
      fourp: parseInt(row[7]) || 0,
      fourpNote: row[8] || "",
      galaxy4p: parseInt(row[9]) || 0,
      galaxy4pNote: row[10] || "",
      recute: parseInt(row[11]) || 0,
      recuteNote: row[12] || "",
      ls: parseInt(row[13]) || 0,
    }));
  };

  const columnName = (colIndex) => {
    switch (colIndex) {
      case 0:
        return "Date";
      case 1:
        return "Sarin";
      case 2:
        return "Sarin weight";
      case 3:
        return "Inclusion";
      case 4:
        return "Inclusion weight";
      case 5:
        return "Markin";
      case 6:
        return "AQ";
      case 7:
        return "4P";
      case 8:
        return "4P Notes";
      case 9:
        return "Galaxy 4p";
      case 10:
        return "Galaxy 4p Notes";
      case 11:
        return "Recute";
      case 12:
        return "Recute Notes";
      case 13:
        return "LS";
      default:
        return "Unknown Column";
    }
  };

  const validateColumns = (data, columns) => {
    const invalidEntries = [];

    data.forEach((row, rowIndex) => {
      columns.forEach((colIndex) => {
        const value = row[colIndex];
        if (isNaN(value) || value === "") {
          invalidEntries.push({ row: rowIndex + 1, col: colIndex + 1 }); // +1 to convert 0-based index to 1-based
        }
      });
    });

    return invalidEntries;
  };

  const handleSave = async () => {
    const modifiedData = hotTableComponent.current.hotInstance.getData();

    const filteredData = modifiedData.filter((row) =>
      row.some((cell) => cell !== null)
    );

    if (filteredData.length === 0) {
      Swal.fire({
        icon: "info",
        text: "No Entry where Found!",
      });
      return;
    }
    const columnsToValidate = [1, 2, 3, 4, 5, 6, 7, 9, 11, 13];

    const invalidEntries = validateColumns(filteredData, columnsToValidate);

    if (invalidEntries.length > 0) {
      let errorMessage = `<p style="font-size: 16px; font-weight: bold;">Please correct the following invalid entries:</p><ul style="list-style-type: none; padding: 0;">`;

      invalidEntries.forEach(({ row, col }) => {
        errorMessage += `<li style="margin-bottom: 5px;">(Row ${row} - Column <strong>${columnName(
          col
        )}</strong>)</li>`;
      });

      errorMessage += `</ul>`;

      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        html: errorMessage, // Use html instead of text for custom styling
        customClass: {
          popup: "swal-popup", // You can define a class for more control
        },
      });

      return;
    }

    const transformedData = transformData(filteredData, data);

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    axios({
      method: "POST",
      url: addNewEntry,
      data: transformedData,
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
              style={{ marginRight: "10px" }}
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              color="success"
            >
              SAVE
            </Button>
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
      <div style={{ margin: "80px 25px 0 25px" }}>
        <HotTable
          ref={hotTableComponent}
          rowHeaders={true}
          rowHeights={23}
          height="650px"
          colWidths={100}
          colHeaders={[
            "Date",
            "Sarin",
            "Sarin weight",
            "Inclusion",
            "Inclusion weight",
            "Markin",
            "AQ",
            "4P",
            "4P Notes",
            "Galaxy 4p",
            "Galaxy 4p Notes",
            "Recute",
            "Recute Notes",
            "LS",
          ]}
          columns={[
            { readOnly: true, width: 80 },
            {
              width: 90,
            },
            {
              width: 110,
            },
            {
              width: 90,
            },
            {
              width: 130,
            },
            {
              width: 80,
            },
            {
              width: 80,
            },
            {
              width: 80,
            },
            {
              width: 100,
            },
            {
              width: 100,
            },
            {
              width: 130,
            },
            {
              width: 100,
            },
            {
              width: 130,
            },
            {
              width: 100,
            },
          ]}
          autoWrapRow={true}
          autoWrapCol={true}
          minCols={14}
          minRows={50}
          headerClassName="htbold"
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </div>
  );
};

export default ExcelEditor;
