import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = getAuth()
  const isHome = location.pathname === '/home'

  useEffect(() => {
    if (isHome && location.hash) {
      const section = document.getElementById(location.hash.substring(1))
      section?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isHome, location.hash])

  async function handleLogout() {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  function goToSection(section) {
    if (isHome) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/home#${section}`)
    }
  }

  return (
    <nav>
      <Link to={isHome ? '/home' : '/signup'} className="navbar-brand">
        DEV@Deakin
      </Link>

      {isHome && (
        <ul>
          <li><button onClick={() => goToSection('about')}>About</button></li>
          <li><button onClick={() => goToSection('work')}>Work</button></li>
          <li><button onClick={() => goToSection('contact')}>Contact</button></li>
          <li><button onClick={() => navigate('/post')}>New Post</button></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        
        </ul>
      )}
    </nav>
  )
}

export default Navbar