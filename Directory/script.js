const projects = [
    { name: "Week 3 CSS Positions and Transformations (Self Portrait Art) Monster", link: "./projects/week3/index.html", image: "./images/week3.png" },
    { name: "Week 4 CSS Layouts and Responsive Design (Website Trading Card) Pokemon", link: "./projects/week4/index.html", image: "./images/week4.png" },
    { name: "Week 5 Javascript for Web (Website Clock) Alien Clock", link: "./projects/week5/index.html", image: "./images/week5.png" },
    { name: "Week 6 Events and Interactivity (Game Form Art) Maze", link: "./projects/week6/index.html", image: "./images/week6.png" },
    { name: "Week 8 Animations (Scrollytelling) Balloon Journey", link: "./projects/week8/index.html", image: "./images/week8.png" },
    { name: "3D Burger Portfolio", link: "./projects/3d-burger-portfolio/index.html", image: "./images/3d-burger-portfolio.png" },
];


const projectsContainer = document.getElementById("projects-container");

projects.forEach(project => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-div");

    const projectLink = document.createElement("a");
    projectLink.href = project.link;
    projectLink.classList.add("project-link");
    projectLink.target = "_blank";

    const projectImage = document.createElement("img");
    projectImage.src = project.image;
    projectImage.alt = project.name;
    projectImage.classList.add("project-image");

    const projectName = document.createElement("span");
    projectName.textContent = project.name;
    projectName.classList.add("project-name");

    projectLink.appendChild(projectImage);
    projectLink.appendChild(projectName);
    projectDiv.appendChild(projectLink);
    projectsContainer.appendChild(projectDiv);
});
