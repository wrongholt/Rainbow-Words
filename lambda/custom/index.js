/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
var generateWord;
var i = 0;
var wordCounter = 0;
var databaseWord;
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {

    const title = "Welcome to Rainbow Words";

    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .reprompt(helpMessage)
      .withSimpleCard(title, "Where kids learn words.")
      .getResponse();
  },
};
const RainbowWordHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' &&
      request.intent.name === 'RainbowWordHandler';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var i = attributes.i;
    var wordCounter = attributes.wordCounter;

    if (wordCounter == 31) {
      i += 1;
      var wordCounter = 0;
    }
    if (i == 9) {
      i = 0;
    }
    var colorValue = color[i];
    generateWord = randomNoRepeats(words[i]);
    wordCounter += 1;


    attributes.generateWord = generateWord();
    attributes.i = i;
    attributes.colorValue = colorValue;
    attributes.wordCounter = wordCounter;
    attributesManager.setPersistentAttributes(attributes);
    await attributesManager.savePersistentAttributes();

    databaseWord = attributes.generateWord;
    if (supportsDisplay(handlerInput)) {

      const bgImage = new Alexa.ImageHelper()
        .addImageInstance(urls[i])
        .getImage();
      const title = `<div align='center'><font size="5"><b>${databaseWord}</b></font></div>`;

      const bodyTemplate = 'BodyTemplate7';

      responseBuilder.addRenderTemplateDirective({
        type: bodyTemplate,
        token: "",
        backButton: 'hidden',
        backgroundImage: bgImage,
        title,
      });
      speechText = `Hello, you are on ${colorValue}. Here is your first word.`;
    }
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(`${databaseWord}`)
      .getResponse();
  },
};
const GetWordsIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' &&
      request.intent.name === 'GetWordsIntentHandler';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var i = attributes.i;
    const request = handlerInput.requestEnvelope.request;
    attributesManager.setPersistentAttributes(attributes);
    await attributesManager.savePersistentAttributes();
    if (request.intent.slots &&
      request.intent.slots.theWord &&
      request.intent.slots.theWord.value &&
      request.intent.slots.theWord.resolutions &&
      request.intent.slots.theWord.resolutions.resolutionsPerAuthority &&
      request.intent.slots.theWord.resolutions.resolutionsPerAuthority[0] &&
      request.intent.slots.theWord.resolutions.resolutionsPerAuthority[0].values &&
      request.intent.slots.theWord.resolutions.resolutionsPerAuthority[0].values[0] &&
      request.intent.slots.theWord.resolutions.resolutionsPerAuthority[0].values[0].value &&
      request.intent.slots.theWord.resolutions.resolutionsPerAuthority[0].values[0].value.name) {
      if (request.intent.slots.theWord.value == databaseWord) {
        textTitle = "<div align='center'><font size='5'><b>That is correct! \"" + `${databaseWord}\"</b></font></div>`;
        speechText = `That is correct! \"${databaseWord}\"`
        responseBoolean = true;

        if (supportsDisplay(handlerInput)) {

          const bgImage = new Alexa.ImageHelper()
            .addImageInstance(urls[i])
            .getImage();
          const title = textTitle;
          const bodyTemplate = 'BodyTemplate7';

          responseBuilder.addRenderTemplateDirective({
            type: bodyTemplate,
            token: "",
            backButton: 'hidden',
            backgroundImage: bgImage,
            title,
          });

        }
        return responseBuilder
          .speak(speechText)
          .withSimpleCard(speechText)
          .getResponse();
      } else {
        textTitle = '<div align="center"><font size="5"><b>That is not correct! The word is: \"' + `${databaseWord}\"</b></font></div>`;
        speechText = `That is not correct! The word is: \"${databaseWord}\"`
        responseBoolean = false;
        if (supportsDisplay(handlerInput)) {

          const bgImage = new Alexa.ImageHelper()
            .addImageInstance(urls[i])
            .getImage();
          const title = textTitle;
          const bodyTemplate = 'BodyTemplate7';

          responseBuilder.addRenderTemplateDirective({
            type: bodyTemplate,
            token: "",
            backButton: 'hidden',
            backgroundImage: bgImage,
            title,
          });

        }

        return responseBuilder
          .speak(speechText)
          .withSimpleCard(speechText)
          .getResponse();
      }
    }
  },
};
const AnotherWordHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' &&
      request.intent.name === 'AnotherWordHandler';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await attributesManager.getPersistentAttributes() || {};
    var i = attributes.i;
    var wordCounter = attributes.wordCounter;

    if (wordCounter == 30) {
      i += 1;
      var wordCounter = 0;
    }
    if (i == 9) {
      i = 0;
    }
    generateWord = randomNoRepeats(words[i]);
    attributes.generateWord = generateWord();
    wordCounter += 1;
    attributes.i = i;
    attributes.wordCounter = wordCounter;
    attributesManager.setPersistentAttributes(attributes);
    await attributesManager.savePersistentAttributes();
    databaseWord = attributes.generateWord;

    if (supportsDisplay(handlerInput)) {

      const bgImage = new Alexa.ImageHelper()
        .addImageInstance(urls[i])
        .getImage();
      const title = `<div align='center'><font size="5"><b>${databaseWord}</b></font></div>`;
      const bodyTemplate = 'BodyTemplate7';

      responseBuilder.addRenderTemplateDirective({
        type: bodyTemplate,
        token: "",
        backButton: 'hidden',
        backgroundImage: bgImage,
        title,
      });

    }

    speechText = "Here's your word."
    speechTextReprompt = "Do you need help?"
    return responseBuilder
      .speak(speechText)
      .reprompt(speechTextReprompt)
      .withSimpleCard(`${databaseWord}`)
      .getResponse();
  },
};
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can introduce yourself by telling me your name';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    RainbowWordHandler,
    GetWordsIntentHandler,
    AnotherWordHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('rainbow-words')
  .withAutoCreateTable(true)
  .lambda();
