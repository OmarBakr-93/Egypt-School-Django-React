import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

function Grades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/grades/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ API data:", data);
        setGrades(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching grades:", err));
  }, [token]);

  const getMarkColor = (mark) => {
    if (mark >= 90) return "bg-green-100 text-green-700";
    if (mark >= 60) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getGradeLevelLabel = (mark) => {
    if (mark >= 90) return "Excellent";
    if (mark >= 60) return "Good";
    if (mark >= 50) return "Average";
    return "bad";
  };
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Subject
              </th>
              <th scope="col" class="px-6 py-3">
                Mark
              </th>
              <th scope="col" class="px-6 py-3">
                Grade Level
              </th>
            </tr>
          </thead>
          <tbody>
            {grades?.map((grade) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td class="px-6 py-4">{grade?.subject?.name || "-"}</td>
                <td class="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full ${getMarkColor(grade?.mark)}`}
                  >
                    {" "}
                    {grade?.mark || "-"}
                  </span>
                </td>
                <td class="px-6 py-4">{getGradeLevelLabel(grade?.mark)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;
