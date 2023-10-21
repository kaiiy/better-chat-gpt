interface EventSourceDataInterface {
  choices: EventSourceDataChoices[];
  created: number;
  id: string;
  model: string;
  object: string;
}

export type EventSourceData = EventSourceDataInterface | '[DONE]';

interface EventSourceDataChoices {
  delta: {
    content?: string;
    role?: string;
  };
  finish_reason?: string;
  index: number;
}
