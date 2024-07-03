import React from 'react';
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { FiColumns } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Approveleave = () => {
  return (
    <>
   <div className='p-6'>
   <div>
    <h1 className='text-2xl font-bold'>Select Criteria</h1>
   </div>
   <div className='lg:flex gap-2 w-full mt-4'>
  <div className='w-full'>
    <form className="">
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class</label>
      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Select</option>
      </select>
    </form>
  </div>
  <div className='w-full'>
    <form className="">
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Select</option>
      </select>
    </form>
  </div>
</div>
<div className='flex justify-end mt-4'>
<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex ">Search</button>
</div>

   </div>
   <div>
   <div className='flex justify-between p-6'>
        <div>
            <h1 className='text-2xl font-bold'>Approve Leave List</h1>
        </div>
        <div>
        <button className="bg-blue-500  hover:bg-blue-700 text-white  py-2 px-4 rounded flex items-center">
<IoIosAdd />
Add Book
</button>
        </div>
    </div>
<div className='p-6 flex justify-between'>
    <div>
<form className="max-w-md ">   
 
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <FaSearch />
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search visitor..." required />
     
    </div>
</form>
</div>
<div className='flex gap-3'>
<FaCopy /> <FaRegFileExcel /> <FaFileCsv /><FaFilePdf /> <FiPrinter /><FiColumns />
</div>
</div>
<div>
    

<div className="relative overflow-x-auto p-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-3">
               
                Student Name
                </th>
                <th scope="col" className="px-2 py-3">
             	
	Class	
                </th>
                <th scope="col" className="px-2 py-3">
                Section	Apply Date	
                </th>
                <th scope="col" className="px-2 py-3">
                From Date	
                </th>

                <th scope="col" className="px-2 py-3">
                To Date	Status		
                </th>
                <th scope="col" className="px-2 py-3">
                Approve Disapprove By	
                </th>
               
                <th scope="col" className="px-2 py-3">
               Action
                </th>
               


            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2 py-4">
                   Ram
                </td>
                <td className="px-2 py-4">
                   2
                </td>
                <td className="px-2 py-4">
                 20
                </td>
               
                <td className="px-2 py-4">
                    30
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
               
                <td className="px-2 py-4">
                  <div className='flex gap-2'>
                

                  <CiEdit />
                  <MdDelete />
                  </div>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>

</div>
   </div>
   </>
  )
}

export default Approveleave