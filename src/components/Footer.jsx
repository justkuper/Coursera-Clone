import { Link } from 'react-router-dom'
import { GraduationCap, Twitter, Linkedin, Youtube, Github } from 'lucide-react'

export default function Footer() {
  const links = {
    Company: ['About', 'Careers', 'Press', 'Blog'],
    Learn: ['Courses', 'Categories', 'Free Courses', 'Certifications'],
    Support: ['Help Center', 'Contact Us', 'Accessibility'],
    Legal: ['Terms', 'Privacy Policy', 'Cookie Policy'],
  }
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LearnHub</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">Empowering learners around the world with quality online education.</p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors"><Icon className="w-5 h-5" /></a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-white font-semibold mb-3 text-sm">{section}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} LearnHub, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🌐</span>
            <select className="bg-transparent text-gray-500 focus:outline-none cursor-pointer">
              <option>English</option><option>Spanish</option><option>French</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
