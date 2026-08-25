document.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.frankfurter.dev/v2/rates")
    .then((response) => response.json())
    .then((data) => {
      const dataList = document.querySelector("#codes");
      for (const item of data) {
        const option = document.createElement("Option");
        option.value = item.quote;
        dataList.append(option);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  document.querySelectorAll(".currency").forEach(function (el) {
    el.addEventListener("focus", function () {
      const currentValue = this.value;

      this.value = "";

      setTimeout(() => {
        this.value = currentValue;
        this.select();
      }, 1);
    });
  });

  document.querySelector("form").onsubmit = function () {
    const from = document.querySelector("#from").value.toUpperCase();

    fetch(`https://api.frankfurter.dev/v2/rates?base=${from}`)
      .then((response) => response.json())
      .then((data) => {
        const to = document.querySelector("#to").value.toUpperCase();
        const item = data.find((item) => item.quote === `${to}`);
        const rate = item?.rate;

        if (rate !== undefined) {
          document.querySelector("#result").innerHTML =
            `1 ${from} = ${rate.toFixed(3)} ${to}.`;
        } else {
          document.querySelector("#result").innerHTML = "Invalid Currency.";
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    return false;
  };
});
