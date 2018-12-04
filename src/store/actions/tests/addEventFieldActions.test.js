import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE
} from '../../../constants/action-types';
import {
  openAddEventField,
  closeAddEventField,
  setInitialDate
} from '../addEventFieldActions';

describe('AddEventFieldActions', () => {
  it('openAddEventField()', () => {
    const isActive = true;
    const expectedAction = {
      type: OPEN_EVENT_FIELD,
      payload: isActive
    }
    expect(openAddEventField(isActive)).toEqual(expectedAction);
  })

  it('closeAddEventField()', () => {
    const isActive = false;
    const expectedAction = {
      type: CLOSE_EVENT_FIELD,
      payload: isActive
    }
    expect(closeAddEventField(isActive)).toEqual(expectedAction);
  })

  it('setInitialDate()', () => {
    const initialDate = {};
    const expectedAction = {
      type: SET_INITIAL_DATE,
      payload: initialDate
    }
    expect(setInitialDate(initialDate)).toEqual(expectedAction);
  })
})
