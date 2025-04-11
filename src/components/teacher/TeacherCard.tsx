import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faComment, faBookOpen } from '@fortawesome/free-solid-svg-icons';

interface TeacherCardProps {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  rating: number;
  students: number;
  description: string;
  specialties: string[];
}

const TeacherCard: React.FC<TeacherCardProps> = ({
  id,
  name,
  avatar,
  subject,
  rating,
  students,
  description,
  specialties,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start">
          <img
            className="h-24 w-24 rounded-full object-cover mr-4 border-2 border-blue-100"
            src={avatar}
            alt={`${name}的头像`}
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-blue-600 font-medium">{subject} 教师</p>
            <div className="flex items-center mt-1 mb-2">
              <div className="flex items-center mr-4">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                <span className="text-gray-700">{rating.toFixed(1)}</span>
              </div>
              <div className="text-gray-500 text-sm">
                {students} 名学生
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 line-clamp-3">{description}</p>
        
        <div className="mt-5 flex justify-between">
          <Link 
            to={`/teachers/${id}/chat`}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FontAwesomeIcon icon={faComment} className="mr-2" />
            开始对话
          </Link>
          
          <Link 
            to={`/teachers/${id}/profile`}
            className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard; 