import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  public getAll = async (): Promise<Message[]> => {
    return Message.find();
  };

  public createMessage = async (
    sender: string,
    message: string,
  ): Promise<Message> => {
    const newMessage: Message = new Message(sender, message);
    return await newMessage.save();
  };
}
