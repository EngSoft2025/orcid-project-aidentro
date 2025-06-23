import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  HelpCircle, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Shield, 
  Settings,
  Search,
  User,
  FileText,
  Globe,
  Mail,
  Phone
} from "lucide-react";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>("general");

  const faqData = {
    general: [
      {
        question: "What is ORCID?",
        answer: "ORCID (Open Researcher and Contributor ID) is a unique and persistent digital identifier that distinguishes you from all other researchers. It is a non-profit organization that provides a trusted research infrastructure to connect researchers and their contributions."
      },
      {
        question: "Why do I need an ORCID iD?",
        answer: "An ORCID iD helps ensure your publications, funding, and other contributions are correctly attributed to you, avoiding confusion with researchers who have similar names. It is widely accepted by publishers, funders, and research institutions."
      },
      {
        question: "Is the ORCID iD free?",
        answer: "Yes! Obtaining and maintaining an ORCID iD is completely free for individual researchers. ORCID is funded by member organizations that benefit from the researcher identification infrastructure."
      },
      {
        question: "How can I create my ORCID iD?",
        answer: "You can create your ORCID iD by visiting orcid.org and clicking 'Register for an ORCID iD'. The process is simple and takes just a few minutes. You will need to provide basic information such as name, email, and affiliation."
      }
    ],
    platform: [
      {
        question: "How does this platform work?",
        answer: "This platform is a custom interface to manage and view ORCID data. It allows you to connect your ORCID iD, view your publications, citation metrics, and manage your professional information more intuitively."
      },
      {
        question: "Do I need to be logged in to use the platform?",
        answer: "Some basic features are available without login, but to access your personal data, citation metrics, and advanced features, you need to log in with your ORCID iD."
      },
      {
        question: "How can I connect my ORCID iD to the platform?",
        answer: "Click the 'Sign in' button in the upper right corner and select 'ORCID'. You will be redirected to the ORCID website to authorize access. After authorization, you will be redirected back to the platform."
      },
      {
        question: "Is my information secure?",
        answer: "Yes! The platform follows best security practices and only accesses the information you authorize. Your ORCID credentials are never stored on the platform - only a temporary access token is used."
      }
    ],
    citations: [
      {
        question: "How are citation metrics calculated?",
        answer: "Citation metrics are calculated using data from CrossRef, which is the main source of academic citation information. The system analyzes your publications with DOIs and retrieves the corresponding citations."
      },
      {
        question: "Why do some publications not appear in the metrics?",
        answer: "Publications without a DOI or not indexed in CrossRef may not appear in the metrics. Make sure your publications have valid DOIs and are correctly listed in your ORCID profile."
      },
      {
        question: "How often are the metrics updated?",
        answer: "Metrics are updated in real time when you request an analysis. CrossRef data is updated regularly, so the latest information will be available."
      },
      {
        question: "What is the approximate h-index?",
        answer: "The approximate h-index is an estimate based on your available publications and citations. It is calculated using the same methodology as the traditional h-index, but may vary slightly due to data coverage."
      }
    ],
    technical: [
      {
        question: "Which browsers are supported?",
        answer: "The platform is compatible with all modern browsers, including Chrome, Firefox, Safari, Edge, and other Chromium-based browsers. We recommend using the latest version of your browser."
      },
      {
        question: "Does the platform work on mobile devices?",
        answer: "Yes! The platform is fully responsive and works well on smartphones and tablets. All main features are available on mobile devices."
      },
      {
        question: "How can I export my data?",
        answer: "Currently, data is displayed on the platform. To export complete data from your ORCID profile, you can visit orcid.org directly and use the export options available there."
      },
      {
        question: "What should I do if I encounter an error?",
        answer: "If you encounter an error, try refreshing the page first. If the problem persists, check your internet connection and if you are logged in correctly. For persistent issues, contact us."
      }
    ]
  };

  const categories = [
    { id: "general", name: "General", icon: <HelpCircle className="h-5 w-5" /> },
    { id: "platform", name: "Platform", icon: <Settings className="h-5 w-5" /> },
    { id: "citations", name: "Citations", icon: <FileText className="h-5 w-5" /> },
    { id: "technical", name: "Technical", icon: <Search className="h-5 w-5" /> },
  ];

  const usefulLinks = [
    {
      title: "Official ORCID Documentation",
      description: "Complete guide on how to use ORCID",
      url: "https://info.orcid.org/documentation/",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "Official ORCID FAQ",
      description: "Official frequently asked questions",
      url: "https://info.orcid.org/researcher-faq/",
      icon: <HelpCircle className="h-5 w-5" />
    },
    {
      title: "Video Tutorials",
      description: "Explanatory videos about ORCID",
      url: "https://info.orcid.org/video-tutorials/",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Privacy Policy",
      description: "How your data is protected",
      url: "https://orcid.org/privacy-policy",
      icon: <Shield className="h-5 w-5" />
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <HelpCircle className="h-12 w-12 text-orcid-green" />
                <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to the most common questions about ORCID and our platform.
                If you can't find what you're looking for, contact us.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - FAQ */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {categories.find(c => c.id === activeCategory)?.icon}
                    <span>{categories.find(c => c.id === activeCategory)?.name}</span>
                  </CardTitle>
                  <CardDescription>
                    Frequently asked questions about {categories.find(c => c.id === activeCategory)?.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData[activeCategory as keyof typeof faqData]?.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Useful Links */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="h-5 w-5" />
                    <span>Useful Links</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usefulLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg border border-gray-200 hover:border-orcid-green hover:bg-orcid-green/5 transition-all duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-orcid-green mt-0.5">
                            {link.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">
                              {link.title}
                            </h4>
                            <p className="text-gray-600 text-xs mt-1">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ; 