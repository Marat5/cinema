import { fireEvent, render } from '@testing-library/react';
import { CustomButton } from './CustomButton';

const BUTTON_TEXT = 'Custom Button';

test('Renders custom button', () => {
  const onClick = jest.fn();

  const { asFragment, getByText } = render(<CustomButton
    onClick={onClick}
    text={BUTTON_TEXT}
  />);

  expect(asFragment()).toMatchSnapshot();
  expect(getByText(BUTTON_TEXT)).toBeInTheDocument();

  fireEvent.click(getByText(BUTTON_TEXT));
  expect(onClick).toBeCalledTimes(1);
});
