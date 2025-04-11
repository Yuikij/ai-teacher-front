import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook, faUser } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />
            <h1 className="text-xl font-bold">AI教师平台</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/teachers" className="flex items-center space-x-1 hover:text-blue-200 transition">
              <FontAwesomeIcon icon={faGraduationCap} />
              <span>教师系统</span>
            </Link>
            <Link to="/knowledge" className="flex items-center space-x-1 hover:text-blue-200 transition">
              <FontAwesomeIcon icon={faBook} />
              <span>知识库系统</span>
            </Link>
            <Link to="/user" className="flex items-center space-x-1 hover:text-blue-200 transition">
              <FontAwesomeIcon icon={faUser} />
              <span>我的系统</span>
            </Link>
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 