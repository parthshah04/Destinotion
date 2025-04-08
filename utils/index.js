import EventBus from './EventBus';

const defaultTags = {
  type: {
    adventure: false,
    beach: false,
    city: false,
    ski: false,
  },
  temperature: {
    hot: false,
    cold: false,
    temperate: false,
  },
  flight: {
    long: false,
    medium: false,
    short: false,
  },
};

const defaultTagField = {
  type: '',
  temperature: '',
  flight: '',
};

const defaultPlace = {
  name: '',
  description: '',
  img: '',
  visited: 'No',
  visitedDate: '',
  tags: defaultTagField,
};

export {
  EventBus,
  defaultTags,
  defaultTagField,
  defaultPlace,
};
