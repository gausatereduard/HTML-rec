window.addEventListener("load", function () {
    alert("Добро пожаловать!");
});

var defaultBg = "https://placehold.co/600x400/4a90d9/ffffff?text=Main";

function changeBgImage(src) {
    var table = document.getElementById("bgTable");
    table.style.backgroundImage = "url('" + src + "')";
}

function restoreBgImage() {
    var table = document.getElementById("bgTable");
    table.style.backgroundImage = "url('" + defaultBg + "')";
}

document.addEventListener("DOMContentLoaded", function () {
    var askNameBtn = document.getElementById("askNameBtn");
    var nameResult = document.getElementById("nameResult");
    askNameBtn.addEventListener("click", function () {
        var name = prompt("Введите имя учащегося:");
        if (name !== null && name.trim() !== "") {
            nameResult.textContent = "Привет, " + name.trim() + "! Добро пожаловать на страницу лабораторной работы № 6.";
        } else {
            nameResult.textContent = "Имя не введено.";
        }
    });

    var cells = document.querySelectorAll("#bgTable .cell");
    cells.forEach(function (cell) {
        var src = cell.getAttribute("data-img");
        cell.addEventListener("mouseover", function () {
            changeBgImage(src);
        });
        cell.addEventListener("mouseout", function () {
            restoreBgImage();
        });
    });

    var toggleBtn = document.getElementById("toggleBorderBtn");
    var bgTable = document.getElementById("bgTable");
    toggleBtn.addEventListener("click", function () {
        if (bgTable.classList.contains("with-border")) {
            bgTable.classList.remove("with-border");
            bgTable.classList.add("no-border");
        } else {
            bgTable.classList.remove("no-border");
            bgTable.classList.add("with-border");
        }
    });

    var keyField = document.getElementById("keyField");
    var demoParagraph = document.getElementById("demoParagraph");
    var demoImage = document.getElementById("demoImage");

    var pFontSize = demoParagraph.style.fontSize || "";
    var pBg = demoParagraph.style.backgroundColor || "";
    var pColor = demoParagraph.style.color || "";
    var pBorder = demoParagraph.style.border || "";
    var pPadding = demoParagraph.style.padding || "";

    var imgWidth = demoImage.style.width || "";
    var imgBorder = demoImage.style.border || "";
    var imgTransform = demoImage.style.transform || "";

    keyField.addEventListener("keydown", function () {
        demoParagraph.style.fontSize = "22px";
        demoParagraph.style.backgroundColor = "#f9ebae";
        demoParagraph.style.color = "#7e5109";
        demoParagraph.style.border = "3px solid #e67e22";
        demoParagraph.style.padding = "18px";

        demoImage.style.width = "360px";
        demoImage.style.border = "4px solid #e67e22";
        demoImage.style.transform = "rotate(2deg)";
    });

    keyField.addEventListener("keyup", function () {
        demoParagraph.style.fontSize = pFontSize;
        demoParagraph.style.backgroundColor = pBg;
        demoParagraph.style.color = pColor;
        demoParagraph.style.border = pBorder;
        demoParagraph.style.padding = pPadding;

        demoImage.style.width = imgWidth;
        demoImage.style.border = imgBorder;
        demoImage.style.transform = imgTransform;
    });

    var submitBtn = document.getElementById("submitBtn");
    var task5Result = document.getElementById("task5Result");
    submitBtn.addEventListener("click", function () {
        var day = parseInt(document.getElementById("day").value, 10);
        var month = parseInt(document.getElementById("month").value, 10);
        var year = parseInt(document.getElementById("year").value, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            task5Result.textContent = "Введите число, месяц и год рождения.";
            return;
        }

        var birth = new Date(year, month - 1, day);
        if (birth.getDate() !== day || birth.getMonth() !== month - 1 || birth.getFullYear() !== year) {
            task5Result.textContent = "Введена некорректная дата рождения.";
            return;
        }

        var ok = confirm("Хочешь ответ сейчас?");
        if (ok) {
            var now = new Date();
            var age = now.getFullYear() - year;
            var m = now.getMonth() - (month - 1);
            if (m < 0 || (m === 0 && now.getDate() < day)) {
                age--;
            }
            task5Result.textContent = "Ваш возраст: " + age + " лет.";
        } else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0");
            var yyyy = today.getFullYear();
            task5Result.textContent = "Текущая дата: " + dd + "." + mm + "." + yyyy;
        }
    });
});
