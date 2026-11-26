// let state = [
//   { id: '101', title: 'Dissenyar base de dades', description: 'Crear esquema ERD', status: 'todo' },
//   { id: '102', title: 'Configurar servidor Node', description: 'Express i CORS', status: 'in-progress' }
// ];

let state = [
  { id: '101', title: 'Dissenyar base de dades', description: 'Crear esquema ERD', status: 'todo', startDate: '2026-11-27', dueDate: '2026-11-20' },
  { id: '102', title: 'Configurar servidor Node', description: 'Express i CORS', status: 'in-progress', startDate: '2026-11-27', dueDate: '2026-11-27' }
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
  initDragAndDrop();
  const overdueTasks = state.filter(t =>
    t.dueDate && t.status !== 'done' && dayjs(t.dueDate).isBefore(dayjs(), 'day')
  );

  if (overdueTasks.length > 0) {
    const message = overdueTasks.length > 1
      ? `⚠️ Tienes ${overdueTasks.length} tareas vencidas`
      : `⚠️ La tarea "${overdueTasks[0].title}" está vencida`;

    setTimeout(() => showOverdueWarning(message), 1000);
  }
}

// // MÒDUL 1 & 2
// function createTaskCard(task) {
//   // TODO M1.1: Clonar el template (.content.cloneNode(true))
//   const card = template.content.cloneNode(true);
//   // TODO M2.1: Assignar l'ID a l'atribut data-task-id de la targeta
//   card.querySelector('.task-card').setAttribute('data-task-id', task.id);
//   // TODO M1.2: Omplir el títol (.task-title) i descripció (.task-desc)
//   card.querySelector('.task-title').textContent = task.title;
//   card.querySelector('.task-desc').textContent = task.description;

