export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export class MessagingService {
  private static STORAGE_KEY = 'devcaliber_messages';

  static sendMessage(from: string, to: string, content: string): boolean {
    try {
      const messages = this.getAllMessages();
      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        from,
        to,
        content,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      messages.push(newMessage);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  static getMessagesForUser(userEmail: string): Message[] {
    const messages = this.getAllMessages();
    return messages.filter(msg => msg.to === userEmail).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  static getUnreadCount(userEmail: string): number {
    const messages = this.getMessagesForUser(userEmail);
    return messages.filter(msg => !msg.read).length;
  }

  static markAsRead(messageId: string): void {
    const messages = this.getAllMessages();
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      message.read = true;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
    }
  }

  private static getAllMessages(): Message[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
  }
}
