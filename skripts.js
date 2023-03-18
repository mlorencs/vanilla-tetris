const rindas = 15;
const kolonnas = 9;
const startaRinda = 0;
const startaKolonna = 4;

let spelesLaukums = [];
const tukssKvadrats = "0";
const pilnsKvadrats = "X";
let virziens = "UZ LEJU";

const spelesAtrums = 700; // 700 ms = 0.7s

const spelesLaukumaElements = document.getElementById("speles-laukums");

function izveidotSpelesLaukumu() {
  for (let idx1 = 0; idx1 < rindas; idx1++) {
    const kvadrats = [];

    const rindasElements = document.createElement("div");
    rindasElements.className = "rinda";

    for (let idx2 = 0; idx2 < kolonnas; idx2++) {
      const kolonnasElements = document.createElement("div");
      kolonnasElements.className = "kolonna";
      kolonnasElements.id = `rinda-${idx1}-kolonna-${idx2}`;

      kvadrats.push(tukssKvadrats);

      rindasElements.appendChild(kolonnasElements);
    }

    spelesLaukums.push(kvadrats);

    spelesLaukumaElements.appendChild(rindasElements);
  }
}

function iegutElementaId(rinda, kolonna) {
  return `rinda-${rinda}-kolonna-${kolonna}`;
}

function attelotKvadratu() {
  for (let idx1 = 0; idx1 < rindas; idx1++) {
    for (let idx2 = 0; idx2 < kolonnas; idx2++) {
      const esosaisKvadrats = document.getElementById(
        iegutElementaId(idx1, idx2)
      );

      if (spelesLaukums[idx1][idx2] === pilnsKvadrats) {
        esosaisKvadrats.style.backgroundColor = "#ff0000";
      } else if (spelesLaukums[idx1][idx2] === tukssKvadrats) {
        esosaisKvadrats.style.backgroundColor = "#ffffff";
      }
    }
  }
}

function rindasMaina(rinda, kolonna) {
  const intervalaId = setInterval(() => {
    if (
      rinda < rindas - 1 &&
      spelesLaukums[rinda + 1][kolonna] === tukssKvadrats
    ) {
      rinda++;
    } else {
      rinda = 0;

      clearInterval(intervalaId);

      if (spelesLaukums[rinda][kolonna] === tukssKvadrats) {
        kvadratsKrit();
      }

      return;
    }

    if (rinda > 0) {
      spelesLaukums[rinda - 1][kolonna] = tukssKvadrats;
    }

    // TODO: Check if there a free space next
    if (virziens === "PA LABI") {
      if (kolonna < kolonnas - 1) {
        kolonna++;
      }

      virziens = "UZ LEJU";
    } else if (virziens === "PA KREISI") {
      if (kolonna > 0) {
        kolonna--;
      }

      virziens = "UZ LEJU";
    }

    spelesLaukums[rinda][kolonna] = pilnsKvadrats;

    attelotKvadratu();
  }, spelesAtrums);
}

function kvadratsKrit(rinda = startaRinda, kolonna = startaKolonna) {
  spelesLaukums[rinda][kolonna] = pilnsKvadrats;

  attelotKvadratu();

  rindasMaina(rinda, kolonna);
}

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "ArrowRight") {
      virziens = "PA LABI";
    }
    if (event.key === "ArrowLeft") {
      virziens = "PA KREISI";
    }
  },
  false
);

window.onload = izveidotSpelesLaukumu();

window.onload = kvadratsKrit();
