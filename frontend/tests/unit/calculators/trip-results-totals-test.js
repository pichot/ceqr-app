import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import ttrtCalc from 'labs-ceqr/calculators/transportation/trip-results-totals';

const createTripResult = function() {
  return {
    personTrips: {
      am: {
        total: {
          in: 93,
          out: 93,
          total: 186,
        },
        auto: {
          in: 6,
          out: 6,
          total: 12,
        },
        taxi: {
          in: 3,
          out: 3,
          total: 6,
        },
        bus: {
          in: 1,
          out: 1,
          total: 2,
        },
        subway: {
          in: 51,
          out: 51,
          total: 102,
        },
        railroad: {
          in: 1,
          out: 1,
          total: 2,
        },
        walk: {
          in: 31,
          out: 31,
          total: 62,
        },
        allModesTotal: {
          in: 92.86249999999998,
          out: 92.86249999999998,
          total: 185.72499999999997,
        },
      },
      md: {
        total: {
          in: 46,
          out: 46,
          total: 92,
        },
        auto: {
          in: 3,
          out: 3,
          total: 6,
        },
        taxi: {
          in: 2,
          out: 2,
          total: 4,
        },
        bus: {
          in: 0,
          out: 0,
          total: 0,
        },
        subway: {
          in: 25,
          out: 25,
          total: 50,
        },
        railroad: {
          in: 1,
          out: 1,
          total: 2,
        },
        walk: {
          in: 15,
          out: 15,
          total: 30,
        },
        allModesTotal: {
          in: 46.43124999999999,
          out: 46.43124999999999,
          total: 92.86249999999998,
        },
      },
      pm: {
        total: {
          in: 104,
          out: 104,
          total: 208,
        },
        auto: {
          in: 7,
          out: 7,
          total: 14,
        },
        taxi: {
          in: 4,
          out: 4,
          total: 8,
        },
        bus: {
          in: 1,
          out: 1,
          total: 2,
        },
        subway: {
          in: 56,
          out: 56,
          total: 112,
        },
        railroad: {
          in: 2,
          out: 2,
          total: 4,
        },
        walk: {
          in: 34,
          out: 34,
          total: 68,
        },
        allModesTotal: {
          in: 102.14874999999998,
          out: 102.14874999999998,
          total: 204.29749999999996,
        },
      },
      saturday: {
        total: {
          in: 88,
          out: 88,
          total: 176,
        },
        auto: {
          in: 6,
          out: 6,
          total: 12,
        },
        taxi: {
          in: 3,
          out: 3,
          total: 6,
        },
        bus: {
          in: 1,
          out: 1,
          total: 2,
        },
        subway: {
          in: 48,
          out: 48,
          total: 96,
        },
        railroad: {
          in: 1,
          out: 1,
          total: 2,
        },
        walk: {
          in: 29,
          out: 29,
          total: 58,
        },
        allModesTotal: {
          in: 88.32,
          out: 88.32,
          total: 176.64,
        },
      },
    },
  };
};


module('Unit | Calculator | transportation-trip-results-totals', function (hooks) {
  setupTest(hooks);

  test('it calculates personTrips', function (assert) {
    const modes = [
      'auto',
      'taxi',
      'bus',
      'subway',
      'railroad',
      'walk',
    ];

    const tripResults = [
      createTripResult(),
      createTripResult(),
    ];

    const newTtrtCalc = ttrtCalc.create({
      tripResults,
      modes,
    });

    assert.deepEqual(newTtrtCalc.personTrips, {
      am: {
        auto: {
          in: 6,
          out: 6,
          total: 12,
        },
        taxi: {
          in: 3,
          out: 3,
          total: 6,
        },
        bus: {
          in: 1,
          out: 1,
          total: 2,
        },
        subway: {
          in: 51,
          out: 51,
          total: 102,
        },
        railroad: {
          in: 1,
          out: 1,
          total: 2,
        },
        walk: {
          in: 31,
          out: 31,
          total: 62,
        },
      },
      md: {
        auto: {
          in: 3,
          out: 3,
          total: 6,
        },
        taxi: {
          in: 2,
          out: 2,
          total: 4,
        },
        bus: {
          in: 0,
          out: 0,
          total: 0,
        },
        subway: {
          in: 25,
          out: 25,
          total: 50,
        },
        railroad: {
          in: 1,
          out: 1,
          total: 2,
        },
        walk: {
          in: 15,
          out: 15,
          total: 30,
        },
      },
      pm: {
        auto: {
          in: 7,
          out: 7,
          total: 14,
        },
        taxi: {
          in: 4,
          out: 4,
          total: 8,
        },
        bus: {
          in: 1,
          out: 1,
          total: 2,
        },
        subway: {
          in: 56,
          out: 56,
          total: 112,
        },
        railroad: {
          in: 2,
          out: 2,
          total: 4,
        },
        walk: {
          in: 34,
          out: 34,
          total: 68,
        },
      },
      saturday: {
        auto: {
          in: 6,
          out: 6,
          total: 12,
        },
        taxi: {
          in: 3,
          out: 3,
          total: 6,
        },
        bus: {
          in: 1,
          out: 1,
          total: 2,
        },
        subway: {
          in: 48,
          out: 48,
          total: 96,
        },
        railroad: {
          in: 1,
          out: 1,
          total: 2,
        },
        walk: {
          in: 29,
          out: 29,
          total: 58,
        },
      },
    });
  });
});
