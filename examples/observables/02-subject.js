const { Subject } = require("rxjs");

const subject = new Subject();

const observer = (name) => ({
  next: (data) => {
    console.log(`${name} data: `, data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
});

subject.next(5);

const s1 = subject.subscribe(observer("s1"));
const s2 = subject.subscribe(observer("s2"));

subject.next(12);

s1.unsubscribe();

subject.next(34);
