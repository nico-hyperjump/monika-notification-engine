import { render } from '@testing-library/react';
import InvalidPage from '../../../pages/invalid';

describe('Invalid Link Page', () => {
  it('renders without crashing', async () => {
    const rendered = render(<InvalidPage />);
    const icon = await rendered.findByTestId('icon');

    expect(icon.getAttribute('data-icon')).toBe('times-circle');
    expect(rendered.baseElement).toHaveTextContent('Invalid Deletion Link');
  });
});
