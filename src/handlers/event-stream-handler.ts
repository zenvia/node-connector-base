import { IMessageDto } from "../zenvia-custom-service/message";
import { send } from "../zenvia-custom-service/message-handler-service";

export async function eventStreamHandler(msg: IMessageDto): Promise<void> {
  await send(msg)
}
