import axios from 'axios';
import { env } from '../config/env';

// 创建axios实例
const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream',
  },
});

// 聊天相关API
export const chatApi = {
  /**
   * 流式聊天接口
   * @param query 用户输入的问题
   * @returns 返回一个ReadableStream
   */
  streamChat: async (query: string) => {
    try {
      const response = await fetch(`${env.API_BASE_URL}/helloworld/stream/chat?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.body;
    } catch (error) {
      console.error('Stream chat API error:', error);
      throw error;
    }
  }
};

export default {
  chatApi,
}; 