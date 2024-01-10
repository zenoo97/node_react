const express = require("express"); // 다운받은 express module을 가져옴
const app = express(); // express 앱을 만듬
const port = 5000; // port를 백 서버로 둠
const { User } = require("./models/Users");
const bodyParser = require("body-parser");

const config = require("./config/key");
// bodyParser가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있게 하는 것인데,
// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 하는 것
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 타입으로 된 것을 분석해서 가져올 수 있게 하기 위해서 추가
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // 제거
    // useFindAndModify: false, // 제거
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// root 디렉토리에 가면 Hello World를 보여줌
app.get("/", (req, res) => {
  res.send("Hello World! 안녕하세요!!!!");
});

// 회원가입을 위한 route 만들기
// app.post("/register", (req, res) => {
//   // 회원 가입 할 때 필요한 정보들을 client 에서 가져오면
//   // 그것들을 데이터 베이스에 넣어준다.
//   // 이전에 만든 model을 가져와야 한다.

//   // req body 안에는 json 형식으로
//   // {
//   //   id: "hello",
//   //   password: "123",
//   //   이런 식으로 들어가 있다 -> 이렇게 req body 안에 있을 수 있게 가능하게 한 것은 body-parser가 있어서 가능했던 것이다.
//   // }
//   // db에 넣기 위해서 req.body
//   const user = new User(req.body);
//   user.save((err, userInfo) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({
//       success: true,
//     });
//   }); // save 해주면 정보들이 user model에 저장이 된 것
// });

// 회원가입을 위한 route 만들기
app.post("/register", async (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client 에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  // 이전에 만든 model을 가져와야 한다.

  // req body 안에는 json 형식으로
  // {
  //   id: "hello",
  //   password: "123",
  //   이런 식으로 들어가 있다 -> 이렇게 req body 안에 있을 수 있게 가능하게 한 것은 body-parser가 있어서 가능했던 것이다.
  // }
  // db에 넣기 위해서 req.body
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.json({ success: false, err });
  }
});

// 5000번 port에서 실행하는 것
// listen을 하면 실행이 되는 것
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
