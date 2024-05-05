"use client";

import React, { useState } from "react";
import { AiFillDelete, AiFillLock, AiOutlineCheckCircle } from "react-icons/ai";
import { deleteUsers, blockUsers, unblockUsers } from "@/app/actions";

type User = {
  id: string;
  name: string;
  email: string;
  registration_time: Date;
  last_login: Date;
  status: string;
};

type UsersTableProps = {
  users?: User[];
};

type UserData = Pick<User, "id" | "name" | "status">;

const UsersTable = ({ users }: UsersTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const storedUserData: UserData = JSON.parse(sessionStorage.getItem("userData") || "{}");

  function formatDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  const handleCheckAll = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      const allIds = users?.map(user => user.id);
      setSelectedIds(allIds || []);
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheck = (userId: string) => {
    const index = selectedIds.indexOf(userId);
    if (index === -1) {
      setSelectedIds([...selectedIds, userId]);
    } else {
      const updatedIds = [...selectedIds];
      updatedIds.splice(index, 1);
      setSelectedIds(updatedIds);
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto p-5">
      <h1 className="text-2xl font-semibold text-black mb-10">Welcome {storedUserData.name}</h1>

      <div className="flex space-x-4 mb-7">
        <button onClick={() => deleteUsers(storedUserData.id, selectedIds)}
                className="flex items-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
          <AiFillDelete />
          <span className="ml-2">Delete</span>
        </button>
        <button onClick={() => blockUsers(storedUserData.id, selectedIds)}
                className="flex items-center px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
          <AiFillLock />
          <span className="ml-2">Block</span>
        </button>
        <button onClick={() => unblockUsers(storedUserData.id, selectedIds)}
                className="flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
          <AiOutlineCheckCircle />
          <span className="ml-2">Unblock</span>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  checked={isChecked}
                  onChange={handleCheckAll}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Full name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Registration time
            </th>
            <th scope="col" className="px-6 py-3">
              Login time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
          </thead>
          <tbody>
          {users?.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${user.id}`}
                    checked={selectedIds.includes(user.id)}
                    onChange={() => handleCheck(user.id)}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${user.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {formatDate(user.registration_time)}
              </td>
              <td className="px-6 py-4">
                {formatDate(user.last_login || new Date())}
              </td>
              <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 font-semibold rounded ${
                      user.status === "ACTIVE"
                        ? "bg-green-600 text-green-100"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status.toLowerCase()}
                  </span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
