import Mock from 'mockjs';

// Configure Mock.js
Mock.setup({
  timeout: '200-600' // Simulate network delay
});

// Generate teacher data
const teachers = [
  {
    id: '1',
    name: '李教授',
    avatar: 'https://ui-avatars.com/api/?name=李教授&background=0D8ABC&color=fff',
    subject: '数学',
    rating: 4.8,
    students: 523,
    description: '拥有15年教学经验的资深数学教师，擅长微积分、线性代数和概率统计，能够将复杂的数学概念简化，让学生轻松理解。',
    specialties: ['微积分', '线性代数', '概率统计'],
    bio: '北京大学数学博士，曾在多所知名高校任教，发表过多篇学术论文，对数学教育有深入研究。教学风格严谨而不失幽默，深受学生喜爱。',
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
    bio: '清华大学物理学博士，曾参与国家重点研究项目，对物理教育有独特见解。擅长通过实验和生活案例让物理知识变得直观易懂。',
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
    bio: '剑桥大学语言学博士，曾在多国生活和工作，对跨文化交流有深刻理解。教学注重实用性和文化背景，让学生不仅学会语言，还能理解语言背后的文化内涵。',
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
    bio: '中国科学院化学博士，曾在著名化学研究所从事研究工作。教学理念是"在实验中学习"，善于设计有趣的实验帮助学生理解化学原理。',
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
    bio: '斯坦福大学计算机科学博士，曾在Google和Microsoft担任高级工程师，拥有多项技术专利。教学注重实战能力的培养，课程内容紧跟行业最新动态。',
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
    bio: '北京大学历史学博士，著有多本历史研究专著，曾参与多个历史纪录片的制作。教学风格生动有趣，善于通过讲故事的方式让历史知识变得鲜活。',
  },
];

// Mock API endpoints
Mock.mock('/api/teachers', 'get', {
  status: 200,
  message: 'success',
  data: teachers
});

Mock.mock(new RegExp('/api/teachers/\\d+'), 'get', (options) => {
  const id = options.url.split('/').pop();
  const teacher = teachers.find(t => t.id === id);
  
  return {
    status: teacher ? 200 : 404,
    message: teacher ? 'success' : 'Teacher not found',
    data: teacher || null
  };
});

// Knowledge resources
const knowledgeResources = {
  materials: [
    { id: '1', title: '高等数学教材', subject: '数学', type: 'book', url: '#' },
    { id: '2', title: '物理学原理', subject: '物理', type: 'book', url: '#' },
    { id: '3', title: '英语语法精讲', subject: '英语', type: 'video', url: '#' },
    { id: '4', title: '有机化学反应机理', subject: '化学', type: 'document', url: '#' },
    { id: '5', title: '算法与数据结构', subject: '计算机科学', type: 'course', url: '#' },
    { id: '6', title: '中国古代史概览', subject: '历史', type: 'document', url: '#' },
  ],
  exercises: [
    { id: '1', title: '微积分习题集', subject: '数学', difficulty: 'medium', count: 50 },
    { id: '2', title: '力学问题实践', subject: '物理', difficulty: 'hard', count: 30 },
    { id: '3', title: '英语写作练习', subject: '英语', difficulty: 'medium', count: 20 },
    { id: '4', title: '化学方程式配平', subject: '化学', difficulty: 'easy', count: 40 },
    { id: '5', title: '算法编程挑战', subject: '计算机科学', difficulty: 'hard', count: 25 },
    { id: '6', title: '历史事件分析', subject: '历史', difficulty: 'medium', count: 15 },
  ]
};

Mock.mock('/api/knowledge/materials', 'get', {
  status: 200,
  message: 'success',
  data: knowledgeResources.materials
});

Mock.mock('/api/knowledge/exercises', 'get', {
  status: 200,
  message: 'success',
  data: knowledgeResources.exercises
});

// User data
const userData = {
  profile: {
    id: '1',
    name: '张三',
    avatar: 'https://ui-avatars.com/api/?name=张三&background=4F46E5&color=fff',
    email: 'zhangsan@example.com',
    level: '高中二年级',
    interests: ['数学', '物理', '计算机科学'],
    joinDate: '2023-05-15',
    lastActive: '2023-10-20',
  },
  records: [
    { id: '1', date: '2023-10-19', subject: '数学', duration: 120, topic: '微积分基础', teacher: '李教授' },
    { id: '2', date: '2023-10-18', subject: '物理', duration: 90, topic: '牛顿运动定律', teacher: '王老师' },
    { id: '3', date: '2023-10-17', subject: '英语', duration: 60, topic: '写作技巧', teacher: '陈教授' },
    { id: '4', date: '2023-10-15', subject: '计算机科学', duration: 150, topic: '算法基础', teacher: '赵教授' },
  ],
  goals: [
    { id: '1', title: '提高数学成绩', target: '期末考试达到90分', deadline: '2023-12-31', progress: 60 },
    { id: '2', title: '掌握英语写作', target: '能写2000字的英文论文', deadline: '2023-11-30', progress: 40 },
    { id: '3', title: '学习编程基础', target: '独立完成一个小型应用', deadline: '2024-01-15', progress: 25 },
  ],
  schedule: [
    { id: '1', day: '周一', subject: '数学', startTime: '15:00', endTime: '16:30', teacher: '李教授' },
    { id: '2', day: '周三', subject: '物理', startTime: '14:00', endTime: '15:30', teacher: '王老师' },
    { id: '3', day: '周四', subject: '英语', startTime: '16:00', endTime: '17:30', teacher: '陈教授' },
    { id: '4', day: '周六', subject: '计算机科学', startTime: '10:00', endTime: '12:00', teacher: '赵教授' },
  ],
  daily: [
    { id: '1', time: '09:00-10:30', task: '数学习题练习', completed: true },
    { id: '2', time: '11:00-12:00', task: '英语听力训练', completed: true },
    { id: '3', time: '14:00-15:30', task: '与王老师进行物理课', completed: false },
    { id: '4', time: '16:00-17:00', task: '复习昨天的学习内容', completed: false },
    { id: '5', time: '19:00-20:30', task: '编程练习', completed: false },
  ]
};

Mock.mock('/api/user/profile', 'get', {
  status: 200,
  message: 'success',
  data: userData.profile
});

Mock.mock('/api/user/records', 'get', {
  status: 200,
  message: 'success',
  data: userData.records
});

Mock.mock('/api/user/goals', 'get', {
  status: 200,
  message: 'success',
  data: userData.goals
});

Mock.mock('/api/user/schedule', 'get', {
  status: 200,
  message: 'success',
  data: userData.schedule
});

Mock.mock('/api/user/daily', 'get', {
  status: 200,
  message: 'success',
  data: userData.daily
});

// API service functions
export const fetchTeachers = async () => {
  return fetch('/api/teachers')
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchTeacherById = async (id: string) => {
  return fetch(`/api/teachers/${id}`)
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchKnowledgeMaterials = async () => {
  return fetch('/api/knowledge/materials')
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchKnowledgeExercises = async () => {
  return fetch('/api/knowledge/exercises')
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchUserProfile = async () => {
  return fetch('/api/user/profile')
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchUserRecords = async () => {
  return fetch('/api/user/records')
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchUserGoals = async () => {
  return fetch('/api/user/goals')
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchUserSchedule = async () => {
  return fetch('/api/user/schedule')
    .then(response => response.json())
    .then(data => data.data);
};

export const fetchUserDaily = async () => {
  return fetch('/api/user/daily')
    .then(response => response.json())
    .then(data => data.data);
}; 