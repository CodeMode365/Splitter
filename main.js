const peoples = document.getElementById("peoples");
      const message = document.getElementById("msg");
      const totalBill = document.getElementById("total-bill");
      const tipButtons = Array.from(document.getElementsByClassName("tip-btn"));
      const resetBtn = document.getElementById("resetBtn");
      const customBtn = document.getElementById("custom-btn");
      let customTip = document.getElementById("custom-tip");
      let tip = 0;

      if (peoples.value === 0) {
        peoples.parentElement.classList.add("error");
      }
      //check for error input
      peoples.addEventListener("input", function () {
        checkInput(this);
        if (peoples.value == 0) {
          peoples.parentElement.classList.add("error");
          message.style.opacity = "100";
        } else {
          peoples.parentElement.classList.remove("error");
          message.style.opacity = "0";
        }

        renderOuput();
      });

      totalBill.addEventListener("input", function () {
        checkInput(this);
        renderOuput();
      });

      // adding custom tip
      customTip.oninput = (e) => {
        checkInput(e.target);
        tip = e.target.value;
        renderOuput(true);
      };

      function renderOuput(customTipAmount = false) {
        if (peoples.value && totalBill.value) {
          const finalTip = document.getElementById("final-tip");
          const finalAmount = document.getElementById("final-amount");
          let tipAmount;
          if (customTipAmount) {
            tipAmount = tip;
          } else {
            tipAmount = (totalBill.value / 100) * tip;
          }
          const tiptPerPerson = tipAmount / peoples.value;
          finalTip.innerText = parseFloat(tiptPerPerson.toFixed(2));

          const totalAmount = totalBill.value / peoples.value + tiptPerPerson;
          finalAmount.innerText = parseFloat(totalAmount.toFixed(2));
        }
      }

      //check if user input is number or text
      function checkInput(element) {
        if (isNaN(element.value[element.value.length - 1])) {
          let inputValue = element.value;
          inputValue = inputValue.slice(0, -1); // remove the last character
          element.value = inputValue;
        }
      }

      //add tip amount when button are clicked
      tipButtons.forEach((btn) =>
        btn.addEventListener("click", () => {
          if (btn.value !== "custom") {
            removeActive();
            tip = btn.value;
            renderOuput();
            btn.classList.add("active");
            customTip.style.display = "none";
            customBtn.style.display = "block";
          }
        })
      );

      //remove previous active button
      function removeActive() {
        tipButtons.forEach((btn) => {
          btn.classList.remove("active");
        });
      }

      //reset values
      resetBtn.onclick = () => {
        document.getElementById("final-tip").innerText = "0.00";
        document.getElementById("final-amount").innerText = "0.00";
        peoples.value = "";
        totalBill.value = "";
        customTip.style.display = "none";
        customBtn.style.display = "block";
        removeActive();
        tip = 0;
      };

      customBtn.onclick = (e) => {
        removeActive();
        customTip.style.display = "block";
        e.target.style.display = "none";
      };