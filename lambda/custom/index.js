/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const RainbowWordHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
&& request.intent.name === 'RainbowWordHandler');
  },
  async handle(handlerInput) {
    const i = 0;
    const colorValue = color[0];
    let speechText = `Hello you are on ${colorValue}. Get ready for your first word.`;

    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = await attributesManager.getPersistentAttributes() || {};
   
    
      attributes.colorValue = colorValue;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
    
    
    
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(`Welcome Rainbow Words`, "Where kids learn words with help of Alexa.");
  },
};
const GetWordsIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return (request.type === 'IntentRequest'
&& request.intent.name === 'GetWordsIntent');
  },
  async handle(handlerInput) {
    let speechText = `Please look at a device for your first word.`;

    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = await attributesManager.getPersistentAttributes() || {};
    var randomWord = randomNoRepeats(color["Red"]);
    
      attributes.colorValue = colorValue;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();

    return responseBuilder
    .speak(speechText)
    .withSimpleCard(`${randomWord()}`)
    .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
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
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
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
    RainbowWordHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('rainbow-words')
  .withAutoCreateTable(true)
  .lambda();

  var color = {
    'Red':['I', "a", "the", "can", "see", "like", "to", "and", "you", "big"],
    'Orange':['in', "it", "is", "we", "me", "my", "run", "play", "say", "look"],
    'Yellow':['for', "at", "am", "did", "little", "get", "well", "jump", "up", "on"],
    'Dark Green':['help', "make", "ride", "down", "yes", "no", "so", "go", "he", "she", "be"],
    'Light Green':['have', "our", "out", "saw", "all", "do", "come", "out", "eat", "they"],
    'Blue':['with', "here", "find", "blue", "two", "away", "are", "but", "ate", "good"],
    'Purple':['into', "this", "that", "there", "came", "red", "three", "too", "ran", "must"],
    'Pink':['went', "black", "who", "what", "where", "white", "not", "said", "want", "brown"],
    'White':['soon', "new", "now", "well", "funny", "yellow", "under", "pretty", "four", "was"]
  };
  function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }