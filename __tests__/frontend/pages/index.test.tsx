import { render, fireEvent } from '@testing-library/react';
import { ParsedUrlQuery } from 'querystring';
import IndexPage from '../../../pages/index';
import mockRouter from '../../../util/test/mock-route';

const query: ParsedUrlQuery = {};
query['tab'] = 'register';
jest.mock('next/router', () => ({ useRouter: () => mockRouter(query) }));

describe('Index Page', () => {
  it('renders and the fields are editable', async () => {
    const rendered = render(<IndexPage />);
    const phoneInput = await rendered.findByPlaceholderText('1 (702) 123-4567');
    const nameInput = await rendered.findByTestId('name-input');

    fireEvent.input(phoneInput, { target: { value: '6281234567890' } });
    fireEvent.input(nameInput, { target: { value: 'Monika' } });

    expect((phoneInput as HTMLInputElement).value).toBe('+62 812 345 678 90');
    expect((nameInput as HTMLInputElement).value).toBe('Monika');
  });
});
