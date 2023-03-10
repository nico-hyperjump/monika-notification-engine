import { render } from '@testing-library/react';
import WebhookSuccessPage from '../../../../pages/test-webhook/success';
import mockRouter from '../../../../util/test/mock-route';

jest.mock('next/router', () => ({ useRouter: () => mockRouter({}) }));

describe('Webhook Success Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<WebhookSuccessPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('check-circle');
    expect(rendered.baseElement).toHaveTextContent(
      'You should receive a message in your Whatsapp shortly.'
    );
  });
});
