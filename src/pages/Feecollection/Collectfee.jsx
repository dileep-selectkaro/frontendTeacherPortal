import React from 'react'

const Collectfee = () => {
  return (
    <>
    <div className='p-6'>
   <div>
    <h1 className='text-2xl font-bold'>Select Criteria</h1>
   </div>
   <div className='lg:flex gap-2 w-full mt-4'>
    <div className='w-full'>
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
  
  <div className='w-full mt-4'>
  <div className='w-full'>
  <div class="mb-6">
    <label htmlFor="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search By Keyword</label>
    <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
  </div>
  <div className='flex justify-end mt-4'>
<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex ">Search</button>
</div>
</div>
</div>

   </div>
   <div>

        <div className='p-6'>
            <h1 className='text-2xl font-bold'>Student List</h1>
        </div>
       
 

<div>
    

<div className="relative overflow-x-auto p-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-3">
                Class	
                </th>
                <th scope="col" className="px-2 py-3">
             	Section	
                </th>
                <th scope="col" className="px-2 py-3">
                Admission No	
                </th>
                <th scope="col" className="px-2 py-3">
                Student Name	
                </th>

                <th scope="col" className="px-2 py-3">
                Father Name	
                </th>
                <th scope="col" className="px-2 py-3">
                Date of Birth	
                </th>
                <th scope="col" className="px-2 py-3">
                Mobile No
                </th>
               
                <th scope="col" className="px-2 py-3">
               Action
                </th>
               


            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2 py-4">
                    Silver
                </td>
                <td className="px-2 py-4">
                    Silver
                </td>
               
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                
               
                <td className="px-2 py-4">
                  <div className='flex gap-2'>
                 
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

export default Collectfee