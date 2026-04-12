import { Link } from "react-router";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  UserCheck, 
  DollarSign,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Activity
} from "lucide-react";

// Mock Data - Replace with your actual API calls
const mockStats = {
  totalUsers: "12.5K",
  pendingTutors: 14,
  pendingTuitions: 8,
  monthlyRevenue: "45,000",
};

const recentPendingTutors = [
  { id: 1, name: "Farhan Ahmed", email: "farhan@example.com", subject: "Higher Math", date: "12 Apr, 2026", avatar: "https://ui-avatars.com/api/?name=Farhan+Ahmed&background=0D8ABC&color=fff" },
  { id: 2, name: "Nusrat Jahan", email: "nusrat@example.com", subject: "Physics", date: "11 Apr, 2026", avatar: "https://ui-avatars.com/api/?name=Nusrat+Jahan&background=10B981&color=fff" },
  { id: 3, name: "Tahmid Hasan", email: "tahmid@example.com", subject: "English", date: "10 Apr, 2026", avatar: "https://ui-avatars.com/api/?name=Tahmid+Hasan&background=F59E0B&color=fff" },
  { id: 4, name: "Sadia Islam", email: "sadia@example.com", subject: "Chemistry", date: "09 Apr, 2026", avatar: "https://ui-avatars.com/api/?name=Sadia+Islam&background=8B5CF6&color=fff" },
];

const AdminDashboardHome = () => {
  // Framer Motion variants for staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-4 sm:p-6 lg:p-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
            Admin Control Center <span className="text-2xl">🛡️</span>
          </h1>
          <p className="text-base-content/70 mt-2">
            Overview of platform activity, pending approvals, and system health.
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Link to="/dashboard/user-management" className="btn btn-primary">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Manage Users</span>
          </Link>
        </div>
      </motion.div>

      {/* 2. Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Users */}
        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200 px-4 py-6">
          <div className="stat-figure text-primary bg-primary/10 p-3 rounded-full">
            <Users className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium">Total Users</div>
          <div className="stat-value text-primary text-3xl">{mockStats.totalUsers}</div>
          <div className="stat-desc text-success flex items-center mt-1">
            <Activity className="w-3 h-3 mr-1" /> +12% this month
          </div>
        </div>
        
        {/* Pending Tutors (High Priority Action) */}
        <div className="stat bg-error/10 rounded-2xl shadow-sm border border-error/20 px-4 py-6">
          <div className="stat-figure text-error bg-base-100 p-3 rounded-full shadow-sm">
            <UserCheck className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="stat-title text-error/80 font-bold">Pending Tutors</div>
          <div className="stat-value text-error text-3xl">{mockStats.pendingTutors}</div>
          <div className="stat-desc text-error/80 mt-1 font-medium">Require verification</div>
        </div>
        
        {/* Pending Tuitions */}
        <div className="stat bg-warning/10 rounded-2xl shadow-sm border border-warning/20 px-4 py-6">
          <div className="stat-figure text-warning-content bg-base-100 p-3 rounded-full shadow-sm">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-warning" />
          </div>
          <div className="stat-title text-warning-content/80 font-bold">Pending Jobs</div>
          <div className="stat-value text-warning-content text-3xl">{mockStats.pendingTuitions}</div>
          <div className="stat-desc text-warning-content/80 mt-1 font-medium">Awaiting moderation</div>
        </div>

        {/* Platform Revenue */}
        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200 px-4 py-6">
          <div className="stat-figure text-success bg-success/10 p-3 rounded-full">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium">Monthly Revenue</div>
          <div className="stat-value text-success text-3xl">৳{mockStats.monthlyRevenue}</div>
          <div className="stat-desc text-base-content/50 mt-1">From premium features/fees</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Action Required Table: Pending Tutors (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-100">
            <div>
              <h2 className="text-xl font-bold text-base-content">Tutors Awaiting Approval</h2>
              <p className="text-sm text-base-content/60 mt-1">Review profiles before making them public.</p>
            </div>
            <Link to="/dashboard/pending-tutors" className="btn btn-sm btn-ghost text-primary">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto flex-grow">
            <table className="table w-full">
              <thead className="bg-base-200/50 text-base-content/70">
                <tr>
                  <th className="font-medium">Tutor Info</th>
                  <th className="font-medium">Primary Subject</th>
                  <th className="font-medium">Applied On</th>
                  <th className="font-medium text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPendingTutors.map((tutor) => (
                  <tr key={tutor.id} className="hover:bg-base-200/30 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                            <img src={tutor.avatar} alt={tutor.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-base-content">{tutor.name}</div>
                          <div className="text-xs text-base-content/60">{tutor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-base-content/80 font-medium">{tutor.subject}</td>
                    <td className="text-base-content/80 text-sm">{tutor.date}</td>
                    <td className="text-right">
                      {/* Mini action buttons for quick moderation */}
                      <div className="flex justify-end gap-2">
                        <button 
                          className="btn btn-xs btn-success text-success-content"
                          title="Approve Tutor"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button 
                          className="btn btn-xs btn-error text-error-content"
                          title="Reject Tutor"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentPendingTutors.length === 0 && (
              <div className="p-12 text-center text-base-content/50">
                <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-success/50" />
                <p>All caught up! No pending tutors right now.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* 4. Platform Quick Links / System Health (Spans 1 column) */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Quick Links Card */}
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6">
            <h3 className="text-xl font-bold text-base-content mb-4">Admin Shortcuts</h3>
            <div className="flex flex-col gap-3">
              <Link to="/dashboard/pending-tuitions" className="btn btn-outline justify-between w-full">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Review Tuitions
                </span>
                <span className="badge badge-warning">{mockStats.pendingTuitions}</span>
              </Link>
              <Link to="/dashboard/user-management" className="btn btn-outline justify-between w-full">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> User Directory
                </span>
                <ChevronRight className="w-4 h-4 text-base-content/50" />
              </Link>
              <Link to="/all-tuitions" className="btn btn-outline justify-between w-full">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Live Platform View
                </span>
                <ChevronRight className="w-4 h-4 text-base-content/50" />
              </Link>
            </div>
          </div>

          {/* System Health Card */}
          <div className="bg-primary text-primary-content rounded-2xl shadow-md p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 opacity-10">
              <ShieldCheck className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                <h3 className="text-lg font-bold">System Status: Online</h3>
              </div>
              <p className="text-primary-content/80 text-sm mb-4">
                All services (Database, Authentication, Mailing) are running smoothly. No recent errors reported.
              </p>
              <div className="text-xs font-mono bg-black/20 p-2 rounded-lg inline-block">
                Last backup: Today, 04:00 AM
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default AdminDashboardHome;