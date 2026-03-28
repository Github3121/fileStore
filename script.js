
  // Trigger WhatsApp + Truecaller on Enter key
  document.getElementById("num").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("but").click();
      document.getElementById("te").click();
    }
  });

  function login() {
    if (document.getElementById("pass").value === "1122") {
      document.getElementById("ter1").style.display = "none";
      document.getElementById("ter2").style.display = "";
      document.getElementById("result").innerText = "Login successful!";
    } else {
      document.getElementById("result").innerText = "Invalid password.";
    }
  }

  function getPhoneNumber() {
    return document.getElementById("num").value.trim();
  }

  function whatsapp() {
    const num = getPhoneNumber();
    if (!/^\d{11}$/.test(num)) {
      alert("Please enter exactly 11 digits.");
      return;
    }
    const fullURL = "https://api.whatsapp.com/send?phone=88" + encodeURIComponent(num);
    window.location.href = fullURL;
    saveToHistory(num);
    resetInput();
  }

  function telephone() {
    const num = getPhoneNumber();
    if (!/^\d{11}$/.test(num)) {
      alert("Please enter exactly 11 digits.");
      return;
    }
    const fullURL = "tel:" + encodeURIComponent(num);
    window.location.href = fullURL;
    saveToHistory(num);
    resetInput();
  }

  function find() {
    const num = getPhoneNumber();
    if (!/^\d{11}$/.test(num)) {
      alert("Please enter exactly 11 digits.");
      return;
    }
    const fullURL = "https://www.truecaller.com/sv-se/search/bd/" + encodeURIComponent(num);
    window.location.href = fullURL;
    saveToHistory(num);
    resetInput();
  }

  function resetInput() {
    document.getElementById("num").value = "";
  }

  function saveToHistory(number) {
    let history = JSON.parse(localStorage.getItem("callHistory")) || [];
    if (!history.includes(number)) {
      history.unshift(number);
      if (history.length > 10) history.pop();
      localStorage.setItem("callHistory", JSON.stringify(history));
    }
  }

  function history() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    const history = JSON.parse(localStorage.getItem("callHistory")) || [];
    history.forEach((num) => {
      const li = document.createElement("li");
      li.textContent = num;
      li.onclick = () => {
        document.getElementById("num").value = num;
      };
      list.appendChild(li);
    });
    list.style.display = list.style.display === "none" ? "block" : "none";
  }

  function pasteText() {
    if (navigator.clipboard) {
      navigator.clipboard
        .readText()
        .then(function (text) {
          document.getElementById("num").value = text;
        })
        .catch(function (err) {
          alert("Paste করতে সমস্যা হয়েছে: " + err);
        });
    } else {
      alert("তোমার ব্রাউজারে Clipboard API সাপোর্ট করে না।");
    }
  }