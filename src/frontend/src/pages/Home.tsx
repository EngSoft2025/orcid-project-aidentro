import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Search, 
  Users, 
  User, 
  Shield, 
  BookOpen, 
  TrendingUp,
  ArrowRight,
  Home as HomeIcon
} from "lucide-react";
import { isOrcidAuthenticated, getStoredOrcidId } from "@/utils/orcidAuth";
import { getUserIdentity, UserIdentity, initiateOrcidAuth } from "@/api/orcidApi";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";

const Home = () => {
  const navigate = useNavigate();
  const [userIdentity, setUserIdentity] = useState<UserIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (isOrcidAuthenticated()) {
          const storedOrcidId = getStoredOrcidId();
          if (storedOrcidId) {
            const identity = await getUserIdentity(storedOrcidId);
            identity.authenticated = true;
            setUserIdentity(identity);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        toast.error("Erro ao carregar dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleOrcidSignIn = () => {
    toast.info("Redirecting to ORCID...");
    initiateOrcidAuth('/authenticate');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orcid-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-3 mb-6">
              <HomeIcon className="h-8 w-8 text-orcid-green" />
              <h1 className="text-3xl font-bold text-gray-900">Home</h1>
            </div>
            
            {userIdentity ? (
              <div className="bg-gradient-to-r from-orcid-green/10 to-orcid-green/5 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-orcid-green flex items-center justify-center">
                    <span className="font-bold text-white text-lg">ID</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Welcome, {userIdentity.name}!
                    </h2>
                    <p className="text-gray-600">ORCID: {userIdentity.orcid_id}</p>
                    {userIdentity.current_affiliation && (
                      <p className="text-sm text-gray-500">
                        {userIdentity.current_affiliation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-50 to-orcid-green/5 rounded-lg p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Welcome to the ORCID Platform
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Connect with your researcher identity and explore the global research network
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-orcid-green hover:bg-green-600 text-white px-6 py-2"
                      onClick={handleOrcidSignIn}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Connect with ORCID
                    </Button>
                    <Link to="/search">
                      <Button variant="outline" className="px-6 py-2">
                        <Search className="h-4 w-4 mr-2" />
                        Explore Researchers
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main Actions Section - Show different content based on login status */}
        {userIdentity ? (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  What would you like to do?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Access your connections, manage your profile, or explore researchers on the ORCID platform.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Ver Conexões */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-500 hover:border-t-blue-600 w-full max-w-sm lg:w-80 flex flex-col">
                  <CardHeader className="text-center flex-shrink-0">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">View Connections</CardTitle>
                    <CardDescription>
                      Explore your professional connections and collaborations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-grow flex flex-col">
                    <p className="text-gray-600 mb-6 flex-grow">
                      View your connections with other researchers, institutions, and research projects.
                    </p>
                    <Link to="/connections" className="mt-auto">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Users className="h-4 w-4 mr-2" />
                        View Connections
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Acesso ao Perfil */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-green-500 hover:border-t-green-600 w-full max-w-sm lg:w-80 flex flex-col">
                  <CardHeader className="text-center flex-shrink-0">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Profile Access</CardTitle>
                    <CardDescription>
                      Manage and update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-grow flex flex-col">
                    <p className="text-gray-600 mb-6 flex-grow">
                      Access and edit your ORCID profile, publications, affiliations, and other professional information.
                    </p>
                    <Link to="/dashboard" className="mt-auto">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <User className="h-4 w-4 mr-2" />
                        Access Profile
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Botão de Pesquisa */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-purple-500 hover:border-t-purple-600 w-full max-w-sm lg:w-80 flex flex-col">
                  <CardHeader className="text-center flex-shrink-0">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Search</CardTitle>
                    <CardDescription>
                      Find researchers and publications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-grow flex flex-col">
                    <p className="text-gray-600 mb-6 flex-grow">
                      Search for researchers, publications, and institutions in the ORCID database.
                    </p>
                    <Link to="/search" className="mt-auto">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Explore the Platform
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Search for researchers and publications in the ORCID database.
                </p>
              </div>

              <div className="flex justify-center">
                {/* Botão de Pesquisa para usuários logados */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-purple-500 hover:border-t-purple-600 w-full max-w-sm lg:w-80 flex flex-col">
                  <CardHeader className="text-center flex-shrink-0">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Search</CardTitle>
                    <CardDescription>
                      Find researchers and publications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-grow flex flex-col">
                    <p className="text-gray-600 mb-6 flex-grow">
                      Search for researchers, publications, and institutions in the ORCID database.
                    </p>
                    <Link to="/search" className="mt-auto">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Quick Stats Section - Only show when user is logged in */}
        {userIdentity && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Activity Summary
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 md:p-6 text-center">
                  <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xl md:text-2xl font-bold text-blue-600">0</p>
                  <p className="text-xs md:text-sm text-blue-700">Publications</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 md:p-6 text-center">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xl md:text-2xl font-bold text-green-600">0</p>
                  <p className="text-xs md:text-sm text-green-700">Connections</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 md:p-6 text-center">
                  <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-xl md:text-2xl font-bold text-purple-600">0</p>
                  <p className="text-xs md:text-sm text-purple-700">Citations</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 md:p-6 text-center">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-xl md:text-2xl font-bold text-orange-600">100%</p>
                  <p className="text-xs md:text-sm text-orange-700">Profile Complete</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quick Actions Footer - Only show when user is logged in */}
        {userIdentity && (
          <section className="py-8 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-orcid-green text-orcid-green hover:bg-orcid-green hover:text-white">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Button>
                </Link>
                
                <Link to="/search" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Home;
