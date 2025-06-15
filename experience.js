const container = document.getElementById("scene-container");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 6;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.DodecahedronGeometry(2);
const wireframe = new THREE.WireframeGeometry(geometry);
const material = new THREE.LineBasicMaterial({ color: 0x00ff88 });
const dodecahedron = new THREE.LineSegments(wireframe, material);
scene.add(dodecahedron);

// Experience data
const experiences = [
  {
  title: "Work Experience",
  text: `
    <div class="experience-block">
      <strong>Software Engineer Intern</strong><br>
      <span class="meta">American Benefit Corporation — Ona, WV (May 2024 – Present)</span>
      <ul>
        <li>Built a full-stack ASP.NET MVC applications for company clients.</li>
        <li>Handled claims/check file transfers on AS400 servers.</li>
        <li>Developed Python scripts for automation & cleanup of CSVs.</li>
        <li>Maintained production SQL Server databases.</li>
      </ul>

      <strong>Graduate Assistant</strong><br>
      <span class="meta">Marshall University — Huntington, WV (Jan 2024 – May 2025)</span>
      <ul>
        <li>Led ICS/SCADA cybersecurity research on threat detection.</li>
        <li>Tested CyberHive simulation labs for real-world effectiveness.</li>
      </ul>

      <strong>Cybersecurity Intern</strong><br>
      <span class="meta">MU Research Corp. — Huntington, WV (Aug – Dec 2023)</span>
      <ul>
        <li>Helped secure grants from U.S. Dept. of Education.</li>
        <li>Audited software & systems using CIS/SANS benchmarks.</li>
        <li>Improved simulation manual usability for training.</li>
      </ul>

      <strong>Software Engineer Intern</strong><br>
      <span class="meta">Marshall University — Huntington, WV (May – Dec 2022)</span>
      <ul>
        <li>Researched tumor image segmentation (NSF funded).</li>
        <li>Built FCN and U-Net models in Python for analysis.</li>
        <li>Awarded $4,000 Creative Discovery grant for research.</li>
      </ul>
    </div>
  `
},
  {
    title: "Research Experience",
    text: `
      <div class="experience-block">

      <strong>Conference Publication</strong><br>
        <ul>
          <li>Abdullah Jawad, Noah Quesenberry, Husnu Saner Narman, Paulus Wahjudi:<br>
            “<b>Enhancing Workforce Cyber Resilience: Bridging the Gap in ICS Protection</b>”<br>
            (IEEE ISEC 2025) —
            <a href="https://hsnarman.github.io/PRESNT/Slides-24-UMECON-AI-Python.pdf" target="_blank">Slides</a> |
            <a href="https://hsnarman.github.io/CONF/25-ISEC-CybersecurityEducation.pdf" target="_blank">Paper</a>
          </li>
        </ul>
        
        <strong>Graduate Research Assistant</strong><br>
        <span class="meta">Marshall University — Huntington, WV (Jan 2024 – May 2025)</span>
        <ul>
          <li>Conducted research on <b>cybersecurity</b> in industrial control systems (ICS), including <b>SCADA</b> infrastructure.</li>
          <li>Led testing and refinement of CyberHive-based cybersecurity lab simulations.</li>
        </ul>

        <strong>Student Research Assistant</strong><br>
        <span class="meta">Marshall University — Huntington, WV (May 2022 – Dec 2022)</span>
        <ul>
          <li>Contributed to <b>NSF-funded</b> cancer image segmentation research using <b>FCN</b> and <b>U-Net</b> machine learning models.</li>
          <li>Developed and trained image processing pipelines in Python for tumor microenvironment analysis.</li>
          <li>Received <a href="https://www.marshall.edu/news/2022/06/murc-announces-research-awards-for-faculty-undergraduates/" target="_blank">$5,000 undergraduate research award</a> for project excellence.</li>
        </ul>

        
      </div>
    `
  },
 {
  title: "Academic Experience",
  text: `
    <div class="experience-block">

      <strong>Graduate Teaching Assistant</strong>
      </br>
      <div class="meta">Marshall University — Huntington, WV (Jan – Apr 2024 & Jan – Apr 2025)</div>
      <ul>
        <li>Assisted in teaching <b>CS430 / CYBR330 (Cybersecurity)</b>, providing technical guidance and coursework support.</li>
        <li>Created lab quizzes and Capture The Flag (CTF) challenges to reinforce cybersecurity fundamentals.</li>
      </ul>

      <strong>BSc in Computer & Information Security</strong>
      <div class="meta">Marshall University — Graduated Dec 2023 </br>(<b>Summa Cum Laude</b>)</div>
      <ul>
        <li>Graduated with <b>highest distinction</b> for academic excellence.</li>
        <li>Named to the <b>President’s List</b> for 4 semesters:
          <ul class="nested-links">
            <li><a href="https://www.marshall.edu/news/presidents-list-for-spring-2022-huntington-2/" target="_blank">Spring 2022</a></li>
            <li><a href="https://www.marshall.edu/news/presidents-list-for-fall-2022-huntington/" target="_blank">Fall 2022</a></li>
            <li>Spring 2023</li>
            <li>Fall 2023</li>
          </ul>
        </li>
      </ul>

    </div>
  `
}
];

const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffaa, emissive: 0x00ffaa });
const nodeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
const posAttr = geometry.getAttribute("position");
const used = new Set();
const nodes = [];

for (let i = 0; i < posAttr.count; i++) {
  const vertex = new THREE.Vector3().fromBufferAttribute(posAttr, i);
  const key = vertex.toArray().map(v => v.toFixed(2)).join(",");
  if (!used.has(key)) {
    used.add(key);
    const sphere = new THREE.Mesh(nodeGeometry, nodeMaterial);
    sphere.position.copy(vertex);
    sphere.userData = experiences[nodes.length % experiences.length];
    scene.add(sphere);
    nodes.push(sphere);
  }
}

let currentNodeIndex = 0;
function rotateToNode(index) {
  const node = nodes[index];
  const target = node.position.clone().normalize().multiplyScalar(6);
  gsap.to(camera.position, {
    x: target.x,
    y: target.y,
    z: target.z,
    duration: 1,
    onUpdate: () => camera.lookAt(0, 0, 0)
  });

  // Update the info panel
  infoTitle.textContent = node.userData.title;
  //infoText.textContent = node.userData.text;
  infoText.innerHTML = node.userData.text;
}
rotateToNode(0); // Initial focus

// Auto-rotate
setInterval(() => {
  currentNodeIndex = (currentNodeIndex + 1) % nodes.length;
  rotateToNode(currentNodeIndex);
}, 1111135000);

// Manual override
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    currentNodeIndex = (currentNodeIndex + 1) % nodes.length;
    rotateToNode(currentNodeIndex);
  } else if (e.key === "ArrowLeft") {
    currentNodeIndex = (currentNodeIndex - 1 + nodes.length) % nodes.length;
    rotateToNode(currentNodeIndex);
  }
});

window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

if (leftBtn && rightBtn) {
  leftBtn.addEventListener("click", () => {
    currentNodeIndex = (currentNodeIndex - 1 + nodes.length) % nodes.length;
    rotateToNode(currentNodeIndex);
  });

  rightBtn.addEventListener("click", () => {
    currentNodeIndex = (currentNodeIndex + 1) % nodes.length;
    rotateToNode(currentNodeIndex);
  });
}