import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  TrendingUp,
  Search,
  Settings,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

// Mock Data - Replace with your actual API calls
const mockStats = {
  activeStudents: 4,
  pendingApplications: 5,
  totalEarnings: "12,500",
  rating: 4.8,
};

const recentJobApplications = [
  {
    id: 1,
    title: "Need Math Tutor for Class 10",
    location: "Dhanmondi, Dhaka",
    date: "11 Apr, 2026",
    status: "Accepted",
  },
  {
    id: 2,
    title: "O Level Physics Expert Needed",
    location: "Online",
    date: "09 Apr, 2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "English Tutor for Spoken Class",
    location: "Gulshan, Dhaka",
    date: "05 Apr, 2026",
    status: "Rejected",
  },
  {
    id: 4,
    title: "Chemistry Tutor for HSC",
    location: "Mirpur, Dhaka",
    date: "02 Apr, 2026",
    status: "Pending",
  },
];

const TutorDashboardHome = () => {
  // Framer Motion variants for staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Helper function to render status badges
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="badge badge-success gap-1 text-success-content badge-sm font-medium p-3">
            <CheckCircle2 className="w-3 h-3" /> Accepted
          </div>
        );
      case "Pending":
        return (
          <div className="badge badge-warning gap-1 text-warning-content badge-sm font-medium p-3">
            <Clock className="w-3 h-3" /> Pending
          </div>
        );
      case "Rejected":
        return (
          <div className="badge badge-error gap-1 text-error-content badge-sm font-medium p-3">
            <XCircle className="w-3 h-3" /> Rejected
          </div>
        );
      default:
        return <div className="badge">{status}</div>;
    }
  };

  return (
    <motion.div
      className="p-4 sm:p-6 lg:p-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          {/* Replace "Tutor" with actual user name from Auth Context */}
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
            Welcome back, Tutor! <span className="text-2xl">👨‍🏫</span>
          </h1>
          <p className="text-base-content/70 mt-2">
            Here is what is happening with your teaching business today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Link to="/all-tuitions" className="btn btn-primary">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Browse Jobs</span>
          </Link>
          <Link
            to="/dashboard/profile"
            className="btn btn-outline btn-primary bg-base-100"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Profile</span>
          </Link>
        </div>
      </motion.div>

      {/* 2. Stats Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200 px-4 py-6">
          <div className="stat-figure text-primary bg-primary/10 p-3 rounded-full">
            <Users className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium whitespace-normal">
            Active Students
          </div>
          <div className="stat-value text-primary text-3xl">
            {mockStats.activeStudents}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200 px-4 py-6">
          <div className="stat-figure text-warning bg-warning/10 p-3 rounded-full">
            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium whitespace-normal">
            Pending Approvals
          </div>
          <div className="stat-value text-warning text-3xl">
            {mockStats.pendingApplications}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200 px-4 py-6">
          <div className="stat-figure text-success bg-success/10 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium whitespace-normal">
            Earnings (BDT)
          </div>
          <div className="stat-value text-success text-3xl">
            ৳{mockStats.totalEarnings}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200 px-4 py-6">
          <div className="stat-figure text-amber-500 bg-amber-500/10 p-3 rounded-full">
            <Star className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium whitespace-normal">
            Avg. Rating
          </div>
          <div className="stat-value text-amber-500 text-3xl">
            {mockStats.rating}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Recent Job Applications Table (Spans 2 columns) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-100">
            <h2 className="text-xl font-bold text-base-content">
              Recent Job Applications
            </h2>
            <Link
              to="/dashboard/my-applications"
              className="text-primary hover:text-primary-focus flex items-center text-sm font-medium transition-colors"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto flex-grow">
            <table className="table w-full">
              <thead className="bg-base-200/50 text-base-content/70">
                <tr>
                  <th className="font-medium">Tuition Title</th>
                  <th className="font-medium">Location</th>
                  <th className="font-medium">Applied On</th>
                  <th className="font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentJobApplications.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-base-200/30 transition-colors"
                  >
                    <td>
                      <div
                        className="font-semibold text-base-content truncate max-w-[200px] sm:max-w-xs"
                        title={job.title}
                      >
                        {job.title}
                      </div>
                    </td>
                    <td className="text-base-content/80 text-sm whitespace-nowrap">
                      {job.location}
                    </td>
                    <td className="text-base-content/80 text-sm whitespace-nowrap">
                      {job.date}
                    </td>
                    <td>{renderStatusBadge(job.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentJobApplications.length === 0 && (
              <div className="p-12 text-center text-base-content/50">
                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>You haven't applied to any tuition jobs recently.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* 4. Profile Completeness / Tips Card (Spans 1 column) */}
        <motion.div
          variants={itemVariants}
          className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6 flex flex-col h-full"
        >
          <h3 className="text-xl font-bold text-base-content mb-6">
            Profile Status
          </h3>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-base-content/80">
                Completeness
              </span>
              <span className="font-bold text-primary">85%</span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value="85"
              max="100"
            ></progress>
            <p className="text-xs text-base-content/60 mt-2">
              A complete profile gets 3x more acceptances!
            </p>
          </div>

          {/* Action List */}
          <ul className="space-y-4 flex-grow">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-base-content">
                  Add Profile Picture
                </p>
                <p className="text-xs text-base-content/60">Completed</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-base-content">
                  Verify Phone Number
                </p>
                <p className="text-xs text-base-content/60">Completed</p>
              </div>
            </li>
            <li className="flex items-start gap-3 opacity-70">
              <div className="w-5 h-5 rounded-full border-2 border-base-content/30 shrink-0 mt-0.5"></div>
              <div>
                <p className="text-sm font-medium text-base-content">
                  Add Educational Certificates
                </p>
                <p className="text-xs text-warning">Pending (+15%)</p>
              </div>
            </li>
          </ul>

          <Link
            to="/dashboard/profile"
            className="btn btn-outline btn-block mt-6"
          >
            Update Profile
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TutorDashboardHome;
