document.addEventListener('DOMContentLoaded', () => {
  const projectModal = document.getElementById('projectModal');
  const modalTitle = projectModal.querySelector('.modal-title');
  const modalBody = projectModal.querySelector('.modal-body');
  const projectLink = document.getElementById('projectLink');
  const modalImage = projectModal.querySelector('.modal-image'); 


  const imagePath = 'assets/img/icons/';

  projectModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget; 
    const title = button.getAttribute('data-title');
    const description = button.getAttribute('data-description');
    const link = button.getAttribute('data-link');
    const imageName = button.getAttribute('data-image');

    console.log('Título:', title);
    console.log('Descrição:', description);
    console.log('Link:', link);
    console.log('Imagem:', imageName);


    modalTitle.textContent = title;
    modalBody.textContent = description;
    projectLink.href = link;
    
    
    if (imageName) {
      modalImage.src = imagePath + imageName; 
      modalImage.style.display = 'block';
      console.log("Imagem carregada:", modalImage.src);
    } else {
      modalImage.style.display = 'none';
    }
  });
});
