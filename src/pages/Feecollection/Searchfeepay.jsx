import React from 'react'

const Searchfeepay = () => {
  return (
 <>
 <div className='p-6'>
   <div>
    <h1 className='text-2xl font-bold'>Select Criteria</h1>
   </div>
 
  <div className='mt-4 '>
  <div class="mb-6">
    <label htmlFor="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment ID</label>
    <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
  </div>
  <div className='flex justify-end mt-4'>
<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex ">Search</button>
</div>
</div>

 </>
  )
}

export default Searchfeepay