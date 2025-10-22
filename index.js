let gold = 20;
let xp = 0;
let health = 100;
let armor = 0;
let armorInventory = [];
let weaponInventory = [];
let lastWeapon = weaponInventory[weaponInventory.length - 1];
let lastArmor = armorInventory[armorInventory.length - 1];
let fighting;
let currentMonsterHealth;
let souvenirCollection = [];
let defeatedFirstTime = [false, false, false, false, false];

const xpText = document.querySelector("#xpStat");
const goldText = document.querySelector("#goldStat");
const armorText = document.querySelector("#armorStat");
const healthText = document.querySelector("#healthStat");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const text = document.querySelector("#text");
const monsterName = document.querySelector("#monsterName");
const monsterHealth = document.querySelector("#monsterHealth");
const monsterStat = document.querySelector("#monsterStat");
const souvenirDiv = document.querySelector("#souvenir");
const souvenirContainer = document.querySelector("#souvenirContainer");
const souvenir1Container = document.querySelector("#souvenir1Container");
const souvenir2Container = document.querySelector("#souvenir2Container");
const souvenirImg1 = document.querySelector("#souvenirImg1");
const souvenirImg2 = document.querySelector("#souvenirImg2");
const buttonDiv = document.querySelector("#button");

goldText.innerText = gold;
monsterStat.style.display = "none";

// CHỈ SỐ CHO GIÁP, VŨ KHÍ VÀ QUÁI
const armorStats = [
  {
    name: "Giáp rơm",
    level: 2,
    price: 10,
  },
  {
    name: "Giáp samurai",
    level: 7,
    price: 30,
  },
  {
    name: "Giáp trung cổ",
    level: 15,
    price: 60,
  },
  {
    name: "Giáp Iron Man",
    level: 45,
    price: 120,
  },
];

const weaponStats = [
  {
    name: "Dao găm",
    damage: 5,
    price: 10,
  },
  {
    name: "Rìu",
    damage: 12,
    price: 30,
  },
  {
    name: "Kiếm",
    damage: 20,
    price: 60,
  },
  {
    name: "AK-47",
    damage: 35,
    price: 120,
  },
];

const monsterStats = [
  {
    name: "Chí Phèo",
    hp: 30,
    damage: 7,
    attack: "chửi và quăng chai rượu vào mày",
    reward: {
      gold: 30,
      xp: 5,
    },
    souvenirs: [
      {
        name: "Thị Nở",
        image: "picture/thino.jpg",
      },
      {
        name: "Old Lady",
        image: "picture/download.jpg",
      },
    ],
  },
  {
    name: "Tung Tung Sahur",
    hp: 50,
    damage: 15,
    attack: "nói là TUNG TUNG TUNG TUNG TUNG SAHUR",
    reward: {
      gold: 55,
      xp: 10,
    },
    souvenirs: [
      {
        name: "Mid Asian Girl",
        image: "picture/download3.jpg",
      },
      {
        name: "Mid Europe Girl",
        image: "picture/download2.jpg",
      },
    ],
  },
  {
    name: "Skibidi Toilet",
    hp: 80,
    damage: 30,
    attack: "hét 'skibidi dop dop yes yes'",
    reward: {
      gold: 70,
      xp: 20,
    },
    souvenirs: [
      {
        name: "UpperMid Asian",
        image: "picture/uppermid.webp",
      },
      {
        name: "UpperMid European",
        image: "picture/uppermid2.webp",
      },
    ],
  },
  {
    name: "Quái vật rồng 3 đầu",
    hp: 120,
    damage: 45,
    attack: "thổi lửa từ 3 đầu cùng lúc",
    reward: {
      gold: 90,
      xp: 30,
    },
    souvenirs: [
      {
        name: "Pretty Asian",
        image: "picture/download4.jpg",
      },
      {
        name: "Eva Elfie",
        image: "picture/download5.jpg",
      },
    ],
  },
  {
    name: "PUTIN ĐẠI ĐẾ",
    hp: 350,
    damage: 95,
    attack: "cưỡi gấu bắn AK47",
    reward: {
      gold: 1000000,
      xp: 150000,
    },
    souvenirs: [
      {
        name: "Super Hot Chick",
        image: "picture/download6.jpg",
      },
    ],
  },
];

