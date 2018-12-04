import { CHANGE_PERIOD } from '../../../constants/action-types';
import { changeTimePeriod } from '../changePeriodAction';

describe('TimePeriodActions', () => {
  it('changeTimePeriod()', () => {
    const period = '';
    const expectedAction = {
      type: CHANGE_PERIOD,
      payload: period
    }
    expect(changeTimePeriod(period)).toEqual(expectedAction);
  })
})
