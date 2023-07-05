const btnXoc = document.querySelector(".btnXoc");
const rs1 = document.querySelector("#result1");
const rs2 = document.querySelector("#result2");
const rs3 = document.querySelector("#result3");
const moneyHTML = document.querySelector("#money");
const betInput = document.querySelectorAll(".betInput");
const btnChot = document.querySelector("#btnChot");
const btnBanMoi = document.querySelector("#btnBanMoi");
const childBetContainer = document.querySelectorAll(".childBetContainer");
const btnLichSu = document.querySelector("#btnLichSu");

var isChot = false;
var isXoc = false;
var getMoneyLocal = localStorage.getItem("betMoney") ?? 100000;
var money = parseInt(getMoneyLocal);
var ordinalNumber = 0;
var betHistory = {};

const randomXoc = () => {
  let random = Math.floor(Math.random() * 6);
  switch (random) {
    case 0:
      return "assets/bau.png";
    case 1:
      return "assets/cua.png";
    case 2:
      return "assets/tom.png";
    case 3:
      return "assets/ca.png";
    case 4:
      return "assets/nai.png";
    case 5:
      return "assets/ga.png";
  }
};

const convertToName = (num) => {
  switch (num) {
    case 0:
      return "assets/bau.png";
    case 1:
      return "assets/cua.png";
    case 2:
      return "assets/tom.png";
    case 3:
      return "assets/ca.png";
    case 4:
      return "assets/nai.png";
    case 5:
      return "assets/ga.png";
  }
};

//default of game
moneyHTML.innerText = money.toLocaleString();
btnXoc.disabled = true;

//button Xoc
btnXoc.addEventListener("click", () => {
  if (isChot && !isXoc) {
    isXoc = true;
    btnXoc.disabled = true;
    var interval = setInterval(() => {
      rs1.setAttribute("src", randomXoc());
      rs2.setAttribute("src", randomXoc());
      rs3.setAttribute("src", randomXoc());
      btnBanMoi.disabled = true;
      btnChot.disabled = true;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      btnBanMoi.disabled = false;
      rs1.setAttribute("src", randomXoc());
      rs2.setAttribute("src", randomXoc());
      rs3.setAttribute("src", randomXoc());
      const tr = document.createElement("tr");
      const stt = document.createElement("td");
      const tienSau = document.createElement("td");
      const tienAn = document.createElement("td");
      const tienTruoc = document.createElement("td");
      const thoiGian = document.createElement("td");
      let moneyBefore = money;
      betInput.forEach((item, index) => {
        if (item.value != "") {
          let count = 0;
          if (convertToName(index) === rs1.getAttribute("src")) {
            count++;
          }
          if (convertToName(index) === rs2.getAttribute("src")) {
            count++;
          }
          if (convertToName(index) === rs3.getAttribute("src")) {
            count++;
          }
          if (count > 0) {
            money += +item.value * count;
            item.parentNode.style.backgroundColor = "#C0FFD3";

            const x = document.createElement("p");
            x.className = "x";
            x.innerText = `x${count}`;
            item.parentNode.appendChild(x);
          } else {
            money -= +item.value;
            item.parentNode.style.backgroundColor = "#FFA1A1";
          }
        }
      });
      stt.innerText = ++ordinalNumber;
      tienTruoc.innerText = moneyBefore.toLocaleString();
      let moneyEarn = parseInt(money) - moneyBefore;
      tienAn.innerText = moneyEarn >= 0 ? `+${moneyEarn}` : `${moneyEarn}`;
      tienSau.innerText = money.toLocaleString();
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      thoiGian.innerText = `${hours}:${minutes}:${seconds}`;

      tr.appendChild(stt);
      tr.appendChild(tienTruoc);
      tr.appendChild(tienAn);
      tr.appendChild(tienSau);
      tr.appendChild(thoiGian);
      const tbody = document.querySelector("#historyTable tbody");
      tbody.appendChild(tr);
      moneyHTML.innerText = money.toLocaleString();
      localStorage.setItem("betMoney", money);
    }, 1500);
  }
});

//Nhap tien cuoc
betInput.forEach((item, index) => {
  item.addEventListener("keydown", function (event) {
    var key = event.key;
    var isNumber = /^[0-9]$/.test(key);
    var isBackspace = key === "Backspace";
    var isTab = key === "Tab";

    if (!isNumber && !isBackspace && !isTab) {
      event.preventDefault();
    }
  });
});

//button Chot
btnChot.addEventListener("click", () => {
  if (!isChot) {
    let totalBet = 0;
    betInput.forEach((item, index) => {
      totalBet += +item.value;
    });
    if (totalBet > money) {
      alert("QUÁ GIỚI HẠN TIỀN CƯỢC !\nVUI LÒNG NHẬP LẠI SỐ TIỀN CƯỢC.");
    } else if (totalBet === 0) {
      alert("CHƯA NHẬP TIỀN CƯỢC !\nVUI LÒNG NHẬP SỐ TIỀN CƯỢC.");
    } else {
      isChot = true;
      btnChot.innerText = "Bỏ chốt";
      btnXoc.disabled = false;
      betInput.forEach((item) => {
        item.disabled = true;
      });
    }
  } else if (isChot && !isXoc) {
    isChot = false;
    btnChot.innerText = "Chốt sổ";
    btnXoc.disabled = true;
    betInput.forEach((item) => {
      item.disabled = false;
    });
  }
});

//tao ban moi
btnBanMoi.addEventListener("click", () => {
  betInput.forEach((item) => {
    item.value = "";
    item.parentNode.style.backgroundColor = "initial";
    item.disabled = false;
  });
  isChot = false;
  isXoc = false;
  btnXoc.disabled = true;
  btnChot.innerText = "Chốt sổ";
  btnChot.disabled = false;
  rs1.setAttribute("src", "assets/white.png");
  rs2.setAttribute("src", "assets/white.png");
  rs3.setAttribute("src", "assets/white.png");
  const x = document.querySelectorAll(".x");
  x.forEach((item) => {
    item.remove();
  });
  if(money==0){
    alert("gà quá cho 2 chục xài chơi nè");
    money = 20000;
  }
});

btnLichSu.addEventListener("click", () => {});

var modal = document.getElementById("historyContainer");
var closeBtn = document.getElementsByClassName("close")[0];

btnLichSu.addEventListener("click", function () {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