// LOCATIONS

const locations = [
  {
    name: "store",
    buttonText: ["Mua máu (10 gold)", "Mua giáp", "Mua vũ khí", "Về thị trấn"],
    buttonFunctions: [buyHealth, buyArmor, buyWeapon, goTown],
    text: "Mày đang ở trong cửa hàng tối tăm phía cuối con đường hầm, hãy chuẩn bị cho những thứ đáng sợ tiếp theo....",
  },
  {
    name: "fight",
    buttonText: [
      "Chí Phèo",
      "Tung Tung Sahur",
      "SkibidiToilet",
      "Rồng 3 đầu",
      "Về thị trấn",
    ],
    buttonFunctions: [fightChi, fightTung, fightSkibidi, fightDragon, goTown],
    text: "Trong hang có 4 con quái vật, càng đánh được quái mạnh càng giải cứu được nhiều cô gái xinh đẹp...",
  },
  {
    name: "fightBoss",
    buttonText: ["Đánh", "Né", "Về thị trấn"],
    buttonFunctions: [attackMonster, dodge, goTown],
    text: "Ông trùm putin cưỡi gấu khạc ra vodka đang tấn công mày...",
  },
  {
    name: "town",
    buttonText: ["Mua vật phẩm", "Đánh quái", "Đánh boss"],
    buttonFunctions: [goStore, fight, fightBoss],
    text: "Mày đang ở thị trấn, mày thấy có 1 cửa hàng và 1 cái hang trông có vẻ đáng sợ....",
  },
  {
    name: "weapon",
    buttonText: [
      "Dao (10 gold)",
      "Rìu (30 gold)",
      "Kiếm (60 gold)",
      "AK47 (120 gold)",
      "Về shop",
    ],
    buttonFunctions: [buyKnife, buyAxe, buySword, buyAK47, goStore],
    text: "Chọn vũ khí đi em...",
  },
  {
    name: "armor",
    buttonText: [
      "Giáp rơm (10 gold)",
      "Giáp samurai nhật bản (30 gold)",
      "Giáp trung cổ (60 gold)",
      "Giáp Iron Man (120 gold)",
      "Về shop",
    ],
    buttonFunctions: [buyStraw, buySamurai, buyMedival, buyIron, goStore],
    text: "Chọn giáp đi em...",
  },
  {
    name: "lose",
    buttonText: ["Play again....", "Play again....", "Play again...."],
    buttonFunctions: [goTown, goTown, goTown],
    text: "You die....",
  },
  {
    name: "win",
    buttonText: ["Congratulation!!!", "Congratulation!!!", "Play again..."],
    buttonFunctions: [congratulation, congratulation, reset],
    text: "Chúc mừng ông trùm Putin đã quy phục dưới chân bạn, giờ hãy tận hưởng chiến tích của mình đi...",
  },
];
function goStore() {
  update(locations[0]);
}
function fight() {
  update(locations[1]);
  if (xp >= 25) {
    button1.style.display = "none";
  }
  if (xp >= 70) {
    button2.style.display = "none";
  }
  if (xp >= 100) {
    button3.style.display = "none";
  }
}

function inventory() {
  text.innerText = "Mày có ";
}
function buyArmor() {
  update(locations[5]);
}
function buyWeapon() {
  update(locations[4]);
}
function goTown() {
  souvenirDiv.style.display = "none";
  buttonDiv.style.display = "block";
  text.style.display = "block";
  update(locations[3]);
}

function dodge() {}
function showSouvenirChoice() {
  let monster = monsterStats[fighting];

  // Ẩn phần control đi

  buttonDiv.style.display = "none";
  monsterStat.style.display = "none";
  text.style.display = "none";

  //Hiền phần quà ra

  souvenirDiv.style.display = "block";

  //Kiểm tra số quà

  if (monster.souvenirs.length === 1) {
    souvenir1Container.style.display = "block";
    souvenir2Container.style.display = "none";

    souvenirImg1.src = monster.souvenirs[0].image;
    souvenir1Container.onclick = function () {
      pickSouvenir(0);
    };
  } else {
    souvenir1Container.style.display = "block";
    souvenir2Container.style.display = "block";

    souvenirImg1.src = monster.souvenirs[0].image;
    souvenirImg2.src = monster.souvenirs[1].image;
    souvenir1Container.onclick = function () {
      pickSouvenir(0);
    };
    souvenir2Container.onclick = function () {
      pickSouvenir(1);
    };
  }
}

