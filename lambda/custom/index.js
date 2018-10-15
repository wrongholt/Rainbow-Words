/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const Utils = require("./utils.js");
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    // if (has_display(request)) {
    //   handlerInput.responseBuilder.directive({
    //     "type": "Display.RenderTemplate",
    //     "template": {
    //       "type": "BodyTemplate6",
    //       "backButton": "HIDDEN",
    //       "backgroundImage": "https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg",
    //       "textContent": {
    //         "primaryText": {
    //           "text": `Hello there mate!`,
    //           "type": "PlainText"
    //         }
    //       }
    //     }
    //   });
    // }
    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .reprompt(helpMessage)
      .withSimpleCard("Welcome to Rainbow Words","Where kids learn words.")
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

    const colorValue = color[i];
    let speechText = `Hello, you are on ${colorValue}. Get ready for your first word.`;

    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = await attributesManager.getPersistentAttributes() || {};

    attributes.i = i;
    attributes.colorValue = colorValue;
    attributes.wordCounter = wordCounter;

    attributesManager.setPersistentAttributes(attributes);
    await attributesManager.savePersistentAttributes();
     console.log(this.intent.slots.word.value);
    var word = randomNoRepeats(words[i]);
    // var slotIntent = intent.slots.WORD.value;
    // slotIntent = word();
    // console.log(slotIntent);
    
  //  Utils.createBodyTemplate1(handlerInput, `${word()}`,"https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg", "HIDDEN", `${word()}`);

    return responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, `${word()}`)
      .getResponse();
      // this.response.speak('<break time="1ms"/>')
  },
};
const GetWordsIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log("Inside WordsIntent");
    return (request.type === 'IntentRequest' &&
      request.intent.name === 'GetWordsIntent');
  },
  async handle(handlerInput) {

    if (intent.slots.type.WORD.value == word()) {
      return responseBuilder
        .speak("That is correct!", `${word()}`)
        .getResponse();
    } else {
      return responseBuilder
        .speak(`${word()}`)
        .getResponse();
    }
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
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('rainbow-words')
  .withAutoCreateTable(true)
  .lambda();

var color = ['Red', 'Orange', 'Yellow', 'Dark Green', 'Light Green', "Blue", 'Purple', 'Pink', 'White'];
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
function getWord(){
  
    var word = randomNoRepeats(words[i]);
    var slotInent = this.event.request.intent.GetWordsIntentHandler.slots.WORD.value;
    slotInent = word();
  if(this.event.request.intent.GetWordsIntentHandler.slots.WORD.value == word()){
    wordCounter += 1; 
    }else{
      wordCounter = 0;
      i +=1;
    }
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
const i = 0;
const wordCounter = 0;
const welcomeMessage = `Welcome to Rainbow Words.`
const helpMessage = "Would you like to play Rainbow Words still?"
//   {
//     "name": {
//         "value": "I"
//     }
// },
// {
//     "name": {
//         "value": "a"
//     }
// },
// {
//     "name": {
//         "value": "the"
//     }
// },
// {
//     "name": {
//         "value": "can"
//     }
// },
// {
//     "name": {
//         "value": "see"
//     }
// },
// {
//     "name": {
//         "value": "like"
//     }
// },
// {
//     "name": {
//         "value": "to"
//     }
// },
// {
//     "name": {
//         "value": "and"
//     }
// },
// {
//     "name": {
//         "value": "you"
//     }
// },
// {
//     "name": {
//         "value": "big"
//     }
// },
// {
//     "name": {
//         "value": "in"
//     }
// },
// {
//     "name": {
//         "value": "it"
//     }
// },
// {
//     "name": {
//         "value": "is"
//     }
// },
// {
//     "name": {
//         "value": "we"
//     }
// },
// {
//     "name": {
//         "value": "me"
//     }
// },
// {
//     "name": {
//         "value": "my"
//     }
// },
// {
//     "name": {
//         "value": "run"
//     }
// },
// {
//     "name": {
//         "value": "play"
//     }
// },
// {
//     "name": {
//         "value": "say"
//     }
// },