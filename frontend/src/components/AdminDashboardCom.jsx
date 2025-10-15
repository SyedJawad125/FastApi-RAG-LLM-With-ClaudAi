import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { FiUsers, FiShoppingCart, FiDollarSign, FiPackage, FiClock, FiCalendar } from 'react-icons/fi';

const AdminPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    setIsClient(true); // This will only run on client side
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12500, 19000, 8000, 15000, 22000, 18000],
        backgroundColor: 'rgba(101, 163, 13, 0.8)',
        borderRadius: 6,
      },
    ],
  };

  const revenueData = {
    labels: ['Products', 'Services', 'Subscriptions'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(101, 163, 13, 0.8)',
          'rgba(202, 138, 4, 0.8)',
          'rgba(124, 58, 237, 0.8)'
        ],
        borderWidth: 0,
      },
    ],
  };

  const stats = [
    { title: "Total Users", value: "2,456", icon: <FiUsers className="text-2xl text-black" />, change: "+12%" },
    { title: "Total Orders", value: "1,230", icon: <FiShoppingCart className="text-2xl text-black" />, change: "+8%" },
    { title: "Revenue", value: "$34,567", icon: <FiDollarSign className="text-2xl text-black" />, change: "+23%" },
    { title: "Products", value: "567", icon: <FiPackage className="text-2xl text-black" />, change: "+5%" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-black p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">LUXE ADMIN</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-emerald-700/50 px-4 py-2 rounded-lg text-white">
              <FiCalendar className="text-white" />
              {isClient && (
                <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              )}
            </div>
            <div className="flex items-center space-x-2 bg-emerald-700/50 px-4 py-2 rounded-lg text-white">
              <FiClock className="text-white" />
              {isClient && (
                <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              )}
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <span className="font-bold">AD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of your component remains the same */}
      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white p-6 rounded-xl shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome Back, Admin</h1>
          <p className="text-white max-w-2xl">
            Here's what's happening with your store today. You have 12 new orders, 5 pending reviews, and 3 customer messages waiting.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black text-sm font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1 text-black">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg text-black">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Sales Overview</h2>
              <select className="bg-gray-100 border-0 rounded-lg px-3 py-1 text-sm text-black">
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>Last 3 Years</option>
              </select>
            </div>
            <div className="h-80">
              <Bar 
                data={salesData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                      },
                      ticks: {
                        color: 'black',
                        callback: function(value) {
                          return '$' + value.toLocaleString();
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: 'black'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false,
                      labels: {
                        color: 'black'
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                            return '$' + context.raw.toLocaleString();
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-black">Revenue Sources</h2>
            <div className="h-80">
              <Pie 
                data={revenueData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: 'black'
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return context.label + ': ' + context.raw + '%';
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Recent Orders</h2>
            <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium text-black">Order ID</th>
                  <th className="pb-3 font-medium text-black">Customer</th>
                  <th className="pb-3 font-medium text-black">Date</th>
                  <th className="pb-3 font-medium text-black">Status</th>
                  <th className="pb-3 font-medium text-right text-black">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#ORD-0001', customer: 'Olivia Martin', date: 'May 15, 2023', status: 'Completed', amount: '$125.00' },
                  { id: '#ORD-0002', customer: 'Ava Johnson', date: 'May 15, 2023', status: 'Processing', amount: '$89.50' },
                  { id: '#ORD-0003', customer: 'Michael Williams', date: 'May 14, 2023', status: 'Shipped', amount: '$234.00' },
                  { id: '#ORD-0004', customer: 'Emma Brown', date: 'May 14, 2023', status: 'Completed', amount: '$156.75' },
                  { id: '#ORD-0005', customer: 'James Wilson', date: 'May 13, 2023', status: 'Pending', amount: '$342.00' },
                ].map((order, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 font-medium text-black">{order.id}</td>
                    <td className="py-4 text-black">{order.customer}</td>
                    <td className="py-4 text-black">{order.date}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-medium text-black">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 border-t">
        <div className="container mx-auto text-center text-black text-sm">
          © {new Date().getFullYear()} Luxe Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;