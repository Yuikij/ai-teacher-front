import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook, faUser, faChalkboardTeacher, faLaptop, faBrain } from '@fortawesome/free-solid-svg-icons';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">个性化AI教师平台</h1>
              <p className="text-xl mb-6">打造专属于您的学习体验，AI教师为您的学习提供一对一辅导和支持。</p>
              <div className="flex space-x-4">
                <Link to="/teachers" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium shadow-md transition duration-300">
                  开始学习
                </Link>
                <Link to="/about" className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition duration-300">
                  了解更多
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="/hero-image.svg" alt="AI Teacher" className="w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">平台特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">专业AI教师</h3>
              <p className="text-gray-600 text-center">
                选择适合您的AI教师，获得个性化的学习指导和反馈，提升学习效果。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="bg-indigo-100 text-indigo-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={faBook} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">丰富知识库</h3>
              <p className="text-gray-600 text-center">
                访问全面的学习资料、题库和笔记，帮助您系统性地掌握知识。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
              <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={faBrain} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">智能学习计划</h3>
              <p className="text-gray-600 text-center">
                根据您的学习目标和进度，智能生成个性化学习计划和每日任务。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">如何使用</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">选择AI教师</h3>
              <p className="text-gray-600">
                根据您的学习需求和偏好，选择最适合您的AI教师。
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">设定学习目标</h3>
              <p className="text-gray-600">
                明确您的学习目标和期望，AI会为您制定个性化学习计划。
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">开始学习之旅</h3>
              <p className="text-gray-600">
                按照计划学习，与AI教师互动，完成练习，跟踪您的学习进度。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始您的学习之旅了吗？</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            立即注册，体验AI教师带给您的全新学习方式。
          </p>
          <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium shadow-lg inline-block transition duration-300">
            免费注册
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 