import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLightbulb, faHandshake, faUsers } from '@fortawesome/free-solid-svg-icons';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: '张教授',
      position: '创始人兼首席教育官',
      photo: '/images/teacher1.jpg',
      bio: '前某知名大学计算机系教授，在教育和人工智能领域有20年研究经验。'
    },
    {
      name: '李博士',
      position: '首席技术官',
      photo: '/images/teacher2.jpg',
      bio: '人工智能专家，曾在世界顶尖科技公司担任研发主管，专注于自然语言处理。'
    },
    {
      name: '王工程师',
      position: '高级软件架构师',
      photo: '/images/teacher3.jpg',
      bio: '拥有丰富的教育科技经验，专注于创建易于使用且高效的学习平台。'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 关于我们 */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-12">关于我们</h1>
          <p className="text-lg mb-6">
            AI教师平台成立于2023年，是一家致力于通过人工智能技术革新教育方式的教育科技公司。我们的使命是让每个人都能获得个性化的、高质量的教育资源，无论他们身在何处。
          </p>
          <p className="text-lg mb-6">
            我们的平台融合了最先进的自然语言处理和机器学习技术，开发了一系列能够理解学生需求、提供个性化指导的AI教师。这些AI教师不仅具备专业知识，还能够根据每个学生的学习风格和进度调整教学方法。
          </p>
          <p className="text-lg">
            我们相信，技术与教育的结合将为学习带来革命性的变化，而我们正站在这场变革的最前沿。
          </p>
        </section>

        {/* 我们的价值观 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">我们的价值观</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">教育赋能</h3>
              </div>
              <p className="text-gray-700">
                我们相信教育是改变人生的最强大工具，致力于让高质量教育资源触手可及。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FontAwesomeIcon icon={faLightbulb} className="text-xl text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">创新精神</h3>
              </div>
              <p className="text-gray-700">
                我们不断探索教育的新可能性，将前沿技术与教育学原理相结合。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FontAwesomeIcon icon={faHandshake} className="text-xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold">诚信可靠</h3>
              </div>
              <p className="text-gray-700">
                我们保持透明度和诚信，确保用户数据安全，并提供可靠的服务。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <FontAwesomeIcon icon={faUsers} className="text-xl text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold">以学习者为中心</h3>
              </div>
              <p className="text-gray-700">
                我们以学习者的需求和成长为核心，设计一切产品和服务。
              </p>
            </div>
          </div>
        </section>

        {/* 团队介绍 */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10">我们的团队</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-blue-200"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.position}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 