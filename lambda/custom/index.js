/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const i = 0;
const RainbowWordHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
&& request.intent.name === 'RainbowWordHandler');
  },
  async handle(handlerInput) {
   
    const colorValue = color[i];
    let speechText = `Hello, you are on ${colorValue}. Get ready for your first word.`;

    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = await attributesManager.getPersistentAttributes() || {};
   
    attributes.i = i;
      attributes.colorValue = colorValue;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();
    
    
    
    return responseBuilder
      .speak(speechText)
      .withSimpleCard(`Welcome Rainbow Words`, "Where kids learn words with help of Alexa.")
      .getResponse();
     
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
var wordCounter = 0;
const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    
    const attributes = await attributesManager.getPersistentAttributes() || {};
      attributes.wordCounter = wordCounter;
      attributesManager.setPersistentAttributes(attributes);
      await attributesManager.savePersistentAttributes();

      if(attributes.wordCounter < 30){
        attributes.wordCounter++;
         var word = randomNoRepeats(words[i]);
      }
  

    return responseBuilder
    .speak(speechText)
    .withSimpleCard(`${word()}`)
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
    GetWordsIntent,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('rainbow-words')
  .withAutoCreateTable(true)
  .lambda();

  var color = ['Red','Orange','Yellow', 'Dark Green', 'Light Green', "Blue", 'Purple', 'Pink', 'White'];
  var words = [
    ['I', "a", "the", "can", "see", "like", "to", "and", "you", "big"],
    ['in', "it", "is", "we", "me", "my", "run", "play", "say", "look"],
    ['for', "at", "am", "did", "little", "get", "well", "jump", "up", "on"],
    ['help', "make", "ride", "down", "yes", "no", "so", "go", "he", "she", "be"],
    ['have', "our", "out", "saw", "all", "do", "come", "out", "eat", "they"],
    ['with', "here", "find", "blue", "two", "away", "are", "but", "ate", "good"],
    ['into', "this", "that", "there", "came", "red", "three", "too", "ran", "must"],
    ['went', "black", "who", "what", "where", "white", "not", "said", "want", "brown"],
    ['soon', "new", "now", "well", "funny", "yellow", "under", "pretty", "four", "was"]
  ];
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
  
  
  