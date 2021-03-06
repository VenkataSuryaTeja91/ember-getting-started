import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

const DUMMY_ELEMENT = {};

moduleFor('service:maps', 'Unit | Service | maps', {
  // Specify the other units that are required for this test.
  needs: ['util: google-maps']
});

let MapUtilStub = Ember.Object.extend({
  createMap(element, locator) {
    this.assert.ok(element, 'createMap called with element');
    this.assert.ok(element, 'createMap called with location');
    return DUMMY_ELEMENT;
  }
})

// Replace this with your real tests.
test('it exists', function (assert) {
  let service = this.subject();
  assert.ok(service);
});

test('should create a new map if one isnt cached for location', function (assert) {
  assert.expect(4);
  let stubMapUtil = MapUtilStub.create({
    assert
  });

  let mapService = this.subject({
    mapUtil: stubMapUtil
  });

  let element = mapService.getMapElement('San Francisco');
  assert.ok(element, 'element exists');
  assert.ok(element.className, 'map', 'element has classname of map');
});

test('should use existing map if one is cached for location', function (assert) {
  assert.expect(1);
  let stubCachedMaps = Ember.Object.create({
    sanFrancisco: DUMMY_ELEMENT
  });
  let mapService = this.subject({ cachedMaps: stubCachedMaps });
  let element = mapService.getMapElement('San Francisco');
  assert.equal(element, DUMMY_ELEMENT, 'element fetched from cache');
});
