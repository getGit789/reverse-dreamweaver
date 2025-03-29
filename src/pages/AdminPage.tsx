import Navbar from '@/components/Navbar';
import AdminDashboard from '@/components/AdminDashboard';
import { DatabaseZap } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="p-[1px] bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 rounded-2xl sm:rounded-3xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg">
              <div className="p-4 sm:p-8 md:p-10">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <DatabaseZap className="w-7 h-7 text-purple-600" />
                  <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                </div>
                <AdminDashboard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage; 