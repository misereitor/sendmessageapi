import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateItemBody } from '../interfaces/bodyRequest';
import { configureItemSchedule } from '../services/createEventService';

export const receiveAppointment = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Body is required' }),
    };
  }
  let body: CreateItemBody;
  try {
    body = JSON.parse(event.body);
    const createEvent = await configureItemSchedule(body);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Agendamento criado`, createEvent }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Invalid JSON' }),
    };
  }
};