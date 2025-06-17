import React from "react";
import StatsCard from "./StatsCard";
import QuickActions from "./QuickActions";
import { Bus, Users, CreditCard, TrendingUp } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";

const Dashboard = ({ setCurrentPage }) => {
  const stats = [
    {
      title: "Total Bookings",
      value: "245",
      change: "+12%",
      trend: "up",
      icon: Bus,
      color: "blue",
    },
    {
      title: "Active Vehicles",
      value: "32",
      change: "+5%",
      trend: "up",
      icon: Bus,
      color: "green",
    },
    {
      title: "Total Revenue",
      value: "₹15.2L",
      change: "+18%",
      trend: "up",
      icon: CreditCard,
      color: "purple",
    },
    {
      title: "Pending Payments",
      value: "₹2.8L",
      change: "-8%",
      trend: "down",
      icon: TrendingUp,
      color: "red",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: "Raj Kumar",
      vehicle: "DL 01 AB 1234",
      date: "2024-01-15",
      status: "confirmed",
    },
    {
      id: 2,
      customer: "Priya Sharma",
      vehicle: "DL 02 CD 5678",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      customer: "Amit Patel",
      vehicle: "DL 03 EF 9012",
      date: "2024-01-13",
      status: "completed",
    },
  ];

  const upcomingReminders = [
    {
      id: 1,
      type: "insurance",
      vehicle: "DL 01 AB 1234",
      dueDate: "2024-01-20",
    },
    { id: 2, type: "fitness", vehicle: "DL 02 CD 5678", dueDate: "2024-01-25" },
    {
      id: 3,
      type: "payment",
      customer: "Raj Kumar",
      amount: "₹25,000",
      dueDate: "2024-01-18",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <QuickActions setCurrentPage={setCurrentPage} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {booking.customer}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.vehicle} • {booking.date}
                  </p>
                </div>
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "success"
                      : booking.status === "pending"
                      ? "warning"
                      : "default"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {reminder.type === "payment"
                      ? reminder.customer
                      : reminder.vehicle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {reminder.type === "payment"
                      ? `Amount: ${reminder.amount}`
                      : `${reminder.type} renewal`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {reminder.dueDate}
                  </p>
                  <p className="text-xs text-gray-500">Due date</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
