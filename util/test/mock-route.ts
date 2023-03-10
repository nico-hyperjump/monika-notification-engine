import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export default function mockRouter(query: ParsedUrlQuery): NextRouter {
  return {
    basePath: '',
    isLocaleDomain: false,
    query: query,
    route: '/',
    pathname: '',
    asPath: '',
    push: jest.fn(),
    events: {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    },
    reload: jest.fn(),
    back: jest.fn(),
    isFallback: false,
    isPreview: false,
    isReady: true,
    replace: jest.fn(),
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  };
}
