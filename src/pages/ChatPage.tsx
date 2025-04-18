import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone, faImage, faFile, faEllipsisH, faQuestionCircle, faBookOpen, faTasks } from '@fortawesome/free-solid-svg-icons';
import { chatApi } from '../services/api';
import { processTextStream } from '../utils/streamUtils';

// Mock data for teachers
const MOCK_TEACHERS = [
  {
    id: '1',
    name: '李教授',
    avatar: 'https://ui-avatars.com/api/?name=李教授&background=0D8ABC&color=fff',
    subject: '数学',
  },
  {
    id: '2',
    name: '王老师',
    avatar: 'https://ui-avatars.com/api/?name=王老师&background=5F4B8B&color=fff',
    subject: '物理',
  },
  {
    id: '3',
    name: '陈教授',
    avatar: 'https://ui-avatars.com/api/?name=陈教授&background=E65100&color=fff',
    subject: '英语',
  },
  {
    id: '4',
    name: '张老师',
    avatar: 'https://ui-avatars.com/api/?name=张老师&background=2E7D32&color=fff',
    subject: '化学',
  },
  {
    id: '5',
    name: '赵教授',
    avatar: 'https://ui-avatars.com/api/?name=赵教授&background=C62828&color=fff',
    subject: '计算机科学',
  },
  {
    id: '6',
    name: '黄老师',
    avatar: 'https://ui-avatars.com/api/?name=黄老师&background=00695C&color=fff',
    subject: '历史',
  },
];

