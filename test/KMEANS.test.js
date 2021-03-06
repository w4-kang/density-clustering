require('should');
var KMEANS = require('../lib/index.js').KMEANS;

describe('KMEANS', function() {

  describe('run', function() {
    it('should return correct clusters', function() {
      var kmeans = new KMEANS();
      var k = 3;
      var dataset = [
        [1,1],[0,1],[1,0],
        [10,10],[10,13],[13,13],
        [54,54],[55,55],[89,89],[57,55]
      ];

      var clusters = kmeans.run(dataset, k);
      clusters.should.have.lengthOf(k);
      clusters.forEach(function(cluster) {
        (cluster instanceof Array).should.be.true;
        cluster.length.should.be.greaterThan(0);
      });

    });

    it('should return correct clusters for high dimensional data', function() {
      var kmeans = new KMEANS();
      var k = 4;
      var dataset = generateData(k, 10, 10);

      var clusters = kmeans.run(dataset, k);
      clusters.should.have.lengthOf(k);
      clusters.forEach(function(cluster) {
        (cluster instanceof Array).should.be.true;
        cluster.length.should.be.greaterThan(0);
      });

    });

  });

  describe('randomCentroid', function() {
    it('should return extremes', function() {
      var dataset = [
        [-10, -20], [0,0], [30, 20]
      ];
      var kmeans = new KMEANS(dataset);

      var centroid = kmeans.randomCentroid();
      centroid[0].should.be.within(-10, 30);
      centroid[1].should.be.within(-20, 20);
    });
  });

});

function generateData(clusters, points, dimensions) {
  var dataset = [];

  for (var i = 0; i < clusters; i++) {
    for (var p = 0; p < points; p++) {
      var point = new Array(dimensions);
      for (var d = 0; d < dimensions; d++) {
        point[d] = Math.random() + (i * 100);
      }
      dataset.push(point);
    }
  }

  return dataset;
}
