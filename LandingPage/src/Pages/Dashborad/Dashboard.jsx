import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Users,
  TrendingUp,
  Calendar,
  Globe,
  Eye,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  ChevronDown,
  Settings,
  Shield,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-sm">
                <Shield className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Ras El Hekma Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-sm">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.email}
                  </span>
                  <span className="text-xs text-gray-500">Admin</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // You can make this dynamic if you want
  const [totalUsers, setTotalUsers] = useState(0);
  const totalPages = Math.ceil(totalUsers / pageSize);

  // Fetch users data from API with pagination and filters
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare query params
      const params = {
        page,
        limit: pageSize,
      };

      const response = await axios.get("http://localhost:3000/api/user", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        params,
      });

      const data = response.data.data;

      setUsers(data.users || []);
      setTotalUsers(data.total || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  // Refetch users when page, interest, or searchTerm changes
  useEffect(() => {
    fetchUsers();
  }, [page, selectedInterest, searchTerm]);

  // Filter and search users (optional if filtering done server side)
  // Here, you can keep filtering client-side for search and interest if not done server-side
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        (user.fullName || user.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user._id.includes(searchTerm);
      const matchesInterest =
        selectedInterest === "all" || user.interest === selectedInterest;
      return matchesSearch && matchesInterest;
    });
  }, [users, searchTerm, selectedInterest]);

  const stats = useMemo(() => {
    const interests = users.reduce((acc, user) => {
      acc[user.interest] = (acc[user.interest] || 0) + 1;
      return acc;
    }, {});

    const countries = users.reduce((acc, user) => {
      const country = user.countryCode || user.countryKey || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    return {
      total: totalUsers,
      interests,
      countries,
      recentSignups: users.filter((user) => {
        const createdDate = new Date(user.createdAt);
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return createdDate > oneDayAgo;
      }).length,
    };
  }, [users, totalUsers]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInterestBadgeStyle = (interest) => {
    const styles = {
      investment: "bg-yellow-100 text-yellow-800 border-yellow-200",
      residence: "bg-purple-100 text-purple-800 border-purple-200",
      business: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return styles[interest] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const UserModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">User Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <p className="text-gray-800">{user.fullName || user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <p className="text-gray-800">{user.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Interest
            </label>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getInterestBadgeStyle(
                user.interest
              )}`}
            >
              {user.interest}
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Country Code
            </label>
            <p className="text-gray-800">
              {user.countryCode || user.countryKey || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">User ID</label>
            <p className="text-gray-800 text-sm font-mono">{user._id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Created At
            </label>
            <p className="text-gray-800">{formatDate(user.createdAt)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Last Updated
            </label>
            <p className="text-gray-800">{formatDate(user.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Pagination Controls Component
  const Pagination = () => (
    <div className="flex justify-center items-center space-x-2 py-4">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        <ChevronLeft className="inline-block w-4 h-4" />
      </button>
      <span>
        Page {page} of {totalPages || 1}
      </span>
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages || totalPages === 0}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        <ChevronRight className="inline-block w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Users Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage and monitor your user base
                </p>
              </div>
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <RefreshCw className="mx-auto h-12 w-12 text-blue-600 animate-spin" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Loading users...
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Please wait while we fetch the data.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-sm font-medium text-red-800">
                  Error loading users
                </h3>
              </div>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <div className="mt-4">
                <button
                  onClick={fetchUsers}
                  className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Dashboard Content - Only show when not loading and no error */}
          {!loading && !error && (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Recent Signups
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.recentSignups}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Investment Interest
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.interests.investment || 0}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Residence Interest
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.interests.residence || 0}
                      </p>
                    </div>
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Business Interest
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.interests.business || 0}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search users by name, phone, or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => {
                          setPage(1); // Reset to first page on search
                          setSearchTerm(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={selectedInterest}
                      onChange={(e) => {
                        setPage(1); // Reset to first page on filter
                        setSelectedInterest(e.target.value);
                      }}
                    >
                      <option value="all">All Interests</option>
                      <option value="investment">Investment</option>
                      <option value="residence">Residence</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Users ({filteredUsers.length})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interest
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                  {(user.name || "U").charAt(0).toUpperCase()}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {user._id.slice(0, 6)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.countryCode || user.countryKey || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center capitalize px-2.5 py-0.5 rounded-full text-xs font-medium border ${getInterestBadgeStyle(
                                user.interest
                              )}`}
                            >
                              {user.interest}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="inline-block h-5 w-5" />
                              <span className="sr-only">View Details</span>
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredUsers.length === 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <Pagination />
              </div>

              {/* User Modal */}
              {selectedUser && (
                <UserModal
                  user={selectedUser}
                  onClose={() => setSelectedUser(null)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
