import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosNormal from "../../hooks/useAxiosNormal";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const axiosNormal = useAxiosNormal();

  const onSubmit = async (data) => {
    const result = await axiosNormal.post("/contact", data);
    // console.log(result);

    if (result.data.customerSuccess && result.data.adminSuccess) {
      Swal.fire({
        title: "Message Sent To Site Admin Successfully",
        text: "Thank you for reaching out. We will get back to you shortly.",
        icon: "success",
        background: "var(--color-base-100)",
        color: "var(--color-base-content)",
        confirmButtonColor: "var(--color-primary)",
      });
    } else {
      Swal.fire({
        title:
          "Something Went Wrong Maybe We Won't Be Able To Contact You Properly",
        text: "Sorry For The Issue",
        icon: "error",
        background: "var(--color-base-100)",
        color: "var(--color-base-content)",
        confirmButtonColor: "var(--color-warning)",
      });
    }

    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-base-content sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-base-content/70">
          Have a question or need assistance? Fill out the form below and our
          team will help you out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        {/* Contact Information Panel */}
        <div className="bg-primary p-8 text-primary-content flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <p className="mb-8 text-primary-content/80">
            Whether you are looking for support or have a general inquiry, we
            are here to provide simple and effective solutions.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-primary-content/80" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-primary-content/80" />
              <span>+880 1234 567890</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary-content/80" />
              <span>support@example.com</span>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="p-8 bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full bg-base-200 focus:input-primary"
                placeholder="John Doe"
              />
              {errors.name && (
                <span className="text-error text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="input input-bordered w-full bg-base-200 focus:input-primary"
                placeholder="john@example.com"
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Message
                </span>
              </label>
              <textarea
                rows={4}
                {...register("message", { required: "Message is required" })}
                className="textarea textarea-bordered w-full bg-base-200 focus:textarea-primary text-base"
                placeholder="How can we help you?"
              />
              {errors.message && (
                <span className="text-error text-sm mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting} // 4. Disable button during submission
              className="btn btn-primary w-full flex justify-center items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
