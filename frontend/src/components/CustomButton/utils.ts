import { COLORS } from '../../utils/constants';

export const getPulseLoaderColor = (look: 'primary' | 'secondary' | 'cancel') => {
  switch (look) {
    case 'primary':
      return COLORS.tertiaryColor;
    case 'secondary':
      return COLORS.primaryColor;
    case 'cancel':
      return COLORS.dangerColor;

    default:
      return COLORS.secondaryColor;
  }
};
