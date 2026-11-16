let state = [
  { id: '101', title: 'Dissenyar base de dades', description: 'Crear esquema ERD', status: 'todo' },
  { id: '102', title: 'Configurar servidor Node', description: 'Express i CORS', status: 'in-progress' }
];

const board = document.getElementById('board');
const form = document.getElementById('new-task-form');
const template = document.getElementById('task-card-template');

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderAllTasks();
  setupEventListeners();
  updateTaskCount();
}

// MÒDUL 1 & 2
function createTaskCard(task) {
  // TODO M1.1: Clonar el template (.content.cloneNode(true))
  const card = template.content.cloneNode(true);
  // TODO M2.1: Assignar l'ID a l'atribut data-task-id de la targeta
  card.querySelector('.task-card').setAttribute('data-task-id', task.id);
  // TODO M1.2: Omplir el títol (.task-title) i descripció (.task-desc)
  card.querySelector('.task-title').textContent = task.title;
  card.querySelector('.task-desc').textContent = task.description;

  // TODO M2.2: Assignar el valor del select (.task-status-select) segons task.status
  card.querySelector('.task-status-select').value = task.status;
  // TODO M2.3: Si task.status === 'done', afegir la classe 'completed'
  if (task.status === 'done') {
    card.querySelector('.task-card').classList.add('completed');
  }
  // TODO M1.3: Retornar el node clonat
  return card;
}

function renderAllTasks() {
  // TODO M1.4: Netejar els contenidors i renderitzar les tasques de 'state' al seu contenidor corresponent
  document.querySelector('#todo-list').innerHTML = '';
  document.querySelector('#in-progress-list').innerHTML = '';
  document.querySelector('#done-list').innerHTML = '';
  // Recorregues  l'array  global  state  i  insereix  cada  targeta  al  seu  contenidor corresponent segons el seu status. 
  for (task of state) {
    if (task.status === 'todo') {
      document.querySelector('#todo-list').appendChild(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      document.querySelector('#in-progress-list').appendChild(createTaskCard(task));
    } else if (task.status === 'done') {
      document.querySelector('#done-list').appendChild(createTaskCard(task));
    }
  }
}
function setupEventListeners() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO M2.4: Afegir nova tasca a 'state' i renderitzar-la al DOM
    const newTask = {
      id: state.length + 1,
      title: form.elements['task-title-input'].value,
      description: form.elements['task-desc-input'].value,
      status: form.elements['task-status-select'].value
    };
    state.push(newTask);
    renderAllTasks();
    updateTaskCount();
  });

  // TODO M2.5: Escoltar l'esdeveniment 'change' al board per quan es canvia l'estat del select:
  // - Trobar la targeta amb closest('.task-card')
  // - Llegir el nou estat i moure la targeta al seu contenidor (#todo-list, #in-progress-list, #done-list) amb appendChild
  // - Actualitzar l'estat a 'state' i la classe '.completed'x
  board.addEventListener('change', (e) => {
    const target = e.target;
    const card = target.closest('.task-card');
    const newStatus = card.querySelector('.task-status-select').value;
    if (newStatus === 'todo') {
      document.querySelector('#todo-list').appendChild(card);
    } else if (newStatus === 'in-progress') {
      document.querySelector('#in-progress-list').appendChild(card);
    } else if (newStatus === 'done') {
      document.querySelector('#done-list').appendChild(card);
    };
  });

  board.addEventListener('click', (e) => {
    const target = e.target;
    // TODO M4: Acordió (closest + nextElementSibling + .collapsed)
    const header = target.closest('.column-header');
    if (header) {
      const content = header.nextElementSibling;
      content.classList.toggle('collapsed');
    }
    // TODO M2: Botó eliminar (closest + dataset.taskId + .remove())
    deleteButton = target.closest('.btn-delete');
    const card = target.closest('.task-card');

    if (deleteButton) {
      const cardId = card.dataset.taskId;
      state = state.filter(task => String(task.id) !== cardId);
      card.remove();
      updateTaskCount();
    }
    // TODO M3: Botons pujar/baixar (previousElementSibling / nextElementSibling + insertBefore)
    const upButton = target.closest('.btn-up');
    const dwButton = target.closest('.btn-down');

    if (upButton) {
      const previousCard = card.previousElementSibling;
      if (previousCard) {
        card.parentNode.insertBefore(card, previousCard);
      };
    };
    if (dwButton) {
      const afterCard = card.nextElementSibling;
      if (afterCard) {
        card.parentNode.insertBefore(afterCard, card);
      };
    };
  });
};

// MÒDUL 5: WEB COMPONENT
class TaskBadge extends HTMLElement {
  constructor() {
    super();
    // TODO M5.1: Attach shadow root
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.render(); }
  static get observedAttributes() { return ['count']; }
  attributeChangedCallback(name, oldValue, newValue) { if (oldValue !== newValue) this.render(); }

  render() {
    // TODO M5.2: Renderització de l'etiqueta
    const val = this.getAttribute('count') || '0';
    this.shadowRoot.innerHTML = `<style>
      .badge {
        background: black;
        font-family: ariel;
        color: white;
        padding: 4px 8px;
        border-radius: 10px
      }
      .badge:hover{
        background: white;
        font-size: 110%;
        color: black;
        border-radius: 5px;
      }
      </style>
      <span class = "badge">Total Tasks: ${val}</span>`;
  }
}
customElements.define('task-badge', TaskBadge);

function updateTaskCount() {
  // TODO M5.3: Actualitzar l'atribut count de #global-badge
  const total = state.length;
  document.querySelector('#global-badge').setAttribute('count', total)

}