        const im = document.getElementById('im');
            const ctx = im.getContext('2d');
            // let backgroundImage = null;

            const imageUpload = document.getElementById('imageupload');
            imageUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const image = new Image();
                    image.src = URL.createObjectURL(file);
                    image.onload = () => {
                        ctx.drawImage(image, 0, 0, im.width, im.height);
                        backgroundImage = image;
                    };
                }
            });

            const writeButton = document.getElementById('writebutton');
            writeButton.addEventListener('click', () => {
                const textInput = document.getElementById('textinput').value;
                if (textInput && backgroundImage) {
                    ctx.drawImage(backgroundImage, 0, 0, im.width, im.height);
                    ctx.font = '30px Arial';
                    // ctx.fillStyle = 'red';
                    ctx.fillText(textInput, 345, 30);
                }
            });

            const saveButton = document.getElementById('savebutton');
            saveButton.addEventListener('click', () => 
            {
                const imageURI = im.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = imageURI;
                a.download = 'modified_image.png';
                a.click();
            });



            const imageInput = document.getElementById('imageupload');
            const paintCanvas = document.getElementById('im');
    
            imageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = function() {
                        // Draw the image on the canvas
                        ctx.drawImage(img, 0, 0, paintCanvas.width, paintCanvas.height);
                    };
                };

                reader.readAsDataURL(file);
            }
        });

            let painting = false;

            paintCanvas.addEventListener('mousedown', () => {
            painting = true;
            ctx.beginPath();
        });

            paintCanvas.addEventListener('mouseup', () => {
            painting = false;
            ctx.closePath();
            });

            paintCanvas.addEventListener('mousemove', (event) => 
            {
                if (!painting) return;
        
                const x = event.clientX - paintCanvas.getBoundingClientRect().left;
                const y = event.clientY - paintCanvas.getBoundingClientRect().top;
                
            
                ctx.lineWidth = 5;
                ctx.lineCap = 'round';
                ctx.strokeStyle = 'black';
                ctx.lineTo(x, y);
                ctx.stroke();
            });

        const canvas = document.getElementById('im');
        // const ctx = canvas.getContext('2d');

        const backgroundImage = new Image();
        let selectedBackground = null; 

        // Function to set the canvas background
        function setBackground() {
            if (selectedBackground) {
                backgroundImage.src = selectedBackground;
                backgroundImage.onload = function() {
                    ctx.drawImage(backgroundImage, 0, 0, im.width, im.height);
                };
            }
        }

        // Event listener for clicking on carousel images
        const carouselImages = document.querySelectorAll('.carousel-image');
        carouselImages.forEach(image => {
            image.addEventListener('click', () => {
                selectedBackground = image.src;
                setBackground();
            });
        });
