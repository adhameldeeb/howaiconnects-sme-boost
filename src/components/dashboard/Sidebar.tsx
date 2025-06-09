// src/components/dashboard/Sidebar.tsx
export const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <button onClick={onClose} className="absolute top-4 right-4 md:hidden text-gray-300 hover:text-white">
        {/* Heroicon name: outline/x */}
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      {/* Placeholder navigation items */}
      <nav>
        <ul>
          <li className="mb-2"><a href="#" className="block py-2 px-2 rounded hover:bg-gray-700 hover:text-gray-300">Dashboard</a></li>
          <li className="mb-2"><a href="#" className="block py-2 px-2 rounded hover:bg-gray-700 hover:text-gray-300">Data Management</a></li>
          <li className="mb-2"><a href="#" className="block py-2 px-2 rounded hover:bg-gray-700 hover:text-gray-300">Sync Config</a></li>
          <li className="mb-2"><a href="#" className="block py-2 px-2 rounded hover:bg-gray-700 hover:text-gray-300">Analytics</a></li>
        </ul>
      </nav>
    </div>
  );
};
