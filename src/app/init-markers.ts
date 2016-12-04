export class Init {
  load() {
    if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
      console.log('No markers found...Creating');

      var markers = [
        {
          name: 'Company One',
          lat: 40.7064,
          lng: -73.9536,
          draggable: true
        },
        {
          name: 'Company Two',
          lat: 41.3083,
          lng: -72.9279,
          draggable: true
        },
        {
          name: 'Company Three',
          lat: 41.0534,
          lng: -73.5387,
          draggable: false
        }
      ];

      localStorage.setItem('markers', JSON.stringify(markers));
      return;
    } else {
      console.log('Loading markers...');
    }
  }
}