var urls = ["https://s3.amazonaws.com/alexa.skill.rainbowwords/background-board-carpentry-960137.jpg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/abstract-background-carpentry-268976.jpg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/abstract-art-background-1020317.jpg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/artificial-background-close-up-958168.jpg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/abstract-art-artificial-131634.jpg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/backgrounds-blank-blue-953214.jpg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/pexels-photo-355762.jpeg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/abstract-attractive-backdrop-838423.jpg",
  "https://s3.amazonaws.com/alexa.skill.rainbowwords/cement-color-concrete-1260727.jpg"
]
var color = ['Red', 'Orange', 'Yellow', 'Dark Green', 'Light Green', "Blue", 'Purple', 'Pink', 'White'];
var words = [
  ['I', "a", "the", "can", "see", "like", "to", "and", "you", "big"],
  ['in', "it", "is", "we", "me", "my", "run", "play", "say", "look"],
  ['for', "at", "am", "did", "little", "get", "will", "jump", "up", "on"],
  ['help', "make", "ride", "down", "yes", "no", "so", "go", "he", "she", "be"],
  ['have', "our", "out", "saw", "all", "do", "come", "out", "eat", "they"],
  ['with', "here", "find", "blue", "two", "away", "are", "but", "ate", "good"],
  ['into', "this", "that", "there", "came", "red", "three", "too", "ran", "must"],
  ['went', "black", "who", "what", "where", "white", "not", "said", "want", "brown"],
  ['soon', "new", "now", "well", "funny", "yellow", "under", "pretty", "four", "was"]
];

function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function () {
    if (copy.length < 1) {
      copy = array.slice(0);
    }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

//Constents
const welcomeMessage = `Welcome to Rainbow Words.`
const helpMessage = "Would you like to play Rainbow Words still?"