const { Observable } = require("rxjs");

const obs = new Observable((subscriber) => {
  subscriber.next("titi");
  subscriber.next(123);

  setTimeout(() => {
    subscriber.next(false);
    subscriber.complete();
  }, 1000);
});

obs.subscribe({
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
});
