import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import TeacherCard from '../components/teacher/TeacherCard';

// Mock data for teachers
const MOCK_TEACHERS = [
  {
    id: '1',
    name: '李教授',
    avatar: 'https://ui-avatars.com/api/?name=李教授&background=0D8ABC&color=fff',
    subject: '数学',
    rating: 4.8,
    students: 523,
    description: '拥有15年教学经验的资深数学教师，擅长微积分、线性代数和概率统计，能够将复杂的数学概念简化，让学生轻松理解。',
    specialties: ['微积分', '线性代数', '概率统计'],
  },
  {
    id: '2',
    name: '王老师',
    avatar: 'https://ui-avatars.com/api/?name=王老师&background=5F4B8B&color=fff',
    subject: '物理',
    rating: 4.7,
    students: 412,
    description: '物理学博士，研究方向为量子力学和固体物理，教学风格生动有趣，善于通过实验和实际案例解释物理现象。',
    specialties: ['力学', '电磁学', '量子力学'],
  },
  {
    id: '3',
    name: '陈教授',
    avatar: 'https://ui-avatars.com/api/?name=陈教授&background=E65100&color=fff',
    subject: '英语',
    rating: 4.9,
    students: 698,
    description: '毕业于剑桥大学语言学专业，精通英语语法和写作技巧，能够帮助学生快速提高英语能力和应试技巧。',
    specialties: ['语法', '写作', '口语', '听力'],
  },
  {
    id: '4',
    name: '张老师',
    avatar: 'https://ui-avatars.com/api/?name=张老师&background=2E7D32&color=fff',
    subject: '化学',
    rating: 4.6,
    students: 327,
    description: '化学博士，多年教学经验，专注于有机化学和无机化学研究，教学方法注重实践与理论相结合。',
    specialties: ['有机化学', '无机化学', '分析化学'],
  },
  {
    id: '5',
    name: '赵教授',
    avatar: 'https://ui-avatars.com/api/?name=赵教授&background=C62828&color=fff',
    subject: '计算机科学',
    rating: 4.9,
    students: 845,
    description: '计算机科学博士，曾在知名科技公司担任高级工程师，精通各种编程语言和算法，授课深入浅出。',
    specialties: ['编程', '算法', '数据结构', '人工智能'],
  },
  {
    id: '6',
    name: '黄老师',
    avatar: 'https://ui-avatars.com/api/?name=黄老师&background=00695C&color=fff',
    subject: '历史',
    rating: 4.7,
    students: 289,
    description: '历史学博士，研究方向为中国古代史和世界现代史，讲课生动有趣，善于将历史事件与现代社会联系起来。',
    specialties: ['中国古代史', '世界现代史', '文化研究'],
  },
];

// Subject options for filtering
const SUBJECTS = ['全部', '数学', '物理', '英语', '化学', '计算机科学', '历史'];

const TeacherListPage: React.FC = () => {
  const [teachers, setTeachers] = useState(MOCK_TEACHERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('全部');
  const [minRating, setMinRating] = useState(0);

  // Filter teachers based on search term, subject, and rating
  useEffect(() => {
    let filtered = MOCK_TEACHERS;

    if (searchTerm) {
      filtered = filtered.filter(
        teacher => 
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedSubject !== '全部') {
      filtered = filtered.filter(teacher => teacher.subject === selectedSubject);
    }

    if (minRating > 0) {
      filtered = filtered.filter(teacher => teacher.rating >= minRating);
    }

    setTeachers(filtered);
  }, [searchTerm, selectedSubject, minRating]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI教师列表</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="搜索教师名称、专长或描述"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Subject Filter */}
          <div className="md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">科目</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          {/* Rating Filter */}
          <div className="md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">最低评分</label>
            <div className="flex items-center">
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <option value={0}>全部</option>
                <option value={4.0}>4.0+</option>
                <option value={4.5}>4.5+</option>
                <option value={4.8}>4.8+</option>
              </select>
              <FontAwesomeIcon icon={faStar} className="ml-2 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.length > 0 ? (
          teachers.map(teacher => (
            <TeacherCard key={teacher.id} {...teacher} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">没有找到符合条件的教师。请尝试调整搜索条件。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherListPage; 