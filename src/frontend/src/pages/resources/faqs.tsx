import React from "react";
import Layout from "@/components/layout/Layout";

const faqs = [
  {
    question: "What is ORCID?",
    answer:
      "ORCID provides a unique digital identifier that distinguishes you from every other researcher and, through integration in key research workflows such as manuscript and grant submission, supports automated linkages between you and your professional activities.",
  },
  {
    question: "How do I connect my ORCID iD to this platform?",
    answer:
      "Click the 'Connect ORCID' button on the dashboard or home page and follow the authentication steps. You will be redirected to ORCID to authorize access.",
  },
  {
    question: "Is my data private?",
    answer:
      "We only access and display public information from your ORCID profile, or data you have authorized us to view. You are always in control of your data visibility on ORCID.",
  },
  {
    question: "Can I import my publications from other sources?",
    answer:
      "Yes, you can import publications from Google Scholar and other sources using the import tools available in your dashboard.",
  },
];

const FaqsPage = () => (
  <Layout>
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h1>
      <p className="mb-8 text-gray-700">
        Here you'll find answers to common questions about ORCID and using this platform. If you have other questions, feel free to contact our support team.
      </p>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-orcid-green mb-2">{faq.question}</h2>
            <p className="text-gray-800">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default FaqsPage; 