import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faFlag, faCalendar, faClock, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { fetchUserProfile, fetchUserRecords, fetchUserGoals, fetchUserSchedule, fetchUserDaily } from '../services/mockService';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await fetchUserProfile();
        setProfile(profileData);
        
        const recordsData = await fetchUserRecords();
        setRecords(recordsData);
        
        const goalsData = await fetchUserGoals();
        setGoals(goalsData);
        
        const scheduleData = await fetchUserSchedule();
        setSchedule(scheduleData);
        
        const dailyData = await fetchUserDaily();
        setDaily(dailyData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
        <p className="mt-4">正在加载用户数据...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">我的系统</h1>
      
      {/* Tabs */}
      <div className="mb-8 border-b">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            个人信息
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'records'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('records')}
          >
            <FontAwesomeIcon icon={faHistory} className="mr-2" />
            学习记录
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'goals'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('goals')}
          >
            <FontAwesomeIcon icon={faFlag} className="mr-2" />
            学习目标
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'schedule'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('schedule')}
          >
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            课程安排
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'daily'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('daily')}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            本日计划
          </button>
        </nav>
      </div>
      
      {/* Content based on active tab */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && profile && (
          <div>
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                <p className="text-gray-600 mb-4">{profile.level}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">电子邮箱</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">注册日期</p>
                    <p className="font-medium">{profile.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">最近活动</p>
                    <p className="font-medium">{profile.lastActive}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">兴趣科目</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">学习统计</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-blue-500 text-xl font-bold">{records.length}</div>
                  <div className="text-gray-600">学习记录</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-green-500 text-xl font-bold">
                    {records.reduce((total: number, record: any) => total + record.duration, 0)}分钟
                  </div>
                  <div className="text-gray-600">学习时长</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-purple-500 text-xl font-bold">
                    {goals.filter((goal: any) => goal.progress >= 80).length}
                  </div>
                  <div className="text-gray-600">接近完成的目标</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Records Tab */}
        {activeTab === 'records' && (
          <div>
            <h2 className="text-xl font-bold mb-4">我的学习记录</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">科目</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">主题</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">教师</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时长</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.topic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.teacher}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.duration}分钟</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">我的学习目标</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                添加目标
              </button>
            </div>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{goal.title}</h3>
                      <p className="text-gray-600 mt-1">{goal.target}</p>
                      <p className="text-sm text-gray-500 mt-2">截止日期: {goal.deadline}</p>
                    </div>
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        goal.progress >= 80 
                          ? 'bg-green-100 text-green-800' 
                          : goal.progress >= 40 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${
                          goal.progress >= 80 
                            ? 'bg-green-500' 
                            : goal.progress >= 40 
                            ? 'bg-yellow-500' 
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">我的课程安排</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                编辑安排
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">星期</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">科目</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">教师</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedule.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.startTime} - {item.endTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Daily Tab */}
        {activeTab === 'daily' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">本日学习计划</h2>
              <div className="text-gray-500">
                {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </div>
            </div>
            <div className="space-y-3">
              {daily.map((item) => (
                <div key={item.id} className="flex items-center p-3 border rounded-lg bg-white hover:bg-gray-50">
                  <div className="flex-shrink-0 mr-4">
                    <input 
                      type="checkbox" 
                      checked={item.completed} 
                      onChange={() => {}} 
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className={`font-medium ${item.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {item.task}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                查看完整计划
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage; 