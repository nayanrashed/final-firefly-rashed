import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // const [usersData, setUsersData] = useState(users);
  const [searchedUser, setSearchedUser] = useState("");

  const { data: searchedUserData = [] } = useQuery({
    queryKey: ["searchUser", searchedUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?name=${searchedUser}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user?._id}`).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    const searchedName = e.target.searchField.value;
    setSearchedUser(searchedName);
  };
  return (
    <div>
      <div className="flex justify-center">        
        <h3 className="text-3xl my-2">Total Users:{users?.length}</h3>
      </div>
      <div className="flex justify-center my-2">
        <form onSubmit={handleSearchUser} className="join">
          <input
            className="input input-bordered join-item font-semibold"
            name="searchField"
            placeholder="Search user by Name"
          />
          <button className="btn join-item bg-amber-400">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-amber-400 text-black">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Membership Status</th>
              <th>Roll</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {(searchedUser ? searchedUserData : users).map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.badge}</td>
                <td>
                  {user?.role === "admin" ? (
                    <button className="btn btn-sm">Admin</button>
                  ) : (
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip="Make Admin"
                    >
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-md"
                      >
                        <FaUsers className="text-orange-600 text-xl"></FaUsers>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
