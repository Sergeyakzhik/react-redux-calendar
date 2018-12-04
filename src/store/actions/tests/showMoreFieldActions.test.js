import { TOGGLE_SHOW_MORE_FIELD } from '../../../constants/action-types';
import { toggleShowMoreField } from '../showMoreFieldActions';

describe('EventTransformation', () => {
  it('toggleShowMoreField()', () => {
    const isActive = true;
    const events = {};
    const expectedAction = {
      type: TOGGLE_SHOW_MORE_FIELD,
      payload: {
        isActive,
        events
      }
    }
    expect(toggleShowMoreField(isActive, events)).toEqual(expectedAction);
  })
})
