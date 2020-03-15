import React from 'react';

export interface MessageOption {
  duration?: number; // 时长，毫秒
}

export type MessageType = 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';

export interface Message {
  id: string;
  type: MessageType;
  content: React.ReactNode;
  option?: MessageOption;
}