//   // TODO M2.2: Assignar el valor del select (.task-status-select) segons task.status
//   card.querySelector('.task-status-select').value = task.status;
//   // TODO M2.3: Si task.status === 'done', afegir la classe 'completed'
//   if (task.status === 'done') {
//     card.querySelector('.task-card').classList.add('completed');
//   }
//   // TODO M1.3: Retornar el node clonat
//   return card;
// }
function createTaskCard(task) {
  const card = template.content.cloneNode(true);
  const cardElement = card.querySelector('.task-card');

  cardElement.setAttribute('data-task-id', task.id);
  card.querySelector('.task-title').textContent = task.title;
  card.querySelector('.task-desc').textContent = task.description;
  card.querySelector('.task-status-select').value = task.status;

  if (task.status === 'done') {
    cardElement.classList.add('completed');
  }

  const desc = card.querySelector('.task-desc');

  if (task.dueDate) {
    if (task.status !== 'done' && dayjs(task.dueDate).isBefore(dayjs(), 'day')) {
      cardElement.classList.add('overdue');
      desc.innerHTML += `<br><strong style="color:#ef4444">⚠️ Vencida: ${dayjs(task.dueDate).format('DD/MM/YYYY')}</strong>`;
    } else if (task.status !== 'done' && dayjs(task.dueDate).isSame(dayjs(), 'day')) {
      desc.innerHTML += `<br><strong style="color:#f59e0b">⏰ Vence hoy: ${dayjs(task.dueDate).format('DD/MM/YYYY')}</strong>`;
    } else {
      const color = task.status === 'done' ? '#64748b' : '#4f46e5';
      const icon = task.status === 'done' ? '✅' : '📅';
      desc.innerHTML += `<br><span style="color:${color}">${icon} Límit: ${dayjs(task.dueDate).format('DD/MM/YYYY')}</span>`;
    }
  }
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
      id: Date.now().toString(),
      title: form.elements['task-title-input'].value,
      description: form.elements['task-desc-input'].value,
      status: form.elements['task-status-select'].value,
      startDate: dayjs().format('YYYY-MM-DD')
    };
    state.push(newTask);
    renderAllTasks();
    updateTaskCount();
    showTaskAdded();
    form.reset();
  });

  // TODO M2.5: Escoltar l'esdeveniment 'change' al board per quan es canvia l'estat del select:
  // - Trobar la targeta amb closest('.task-card')
  // - Llegir el nou estat i moure la targeta al seu contenidor (#todo-list, #in-progress-list, #done-list) amb appendChild
  // - Actualitzar l'estat a 'state' i la classe '.completed'x
  board.addEventListener('change', (e) => {
    const target = e.target;
    const card = target.closest('.task-card');
    const newStatus = card.querySelector('.task-status-select').value;
    
    if (newStatus === 'done') {
      showTaskCompleted();
    }
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
    const card = target.closest('.task-card');

    // Si fem clic a la targeta, però NO en un botó ni en un select, obrim els detalls
    if (card && !target.closest('button') && !target.closest('select')) {
      openTaskDetails(card.dataset.taskId);
      return; // Aturem l'execució per no disparar altres events
    }

    // ... la resta del teu codi existent (eliminar, pujar, baixar, acordió) ...
    const header = target.closest('.column-header');
    if (header) {
      const content = header.nextElementSibling;
      content.classList.toggle('collapsed');
    }

    const deleteButton = target.closest('.btn-delete');
    if (deleteButton && card) {
    const editButton = target.closest('.btn-edit');
    }

    if (deleteButton) {
      const cardId = card.dataset.taskId;
      confirmDeleteTask().then(confirmed => {
        if (confirmed) {
          state = state.filter(task => String(task.id) !== cardId);
          card.remove();
          updateTaskCount();
          showTaskDeleted();
        }
      });
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
        font-family: Arial, sans-serif;
        font-size: 15px;
        color: white;
        padding:4px 10px;
        border-radius:12px;
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

function startTour() {
  // Si l'usuari està al calendari, tornem al taulell perquè el tour trobi #board

  const driverFn = window.driver?.js?.driver || window.driver;
  if (typeof driverFn !== 'function') {
    alert('No s’ha pogut carregar la llibreria Driver.js.');
    return;
  }

  const driverObj = driverFn({
    showProgress: true,
    nextBtnText: 'Següent →',
    prevBtnText: '← Anterior',
    doneBtnText: 'Entesos!',
    steps: [
      { element: '#new-task-form', popover: { title: '1. Crea nuevas tareas', description: 'Introduce el título, la descripción y el estado inicial para añadir tu tarea.'}},
      { element: '.column-header', popover: { title: '2. Mostrar o ocultar', description: 'Haz clic en la cabecera para mostrar o ocultar las tareas de la columna'}},
      { element: '.task-card',popover: { title: '3. Edita todo con un clic',description: 'Haz clic en la tarjeta y se abrirá un editor donde puedes cambiar el título, descripción, fechas, estado...'}},
      { element: '.task-card .actions', popover: { title: '4. Acciones rápidas', description: 'Puedes cambiar estado, subirla o bajarla de posición, eliminar la tarea, Para eliminar, te cofirmara para evitar accidentes.'}},
      { element: '#board', popover: { title: '5. Drag and Drop', description: 'Cambiar estado rapido: simplemente aggara la tarjeta de una columna a otra.'}},
      { element: '#global-badge', popover: { title: '6. Web Component', description: 'El contador de tareas. Es un Web Component con Shadow DOM.'}}
    ]
  });
  driverObj.drive();
}

document.querySelector('#btn-help').addEventListener('click', startTour);

// SORTABLEJS: MOVER TARGETES ENTRE COLUMNES
function syncStateFromDOM() {
  const byId = Object.fromEntries(state.map(t => [String(t.id), t]));
  const newState = [];
  ['todo', 'in-progress', 'done'].forEach(st => {
    document.querySelectorAll(`#${st}-list .task-card`).forEach(card => {
      const task = byId[card.dataset.taskId];
      if (task) {
        task.status = st;
        newState.push(task);
      }
    });
  });
  state = newState;
}

function initDragAndDrop() {
  document.querySelectorAll('.column-content').forEach(list => {
    new Sortable(list, {
      group: 'kanban',
      animation: 200,
      emptyInsertThreshold: 30,
      ghostClass: 'sortable-ghost',
      filter: 'select, button',
      preventOnFilter: false,
      onEnd: (evt) => {
        const card = evt.item;
        const newStatus = evt.to.closest('.column').dataset.status;
        const oldStatus = evt.from.closest('.column').dataset.status;

        if (oldStatus !== 'done' && newStatus === 'done') {
          showTaskCompleted();
        }

        card.querySelector('.task-status-select').value = newStatus;
        card.classList.toggle('completed', newStatus === 'done');

        syncStateFromDOM();
        updateTaskCount();
      }
    });
  });
}

// SWEETALERT2: UNA FUNCIÓ PER CONFIMACION (Eliminar) y AVISO (Eliminar o crear Tasques )
function confirmDeleteTask() {
  return Swal.fire({
    title: 'Eliminar tasca?',
    text: 'Aquesta acció no es pot desfer.',
    icon: 'warning',
    width: 360,
    padding: '1.5em',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancel·lar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    focusCancel: true,
    customClass: {
      popup: 'board-swal board-swal-delete',
      title: 'board-swal-title',
      confirmButton: 'board-swal-confirm',
      cancelButton: 'board-swal-cancel'
    }
  }).then(result => result.isConfirmed);
}

function showTaskAdded() {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Tasca afegida',
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'board-swal-toast'
    }
  });
}

