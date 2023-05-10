let body = document.querySelector(`tbody`);
let triggerInput = document.querySelector(`#last-input`);
let fillBtn = document.querySelector(`#fill-default`);
let clearBtn = document.querySelector(`#clear`);

let WIQ = document.querySelector(`.WIQ-total`);
let IAT = document.querySelector(`.IAT-total`);
let ST = document.querySelector(`.ST-total`);
let SIT = document.querySelector(`.SIT-total`);
let TSIS = document.querySelector(`.TSIS-total`);

let samples = [];
let arrivalTime = [
  0, 8, 14, 15, 23, 26, 34, 41, 43, 46, 47, 48, 53, 59, 62, 70, 71, 73, 77, 82,
];
let serviceTime = [4, 1, 4, 3, 2, 4, 5, 4, 5, 3, 3, 5, 4, 1, 5, 4, 3, 3, 2, 3];

//SAMPLES FILLER
for (let i = 1; i <= 20; i++) {
  samples.push(i);
}

//TABLE SPREADER
samples.forEach((e) => {
  body.innerHTML += `
    <tr>
    <td>${e}</td>

    <td class="RDA-value${e}"></td>

    <td class="IAT-value${e}"></td>

    <td>
    <input type="text" class="AT-input${e}"/>
    </td>

    <td class="RDS-value${e}"></td>

    <td>
    <input type="text" class="ST-input${e}"/>
    </td>

    <td class="SB-value${e}"></td>

    <td class="SE-value${e}"></td>

    <td class="WIQ-value${e}"></td>

    <td class="SIT-value${e}"></td>

    <td class="TSIS-value${e}"></td>
  </tr>
    `;
});

//RANDOMS
for (let i = 1; i <= samples.length; i++) {
  let RDA = document.querySelector(`.RDA-value${i}`);
  let RDS = document.querySelector(`.RDS-value${i}`);
  RDA.innerHTML = Math.floor(Math.random() * 1001);
  RDS.innerHTML = Math.floor(Math.random() * 1001);
}

//VALUES
setInterval(() => {
  //INTER ARRIVAL TIME
  for (let i = 1; i <= samples.length - 1; i++) {
    let IAT_cell = document.querySelector(`.IAT-value${i}`);
    let IAT_nextCell = document.querySelector(`.IAT-value${i + 1}`);
    let AT_cell = document.querySelector(`.AT-input${i}`);
    let AT_nextCell = document.querySelector(`.AT-input${i + 1}`);

    if (AT_cell.value != `` && AT_nextCell.value != ``)
      IAT_nextCell.innerHTML = AT_nextCell.value - AT_cell.value;
    else IAT_cell.innerHTML = 0;
  }

  //OTHER VARS
  for (let i = 1; i <= samples.length; i++) {
    let AT_cell = document.querySelector(`.AT-input${i}`);
    let AT_prevCell = document.querySelector(`.AT-input${i - 1}`);
    let ST_cell = document.querySelector(`.ST-input${i}`);
    let ST_prevCell = document.querySelector(`.ST-input${i - 1}`);
    let SB_cell = document.querySelector(`.SB-value${i}`);
    let SB_prevCell = document.querySelector(`.SB-value${i - 1}`);
    let SE_cell = document.querySelector(`.SE-value${i}`);
    let SE_prevCell = document.querySelector(`.SE-value${i - 1}`);
    let WIQ_cell = document.querySelector(`.WIQ-value${i}`);
    let SIT_cell = document.querySelector(`.SIT-value${i}`);
    let TSIS_cell = document.querySelector(`.TSIS-value${i}`);

    AT_cell = +AT_cell.value;
    ST_cell = +ST_cell.value;

    //SERVICE BEGIN
    if (i > 1) {
      AT_prevCell = +AT_prevCell.value;
      ST_prevCell = +ST_prevCell.value;
    }
    if (i > 1 && +SB_prevCell.innerHTML + ST_prevCell > AT_cell) {
      SB_cell.innerHTML = +SE_prevCell.innerHTML;
    } else {
      SB_cell.innerHTML = AT_cell;
    }

    //SERVICE END
    SE_cell.innerHTML = +SB_cell.innerHTML + ST_cell;

    //WAIT IN QUEUE
    WIQ_cell.innerHTML = +SB_cell.innerHTML - AT_cell;

    //SERVICE IDLE TIME
    if (i > 1) SIT_cell.innerHTML = +SB_cell.innerHTML - +SE_prevCell.innerHTML;
    else SIT_cell.innerHTML = +SB_cell.innerHTML;

    //TIME SPENT IN SYSTEM
    if (+WIQ_cell.innerHTML != 0)
      TSIS_cell.innerHTML =
        +SE_cell.innerHTML - +SB_cell.innerHTML + +WIQ_cell.innerHTML;
    else TSIS_cell.innerHTML = +SE_cell.innerHTML - +SB_cell.innerHTML;
  }
}, 500);

