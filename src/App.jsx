import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CourseDetail from './pages/CourseDetail'
import CourseLearning from './pages/CourseLearning'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import StudentDashboard from './pages/StudentDashboard'
import MyLearning from './pages/MyLearning'
import InstructorDashboard from './pages/InstructorDashboard'
import CreateCourse from './pages/CreateCourse'
import Profile from './pages/Profile'

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function BareLayout({ children }) {
  return <div className="min-h-screen">{children}</div>
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/catalog" element={<MainLayout><Catalog /></MainLayout>} />
      <Route path="/courses/:slug" element={<MainLayout><CourseDetail /></MainLayout>} />
      <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />

      {/* Auth */}
      <Route path="/login" element={<BareLayout><Login /></BareLayout>} />
      <Route path="/signup" element={<BareLayout><Signup /></BareLayout>} />

      {/* Protected */}
      <Route path="/checkout" element={<ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><MainLayout><StudentDashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/my-learning" element={<ProtectedRoute><MainLayout><MyLearning /></MainLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
      <Route path="/learn/:slug" element={<ProtectedRoute><BareLayout><CourseLearning /></BareLayout></ProtectedRoute>} />

      {/* Instructor */}
      <Route path="/instructor" element={<ProtectedRoute requireInstructor><MainLayout><InstructorDashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/instructor/create-course" element={<ProtectedRoute requireInstructor><BareLayout><CreateCourse /></BareLayout></ProtectedRoute>} />
      <Route path="/instructor/edit-course/:id" element={<ProtectedRoute requireInstructor><BareLayout><CreateCourse /></BareLayout></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={
        <MainLayout>
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
            <h1 className="text-6xl font-black text-gray-200">404</h1>
            <h2 className="text-2xl font-bold text-gray-900">Page not found</h2>
            <a href="/" className="btn-primary">Go Home</a>
          </div>
        </MainLayout>
      } />
    </Routes>
  )
}
