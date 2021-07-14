let btn = document.getElementById("numbers");
let result = document.getElementById("result");
let backResHalf = document.getElementById("back-res-top-half");
let backResTop = document.getElementById("back-res-top");
let backResMedium = document.getElementById("back-res-medium");
let backResBottom = document.getElementById("back-res-bottom");
let gif = document.getElementById("gif");
let btnDelete = document.getElementById("btn-delete");
let mode = document.getElementById("mode");

btn.addEventListener(
  "click",
  (e) => {
    gif.className = "hidden";
    let element = e.target;

    switch (element.textContent) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        result.textContent = result.textContent + element.textContent;
        break;
      case "+":
      case "-":
      case "(":
      case ")":
      case "%":
      case "√":
      case "±":
        result.textContent =
          result.textContent + " " + element.textContent + " ";
        break;
      case "×":
        result.textContent = result.textContent + " " + "*" + " ";
        break;
      case "÷":
        result.textContent = result.textContent + " " + "/" + " ";
        break;
      case "=":
        btnEqual();
        break;
      case "C":
        btnC();
        break;
      default:
        break;
    }
  },
  false
);

function solveCalc() {
  let res = [];
  switch (operation) {
    case "%":
      res = parseFloat(operator / 100).toFixed(6);
      break;
    case "√":
      res = Math.sqrt(parseFloat(operator)).toFixed(6);
      break;
    case "±":
      res = -parseFloat(operator);
      break;
    default:
      break;
  }

  return res;
}

function removeItemFromArr(arr, item) {
  return arr.filter(function (e) {
    return e !== item;
  });
}

function btnEqual() {
  backResHalf.textContent = backResTop.textContent;
  backResTop.textContent = backResMedium.textContent;
  backResMedium.textContent = backResBottom.textContent;
  backResBottom.textContent = result.textContent;

  let separator = result.textContent.split(" ");
  let sep = removeItemFromArr(separator, "");

  let res = [];
  let indexSeparator = [];
  let indexDelete = [];

  //findPar(sep);

  for (let i = 0; i < sep.length; i++) {
    switch (sep[i]) {
      case "%":
        operation = "%";
        operator = sep[i - 1];
        res.push(solveCalc());
        indexSeparator.push(i);
        indexDelete.push(i - 1);
        break;
      case "±":
        operation = "±";
        if (sep[i + 1] == "-") {
          operator = -sep[i + 2];
          indexDelete.push(i + 1);
          indexDelete.push(i + 2);
        } else {
          operator = sep[i + 1];
          indexDelete.push(i + 1);
        }
        res.push(solveCalc());
        indexSeparator.push(i);

        break;
      case "√":
        operation = "√";
        if (sep[i + 1] == "-") {
          result.textContent = "NaN";
        } else {
          operator = sep[i + 1];
          indexDelete.push(i + 1);
        }
        res.push(solveCalc());
        indexSeparator.push(i);
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < indexSeparator.length; i++) {
    sep[indexSeparator[i]] = res[i];
  }

  let count = 0;

  for (let i = 0; i < indexDelete.length; i++) {
    sep.splice(indexDelete[i] - count, 1);
    count += 1;
  }

  sumValue = sep[0];

  for (let i = 1; i < sep.length; i++) {
    sumValue += " " + sep[i];
  }

  result.textContent = sumValue;
  result.textContent = eval(result.textContent);
  if (
    result.textContent == "NaN" ||
    result.textContent == "Infinity" ||
    result.textContent == "-Infinity"
  ) {
    result.textContent = "";
    backResHalf.textContent = "";
    backResTop.textContent = "";
    backResMedium.textContent = "";
    backResBottom.textContent = "";
    gif.className = "show";
  }
}

function btnC() {
  operator = [];
  operation = [];
  result.textContent = "";
  backResHalf.textContent = "";
  backResBottom.textContent = "";
  backResMedium.textContent = "";
  backResTop.textContent = "";
  gif.className = "hidden";
}

btnDelete.addEventListener("click", () => {
  result.textContent = result.textContent.slice(
    0,
    result.textContent.length - 1
  );
});

gif.addEventListener(
  "click",
  () => {
    gif.className = "hidden";
  },
  false
);

function changeMode() {
  let numberMode = document.getElementsByClassName("btn-number-light");
  let princOperMode = document.getElementsByClassName("princ-operation-light");
  let secOperMode = document.getElementsByClassName("sec-operation-light");
  let bodyMode = document.getElementsByClassName("body-light");
  let calcMode = document.getElementsByClassName("calc-light");
  let btnMode = document.getElementsByClassName("btn-mode-light");
  let btnUpMode = document.getElementsByClassName("btn-up-light");
  let pLigth = document.getElementById("p-light");
  let pDark = document.getElementById("p-dark");
  let btnCMode = document.getElementsByClassName("btn-C-light");
  let btnDeleteMode = document.getElementsByClassName("btn-delete-light");
  let btnEqualMode = document.getElementsByClassName("btn-equal-light");
  let iMode = document.getElementsByClassName("i-light");
  let resultMode = document.getElementsByClassName("result-light");
  let backResMode = document.getElementsByClassName("back-res-light");

  let allBtn = [
    {
      btnClass: numberMode,
      btnClassName: "btn-number-dark",
    },
    {
      btnClass: princOperMode,
      btnClassName: "princ-operation-dark",
    },
    {
      btnClass: secOperMode,
      btnClassName: "sec-operation-dark",
    },
    {
      btnClass: bodyMode,
      btnClassName: "body-dark",
    },
    {
      btnClass: calcMode,
      btnClassName: "calc-dark",
    },
    {
      btnClass: btnCMode,
      btnClassName: "btn-C-dark",
    },
    {
      btnClass: btnDeleteMode,
      btnClassName: "btn-delete-dark",
    },
    {
      btnClass: btnEqualMode,
      btnClassName: "btn-equal-dark",
    },
    {
      btnClass: btnMode,
      btnClassName: "btn-mode-dark",
    },
    {
      btnClass: btnUpMode,
      btnClassName: "btn-up-dark",
    },
    {
      btnClass: iMode,
      btnClassName: "i-dark",
    },
    {
      btnClass: resultMode,
      btnClassName: "result-dark",
    },
    {
      btnClass: backResMode,
      btnClassName: "back-res-dark",
    },
  ];

  allBtn.forEach((item) => {
    for (let i = 0; i < item.btnClass.length; i++) {
      item.btnClass[i].classList.toggle(item.btnClassName);
    }
  });

  if (pLigth.classList.contains("show")) {
    pLigth.classList.replace("show", "hidden");
    pDark.classList.replace("hidden", "show");
  } else if (pLigth.classList.contains("hidden")) {
    pLigth.classList.replace("hidden", "show");
    pDark.classList.replace("show", "hidden");
  }
}

mode.addEventListener("click", changeMode, false);
