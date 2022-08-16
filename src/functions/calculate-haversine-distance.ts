export function calculateHaversineDistance(
  coordinates1: Array<number>,
  coordinates2: Array<number>
): number {
  var R = 6371; // Radius of the earth in km
  var dLat = degreesToRadians(coordinates2[0] - coordinates1[0]); // deg2rad below
  var dLon = degreesToRadians(coordinates2[1] - coordinates1[1]);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(coordinates1[0])) *
      Math.cos(degreesToRadians(coordinates2[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
