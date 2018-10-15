module.exports = {
    createBodyTemplate1: function (handlerInput, title, backgroundImage, backButton, textContent) {
      createBodyTemplate('BodyTemplate1', handlerInput, title, undefined, backgroundImage, backButton, textContent);
    },
    createBodyTemplate2: function (handlerInput, title, image, backgroundImage, backButton, textContent) {
      createBodyTemplate('BodyTemplate2', handlerInput, title, image, backgroundImage, backButton, textContent);
    },
    createBodyTemplate3: function (handlerInput, title, image, backgroundImage, backButton, textContent) {
      createBodyTemplate('BodyTemplate3', handlerInput, title, image, backgroundImage, backButton, textContent);
    },
    createBodyTemplate6: function (handlerInput, image, backgroundImage, backButton, textContent) {
      createBodyTemplate('BodyTemplate6', handlerInput, undefined, image, backgroundImage, backButton, textContent);
    },
    createBodyTemplate7: function (handlerInput, title, image, backgroundImage, backButton) {
      createBodyTemplate('BodyTemplate7', handlerInput, title, image, backgroundImage, backButton, undefined);
    }
  };
  
  const Alexa = require('ask-sdk-core');  
 
  // "HIDDEN" or "VISIBLE" for backButton
  function createBodyTemplate(type, handlerInput, title, image, backgroundImage, backButton, textContent) {
    handlerInput.responseBuilder.addRenderTemplateDirective({
      type,
      backButton,
      backgroundImage: (backgroundImage ? new Alexa.ImageHelper().addImageInstance(backgroundImage).getImage() : undefined),
      image: (image ? new Alexa.ImageHelper().addImageInstance(image).getImage() : undefined),
      title,
      textContent
    });
  } 