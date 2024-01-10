const express = require("express"); // 다운받은 express module을 가져옴
const app = express(); // express 앱을 만듬
const port = 5000; // port를 백 서버로 둠

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://jeno:wogns11250%40@cluster0.oyo4bhr.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // 제거
      // useFindAndModify: false, // 제거
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// root 디렉토리에 가면 Hello World를 보여줌
app.get("/", (req, res) => {
  res.send("Hello World! 안녕하세요!!!");
});

// 5000번 port에서 실행하는 것
// listen을 하면 실행이 되는 것
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
