import { render } from '@testing-library/react';
import ExpiredPage from '../../../pages/expired';

describe('Expired Link Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<ExpiredPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('times-circle');
    expect(rendered.baseElement).toHaveTextContent('Link has expired');
  });
});