// Message interface
interface Message {
  id: string;
  sender: 'user' | 'teacher';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

// Chat suggestions
const CHAT_SUGGESTIONS = [
  '您能解释一下这个概念吗？',
  '我对这个题目不太理解，能帮我讲解一下吗？',
  '这个知识点有哪些应用场景？',
  '能给我一些练习题来巩固这个知识点吗？',
  '我在解题时遇到了困难，能给我一些提示吗？',
];

const ChatPage: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [teacher, setTeacher] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load teacher data
  useEffect(() => {
    const foundTeacher = MOCK_TEACHERS.find(t => t.id === teacherId);
    if (foundTeacher) {
      setTeacher(foundTeacher);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        sender: 'teacher',
        content: `您好！我是${foundTeacher.name}，${foundTeacher.subject}教师。很高兴能帮助您学习，请问有什么我可以协助您的吗？`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [teacherId]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMessageId,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Create an initial empty message for the teacher's response
    const teacherMessageId = (Date.now() + 1).toString();
    const teacherMessage: Message = {
      id: teacherMessageId,
      sender: 'teacher',
      content: '',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, teacherMessage]);
    setStreamingMessageId(teacherMessageId);
    
    try {
      // 调用真实API获取流式响应
      const stream = await chatApi.streamChat(inputMessage);
      
      // 处理流式响应
      if (stream) {
        // 用于累积消息内容
        let fullContent = '';
        
        await processTextStream(
          stream,
          // 每接收到一块数据时更新消息内容
          (chunk) => {
            // 累积内容
            fullContent += chunk;
            
            // 处理可能的换行
            const formattedContent = fullContent
              .replace(/\n/g, '<br>') // 将换行符转换为HTML换行
              .replace(/<br><br>/g, '<br>'); // 防止多余的换行
            
            setMessages(prev => {
              return prev.map(msg => 
                msg.id === teacherMessageId
                  ? { ...msg, content: formattedContent }
                  : msg
              );
            });
          },
          // 接收完成时
          () => {
            // 最终内容处理，移除可能残留的HTML转义问题
            const finalContent = fullContent
              .replace(/&nbsp;/g, ' ') // 处理可能的&nbsp;
              .replace(/<br><br>/g, '<br>'); // 防止多余的换行
              
            setMessages(prev => {
              return prev.map(msg => 
                msg.id === teacherMessageId
                  ? { ...msg, content: finalContent }
                  : msg
              );
            });
            
            setIsTyping(false);
            setStreamingMessageId(null);
          },
          // 错误处理
          (error) => {
            console.error('Error in stream processing:', error);
            setIsTyping(false);
            setStreamingMessageId(null);
            
            // 更新消息状态为错误
            setMessages(prev => prev.map(msg => 
              msg.id === teacherMessageId
                ? { ...msg, content: '抱歉，我遇到了一些问题，请稍后再试。', status: 'error' }
                : msg
            ));
          }
        );
      } else {
        throw new Error('Stream is null');
      }
    } catch (error) {
      console.error('Failed to get response:', error);
      setIsTyping(false);
      setStreamingMessageId(null);
      
      // 更新消息状态为错误
      setMessages(prev => prev.map(msg => 
        msg.id === teacherMessageId
          ? { ...msg, content: '抱歉，我无法连接到服务器，请检查网络连接或稍后再试。', status: 'error' }
          : msg
      ));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  // Format the date/time for messages
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!teacher) {
    return <div className="container mx-auto px-4 py-8 text-center">正在加载...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b shadow-sm py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={teacher.avatar} 
              alt={teacher.name} 
              className="w-10 h-10 rounded-full mr-3" 
            />
            <div>
              <h2 className="font-bold text-lg">{teacher.name}</h2>
              <p className="text-sm text-gray-600">{teacher.subject} 教师</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FontAwesomeIcon icon={faBookOpen} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FontAwesomeIcon icon={faTasks} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'teacher' && (
                <img 
                  src={teacher.avatar} 
                  alt={teacher.name} 
                  className="w-10 h-10 rounded-full mr-3 self-end" 
                />
              )}
              
              <div 
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border rounded-tl-none shadow-sm'
                } ${message.status === 'error' ? 'border-red-300' : ''}`}
              >
                <div 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: message.content || (message.id === streamingMessageId ? ' ' : '') 
                  }}
                />
                <div 
                  className={`text-xs mt-1 text-right ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <img 
                  src="https://ui-avatars.com/api/?name=Me&background=4F46E5&color=fff" 
                  alt="Me" 
                  className="w-10 h-10 rounded-full ml-3 self-end" 
                />
              )}
            </div>
          ))}
          
          {isTyping && !streamingMessageId && (
            <div className="flex mb-4 justify-start">
              <img 
                src={teacher.avatar} 
                alt={teacher.name} 
                className="w-10 h-10 rounded-full mr-3 self-end" 
              />
              <div className="bg-white text-gray-800 border rounded-2xl rounded-tl-none shadow-sm p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Chat Suggestions */}
      <div className="bg-white border-t px-4 py-3">
        <div className="container mx-auto max-w-4xl overflow-x-auto">
          <div className="flex space-x-2">
            {CHAT_SUGGESTIONS.map((suggestion, index) => (
              <button 
                key={index}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm whitespace-nowrap"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="bg-white border-t px-4 py-3">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSendMessage} className="flex items-end">
            <div className="flex-1 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <div className="px-3 py-2">
                <textarea
                  className="w-full bg-transparent border-0 focus:ring-0 resize-none outline-none"
                  placeholder="输入您的问题..."
                  rows={2}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isTyping}
                />
              </div>
              <div className="flex items-center px-3 py-2 border-t">
                <button type="button" className="p-1 text-gray-500 hover:text-gray-700" disabled={isTyping}>
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <button type="button" className="p-1 ml-2 text-gray-500 hover:text-gray-700" disabled={isTyping}>
                  <FontAwesomeIcon icon={faFile} />
                </button>
                <button type="button" className="p-1 ml-2 text-gray-500 hover:text-gray-700" disabled={isTyping}>
                  <FontAwesomeIcon icon={faMicrophone} />
                </button>
                <button type="button" className="p-1 ml-2 text-gray-500 hover:text-gray-700" disabled={isTyping}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
            </div>
            <button 
              type="submit"
              className="ml-3 px-4 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={!inputMessage.trim() || isTyping}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 