function pickSouvenir(choice) {
  let monster = monsterStats[fighting];
  let item = monster.souvenirs[choice];

  souvenirCollection.push(item);

  if (fighting === 4) {
    souvenirDiv.style.display = "none";
    buttonDiv.style.display = "block";
    text.style.display = "block";
    winGame();
    return;
  }

  goTown();
}
function attackMonster() {
  let lastWeapon = weaponInventory[weaponInventory.length - 1];
  let weaponDamage =
    lastWeapon && lastWeapon.damage ? (damage = lastWeapon.damage) : 1;
  let updateWeaponDamage =
    Math.floor(weaponDamage * Math.random() * 1.5) +
    Math.floor(Math.random() * xp * 0.5);
  currentMonsterHealth -= updateWeaponDamage;
  monsterHealth.innerText = currentMonsterHealth;

  if (currentMonsterHealth <= 0) {
    let monster = monsterStats[fighting];
    gold += monster.reward.gold;
    goldText.innerText = gold;
    xp += monster.reward.xp;
    xpText.innerText = xp;

    if (!defeatedFirstTime[fighting]) {
      defeatedFirstTime[fighting] = true;
      showSouvenirChoice();
      return;
    }
    goTown();
    text.innerText =
      "Con quái kêu lên là 'Ớ....' lúc nó chết và mày được thưởng " +
      monster.reward.gold +
      " gold và " +
      monster.reward.xp +
      " xp, good job!";
  }
  monsterFightBack();
}
function winGame() {
  update(locations[7]);
}

function congratulation() {}

function monsterFightBack() {
  let lastArmor = armorInventory[armorInventory.length - 1];
  if (lastArmor) {
    let damageTaken = Math.max(
      monsterStats[fighting].damage - lastArmor.level,
      1
    );
    health -= damageTaken;
    healthText.innerText = health;
  } else {
    let damageTaken = monsterStats[fighting].damage;
    health -= damageTaken;
    healthText.innerText = health;
  }
  if (health <= 0) {
    lose();
  }
}
function lose() {
  update(locations[6]);
  gold = 20;
  xp = 0;
  health = 100;
  armor = 0;
  armorText.innerText = armor;
  goldText.innerText = gold;
  xpText.innerText = xp;
  healthText.innerText = health;
  armorInventory = [];
  weaponInventory = [];
  defeatedFirstTime = [false, false, false, false, false];
  souvenirCollection = [];
}
function reset() {
  update(locations[4]);
  gold = 20;
  xp = 0;
  health = 100;
  armor = 0;
  armorText.innerText = armor;
  goldText.innerText = gold;
  xpText.innerText = xp;
  healthText.innerText = health;
  armorInventory = [];
  weaponInventory = [];
}
function updateMonster(monster) {
  monsterStat.style.display = "flex";
  button1.style.display = "inline-block";
  button2.style.display = "none";
  monsterName.innerText = monster.name;
  monsterHealth.innerText = monster.hp;
  text.innerText =
    "Mày đang đánh " +
    monster.name +
    ". Nó đang " +
    monster.attack +
    ", xử lý nó đi!";
  button1.innerText = "Đánh";
  button2.innerText = "Né";
  button3.style.display = "none";
  button4.innerText = "Về hang quái";
  button5.innerText = "Về thị trấn";
  button1.onclick = attackMonster;
  button2.onclick = dodge;
  button4.onclick = fight;
  button5.onclick = goTown;
}

function fightChi() {
  updateMonster(monsterStats[0]);
  fighting = 0;
  currentMonsterHealth = monsterStats[0].hp;
}
function fightTung() {
  updateMonster(monsterStats[1]);
  fighting = 1;
  currentMonsterHealth = monsterStats[1].hp;
}

