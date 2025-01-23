document.addEventListener('DOMContentLoaded', () => {
  const projectModal = document.getElementById('projectModal');
  const modalTitle = projectModal.querySelector('.modal-title');
  const modalBody = projectModal.querySelector('.modal-body');
  const projectLink = document.getElementById('projectLink');
  const modalImagesContainer = projectModal.querySelector('.window-pane span');

  const imagePath = 'assets/img/icons/';

  projectModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const title = button.getAttribute('data-title');
    const description = button.getAttribute('data-description');
    const link = button.getAttribute('data-link');
    const images = button.getAttribute('data-image').split(' ');

    console.log('Título:', title);
    console.log('Descrição:', description);
    console.log('Link:', link);
    console.log('Imagens:', images);

    modalTitle.textContent = title;
    modalBody.textContent = description;
    projectLink.href = link;

    // Limpa o container de imagens
    modalImagesContainer.innerHTML = '';

    // Adiciona cada imagem
    if (images) {
      images.forEach(imageName => {
        if (imageName) {
          const img = document.createElement('img');
          img.src = imagePath + imageName;
          img.className = 'tag-icons modal-image img-fluid mb-3 me-2';
          img.alt = 'Ícone de tecnologia';
          modalImagesContainer.appendChild(img);
        }
      });
    }
  });
});
