import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: %s, %s alterado para: %s`, event.eventData.id, event.eventData.name, event.eventData.newAddress); 
  }
}
