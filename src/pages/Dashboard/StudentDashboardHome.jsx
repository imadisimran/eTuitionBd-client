import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  FileText,
  PlusCircle,
  Search,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import useName from "../../hooks/useName";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const recentApplications = [
  {
    id: 1,
    tutorName: "Rahim Uddin",
    subject: "Higher Math",
    date: "10 Apr, 2026",
    status: "Pending",
    avatar:
      "https://ui-avatars.com/api/?name=Rahim+Uddin&background=0D8ABC&color=fff",
  },
  {
    id: 2,
    tutorName: "Sadia Rahman",
    subject: "Physics",
    date: "08 Apr, 2026",
    status: "Accepted",
    avatar:
      "https://ui-avatars.com/api/?name=Sadia+Rahman&background=10B981&color=fff",
  },
  {
    id: 3,
    tutorName: "Kamrul Hasan",
    subject: "Chemistry",
    date: "05 Apr, 2026",
    status: "Rejected",
    avatar:
      "https://ui-avatars.com/api/?name=Kamrul+Hasan&background=EF4444&color=fff",
  },
];

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const { data, isLoading } = useName();
  const axiosSecure = useAxiosSecure();
  const { data: countData } = useQuery({
    queryKey: ["user", user?.email, "dashboard"],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get("/user/dashboard/stats");
      return result.data;
    },
  });
  // console.log(countData)
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
          {/* Replace "Student" with actual user name from your Auth Context if available */}
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
            Welcome back,{" "}
            {isLoading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              data.displayName
            )}
            ! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-base-content/70 mt-2">
            Here is an overview of your learning journey today.
          </p>
        </div>

        {/* Quick Actions (Desktop right-aligned, Mobile stacked) */}
        <div className="flex gap-3">
          <Link to="/all-tutors" className="btn btn-primary">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Find Tutor</span>
          </Link>
          <Link
            to="/dashboard/my-posts"
            className="btn btn-outline btn-primary bg-base-100"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Post Tuition</span>
          </Link>
        </div>
      </motion.div>

      {/* 2. Stats Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200">
          <div className="stat-figure text-primary bg-primary/10 p-3 rounded-full">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium">
            Total Posted Tuition
          </div>
          <div className="stat-value text-primary">
            {countData?.totalTuitionPosted}
          </div>
          <div className="stat-desc text-base-content/50 mt-1">
            Currently learning with
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200">
          <div className="stat-figure text-warning bg-warning/10 p-3 rounded-full">
            <Clock className="w-8 h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium">
            Total Tuition Approved
          </div>
          <div className="stat-value text-warning">
            {countData?.approvedTuition}
          </div>
          <div className="stat-desc text-base-content/50 mt-1">
            Awaiting tutor response
          </div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-200">
          <div className="stat-figure text-secondary bg-secondary/10 p-3 rounded-full">
            <FileText className="w-8 h-8" />
          </div>
          <div className="stat-title text-base-content/70 font-medium">
            Running Tuitions
          </div>
          <div className="stat-value text-secondary">
            {countData?.bookedTuition}
          </div>
          <div className="stat-desc text-base-content/50 mt-1">
            Actively Learning With Tutors
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Recent Applications Table (Spans 2 columns on large screens) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden"
        >
          <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-100">
            <h2 className="text-xl font-bold text-base-content">
              Recent Applications
            </h2>
            <Link
              to="/dashboard/my-applications"
              className="text-primary hover:text-primary-focus flex items-center text-sm font-medium transition-colors"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200/50 text-base-content/70">
                <tr>
                  <th className="font-medium">Tutor</th>
                  <th className="font-medium">Subject</th>
                  <th className="font-medium">Applied On</th>
                  <th className="font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-base-200/30 transition-colors"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                            <img src={app.avatar} alt={app.tutorName} />
                          </div>
                        </div>
                        <div className="font-semibold text-base-content">
                          {app.tutorName}
                        </div>
                      </div>
                    </td>
                    <td className="text-base-content/80">{app.subject}</td>
                    <td className="text-base-content/80 text-sm">{app.date}</td>
                    <td>
                      <div
                        className={`badge badge-sm font-medium ${
                          app.status === "Accepted"
                            ? "badge-success text-success-content"
                            : app.status === "Rejected"
                              ? "badge-error text-error-content"
                              : "badge-warning text-warning-content"
                        }`}
                      >
                        {app.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentApplications.length === 0 && (
              <div className="p-8 text-center text-base-content/50">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>You haven't applied to any tutors yet.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* 4. Mini Info Card / Next Steps (Spans 1 column) */}
        <motion.div
          variants={itemVariants}
          className="bg-primary text-primary-content rounded-2xl shadow-md p-6 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Background decorative element */}
          <div className="absolute -right-8 -top-8 opacity-10">
            <GraduationCap className="w-48 h-48" />
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Need a specific tutor?</h3>
            <p className="text-primary-content/80 mb-6 text-sm leading-relaxed">
              Can't find the perfect match in our tutor list? Create a public
              tuition post detailing your requirements, and qualified tutors
              will apply to you directly.
            </p>
          </div>

          <Link
            to="/dashboard/my-posts"
            className="btn bg-base-100 text-primary border-none hover:bg-base-200 w-full shadow-sm relative z-10"
          >
            Create a Post Now
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentDashboardHome;
