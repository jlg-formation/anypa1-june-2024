const { map, interval, Observable } = require("rxjs");

// const map = (func) => (obs) => {
//   return new Observable((subscriber) => {
//     obs.subscribe({
//       next: (data) => {
//         subscriber.next(func(data));
//       },
//     });
//   });
// };

map((x) => x * 10)(
  map((x) => x - 2)(map((x) => x - 2)(interval(1000)))
).subscribe(console.log);

interval(1000)
  .pipe(
    map((x) => x - 2),
    map((x) => x - 2),
    map((x) => x * 10)
  )
  .subscribe(console.log);
