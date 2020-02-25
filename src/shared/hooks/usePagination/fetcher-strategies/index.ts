import rollStrategy from './roll';

const getFetcherStrategy = (type: 'ROLL') => {
  return rollStrategy;
};

export default getFetcherStrategy;
