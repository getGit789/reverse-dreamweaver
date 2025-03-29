import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Shield, AlertTriangle } from 'lucide-react';

interface UserPrompt {
  id: string;
  userId: string;
  promptCount: number;
  lastResetDate: string;
  createdAt: string;
  updatedAt: string;
}

// List of admin user IDs
const ADMIN_USER_IDS = [
  "user_2usSvIDcz1GRDZFfUfMcYRxntfT" // Add your Clerk user ID here
];

// Admin API functions
async function fetchAllUserPrompts(): Promise<UserPrompt[]> {
  try {
    const response = await fetch('/api/admin-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'fetchAllUserPrompts' }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user prompts');
    }

    const data = await response.json();
    return data.userPrompts;
  } catch (error) {
    console.error('Error fetching user prompts:', error);
    return [];
  }
}

const AdminDashboard = () => {
  const { user, isSignedIn } = useUser();
  const [userPrompts, setUserPrompts] = useState<UserPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrompts: 0,
    averagePrompts: 0,
  });
  
  // Check if current user is an admin
  const isAdmin = isSignedIn && user && ADMIN_USER_IDS.includes(user.id);

  useEffect(() => {
    if (!isSignedIn || !isAdmin) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const userData = await fetchAllUserPrompts();
        setUserPrompts(userData);

        // Calculate stats
        const totalUsers = userData.length;
        const totalPrompts = userData.reduce((sum, user) => sum + user.promptCount, 0);
        const averagePrompts = totalUsers > 0 ? totalPrompts / totalUsers : 0;

        setStats({
          totalUsers,
          totalPrompts,
          averagePrompts,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isSignedIn, isAdmin, user?.id]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch {
      return dateString;
    }
  };

  if (!isSignedIn || !user) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
        <p className="text-gray-600">Please sign in to access the admin dashboard</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to view this page.</p>
        <p className="text-gray-500 mt-2">User ID: {user.id}</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Admin Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
          <Shield className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Admin Access</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Users who have used the app</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Prompts</CardTitle>
            <CardDescription>AI prompts used</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalPrompts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Per User</CardTitle>
            <CardDescription>Average prompts per user</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.averagePrompts.toFixed(1)}</p>
          </CardContent>
        </Card>
      </div>

      {/* User Prompts Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Prompt Usage</CardTitle>
          <CardDescription>Track of all user activity</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading user data...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <Table>
              <TableCaption>A list of all users and their prompt usage</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Prompts Used</TableHead>
                  <TableHead>Last Reset Date</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userPrompts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No user data available</TableCell>
                  </TableRow>
                ) : (
                  userPrompts.map((userPrompt) => (
                    <TableRow key={userPrompt.id}>
                      <TableCell className="font-medium">{userPrompt.userId}</TableCell>
                      <TableCell>{userPrompt.promptCount}</TableCell>
                      <TableCell>{formatDate(userPrompt.lastResetDate)}</TableCell>
                      <TableCell>{formatDate(userPrompt.createdAt)}</TableCell>
                      <TableCell>{formatDate(userPrompt.updatedAt)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard; 