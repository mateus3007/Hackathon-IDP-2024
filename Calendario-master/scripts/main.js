// Variáveis globais
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// Variável do modal:
const newEvent = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
// --------
const calendar = document.getElementById('calendar'); // Div calendar:
const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']; // Array with weekdays:

// Funções

function openModal(date) {
  clicked = date;
  const eventDay = events.find((event) => event.date === clicked);
  // Redirecionar para Aula.html se for o dia 1
  if (clicked === `${new Date().getMonth() + 1}/1/${new Date().getFullYear()}`) {
    window.location.href = 'Aula.html';
    return;
  }
  
  // Redirecionar para Aula2.html se for o dia 2
  if (clicked === `${new Date().getMonth() + 1}/2/${new Date().getFullYear()}`) {
    window.location.href = 'Aula2.html';
    return;
  }
  
  if (eventDay) {
    document.getElementById('eventText').innerText = eventDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEvent.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

// Função load() será chamada quando a página carregar:
// Função load() será chamada quando a página carregar:
function load() {
  const date = new Date();

  // Mudar título do mês:
  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysMonth = new Date(year, month + 1, 0).getDate();
  const firstDayMonth = new Date(year, month, 1);

  const dateString = firstDayMonth.toLocaleDateString('pt-br', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const paddinDays = weekdays.indexOf(dateString.split(', ')[0]);

  // Mostrar mês e ano:
  document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`;

  calendar.innerHTML = '';

  // Criando uma div com os dias:
  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement('div');
    dayS.classList.add('day');

    const dayString = `${month + 1}/${i - paddinDays}/${year}`;

    // Condicional para criar os dias de um mês:
    if (i > paddinDays) {
      dayS.innerText = i - paddinDays;

      const eventDay = events.find((event) => event.date === dayString);

      if (i - paddinDays === day && nav === 0) {
        dayS.id = 'currentDay';
      }

      if (eventDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventDay.title;
        dayS.appendChild(eventDiv);

        // Redireciona para aula.html quando clicar no evento "Matemática"
        if (eventDay.title === 'Matemática') {
          eventDiv.addEventListener('click', () => {
            window.location.href = 'aula.html';
          });
        }
      }

      dayS.addEventListener('click', () => openModal(dayString));

      // Adiciona o evento fixo "Matemática" no primeiro dia do mês
      if (i - paddinDays === 1) {
        const mathEvent = document.createElement('div');
        mathEvent.classList.add('event');
        mathEvent.innerText = 'Matemática';
        dayS.appendChild(mathEvent);

        // Redireciona para aula.html quando clicar no evento "Matemática"
        mathEvent.addEventListener('click', () => {
          window.location.href = 'aula.html';
        });
      }

      if (i - paddinDays === 2) {
        const physicsEvent = document.createElement('div');
        physicsEvent.classList.add('event');
        physicsEvent.innerText = 'Física';
        dayS.appendChild(physicsEvent);
      }
    } else {
      dayS.classList.add('padding');
    }

    calendar.appendChild(dayS);
  }
}


function closeModal() {
  eventTitleInput.classList.remove('error');
  newEvent.style.display = 'none';
  backDrop.style.display = 'none';
  deleteEventModal.style.display = 'none';

  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter((event) => event.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
  // Redireciona para outra página
  window.location.href = 'Aula.html';
}

// Botões
function buttons() {
  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', () => saveEvent());

  document.getElementById('cancelButton').addEventListener('click', () => closeModal());

  document.getElementById('deleteButton').addEventListener('click', () => deleteEvent());

  document.getElementById('closeButton').addEventListener('click', () => closeModal());
}

buttons();
load();
