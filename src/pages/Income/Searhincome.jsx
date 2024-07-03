import React from 'react';


const Searhincome = () => {
  return (
    <>
    <div className='p-6'>
    <div>
     <h1 className='text-2xl font-bold'>Select Criteria</h1>
    </div>
    <div className='lg:flex gap-2 w-full mt-4'>
   <div className='w-full'>
     <form className="">
       <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Type</label>
       <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
         <option selected>Select</option>
       </select>
     </form>
   </div>
   <div className='w-full'>
     <form className="">
       <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
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
    <div className="relative overflow-x-auto mt-4 ">
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   <th scope="col" className="px-6 py-3">
                    Name
                   </th>
                   <th scope="col" className="px-6 py-3">
               	Invoice Number
                   </th>
                   <th scope="col" className="px-6 py-3">
                   Income Head
                   </th>
                   <th scope="col" className="px-6 py-3">
                   Date
                   </th>
   
                   <th scope="col" className="px-6 py-3">
                   Amount ($)
                   </th>
                  

                  
                  
                  
   
   
               </tr>
           </thead>
           <tbody>
               <tr className="bg-white  ">
               <td className="px-6 py-4">
                          Silver
                      </td>
                   <td className="px-6 py-4">
                       Silver
                   </td>
                   <td className="px-6 py-4">
                       Laptop
                   </td>
                   <td className="px-6 py-4">
                       $2999
                   </td>
                 
                 
                   <td className="px-6 py-4">
                       $2999
                   </td>
                  
                  
                  
               </tr>
               
           </tbody>
       </table>
   </div>
    </>
  )
}

export default Searhincome