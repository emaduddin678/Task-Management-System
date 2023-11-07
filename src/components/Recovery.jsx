import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Swal from "sweetalert2";

function daysAndHoursFromNow(timestamp) {
  const targetDate = new Date(timestamp);
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  // Calculate the number of days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate the remaining hours
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return { days: daysDifference, hours: hoursDifference };
}

const DataGridView = () => {
  const [tokenExp, setTokenExp] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "SL",
      width: 70,
      renderCell: (params) => <p className="p-2">{params.row.id}</p>,
    },
    { field: "title", headerName: "Task Name", flex: 1 },
    { field: "description", headerName: "Task Description", flex: 2 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "assignedUser", headerName: "Assigned User", flex: 1 },
    { field: "priority", headerName: "Priority", width: 120 },
    {
      field: "dueDate",
      headerName: "Due Date",
      renderCell: (params) => (
        <p>
          {console.log(params)}
          {`${daysAndHoursFromNow(params.row.dueDate).days} days ${
            daysAndHoursFromNow(params.row.dueDate).hours
          } hours `}
        </p>
      ),
      flex: 1,
    },
    {
      field: "_id",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div className="px-6 py-4 flex items-center flex-col gap-5 justify-center">
          <Link
            to={`/addtask`}
            state={params.row}
            className="bg-green-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Update
          </Link>
          <button
            onClick={() => {
              handleDelete(params.row._id);
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(data[0]);
  console.log(tokenExp);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const API_URL = `https://task-management-server-lovat-nine.vercel.app/tasks`;

      const { data } = await axios.get(API_URL, { withCredentials: true });

      const dataWithId = data.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          // dueDate: isNaN(daysAndHoursFromNow(item.dueDate).days)
          //   ? "Please Update Due Date"
          //   : `${daysAndHoursFromNow(item.dueDate).days} days ${
          //       daysAndHoursFromNow(item.dueDate).hours
          //     } hours `,
        };
      });

      setData(dataWithId);
    } catch (error) {
      if (error) {
        setTokenExp([
          error.message,
          error.response.data.message,
          error.response.data.status,
          error.response.data.success,
        ]);
      }
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(JSON.stringify(data));

  const handleDelete = async (id) => {
    console.log(id);
    const url = `https://task-management-server-lovat-nine.vercel.app/tasks/${id}`;
    const res = await axios.delete(url);
    let timerInterval;
    Swal.fire({
      title: "Task is deleting!",
      html: "I will close in <b></b> milliseconds.",
      timer: 1400,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      fetchData();
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };
  return (
    <div className="p-4">
      <Navbar />
      <Box className="mt-20" sx={{ height: "100vh", width: "100%" }}>
        {tokenExp.length === 0   ? (
          <DataGrid
            rows={data}
            columns={columns}
            rowHeight={150}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            pageSizeOptions={[5, 10, 25]}
            // checkboxSelection
            disableRowSelectionOnClick
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
          />
        ) : (
          <div className="p-10">
            <h1 className="text-center font-bold text-2xl text-red-900">{tokenExp[2]}</h1>
            <h1 className="text-center font-bold text-2xl text-red-900">{tokenExp[1]}</h1>
            <h1 className="text-center font-bold text-2xl text-red-900">{tokenExp[0]}</h1>
          </div>
        )}
      </Box>
    </div>
  );
};

export default DataGridView;