//TOTALS
setInterval(() => {
  //TOTAL INTER ARRIVAL TIME
  let sum = 0;
  for (let i = 1; i <= samples.length; i++) {
    let IAT_cell = document.querySelector(`.IAT-value${i}`);
    sum += +IAT_cell.innerHTML;
  }
  IAT.innerHTML = sum;

  sum = 0;

  //TOTAL SERVICE TIME
  for (let i = 1; i <= samples.length; i++) {
    let ST_cell = document.querySelector(`.ST-input${i}`);
    sum += +ST_cell.value;
  }
  ST.innerHTML = sum;

  sum = 0;

  //TOTAL WAIT IN QUEUE
  for (let i = 1; i <= samples.length; i++) {
    let WIQ_cell = document.querySelector(`.WIQ-value${i}`);
    sum += +WIQ_cell.innerHTML;
  }
  WIQ.innerHTML = sum;

  sum = 0;

  //TOTAL SERVICE IDLE TIME
  for (let i = 1; i <= samples.length; i++) {
    let SIT_cell = document.querySelector(`.SIT-value${i}`);
    sum += +SIT_cell.innerHTML;
  }
  SIT.innerHTML = sum;

  sum = 0;

  //TOTAL TIME SPENT IN SYSTEM
  for (let i = 1; i <= samples.length; i++) {
    let TSIS_cell = document.querySelector(`.TSIS-value${i}`);
    sum += +TSIS_cell.innerHTML;
  }
  TSIS.innerHTML = sum;
}, 500);

