/**
 * 处理流式响应的工具函数
 */

/**
 * 处理从后端流式接收到的文本
 * @param stream ReadableStream 流
 * @param onChunk 每接收到一块数据时的回调
 * @param onDone 接收完成时的回调
 * @param onError 错误处理回调
 */
export const processTextStream = async (
  stream: ReadableStream<Uint8Array> | null,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (error: Error) => void
) => {
  if (!stream) {
    onError(new Error('Stream is null'));
    return;
  }

  try {
    const reader = stream.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let done = false;
    
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      
      if (done) {
        // 处理缓冲区中的最后数据
        if (buffer.trim()) {
          processBuffer(buffer, onChunk);
        }
        break;
      }
      
      // 将新的数据块添加到缓冲区
      buffer += decoder.decode(value, { stream: true });
      
      // 查找完整的数据行（以\n分隔）
      const lines = buffer.split('\n');
      
      // 保留最后一行（可能不完整）作为新的缓冲区
      buffer = lines.pop() || '';
      
      // 处理完整的行
      for (const line of lines) {
        processLine(line, onChunk);
      }
    }
    
    onDone();
  } catch (error) {
    console.error('Error processing stream:', error);
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
};

/**
 * 处理单行SSE数据
 */
function processLine(line: string, onChunk: (chunk: string) => void) {
  const trimmedLine = line.trim();
  if (!trimmedLine) return;
  
  // 检查是否是SSE数据行
  if (trimmedLine.startsWith('data:')) {
    const content = trimmedLine.substring(5).trim();
    if (content) {
      onChunk(content);
    }
  } else if (!trimmedLine.startsWith(':') && !trimmedLine.startsWith('event:') && !trimmedLine.startsWith('id:')) {
    // 不是SSE控制行，直接作为内容
    onChunk(trimmedLine);
  }
}

/**
 * 处理可能包含多个data:行的缓冲区
 */
function processBuffer(buffer: string, onChunk: (chunk: string) => void) {
  // 查找所有data:开头的段落
  const regex = /data:([^\n]*)/g;
  let match;
  let hasMatches = false;
  
  while ((match = regex.exec(buffer)) !== null) {
    hasMatches = true;
    const content = match[1].trim();
    if (content) {
      onChunk(content);
    }
  }
  
  // 如果没有匹配到data:格式，则将整个缓冲区作为内容处理
  if (!hasMatches && buffer.trim()) {
    onChunk(buffer.trim());
  }
}

export default {
  processTextStream,
}; 