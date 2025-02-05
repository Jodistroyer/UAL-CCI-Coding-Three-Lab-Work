let startX = 0;
let isSwipingInProgress = false;
let isAnimating = false;
const swipeThreshold = 50;
let currentCardIndex = 0;

const cards = [
    { 
        name: "Pikachu", 
        hp: "40 HP ⚡", 
        image: "./assets/images/pikachu.jpg", 
        description: "Mouse Pokémon. Length: 1' 4\". Weight: 13 lbs.", 
        attacks: [{ name: "Gnaw", damage: 10, cost: 1 }, { name: "Thunder Jolt", damage: 30, cost: 2 }],
        color: "#F6BE00",
        footer: "When several of these Pokémon gather, their electricity can cause lightning storms.",
        weakness: "Ground 🌍",
        resistance: "Flying 🦅",
        retreatCost: "1 💨"
    }, 
    { 
        name: "Charmander", 
        hp: "50 HP 🔥", 
        image: "./assets/images/charmander.jpg", 
        description: "Lizard Pokémon. Length: 2' 0\". Weight: 19 lbs.", 
        attacks: [{ name: "Scratch", damage: 10, cost: 1 }, { name: "Ember", damage: 30, cost: 2 }],
        color: "#FF4500",
        footer: "Charmander’s fire is weak at birth, but grows stronger as it evolves.",
        weakness: "Water 💧",
        resistance: "None 🚫",
        retreatCost: "1 💨"
    },
    { 
        name: "Bulbasaur", 
        hp: "45 HP 🌱", 
        image: "./assets/images/bulbasaur.jpg", 
        description: "Seed Pokémon. Length: 2' 4\". Weight: 15 lbs.", 
        attacks: [{ name: "Tackle", damage: 10, cost: 1 }, { name: "Vine Whip", damage: 30, cost: 2 }],
        color: "green",
        footer: "Bulbasaur is known for its plant-based powers.",
        weakness: "Fire 🔥",
        resistance: "Water 💧",
        retreatCost: "1 💨"
    },
    { 
        name: "Squirtle", 
        hp: "50 HP 💧", 
        image: "./assets/images/squirtle.jpg", 
        description: "Tiny Turtle Pokémon. Length: 1' 8\". Weight: 20 lbs.", 
        attacks: [{ name: "Bubble", damage: 10, cost: 1 }, { name: "Water Gun", damage: 30, cost: 2 }],
        color: "#1053d8",
        footer: "Squirtle shelters itself in its shell and sprays water at its foe.",
        weakness: "Electric ⚡",
        resistance: "Fire 🔥",
        retreatCost: "1 💨"
    },
    { 
        name: "Gengar", 
        hp: "120 HP 👻", 
        image: "./assets/images/gengar.jpg", 
        description: "Shadow Pokémon. Height: 4' 11\". Weight: 89.3 lbs.", 
        attacks: [
            { name: "Shadow Punch", damage: 40, cost: 2 },
            { name: "Dark Corridor", damage: 60, cost: 3 }
        ],
        color: "purple",
        footer: "Gengar lurks in the shadows, striking fear into its prey.",
        weakness: "Dark 🌑",
        resistance: "Fighting 🥊",
        retreatCost: "1 💨"
    },
    { 
        name: "Charizard", 
        hp: "170 HP 🔥", 
        image: "./assets/images/charizard.jpg", 
        description: "Flame Pokémon. Height: 5' 7\". Weight: 199.5 lbs.", 
        attacks: [
            { name: "Fire Spin", damage: 100, cost: 4 },
            { name: "Flamethrower", damage: 90, cost: 3 }
        ],
        color: "red",
        footer: "Charizard's fire burns hotter as it gains experience.",
        weakness: "Water 💧",
        resistance: "Grass 🍃",
        retreatCost: "2 💨"
    }
    
];

const cardElement = document.querySelector(".card");
const nameElement = document.querySelector(".card-header .name");
const hpElement = document.querySelector(".hp");
const imageElement = document.querySelector(".image");
const descriptionElement = document.querySelector(".description");

const costElements = document.querySelectorAll(".attack .attack-cost");
const attackElements = document.querySelectorAll(".attack h3");
const damageElements = document.querySelectorAll(".attack div:last-child");

const weaknessElement = document.querySelector(".weakness div:last-child");
const resistanceElement = document.querySelector(".resistance div:last-child");
const retreatElement = document.querySelector(".retreat div:last-child");

const footerElement = document.querySelector(".footer");
const cardContainer = document.querySelector('.card-container');
const swipeLeft = document.querySelector('.swipe-left');
const swipeRight = document.querySelector('.swipe-right');

cardContainer.addEventListener('mouseenter', () => {
    swipeLeft.style.opacity = '0';
    swipeRight.style.opacity = '0';
});

cardContainer.addEventListener('mouseleave', () => {
    swipeLeft.style.opacity = '0.75';
    swipeRight.style.opacity = '0.75';
});

function updateCard(index) {
    const card = cards[index];
    nameElement.textContent = card.name;
    hpElement.textContent = card.hp;
    imageElement.src = card.image;
    cardElement.style.backgroundColor = card.color;
    descriptionElement.textContent = card.description;

    attackElements.forEach((el, i) => {
        el.textContent = card.attacks[i]?.name || "";

        const costElement = costElements[i];
        const cost = card.attacks[i]?.cost || 0;
        costElement.innerHTML = '✪'.repeat(cost);
    });

    damageElements.forEach((el, i) => {
        el.textContent = card.attacks[i]?.damage || "";
    });

    weaknessElement.textContent = card.weakness;
    resistanceElement.textContent = card.resistance;
    retreatElement.textContent = card.retreatCost;

    footerElement.textContent = card.footer;
}

cardElement.addEventListener("mousedown", (event) => {
    if (isAnimating) return; 
    startX = event.clientX;
    isSwipingInProgress = true;
});

cardElement.addEventListener("mousemove", (event) => {
    if (!isSwipingInProgress || isAnimating) return;

    let swipeDifference = event.clientX - startX;

    gsap.to(cardElement, { rotation: swipeDifference / 10, duration: 0.2 });

    if (swipeDifference < -swipeThreshold) {
        swipeOut("left");
        isSwipingInProgress = false;
    } else if (swipeDifference > swipeThreshold) {
        swipeOut("right");
        isSwipingInProgress = false;
    }
});

cardElement.addEventListener("mouseup", resetCardPosition);
cardElement.addEventListener("mouseleave", resetCardPosition);

function resetCardPosition() {
    isSwipingInProgress = false;
    if (isAnimating) return; 
    gsap.to(cardElement, { x: 0, rotation: 0, duration: 0.2 });
}

function swipeOut(direction) {
    if (isAnimating) return; 
    isAnimating = true;

    const xOffset = direction === "left" ? -500 : 500;
    
    gsap.to(cardElement, {
        x: xOffset,
        opacity: 0,
        rotation: direction === "left" ? -30 : 30,
        duration: 0.5,
        onComplete: () => {
            currentCardIndex = (currentCardIndex + (direction === "left" ? 1 : -1) + cards.length) % cards.length;
            updateCard(currentCardIndex);
            gsap.set(cardElement, { x: -xOffset, opacity: 0, rotation: -30 });
            gsap.to(cardElement, { x: 0, opacity: 1, rotation: 0, duration: 0.5, onComplete: () => { isAnimating = false; } });
        }
    });
}

updateCard(currentCardIndex);
