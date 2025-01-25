const Header = () => (
    <header className="bg-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dynamic Dashboard</h1>
        <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium py-2 px-4 rounded-lg transition">
          Logout
        </button>
      </div>
    </header>
  );
  
  export default Header;
  