// 1. 引入http模块
const http = require("http");

// 2. 创建服务
const server = http.createServer(function (req, res) {
  console.log("有人来访问了");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Rquested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  // 向客户端发送内容，并结束本次响应
  res.end(
    JSON.stringify({
      name: "1111",
      url: "https://element-plus.org/images/element-plus-logo.svg",
    })
  );
});
// 3. 启动服务
server.listen(8081, function () {
  console.log("服务器启动成功，请在http://localhost:8081中访问....");
});
