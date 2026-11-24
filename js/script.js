const message = document.getElementById('message');
const status = document.getElementById('status');
const output = document.getElementById('output');

function getMessage() {
  const value = message.value.trim();
  if (!value) {
    status.textContent = 'Сначала введи информацию в поле выше.';
    output.textContent = '';
    return null;
  }
  return value;
}

document.getElementById('processBtn').addEventListener('click', () => {
  const value = getMessage();
  if (value === null) return;
  const cleaned = value.replace(/\\s+/g, ' ');
  const words = cleaned.split(' ').filter(Boolean).length;
  status.textContent = 'Обработка выполнена: лишние пробелы убраны, подсчитано количество слов.';
  output.textContent = `Обработанная информация: ${cleaned} Количество символов: ${cleaned.length}. Количество слов: ${words}.`;
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const value = getMessage();
  if (value === null) return;
  try {
    localStorage.setItem('savedInformation', value);
    status.textContent = 'Информация сохранена в локальном хранилище этого браузера.';
    output.textContent = 'При следующем открытии страницы сохранённый текст можно восстановить кнопкой «Передать» не получится; сохранение демонстрирует этап хранения.';
  } catch (error) {
    status.textContent = 'Не удалось сохранить информацию в браузере.';
  }
});

document.getElementById('sendBtn').addEventListener('click', () => {
  let value = message.value.trim();
  if (!value) {
    try { value = localStorage.getItem('savedInformation') || ''; } catch (error) {}
  }
  if (!value) {
    status.textContent = 'Нет информации для передачи. Введи или сохрани сообщение.';
    output.textContent = '';
    return;
  }
  status.textContent = 'Демонстрация передачи: сообщение подготовлено для отправки.';
  output.textContent = `Передаваемое сообщение: «${value}»`;
});

document.getElementById('clearBtn').addEventListener('click', () => {
  message.value = '';
  status.textContent = 'Поле очищено. Можно начать заново.';
  output.textContent = '';
});
