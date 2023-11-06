import { Controller, useForm } from "react-hook-form";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import axios from "axios";
// import { DesktopDatePicker } from "@mui/x-date-pickers";
// import { TextField } from "@mui/material";
import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLocation } from "react-router-dom";

export default function AddTask() {
  const notify = (a) => toast.success(`Task ${a} Successfully!`);

  const [stateData, setStateData] = useState({});
  const state = useLocation();
  // const itemId = stateData._id;
  useEffect(() => {
    if (state.state) {
      // console.log(state);
      setStateData(state.state);
    }
  }, [state]);

  const duedata = stateData.dueDate;
  // console.log(duedata);
  // console.log(futureTimestampFromDaysAndHours(duedata));
  // console.log(stateData);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting, touchedFields },
  } = useForm({
    defaultValues: stateData,
  });

  const onSubmit = (data) => {
    console.log(data);

    if (stateData.hasOwnProperty("_id")) {
      updateNotification(data);
    } else {
      notification(data);
    }
    console.log(data);
  };

  // console.log(data);=
  //   {
  //   "title": "Sample Task 1",
  //   "description": "This is a sample task for testing.",
  //   "status": "Incomplete",
  //   "dueDate": "2023-11-15T17:00:00",
  //   "assignedUser": "John Doe",
  //   "tags": ["Sample", "Test"],
  //   "priority": "High"
  // }

  // useEffect(() => {
  //   const mergedObject = {
  //     ...data,
  //     dueDate: dueDate.$d,
  //   };
  //   setTaskData(mergedObject);
  //   // console.log(taskData)
  //   if (data.title) {
  //     // console.log(taskData)
  //     // console.log(dueDate.$d);
  //     notification();
  //   }
  // }, [data]);

  const notification = (data) => {
    Swal.fire({
      title: "Do you want to Add the Task??",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes!!!",
      denyButtonText: `No....`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        sendData(data);

        Swal.fire("Task Added Successfully!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("This Task Can't be Added..", "", "info");
      }
    });
  };

  const sendData = (taskData) => {
    console.log(taskData);
    // Define the API URL
    const API_URL = "http://localhost:8800/task";
    // Send a POST request with the data
    axios
      .post(API_URL, taskData, { withCredentials: true })
      .then((response) => {
        console.log("Post request successful:", response.data);
        notify("Added");
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  const updateNotification = (data) => {
    Swal.fire({
      title: "Do you want to Update the Task??",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes!!!",
      denyButtonText: `No....`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        updateData(data);
        Swal.fire("Task Updateed Successfully!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("This Task Can't be Updated..", "", "info");
      }
    });
  };
  const updateData = (taskData) => {
    // Define the API URL
    const API_URL = `http://localhost:8800/task/${stateData._id}`;
    // Send a POST request with the data
    console.log(taskData);
    axios
      .put(API_URL, taskData)
      .then((response) => {
        console.log("Put request successful:", response.data);
        notify("Updated");
      })
      .catch((error) => {
        console.error("Error sending PUT request:", error);
      });
  };

  return (
    <div>
      <Navbar />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 mt-16  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="title"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hello    "
            placeholder=" "
            {...register("title", {
              required: true,
            })}
            defaultValue={stateData?.title}
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Task Name
          </label>
          {errors.title &&
            errors.title.type === "required" &&
            (stateData?.title ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Please Update Task Title!
              </p>
            ) : (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Task Description is Required!
              </p>
            ))}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 "
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            {...register("description", {
              required: true,
            })}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your task description here..."
            defaultValue={stateData?.description}
          ></textarea>
          {errors.description &&
            errors.description.type === "required" &&
            (stateData?.description ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Please Update Task Description!
              </p>
            ) : (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Task Description is Required!
              </p>
            ))}
        </div>

        <div className="grid md:grid-cols-2 md:gap-6 mt-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              {...register("assignedUser", {
                required: true,
              })}
              name="assignedUser"
              id="assignedUser"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={stateData?.assignedUser}
            />
            <label
              htmlFor="assignedUser"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Assigned User
            </label>
            {errors.assignedUser &&
              errors.assignedUser.type === "required" &&
              (stateData?.assignedUser ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Who is updatinge the Task?
                </p>
              ) : (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Who is Creating the Task?
                </p>
              ))}
          </div>

          <div className="relative max-w-sm">
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Due date"
                  // value={dueDate}
                  // value={stateData.dueDate ? stateData.dueDate : dueDate}
                  onChange={(newValue) => (newValue)}
                  // {...register("dueDate")}
                  {...register("dueDate", {
                    onChange: (e) => console.log(e),
                  })}
                  // type="date"
                  // {...register("dueDate", {
                  //   valueAsDate: true,
                  // })}
                />
              </DemoContainer>
            </LocalizationProvider> */}
            <Controller
              name={"dueDate"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // {...register("assignedUser")}
                    label={"Due Date"}
                    control={control}
                    inputFormat="DD-MM-YYYY"
                    // defaultValue={value}
                    defaultValue={
                      // stateData?.dueDate ? new Date(stateData.dueDate) : value
                      // stateData.hasOwnProperty("dueDate")
                      stateData?.dueDate
                        ? moment(stateData.dueDate).format("DD-MM-YYYY")
                        : value
                    }
                    onChange={(event) => {
                      onChange(event.$d);
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select
              {...register("status", {
                required: true,
              })}
              id="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select task status</option>
              <option value={"Pending"}>Pending</option>
              <option value={"In Progress"}>In Progress</option>
              <option value={"Completed"}>Completed</option>
              <option value={"In Complete"}>In Complete</option>
            </select>
            {/* {console.log(errors)} */}
            {errors.status &&
              errors.status.type === "required" &&
              (stateData?.status ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Please Also update Status of The Task!
                </p>
              ) : (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Task Status is Required!!
                </p>
              ))}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Priority of task
            </label>
            <select
              {...register("priority", {
                required: true,
              })}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose priority level</option>
              <option value={"Low"}>Low</option>
              <option value={"Medium"}>Medium</option>
              <option value={"High"}>High</option>
            </select>
            {errors.priority &&
              errors.priority.type === "required" &&
              (stateData?.priority ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Please Also update priority of The Task!
                </p>
              ) : (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  Task priority is Required!!
                </p>
              ))}
          </div>
        </div>

        <button
          type="submit"
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}
