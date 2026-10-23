// --- ЛОГИКА ДЛЯ МОДАЛЬНОГО ОКНА ЗАКАЗА (index.html) ---
const orderDialog = document.getElementById('order-dialog');

if (orderDialog) {
  const orderButtons = document.querySelectorAll('.product-card__button');
  const closeDialogButton = document.getElementById('close-order-dialog');
  const selectedProductInput = document.getElementById('selected-product');

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      if (selectedProductInput) selectedProductInput.value = productName;
      orderDialog.showModal();
    });
  });

  if (closeDialogButton) {
    closeDialogButton.addEventListener('click', () => orderDialog.close());
  }
}

// --- ЛОГИКА ДЛЯ ОТПРАВКИ ФОРМЫ И ОКНА УСПЕХА ---
const orderForm = document.getElementById('order-form');
const successDialog = document.getElementById('success-dialog');
const closeSuccessButton = document.getElementById('close-success-dialog');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Очистка предыдущих ошибок
    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) element.removeAttribute('aria-invalid');
    });

    // Проверка валидности
    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return; // Если невалидно — останавливаемся
    }

    // Если форма валидна:
    if (orderDialog) {
      orderDialog.close(); // Закрываем окно с формой 
    }

    if (successDialog) {
      successDialog.showModal(); // окно успеха
    }

    // Очищаем форму
    orderForm.reset();
  });
}

// Закрытие окна успеха
if (closeSuccessButton && successDialog) {
  closeSuccessButton.addEventListener('click', () => {
    successDialog.close();
  });
}