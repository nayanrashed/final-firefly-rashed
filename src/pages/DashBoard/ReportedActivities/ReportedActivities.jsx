/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReportedActivities = () => {
  const axiosSecure = useAxiosSecure();
  const { data: comments = [], refetch } = useQuery({
    queryKey: ["searchPost"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments`);
      return res.data.reverse();
    },
  });
  //   console.log(comments);
  const reportedComments = comments.filter((item) => item.report);
  //   console.log(reportedComments);
  const handleDelete = (commentID) => {
    console.log(commentID);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/comments/${commentID}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Reported comments has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
  };
  return (
    <div>
      <div>
        <h3 className="text-3xl text-center">Manage Repots</h3>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Comments</th>
                <th>Comments By</th>
                <th>Post Title</th>
                <th>Report</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportedComments.map((report, index) => (
                <tr key={report._id}>
                  <th>{index + 1}</th>
                  <td>{report.comments}</td>
                  <td>{report.commentsBy}</td>
                  <td>{report.title}</td>
                  <td>{report.report}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="btn btn-ghost btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedActivities;
