import { CHANGE_STYLE } from '../../constants/action-types';

export let changeStyle = style => ({
  type: CHANGE_STYLE,
  payload: style
});