function fightSkibidi() {
  updateMonster(monsterStats[2]);
  fighting = 2;
  currentMonsterHealth = monsterStats[2].hp;
}
function fightDragon() {
  updateMonster(monsterStats[3]);
  fighting = 3;
  currentMonsterHealth = monsterStats[3].hp;
}
function fightBoss() {
  update(locations[2]);
  monsterStat.style.display = "flex";
  monsterName.innerText = monsterStats[4].name;
  monsterHealth.innerText = monsterStats[4].hp;
  fighting = 4;
  currentMonsterHealth = monsterStats[4].hp;
}
function buyHealth() {
  if (gold > 9) {
    health += 10;
    gold -= 10;
    healthText.innerText = health;
    goldText.innerText = gold;
    text.innerText = "Phê thế, thêm máu đi...";
  } else {
    text.innerText =
      "Nghèo bỏ mẹ mà cũng đòi mua máu, kiếm thêm vàng đi rồi quay lại...";
  }
}

// ...

button1.onclick = goStore;
button2.onclick = fight;
button3.onclick = fightBoss;
button4.onclick = inventory;

// FUNCTION GỐC, LOCATIONS

function update(location) {
  monsterStat.style.display = "none";
  const buttons = [button1, button2, button3, button4, button5];
  for (let i = 0; i < buttons.length; i++) {
    if (location.buttonText[i]) {
      buttons[i].style.display = "inline-block";
      buttons[i].innerText = location.buttonText[i];
      buttons[i].onclick = location.buttonFunctions[i];
    } else {
      buttons[i].style.display = "none";
    }
  }
  text.innerText = location.text;
}

// FUNCTION CỦA MUA GIÁP, MUA VŨ KHÍ, MUA MÁU

function updateBuyArmor(armor2) {
  if (armorInventory.includes(armor2)) {
    text.innerText = "Mày có giáp này rồi mà mua thêm làm gì?";
  } else {
    if (gold >= armor2.price) {
      armor = armor2.level;
      armorText.innerText = armor;
      gold -= armor2.price;
      goldText.innerText = gold;
      armorInventory.push(armor2);
      text.innerText = "Mày vừa mua cái " + armor2.name;
    } else {
      text.innerText =
        "Nghèo bỏ mẹ mà cũng đòi mua giáp, kiếm thêm vàng đi rồi quay lại...";
    }
  }
}
function updateBuyWeapon(weapon2) {
  if (weaponInventory.includes(weapon2)) {
    text.innerText = "Mày có vũ khí này rồi mà mua thêm làm gì?";
  } else {
    if (gold >= weapon2.price) {
      gold -= weapon2.price;
      goldText.innerText = gold;
      weaponInventory.push(weapon2);
      text.innerText = "Mày vừa mua cái " + weapon2.name;
    } else {
      text.innerText =
        "Nghèo bỏ mẹ mà cũng đòi mua vũ khí, kiếm thêm vàng đi rồi quay lại...";
    }
  }

  // CHỖ MUA GIÁP VÀ MUA VŨ KHÍ
}
function buyStraw() {
  updateBuyArmor(armorStats[0]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText += ". Good job!";
  }
}

function buySamurai() {
  updateBuyArmor(armorStats[1]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText += ". Đẹp trai hơn rồi đấy, đệ Tokuda đấy";
  }
}

function buyMedival() {
  updateBuyArmor(armorStats[2]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText += ". Giờ trông mày ngầu vãi lon...";
  }
}

function buyIron() {
  updateBuyArmor(armorStats[3]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText += ". Tầm này mày là bố...";
  }
}
function buyKnife() {
  updateBuyWeapon(weaponStats[0]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText += ". Good job!";
  }
}

function buyAxe() {
  updateBuyWeapon(weaponStats[1]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText += ". Vikinggggg!";
  }
}

function buySword() {
  updateBuyWeapon(weaponStats[2]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText +=
      ". Kiếm thêm cái giáp trung cổ nữa là thành hiệp sĩ rồi đấy!";
  }
}

function buyAK47() {
  updateBuyWeapon(weaponStats[3]);
  if (text.innerText.includes("Mày vừa mua cái")) {
    text.innerText += ". KHÁ LẮM, ĐẾN GẶP ĐẠI ĐẾ PUTIN ĐI!";
  }
}
