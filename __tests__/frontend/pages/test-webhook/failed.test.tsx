import { render } from '@testing-library/react';
import WebhookFailedPage from '../../../../pages/test-webhook/failed';
import mockRouter from '../../../../util/test/mock-route';

jest.mock('next/router', () => ({ useRouter: () => mockRouter({}) }));

describe('Webhook Failed Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<WebhookFailedPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('times-circle');
    expect(rendered.baseElement).toHaveTextContent(
      'The webhook you provided was invalid.'
    );
  });
});
