
import { Navigate, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import About from './components/About'
import Myprojects from './components/Myprojects'
import FeaturedArticles from './components/FeaturedArticles'
import Gallery from './components/Gallery'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FeaturedTutorials from './components/FeaturedTutorials'
import Login from './pages/login'
import Signup from './pages/signup'
import Post from './pages/Post'

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
      <Myprojects />
      <FeaturedArticles />
      <FeaturedTutorials />
      <Gallery />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
      
    </Routes>
  )
}

export default App
