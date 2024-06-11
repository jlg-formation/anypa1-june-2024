const { Observable } = require("rxjs");

const obs = new Observable((subscriber) => {
  subscriber.next("titi");
  subscriber.next(123);

  const timer = setTimeout(() => {
    console.log("run setTimeout");
    subscriber.next(false);
    subscriber.error(new Error("oups"));
  }, 1000);

  return () => {
    console.log("fin de vie");
    clearTimeout(timer);
  };
});

const subscription = obs.subscribe({
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

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 500);
