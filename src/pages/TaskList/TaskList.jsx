import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "SL", width: 50 },
  {
    field: "title",
    headerName: "Task name",
    width: 200,
  },
  {
    field: "description",
    headerName: "Task Description",
    width: 300,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const status = params.value;

      // Define the conditional styles
      const conditionalStyles =
        status === "In Progress"
          ? {
              backgroundColor: "lime",
              color: "black",
              padding: "5px",
              borderRadius: "5px",
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
            }
          : status === "Incomplete"
          ? {
              backgroundColor: "red",
              width: "100%",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              margin: "0 auto",
              textAlign: "center",
            }
          : {}; // You can add more conditions or default styles here

      return <div style={conditionalStyles}>{status}</div>;
    },
  },
  { field: "dueDate", headerName: "Due Date", width: 150 },
  { field: "assignedUser", headerName: "Assigned User", width: 200 },
  { field: "tags", headerName: "Tags", width: 200 },
  { field: "priority", headerName: "Priority", width: 150 },
];
const TaskList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://task-management-server-ebpb.vercel.app/tasks";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(API_URL);

        const dataWithId = data.map((item, index) => {
          return {
            ...item,
            id: index + 1,
          };
        });

        setData(dataWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            disableSelectionOnClick
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
          />
        </Box>
      )}
      
    </div>
  );
};

export default TaskList;
