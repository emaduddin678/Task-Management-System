import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

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

const Flowbite = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const API_URL = `http://localhost:8800/tasks`;

      const { data } = await axios.get(API_URL, { withCredentials: true });
      const response = await axios.get(API_URL, { withCredentials: true });
      console.log(response);

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
  console.log(data);

  const handleDelete = async (id) => {
    const url = `http://localhost:8800/tasks/${id}`;
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
    <div>
      <Navbar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
        <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-3 py-3  ">
                SL
              </th>
              <th scope="col" className="px-6 py-3  ">
                Task name
              </th>
              <th scope="col" className="px-6 py-3">
                Task Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned User
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr
                  className="bg-blue-500 border-b border-blue-400 "
                  key={item._id}
                >
                  <td scope="row" className="px-3  py-2 font-medium    ">
                    <strong>{item.id}</strong>
                  </td>
                  <td
                    scope="row"
                    className="px-6 w-52 py-4 font-medium text-blue-50    dark:text-blue-100"
                  >
                    <strong>{item.title}</strong>
                  </td>
                  <td className="px-6 w-80 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.assignedUser}</td>
                  <td className="px-6 py-4">{item.priority}</td>
                  <td className="px-6 py-4">
                    {isNaN(daysAndHoursFromNow(item.dueDate).days)
                      ? "Please Update Due Date"
                      : `${daysAndHoursFromNow(item.dueDate).days} days ${
                          daysAndHoursFromNow(item.dueDate).hours
                        } hours `}
                  </td>
                  <td className="px-6 py-4  flex items-center flex-col gap-5 justify-center">
                    <Link
                      to={`/addtask`}
                      state={item}
                      className="bg-green-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Flowbite;
