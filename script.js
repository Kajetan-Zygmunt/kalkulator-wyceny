class Kalkulator {
  oblicz(uslugi, podstrony, tryb) {
    let suma = 0;

    uslugi.forEach(function(usluga) {
      suma += Number(usluga.value);
    });

    suma += podstrony * 100;
    suma = suma * tryb;

    return suma;
  }
}

let kalkulator = new Kalkulator();

let wynik = document.querySelector("#wynik");
let opis = document.getElementById("opis");
let historiaLista = document.getElementById("historia");
let przyciskWyczysc = document.getElementById("wyczysc");

function aktualizuj() {

  let wybraneUslugi = document.querySelectorAll(".usluga:checked");
  let podstrony = document.getElementById("podstrony").value;
  let tryb = document.getElementById("tryb").value;

  if (wybraneUslugi.length === 0) {
    wynik.textContent = "Cena: 0 zł";
    opis.textContent = "";
    return;
  }

  let cena = kalkulator.oblicz(wybraneUslugi, podstrony, tryb);

  wynik.textContent = "Cena: " + cena + " zł";

  let lista = [];
  wybraneUslugi.forEach(function(u) {
    lista.push(u.dataset.nazwa);
  });

  opis.textContent = "Wybrane: " + lista.join(", ");

  zapiszDoHistorii(cena);
  pokazHistorie();
}

document.querySelectorAll(".usluga").forEach(function(el) {
  el.addEventListener("change", aktualizuj);
});

document.getElementById("podstrony").addEventListener("input", aktualizuj);
document.getElementById("tryb").addEventListener("change", aktualizuj);

function zapiszDoHistorii(cena) {
  let historia = JSON.parse(localStorage.getItem("historia")) || [];

  if (historia[historia.length - 1] !== cena) {
    historia.push(cena);
  }

  localStorage.setItem("historia", JSON.stringify(historia));
}

function pokazHistorie() {
  let historia = JSON.parse(localStorage.getItem("historia")) || [];

  historiaLista.innerHTML = "";

  historia.forEach(function(element, index) {
    let li = document.createElement("li");

    let tekst = document.createElement("span");
    tekst.textContent = element + " zł";

    let btn = document.createElement("button");
    btn.textContent = "X";

    btn.addEventListener("click", function() {
      usunElement(index);
    });

    li.appendChild(tekst);
    li.appendChild(btn);

    historiaLista.appendChild(li);
  });
}

function usunElement(index) {
  let historia = JSON.parse(localStorage.getItem("historia")) || [];
  historia.splice(index, 1);
  localStorage.setItem("historia", JSON.stringify(historia));
  pokazHistorie();
}

przyciskWyczysc.addEventListener("click", function() {
  localStorage.removeItem("historia");
  pokazHistorie();
});

pokazHistorie();