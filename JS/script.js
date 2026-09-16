document.getElementById("task1-btn").addEventListener("click", function () {
  var source = document.getElementById("task1-source");
  var target = document.getElementById("task1-target");
  target.textContent = source.textContent;
});

document.getElementById("task2-btn").addEventListener("click", function () {
  var source = document.getElementById("task2-source");
  var dest = document.getElementById("task2-dest");
  var items = source.getElementsByTagName("li");
  var newList = document.createElement("ol");
  newList.setAttribute("type", "a");
  for (var i = 0; i < items.length; i++) {
    var li = document.createElement("li");
    li.textContent = items[i].textContent;
    newList.appendChild(li);
  }
  dest.innerHTML = "";
  dest.appendChild(newList);
});

var task3Img = document.getElementById("task3-img");
var sizeToggled = false;
var borderToggled = false;
var radiusToggled = false;

document.getElementById("task3-size").addEventListener("click", function () {
  if (!sizeToggled) {
    task3Img.style.width = "400px";
    task3Img.style.height = "260px";
  } else {
    task3Img.style.width = "300px";
    task3Img.style.height = "200px";
  }
  sizeToggled = !sizeToggled;
});

document.getElementById("task3-border").addEventListener("click", function () {
  if (!borderToggled) {
    task3Img.style.border = "8px dashed #e74c3c";
  } else {
    task3Img.style.border = "4px solid #1f3a5f";
  }
  borderToggled = !borderToggled;
});

document.getElementById("task3-radius").addEventListener("click", function () {
  if (!radiusToggled) {
    task3Img.style.borderRadius = "50px";
  } else {
    task3Img.style.borderRadius = "0";
  }
  radiusToggled = !radiusToggled;
});

document.getElementById("task3-reset").addEventListener("click", function () {
  task3Img.style.width = "300px";
  task3Img.style.height = "200px";
  task3Img.style.border = "4px solid #1f3a5f";
  task3Img.style.borderRadius = "0";
  sizeToggled = false;
  borderToggled = false;
  radiusToggled = false;
});

task3Img.addEventListener("mouseover", function () {
  task3Img.style.boxShadow = "0 0 18px rgba(46,134,222,0.9)";
  task3Img.style.borderRadius = "25px";
});

task3Img.addEventListener("mouseout", function () {
  task3Img.style.boxShadow = "none";
  if (!radiusToggled) {
    task3Img.style.borderRadius = "0";
  }
});

var task4Img = document.getElementById("task4-img");
var transformValue = document.getElementById("transform-value");

function setTransform(value) {
  task4Img.style.transform = value;
  transformValue.textContent = value;
}

document.getElementById("task4-rotate").addEventListener("click", function () {
  setTransform("rotate(45deg)");
});

document.getElementById("task4-scale").addEventListener("click", function () {
  setTransform("scale(1.3)");
});

document.getElementById("task4-move").addEventListener("click", function () {
  setTransform("translate(60px, 20px)");
});

document.getElementById("task4-skew").addEventListener("click", function () {
  setTransform("skew(20deg, 10deg)");
});

document.getElementById("task4-combine").addEventListener("click", function () {
  setTransform("rotate(30deg) scale(1.2) translate(40px, 10px) skew(10deg, 5deg)");
});

document.getElementById("task4-reset").addEventListener("click", function () {
  setTransform("none");
});

var task5Box = document.getElementById("task5-box");
var task5Label = document.getElementById("task5-label");
var firstAnimation = true;

document.getElementById("task5-btn").addEventListener("click", function () {
  if (firstAnimation) {
    task5Box.style.animation = "animPulse 2s ease-in-out infinite";
    task5Label.textContent = "animPulse";
  } else {
    task5Box.style.animation = "animMove 3s ease-in-out infinite";
    task5Label.textContent = "animMove";
  }
  firstAnimation = !firstAnimation;
});

document.getElementById("task6-btn").addEventListener("click", function () {
  var input = document.getElementById("task6-input").value;
  var pattern = /ur[aâ]t|r[aă]u|murdar/gi;
  var found = input.match(pattern);
  var count = found ? found.length : 0;
  var filtered = input.replace(pattern, "***");
  document.getElementById("task6-result").textContent = filtered;
  document.getElementById("task6-count").textContent = count;
});

document.getElementById("task6-clear").addEventListener("click", function () {
  document.getElementById("task6-input").value = "";
  document.getElementById("task6-result").textContent = "Здесь появится отфильтрованный текст";
  document.getElementById("task6-count").textContent = "0";
});

document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  var login = document.getElementById("login-user").value;
  var password = document.getElementById("login-pass").value;
  var loginError = document.getElementById("login-user-error");
  var passError = document.getElementById("login-pass-error");
  var success = document.getElementById("login-success");
  loginError.textContent = "";
  passError.textContent = "";
  success.textContent = "";
  var loginPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;
  var passPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[_@!#]).{8,}$/;
  var valid = true;
  if (!loginPattern.test(login)) {
    loginError.textContent = "Логин: 6-10 символов, только буквы и цифры, минимум одна заглавная буква и одна цифра.";
    valid = false;
  }
  if (!passPattern.test(password)) {
    passError.textContent = "Пароль: минимум 8 символов, минимум одна заглавная буква, одна цифра и один из символов _, @, !, #.";
    valid = false;
  }
  if (valid) {
    success.textContent = "Вход выполнен успешно!";
  }
});

document.getElementById("forgot-link").addEventListener("click", function (event) {
  event.preventDefault();
});
