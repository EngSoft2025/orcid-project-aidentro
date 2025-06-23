import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import UserInfoModal from "@/components/UserInfoModal"
import {
  getUserIdentity,
  UserIdentity,
} from "@/api/orcidApi"
import {
  getStoredOrcidId,
  isOrcidAuthenticated,
  clearOrcidAuth,
} from "@/utils/orcidAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Search,
  User,
  X,
} from "lucide-react"
import { isDebugMode, getDebugOrcidId } from "@/utils/debugConfig"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [mobileResearchersOpen, setMobileResearchersOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [userIdentity, setUserIdentity] = useState<UserIdentity | null>(null)
  const isLoggedIn = isDebugMode() ? true : isOrcidAuthenticated()

  const mainNavItems = [
    { name: "Membership", href: "https://info.orcid.org/membership/", external: true },
    { name: "Documentation", href: "https://info.orcid.org/documentation/", external: true },
    { name: "News & Events", href: "https://info.orcid.org/news-events/", external: true },
  ]

  const resourcesDropdownItems = [
    { name: "FAQs", href: "/faq", external: false },
  ]

  const researcherDropdownItems = [
    { name: "Benefits", href: "https://info.orcid.org/researcher-faq/", external: true },
    { name: "Tools", href: "https://info.orcid.org/video-tutorials/", external: true },
  ]

  useEffect(() => {
    const loadUser = async () => {
      if (isLoggedIn) {
        try {
          const id = isDebugMode() ? getDebugOrcidId() : getStoredOrcidId()
          if (id) {
            const identity = await getUserIdentity(id)
            identity.authenticated = true
            setUserIdentity(identity)
          }
        } catch {
          // ignore
        }
      }
    }
    loadUser()
  }, [isLoggedIn])

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-orcid-green flex items-center justify-center">
            <span className="font-bold text-white">ID</span>
          </div>
          <span className="font-bold text-xl hidden md:block">ORSync</span>
        </Link>

        {/* desktop menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {mainNavItems.map((item) =>
            item.external ? (
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
            ),
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span className="text-gray-700 hover:text-orcid-green">Resources</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {resourcesDropdownItems.map((sub) => (
                <DropdownMenuItem key={sub.name} asChild>
                  {sub.external ? (
                    <a
                      href={sub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      {sub.name}
                    </a>
                  ) : (
                    <Link to={sub.href} className="w-full">
                      {sub.name}
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span className="text-gray-700 hover:text-orcid-green">For Researchers</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {researcherDropdownItems.map((sub) => (
                <DropdownMenuItem key={sub.name} asChild>
                  <a
                    href={sub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    {sub.name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* actions */}
        <div className="flex items-center space-x-3">
          <Link to="/search" className="text-gray-600 hover:text-orcid-green">
            <Search className="h-5 w-5" />
          </Link>

          {isLoggedIn && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileResourcesOpen(false)} // reuse for notification
                className="p-2"
                title="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600 hover:text-orcid-green" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUserModalOpen(true)}
                className="p-2"
                title="Profile"
              >
                <User className="h-5 w-5 text-gray-600 hover:text-orcid-green" />
              </Button>

              <Link to="/dashboard">
                <Button variant="ghost" className="py-1 px-3">
                  <span className="hidden md:block">Dashboard</span>
                  <span className="md:hidden">Dash</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  clearOrcidAuth()
                  window.location.reload()
                }}
                className="p-2"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-600 hover:text-orcid-green" />
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <Link to="/login">
              <Button variant="ghost" size="icon" className="p-2" title="Login">
                <LogIn className="h-5 w-5 text-gray-600 hover:text-orcid-green" />
              </Button>
            </Link>
          )}

          {/* mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 mt-2 pb-4">
          <ul className="space-y-1 px-2">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-orcid-green"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-orcid-green"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}

            <li>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-50 hover:text-orcid-green"
              >
                Resources <ChevronDown className="h-4 w-4" />
              </button>
              {mobileResourcesOpen && (
                <ul className="mt-1 ml-4 space-y-1">
                  {resourcesDropdownItems.map((sub) => (
                    <li key={sub.name}>
                      {sub.external ? (
                        <a
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-1 text-gray-600 hover:bg-gray-50 hover:text-orcid-green rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <Link
                          to={sub.href}
                          className="block px-3 py-1 text-gray-600 hover:bg-gray-50 hover:text-orcid-green rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={() => setMobileResearchersOpen(!mobileResearchersOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-50 hover:text-orcid-green"
              >
                For Researchers <ChevronDown className="h-4 w-4" />
              </button>
              {mobileResearchersOpen && (
                <ul className="mt-1 ml-4 space-y-1">
                  {researcherDropdownItems.map((sub) => (
                    <li key={sub.name}>
                      <a
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-1 text-gray-600 hover:bg-gray-50 hover:text-orcid-green rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-orcid-green"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      clearOrcidAuth()
                      window.location.reload()
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-50 hover:text-orcid-green"
                  >
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* user info modal */}
      {isUserModalOpen && userIdentity && (
        <UserInfoModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          userIdentity={userIdentity}
        />
      )}
    </nav>
  )
}

export default Navbar
