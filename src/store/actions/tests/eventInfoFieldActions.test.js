import {
  TOGGLE_EVENT_INFO_FIELD,
  CHANGE_POSITION
} from '../../../constants/action-types';
import {
  toggleEventInfoField,
  changeEventInfoPosition
} from '../eventInfoFieldActions';

describe('InfoFieldActions', () => {
  it('toggleEventInfoField()', () => {
    const curTarget = '';
    const expectedAction = {
      type: TOGGLE_EVENT_INFO_FIELD,
      payload: curTarget
    }
    expect(toggleEventInfoField(curTarget)).toEqual(expectedAction);
  })

  it('changeEventInfoPosition()', () => {
    const posX = '';
    const posY = '';
    const expectedAction = {
      type: CHANGE_POSITION,
      payload: {
        posX,
        posY
      }
    }
    expect(changeEventInfoPosition(posX, posY)).toEqual(expectedAction);
  })
})
