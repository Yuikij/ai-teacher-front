import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 重置错误状态
    setError('');
    
    // 验证邮箱
    if (!email) {
      setError('请输入邮箱地址');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('请输入有效的邮箱地址');
      return;
    }
    
    // 模拟API请求
    try {
      setIsLoading(true);
      // 这里应该是实际的API调用
      await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络请求
      setIsSubmitted(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('发送重置密码邮件失败，请稍后重试');
      console.error('重置密码请求失败:', err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">找回密码</h1>
          <p className="mt-2 text-gray-600">
            输入您的电子邮箱，我们将向您发送重置密码的链接
          </p>
        </div>
        
        {!isSubmitted ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                电子邮箱
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`block w-full pl-10 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                disabled={isLoading}
              >
                {isLoading ? '发送中...' : '发送重置链接'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="inline-block text-sm text-blue-600 hover:text-blue-500"
              >
                返回登录
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="rounded-full bg-green-100 p-4 inline-flex items-center justify-center mb-4">
              <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">邮件已发送</h2>
            <p className="text-gray-600 mb-6">
              我们已向 <span className="font-medium">{email}</span> 发送了重置密码链接。
              请检查您的邮箱并点击链接完成密码重置。
            </p>
            <p className="text-gray-500 text-sm mb-4">
              如果您没有收到邮件，请检查垃圾邮件文件夹，或者
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              尝试重新发送
            </button>
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-block text-sm text-blue-600 hover:text-blue-500"
              >
                返回登录页面
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 