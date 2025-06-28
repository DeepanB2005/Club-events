function Createclub() {
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4361ee] to-[#f72585] bg-clip-text text-transparent dark:text-white mb-6">Create a New Club</h1>
        <form className="w-full max-w-md   p-6 rounded-lg shadow-md">
            <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="clubName">Club Name</label>
            <input
                type="text"
                id="clubName"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter club name"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">Description</label>
            <textarea
                id="description"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter club description"
                rows="4"
                required
            ></textarea>
            </div>
            <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-[#4361ee] to-[#f72585] text-white font-semibold rounded-lg hover:from-[#5a7bff] hover:to-[#ff4c9c] transition duration-300 transform hover:scale-105"
            >
            Create Club
            </button>
            </form>
    </div>
  );
}
export default Createclub;