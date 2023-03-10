import { render } from '@testing-library/react';
import DeleteIndexPage from '../../../../pages/delete/[token]';

jest.mock('../../../../services/repositories/webhook_token', () => ({
  ...jest.requireActual,
  getWebhookByToken: () => jest.fn(),
}));

describe('Delete Account Page', () => {
  it('renders without crashing when there is no token', async () => {
    const rendered = render(<DeleteIndexPage token={null} exists={false} />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('question-circle');
    expect(rendered.baseElement).toHaveTextContent('Account not found');
  });

  it('renders without crashing when there is token', async () => {
    const rendered = render(<DeleteIndexPage token={'abcde'} exists={true} />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('exclamation-triangle');
    expect(rendered.baseElement).toHaveTextContent('Delete Account');
  });
});
