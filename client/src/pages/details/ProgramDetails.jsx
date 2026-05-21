import { BookOpen, Clock, DollarSign, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

function ProgramDetails() {
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const { id } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/programs/${id}`)
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ programs data:", data);
        setProgram(data);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Loading program...</p>
      </div>
    );
  }

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("❌ You must be logged in to add a Review");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("http://127.0.0.1:8000/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          program: program.id,
          comment: newComment,
          name: name,
          email: email,
        }),
      });

      if (!res.ok) {
        throw new Error("❌ Failed to add review");
      }

      const data = await res.json();

      setProgram((prev) => ({
        ...prev,
        reviews: [data, ...(prev.reviews || [])],
      }));

      setMessage("Your Reviews Successfully added");

      setNewComment("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden"></div>
      <img src={program.image} className="w-full h-72 object-cover" />

      {/* Content */}

      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-[#b04ba2]">{program.title}</h1>
        <p className="text-gray-600 leading-relaxed">{program.description}</p>
      </div>

      {/* Info cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-lg">
          <DollarSign />
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-semibold">${program.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-lg">
          <User />
          <div>
            <p className="text-sm text-gray-500">Seats</p>
            <p className="font-semibold">{program.seats}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-lg">
          <BookOpen />
          <div>
            <p className="text-sm text-gray-500">Lessons</p>
            <p className="font-semibold">{program.lessons}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-lg">
          <Clock />
          <div>
            <p className="text-sm text-gray-500">Hours</p>
            <p className="font-semibold">{program.hours}</p>
          </div>
        </div>
      </div>

      {/* Teacher */}

      {program?.teacher && (
        <div className="mt-8 p-4 border rounded-lg flex items-center gap-4">
          {program?.teacher?.image && (
            <img
              className="w-44 h-44 object-cover rounded-full border"
              src={program.teacher.image}
            />
          )}

          <div>
            <p className="text-sm text-gray-500">Teacher</p>
            <p className="font-semibold">{program.teacher.name}</p>
            <p className="text-sm text-gray-600">{program.teacher.subject}</p>
          </div>
        </div>
      )}

      {/* all Reviews */}

      <div className="mt-10">
        <h3 className="mb-5">Reviews</h3>

        {program?.reviews && program.reviews.length > 0 ? (
          <div className="space-y-4 mb-6">
            {program.reviews.map((review) => (
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-700">{review?.comment}</p>
                <p className="text-sm text-gray-500">{review?.user?.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review?.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No reviews yet.</p>
        )}
      </div>

      {/* Form Review */}

      <div className="mt-10">
        <h3 className="mb-5">Leave a Review</h3>
        <form onSubmit={handleAddReview} className="flex flex-col gap-3">
          <input
            type="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded focus:ring focus:ring-blue-300"
            required
          />

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="add your comment"
            className="border p-3 rounded-lg "
            rows="3"
          ></textarea>

          <button disabled={submitting} type="submit">
            {submitting ? "submitting" : "add comment"}
          </button>
        </form>
      </div>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}

export default ProgramDetails;
