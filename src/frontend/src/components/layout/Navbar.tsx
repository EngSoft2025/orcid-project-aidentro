import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserInfoModal from "@/components/UserInfoModal";
import { getCurrentUserIdentity, getUserIdentity, UserIdentity } from "@/api/orcidApi";
import { getStoredOrcidId, isOrcidAuthenticated } from "@/utils/orcidAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Book,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import { currentUser } from "@/data/mockData";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userIdentity, setUserIdentity] = useState<UserIdentity | null>(null);
  const isLoggedIn = isOrcidAuthenticated(); // Use real ORCID authentication status
  const navigate = useNavigate();

  const mainNavItems = [
    { name: "Membership", href: "https://info.orcid.org/membership/" },
    { name: "Documentation", href: "https://info.orcid.org/documentation/" },
    { name: "News & Events", href: "https://info.orcid.org/news-events/" },
    { name: "Resources", href: "/resources", hasDropdown: true },
    { name: "For Researchers", href: "/researchers", hasDropdown: true },
  ];

  const researcherDropdownItems = [
    { name: "Benefits", href: "https://info.orcid.org/researcher-faq/" },
    { name: "Tools", href: "https://info.orcid.org/video-tutorials/" },
  ];

  const resourcesDropdownItems = [
    { name: "FAQs", href: "/resources/faqs" },
  ];

  // Load user identity on component mount
  useEffect(() => {
    const loadUserIdentity = async () => {
      if (isLoggedIn) {
        try {
          const storedOrcidId = getStoredOrcidId();
          if (storedOrcidId) {
            const identity = await getUserIdentity(storedOrcidId);
            identity.authenticated = true;
            setUserIdentity(identity);
          }
        } catch (error) {
          // Silently handle error - user can still click to try again
        }
      }
    };

    loadUserIdentity();
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Remove ORCID authentication (localStorage/session)
    localStorage.removeItem("orcid_access_token");
    localStorage.removeItem("orcid_id");
    toast.success("Signed out successfully");
    navigate("/signin");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-orcid-green flex items-center justify-center">
              <span className="font-bold text-white">ID</span>
            </div>
            <span className="font-bold text-xl hidden md:block">ORCID</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {/* Links sem dropdown */}
            <div className="flex items-center space-x-6">
              {mainNavItems
                .filter((item) => !item.hasDropdown)
                .map((item) => (
                  item.href.startsWith('http') ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orcid-green font-medium"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-700 hover:text-orcid-green font-medium"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
            </div>

            {/* Divisória */}
            <div className="border-l border-gray-300 h-6 mx-4"></div>

            {/* Itens com dropdown */}
            <div className="flex items-center space-x-3">
              {mainNavItems
                .filter((item) => item.hasDropdown)
                .map((item) => (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-gray-700 hover:text-orcid-green"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-white">
                      {item.name === "For Researchers"
                        ? researcherDropdownItems.map((subItem) => (
                            <DropdownMenuItem key={subItem.name} asChild>
                              {subItem.href.startsWith('http') ? (
                                <a
                                  href={subItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full cursor-pointer"
                                >
                                  {subItem.name}
                                </a>
                              ) : (
                                <Link
                                  to={subItem.href}
                                  className="w-full cursor-pointer"
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </DropdownMenuItem>
                          ))
                        : resourcesDropdownItems.map((subItem) => (
                            <DropdownMenuItem key={subItem.name} asChild>
                              <Link
                                to={subItem.href}
                                className="w-full cursor-pointer"
                              >
                                {subItem.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/search" className="text-gray-600 hover:text-orcid-green">
              <Search className="h-5 w-5" />
            </Link>

            {isLoggedIn ? (
              <>
                <div className="hidden sm:flex items-center space-x-2">
                  {/* User Profile Modal Button */}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="p-2"
                    onClick={async () => {
                      // Always try to fetch fresh identity if logged in, or set default if not
                      try {
                        const storedOrcidId = getStoredOrcidId();
                        if (storedOrcidId && isOrcidAuthenticated()) {
                          const identity = await getUserIdentity(storedOrcidId);
                          identity.authenticated = true;
                          setUserIdentity(identity);
                        } else {
                          // Set default values for non-logged-in users
                          setUserIdentity({
                            orcid_id: 'Unknown',
                            name: 'Unknown User',
                            email: undefined,
                            current_affiliation: undefined,
                            current_location: undefined,
                            profile_url: 'https://orcid.org',
                            authenticated: false
                          });
                        }
                      } catch (error) {
                        // Set default values on error
                        setUserIdentity({
                          orcid_id: 'Unknown',
                          name: 'Unknown User',
                          email: undefined,
                          current_affiliation: undefined,
                          current_location: undefined,
                          profile_url: 'https://orcid.org',
                          authenticated: false
                        });
                      }
                      setIsUserModalOpen(true);
                    }}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  
                  {/* Dashboard Link Button */}
                  <Link to="/dashboard">
                    <Button variant="ghost" className="py-1 px-3">
                      <span className="hidden md:block">Dashboard</span>
                      <span className="md:hidden">Dash</span>
                    </Button>
                  </Link>
                  {/* Logout Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2"
                    title="Sign out"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/register" className="hidden md:block">
                  <Button
                    variant="outline"
                    className="border-orcid-green text-orcid-green hover:bg-orcid-green hover:text-white"
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button className="bg-orcid-green hover:bg-orcid-green/90">
                    <LogIn className="h-4 w-4 mr-2" />
                    <span>Sign in</span>
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-3 py-2 border-t lg:hidden">
            <div className="space-y-2 pt-2 pb-3">
              {mainNavItems.map((item) => (
                item.href.startsWith('http') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orcid-green rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orcid-green rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              {!isLoggedIn && (
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orcid-green rounded-md md:hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orcid-green rounded-md sm:hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

            {/* User Info Modal */}
      {isUserModalOpen && userIdentity && (
        <UserInfoModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          userIdentity={userIdentity}
        />
      )}


      </nav>
  );
};

export default Navbar;
