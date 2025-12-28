import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import { mockDashboardStats } from '@/data/mockData';

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard" subtitle="Welcome back! Here's what's happening.">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Students"
          value={mockDashboardStats.total_students.toLocaleString()}
          icon={Users}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Courses"
          value={mockDashboardStats.total_courses}
          icon={BookOpen}
          variant="secondary"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Avg. Attendance"
          value={`${mockDashboardStats.average_attendance}%`}
          icon={TrendingUp}
          variant="accent"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Avg. Grade"
          value={`${mockDashboardStats.average_grade}%`}
          icon={Award}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DepartmentChart />
        <RecentActivity />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