//LAWS
setInterval(() => {
  //AVERAGE WAITING TIME
  let AVG_waitingTimeN = document.querySelector(`#AVG-WT-numbers`);
  let AVG_waitingTimeV = document.querySelector(`#AVG-WT-value`);
  AVG_waitingTimeN.innerHTML = String.raw`$$\frac{${+WIQ.innerHTML}}{${
    samples.length
  }}$$`;
  AVG_waitingTimeV.innerHTML = +WIQ.innerHTML / samples.length;

  //PROBABILITY (WAIT)
  let PRB_waitingN = document.querySelector(`#PRB-W-numbers`);
  let PRB_waitingV = document.querySelector(`#PRB-W-value`);
  let w = 0;
  for (let i = 1; i <= samples.length; i++) {
    let WIQ_cell = document.querySelector(`.WIQ-value${i}`);
    if (WIQ_cell.innerHTML != `0`) {
      w++;
    }
  }

  PRB_waitingN.innerHTML = String.raw`$$\frac{${w}}{20}$$`;
  PRB_waitingV.innerHTML = w / 20;

  //PROBABILITY OF THE SERVER BEING IDLE
  let PRB_idleN = document.querySelector(`#PRB-I-numbers`);
  let PRB_idleV = document.querySelector(`#PRB-I-value`);
  let SElastCell = document.querySelector(`.SE-value${samples.length}`);

  let idle = 0;
  for (let i = 1; i <= samples.length; i++) {
    let SIT_cell = document.querySelector(`.SIT-value${i}`);
    if (SIT_cell.innerHTML != `0`) {
      idle += +SIT_cell.innerHTML;
    }
  }
  console.log(SElastCell.innerHTML);
  PRB_idleN.innerHTML = String.raw`$$\frac{${idle}}{${+SElastCell.innerHTML}}$$`;
  if (SElastCell.innerHTML == 0) {
    PRB_idleV.innerHTML = 0;
  } else {
    PRB_idleV.innerHTML = (idle / +SElastCell.innerHTML).toFixed(2);
  }

  //PROBABILITY OF THE SERVER BEING BUSY
  let PRB_busyN = document.querySelector(`#PRB-B-numbers`);
  let PRB_busyV = document.querySelector(`#PRB-B-value`);

  PRB_busyN.innerHTML = String.raw`$$1 - ${PRB_idleV.innerHTML}$$`;
  PRB_busyV.innerHTML = 1 - +PRB_idleV.innerHTML;

  //AVERAGE SERVICE TIME
  let AVG_serviceTimeN = document.querySelector(`#AVG-S-numbers`);
  let AVG_serviceTimeV = document.querySelector(`#AVG-S-value`);

  AVG_serviceTimeN.innerHTML = String.raw`$$\frac{${+ST.innerHTML}}
   {${samples.length}}$$`;
  AVG_serviceTimeV.innerHTML = +ST.innerHTML / samples.length;

  //AVERAGE TIME BETWEEN ARRIVALS
  let AVG_timeBetweenArrivalsN = document.querySelector(`#AVG-T-numbers`);
  let AVG_timeBetweenArrivalsV = document.querySelector(`#AVG-T-value`);

  AVG_timeBetweenArrivalsN.innerHTML = String.raw`$$\frac{${+IAT.innerHTML}}
     {${samples.length - 1}}$$`;
  AVG_timeBetweenArrivalsV.innerHTML = (
    +IAT.innerHTML /
    (samples.length - 1)
  ).toFixed(1);

  //AVERAGE WAITING TIME OF THOSE WHO ACTUALLY WAIT IN QUEUE
  let AVG_actualWaitingTimeN = document.querySelector(`#AVG-W-numbers`);
  let AVG_actualWaitingTimeV = document.querySelector(`#AVG-W-value`);

  let wait = 0;
  for (let i = 1; i <= samples.length; i++) {
    let WIQ_cell = document.querySelector(`.WIQ-value${i}`);
    if (WIQ_cell.innerHTML != `0`) {
      wait++;
    }
  }

  AVG_actualWaitingTimeN.innerHTML = String.raw`$$\frac{${+WIQ.innerHTML}}{${wait}}$$`;
  if (WIQ.innerHTML == 0) {
    AVG_actualWaitingTimeV.innerHTML = 0;
  } else {
    AVG_actualWaitingTimeV.innerHTML = (+WIQ.innerHTML / wait).toFixed(1);
  }

  //AVERAGE TIME A STUDENT SPENDS IN SYSTEM
  let AVG_timeSpentN = document.querySelector(`#AVG-TS-numbers`);
  let AVG_timeSpentV = document.querySelector(`#AVG-TS-value`);

  AVG_timeSpentN.innerHTML = String.raw`$$\frac{${+TSIS.innerHTML}}{${
    samples.length
  }}$$`;

  AVG_timeSpentV.innerHTML = +TSIS.innerHTML / samples.length;

  MathJax.typeset();
}, 500);

fillBtn.addEventListener(`click`, () => {
  for (let i = 1; i <= samples.length; i++) {
    let AT_cell = document.querySelector(`.AT-input${i}`);
    let ST_cell = document.querySelector(`.ST-input${i}`);

    AT_cell.value = arrivalTime[i - 1];
    ST_cell.value = serviceTime[i - 1];
  }
});
clearBtn.addEventListener(`click`, () => {
  for (let i = 1; i <= samples.length; i++) {
    let AT_cell = document.querySelector(`.AT-input${i}`);
    let ST_cell = document.querySelector(`.ST-input${i}`);
    let IAT_cell = document.querySelector(`.IAT-value${i}`);
    AT_cell.value = ``;
    ST_cell.value = ``;
    IAT_cell.innerHTML = ``;
  }
});
