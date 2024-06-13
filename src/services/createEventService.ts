import { EventBridgeClient, PutEventsCommand, PutEventsCommandOutput } from '@aws-sdk/client-eventbridge';
import { CreateItemBody } from '../interfaces/bodyRequest';
import { eventBridgeParamsRequest } from '../interfaces/createEvent';

const eventBridgeClient = new EventBridgeClient({region: "us-east-2"});

export const configureItemSchedule = async (event: CreateItemBody): Promise<PutEventsCommandOutput[]> => {
  const eventParams = event.schedule.map( async (schedule) => {
    const eventbridge: eventBridgeParamsRequest = {
      source: "my.cloudformation",
      Detail: {
        message: schedule.message,
        phoneNumber: event.number_phone
      },
      detailType: "create_event",
      eventBusName: "default",
      time: new Date(schedule.timestamp_date)
    }
    const createEvent = await createItemSchedule(eventbridge);
    return createEvent;
  })
  return Promise.all(eventParams);
};

const createItemSchedule = async (parameter: eventBridgeParamsRequest): Promise<PutEventsCommandOutput> => {
  const eventParams = {
    Entries: [
      {
        Source: parameter.source,
        EventBusName: parameter.eventBusName, 
        DetailType: parameter.detailType,
        Time: parameter.time,
        Detail: JSON.stringify(parameter.Detail),
      },
    ],
  };
  try {
    const command = new PutEventsCommand(eventParams)
    const response = await eventBridgeClient.send(command);
    return response;
  } catch (e) {
    throw new Error(e as string);
  }
};

const removeItemSchedule = async (): Promise<boolean> => {
  return true;
};