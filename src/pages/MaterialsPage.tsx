import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faVideo, faFile, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { fetchKnowledgeMaterials } from '../services/mockService';

// Material type icons mapping
const typeIcons: { [key: string]: any } = {
  book: faBook,
  video: faVideo,
  document: faFile,
  course: faGraduationCap,
};

// Material type colors mapping
const typeColors: { [key: string]: string } = {
  book: 'bg-blue-100 text-blue-700',
  video: 'bg-red-100 text-red-700',
  document: 'bg-green-100 text-green-700',
  course: 'bg-purple-100 text-purple-700',
};

const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [loading, setLoading] = useState(true);

  // Subjects from materials data
  const subjects = ['全部', '数学', '物理', '英语', '化学', '计算机科学', '历史'];
  // Material types
  const types = ['全部', 'book', 'video', 'document', 'course'];

  // Load materials data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const materialsData = await fetchKnowledgeMaterials();
        setMaterials(materialsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter materials based on search term, subject, and type
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = searchTerm === '' || 
      material.title.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSubject = selectedSubject === '全部' || 
      material.subject === selectedSubject;
      
    const matchesType = selectedType === '全部' || 
      material.type === selectedType;
      
    return matchesSearch && matchesSubject && matchesType;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
        <p className="mt-4">正在加载资料...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">知识资料库</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索资料标题"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          {/* Type Filter */}
          <div className="md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === '全部' ? '全部' : 
                   type === 'book' ? '教材' : 
                   type === 'video' ? '视频' : 
                   type === 'document' ? '文档' : '课程'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${typeColors[material.type]}`}>
                    <FontAwesomeIcon icon={typeIcons[material.type] || faFile} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{material.title}</h3>
                    <p className="text-sm text-gray-500">{material.subject}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${typeColors[material.type]}`}>
                    {material.type === 'book' ? '教材' : 
                     material.type === 'video' ? '视频' : 
                     material.type === 'document' ? '文档' : '课程'}
                  </span>
                  <a 
                    href={material.url} 
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    查看
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">没有找到符合条件的资料。请尝试调整搜索条件。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsPage; 