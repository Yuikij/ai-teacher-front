import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faGraduationCap} className="text-xl" />
              <h2 className="text-lg font-bold">AI教师平台</h2>
            </div>
            <p className="text-gray-400 max-w-md">
              打造个性化学习体验，让AI为您的学习提供最优质的辅导和支持。
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">教师系统</h3>
              <ul className="space-y-2">
                <li><a href="/teachers" className="text-gray-400 hover:text-white transition">教师列表</a></li>
                <li><a href="/teachers/chat" className="text-gray-400 hover:text-white transition">教师对话</a></li>
                <li><a href="/teachers/exercises" className="text-gray-400 hover:text-white transition">练习题</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">知识库系统</h3>
              <ul className="space-y-2">
                <li><a href="/knowledge/materials" className="text-gray-400 hover:text-white transition">资料</a></li>
                <li><a href="/knowledge/exercises" className="text-gray-400 hover:text-white transition">题库</a></li>
                <li><a href="/knowledge/notes" className="text-gray-400 hover:text-white transition">笔记</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">我的系统</h3>
              <ul className="space-y-2">
                <li><a href="/user/profile" className="text-gray-400 hover:text-white transition">个人信息</a></li>
                <li><a href="/user/records" className="text-gray-400 hover:text-white transition">学习记录</a></li>
                <li><a href="/user/goals" className="text-gray-400 hover:text-white transition">学习目标</a></li>
                <li><a href="/user/schedule" className="text-gray-400 hover:text-white transition">课程安排</a></li>
                <li><a href="/user/daily" className="text-gray-400 hover:text-white transition">本日计划</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center md:text-left">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} AI教师平台. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 