function showTaskDeleted() {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Tasca eliminada',
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'board-swal-toast'
    }
  });
}

function showTaskUpdated() {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Tasca actualitzada',
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'board-swal-toast'
    }
  });
}

function showTaskCompleted() {
  Swal.fire({
    title: '🎉 Tasca completada!',
    html: `
      <div class="completion-content">
        <div class="completion-emoji">🏆</div>
        <p>¡Buen trabajo! Has completado la tarea con éxito.</p>
      </div>
    `,
    width: 420,
    heightAuto: false,
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#4f46e5',
    allowOutsideClick: false,
    customClass: {
      popup: 'completion-popup is-compact',
      confirmButton: 'completion-button'
    },
    didOpen: () => {
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#4f46e5', '#000000', '#f59e0b', '#ec4899', '#06b6d4'];

      (function frame() {
        if (Date.now() > end) return;

        for (let i = 0; i < 5; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'completion-confetti';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

          document.body.appendChild(confetti);
          setTimeout(() => confetti.remove(), 4000);
        }

        setTimeout(frame, 150);
      })();
    }
  });
}
function showOverdueWarning(message) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'warning',
    title: message,
    timer: 4000,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'board-swal-toast board-swal-toast-overdue'
    }
  });
}
function openTaskDetails(taskId) {
  const task = state.find(t => String(t.id) === String(taskId));
  if (!task) return;

  Swal.fire({
    title: 'Detalle de la tarea',
    width: 600,
    padding: '2em',
    html: `
      <div class="trello-modal">
        <label for="swal-title">Títol</label>
        <input id="swal-title" class="swal-field" value="${task.title || ''}">
        
        <label for="swal-desc">Descripció</label>
        <textarea id="swal-desc" class="swal-field">${task.description || ''}</textarea>
        
        <div class="date-row">
          <div>
            <label for="swal-start">Data d'inicio</label>
            <input type="date" id="swal-start" class="swal-field" value="${task.startDate || ''}">
          </div>
          <div>
            <label for="swal-due">Fecha limite</label>
            <input type="date" id="swal-due" class="swal-field" value="${task.dueDate || ''}">
          </div>
        </div>

        <label for="swal-status">Estat</label>
        <select id="swal-status" class="swal-field">
          <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>📋 Per fer</option>
          <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>⚙️ En procés</option>
          <option value="done" ${task.status === 'done' ? 'selected' : ''}>✅ Completat</option>
        </select>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: '💾 Desar canvis',
    cancelButtonText: 'Cancel·lar',
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#64748b',
    customClass: {
      popup: 'board-swal board-swal-edit',
      confirmButton: 'board-swal-confirm',
      cancelButton: 'board-swal-cancel'
    },
    preConfirm: () => {
      const title = document.getElementById('swal-title').value.trim();
      if (!title) {
        Swal.showValidationMessage('El títol no pot estar buit');
        return false;
      }
      return {
        title: title,
        description: document.getElementById('swal-desc').value.trim(),
        startDate: document.getElementById('swal-start').value,
        dueDate: document.getElementById('swal-due').value,
        status: document.getElementById('swal-status').value
      };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      Object.assign(task, result.value);
      renderAllTasks();
      updateTaskCount();
      showTaskUpdated();
      if (result.value.dueDate && result.value.status !== 'done' && dayjs(result.value.dueDate).isBefore(dayjs(), 'day')) {
        showOverdueWarning(`⚠️ La tarea "${result.value.title}" está vencida`);
      }
    }
  });
}