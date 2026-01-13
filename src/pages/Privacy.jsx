import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const primaryColor = "#e888a3";

  return (
    <>
      <Header />

      <div className="bg-[#fffcf9] text-gray-800 font-sans selection:bg-pink-100">

        {/* ===== Header Section ===== */}
        <div className="pt-12 pb-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-pink-400 block mb-4">
              Legal & Trust
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#3d2b24] mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-[15px] leading-relaxed text-gray-400 max-w-2xl mx-auto font-light">
              Your privacy matters to us. This policy explains how Cake & Crumbs
              collects, uses, and protects your personal information.
            </p>
          </div>
        </div>

        {/* ===== Privacy Content Card ===== */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50/50 p-10 md:p-14">

            {/* Section */}
            <section className="mb-10">
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: primaryColor }}
              >
                1. Information We Collect
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                We collect personal information such as your name, email address,
                phone number, delivery details, and order preferences when you
                place an order or contact us through our website.
              </p>
            </section>

            {/* Section */}
            <section className="mb-10">
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: primaryColor }}
              >
                2. How We Use Your Information
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                Your information is used to process orders, manage deliveries,
                communicate updates, improve our services, and provide customer
                support. We only use your data for legitimate business purposes.
              </p>
            </section>

            {/* Section */}
            <section className="mb-10">
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: primaryColor }}
              >
                3. Information Sharing
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                Cake & Crumbs does not sell or rent your personal data. Information
                may only be shared with trusted delivery partners or payment
                providers when necessary to complete your order.
              </p>
            </section>

            {/* Section */}
            <section className="mb-10">
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: primaryColor }}
              >
                4. Data Security
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                We take appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                loss, or misuse.
              </p>
            </section>

            {/* Section */}
            <section className="mb-10">
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: primaryColor }}
              >
                5. Cookies
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                Our website may use cookies to enhance user experience, analyze
                traffic, and improve functionality. You can manage cookie
                preferences through your browser settings.
              </p>
            </section>

            {/* Section */}
            <section className="mb-10">
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: primaryColor }}
              >
                6. Your Rights
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                You have the right to access, update, or request deletion of your
                personal information. For any privacy-related concerns, you may
                contact us directly.
              </p>
            </section>

            {/* Section */}
            <section>
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: primaryColor }}
              >
                7. Policy Updates
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                This privacy policy may be updated from time to time. Any changes
                will be reflected on this page to keep users informed.
              </p>
            </section>

          </div>

          {/* ===== Footer Note ===== */}
          <div className="text-center mt-12">
            <p className="text-[13px] text-gray-400 font-light">
              We are committed to protecting your privacy and maintaining
              transparency in how your information is used.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
