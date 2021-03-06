import EmberObject, { computed } from '@ember/object';

import { alias } from '@ember/object/computed';
import round from '../../utils/round';

/**
 * SubdistrictTotals is an EmberObject that runs the fundamental calculations of a public schools analysis.
 * It accepts a number attributes that come from the database, stored on the public-schools-analysis model.
 * A SubdistrictTotals object is created for every ps and is school, per subdistrict. And one SubdistrictTotals
 * for the borough wide hs analysis. (@todo a different object should probably exist specifically for hs analysis)
 *
 * @constructor
 * @param {string} level - ps, is, or hs
 *
 * @param {string} borough - Borough if level is hs
 * @param {integer} district - School district if level is ps or is
 * @param {integer} subdistrict - School subdistrict if level is ps or is
 *
 * @param {School[]} allBuildings - Array of all Schools received from the db
 *
 * @param {integer} studentMultiplier - Multiplier for the given level
 * @param {integer} enroll - Future enrollment for given level, subdistrict, and build year
 * @param {integer} students - Future students from sca enrollment projections and any user-inputed future housing development
 * @param {integer} scaCapacityIncrease - Additional school seats provided by future schools (from sca capital plan) user has included in analysis
 * @param {integer} newCapacityWithAction - Additional school seats provided by school built with project
 *
 * @todo rename `buildings` attribut to `schools`
 * @todo experiment with typescript for calculation fragments
 */

export default EmberObject.extend({
  buildings: computed('allBuildings', function() {
    if (this.level === 'hs') {
      return this.allBuildings.filter((b) => b.level === 'hs');
    }
    return this.allBuildings.filter(
      (b) => (
        b.district === this.district
          && b.subdistrict === this.subdistrict
          && b.level === this.level
      ),
    );
  }),

  enrollmentTotal: computed('buildings.@each.enroll', function() {
    return this.buildings.mapBy('enroll').reduce((acc, value) => {
      if (value === undefined) return acc;
      return acc + parseFloat(value);
    }, 0);
  }),

  capacityTotal: computed('buildings.@each.capacity', function() {
    return this.buildings.map(
      (b) => (b.excluded ? 0 : b.capacity),
    ).reduce((acc, value) => {
      if (value === undefined) return acc;
      return acc + parseFloat(value);
    }, 0);
  }),

  capacityTotalNoAction: computed('buildings.@each.capacityFuture', function() {
    return this.buildings.map(
      (b) => (b.excluded ? 0 : b.capacityFuture),
    ).reduce((acc, value) => {
      if (value === undefined) return acc;
      return acc + parseFloat(value);
    }, 0);
  }),

  seatsTotal: computed('buildings.@each.seats', function() {
    return this.buildings.mapBy('seats').reduce((acc, value) => {
      if (value === undefined) return acc;
      return acc + parseFloat(value);
    }, 0);
  }),

  utilizationTotal: computed('enrollmentTotal', 'capacityTotal', function() {
    return round((this.enrollmentTotal / this.capacityTotal), 3);
  }),

  // Totals across all subdistricts
  enrollmentMetaTotal: computed('allBuildings', function() {
    return this.allBuildings.filterBy('level', this.level).mapBy('enroll').reduce((acc, value) => {
      if (value === undefined) return acc;
      return acc + parseFloat(value);
    }, 0);
  }),

  capacityMetaTotal: computed('allBuildings', function() {
    return this.allBuildings.filterBy('level', this.level).map(
      (b) => (b.excluded ? 0 : b.capacity),
    ).reduce((acc, value) => {
      if (value === undefined) return acc;
      return acc + parseFloat(value);
    }, 0);
  }),

  seatsMetaTotal: computed('allBuildings', function() {
    return this.allBuildings.filterBy('level', this.level).mapBy('seats').reduce((acc, value) => {
      if (value === undefined) return acc;
      return acc + parseFloat(value);
    }, 0);
  }),

  utilizationMetaTotal: computed('enrollmentMetaTotal', 'capacityMetaTotal', function() {
    return round((this.enrollmentMetaTotal / this.capacityMetaTotal), 3);
  }),


  // Aggregate Totals
  enrollExistingConditions: alias('enrollmentTotal'),

  enrollNoAction: computed('enroll', 'students', function() {
    return this.enroll + this.students;
  }),
  enrollNoActionDelta: computed('enrollNoAction', 'enrollExistingConditions', function() {
    return this.enrollNoAction - this.enrollExistingConditions;
  }),

  capacityExisting: alias('capacityTotal'),
  capacityFuture: alias('capacityTotalNoAction'),

  capacityNoAction: computed('capacityFuture', 'scaCapacityIncrease', function() {
    return this.capacityFuture + this.scaCapacityIncrease;
  }),
  capacityNoActionDelta: computed('capacityExisting', 'capacityNoAction', function() {
    return this.capacityNoAction - this.capacityExisting;
  }),
  capacityWithAction: computed('capacityNoAction', 'newCapacityWithAction', function() {
    return this.capacityNoAction + this.newCapacityWithAction;
  }),
  capacityWithActionDelta: computed('capacityExisting', 'capacityNoAction', function() {
    return this.capacityWithAction - this.capacityExisting;
  }),
  capacityDifference: computed('capacityNoAction', 'capacityWithAction', function() {
    return this.capacityWithAction - this.capacityNoAction;
  }),
  capacityDeltaDifference: computed('capacityNoActionDelta', 'capacityWithActionDelta', function() {
    return this.capacityWithActionDelta - this.capacityNoActionDelta;
  }),


  seatsNoAction: computed('capacityNoAction', 'enrollNoAction', function() {
    return this.capacityNoAction - this.enrollNoAction;
  }),


  utilizationNoAction: computed('enrollNoAction', function() {
    return round(this.enrollNoAction / this.capacityNoAction, 3);
  }),

});
