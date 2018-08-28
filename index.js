function main(params) {

	let intent = params.request.intent.name;
	let result;
	let attribute = {"name":"", "value":""};
	let recommendation;
	let recipe;
	const recommendedTypeList = ['한번 맛보면 참을 수 없는', '남녀노소 즐길 수 있는', '기가 막히고 혀가 놀라는'];
	const tutorialList = ['이전 요리 단계를 알고 싶으면', '현재 요리 단계를 알고 싶으면', '다음 요리 단계를 알고 싶으면'];

	if(intent == 'Clova.GuideIntent') {
		//첫 인사
		recommendedType = getRecommendation(3);
		result = "안녕하세요. 모두의 요리사 요리왕입니다.\n\r만들고 싶은 음식을 말씀해 주세요.\n\r잘 모르시겠다면 요리왕이 " + recommendedTypeList[recommendedType] + " 요리를 추천해 드릴께요."
		attribute.name = "recommendation";
		attribute.value = recommendedType;
	} else if(intent == 'AskRecipe') {
		//레시피 질문
		let food = params.request.intent.slots.food.value;
		result = AskRecipe(food);
		attribute.name = "recipe";
		attribute.value = food;
	} else if(intent == 'AskRecipeRecommendation') {
		recommendation = params.session.sessionAttributes.recommendation;
		recipe = params.session.sessionAttributes.recipe;
		result = recommendedTypeList[recommendation] + " " + recipe + "를 만들어 볼까요?";
	} else if(intent == 'Clova.YesIntent') {
		recipe = params.session.sessionAttributes.recipe;
		tutorial = getRecommendation(3);
		result = "요리왕이 " + recipe + " 레시피에 대해 다 알려줄테니까 걱정마세요. 먼저 원활한 요리 진행을 위해 저랑 약속 하나만 하고 갈까요?\r\n잘 들어주세요. 요리 도중 요리 이전 단계를 알고 싶으면 이전, 현재 단계를 알고 싶으면 ‘다시’, 다음 단계를 알고 싶은 ‘다음＇이라고 말해주세요.\r\n한번 테스트 해볼까요?" + tutorialList[tutorial] + "어떻게 말해야 하죠?"
	} else if(intent == 'Clova.NoIntent') {
		recommendedType = getRecommendation(3);
		result = "음.. 그럼 다른 요리를 해볼까요?\n\r만들고 싶은 음식을 말씀해 주세요.\n\r잘 모르시겠다면 요리왕이 " + recommendedTypeList[recommendedType] + " 요리를 추천해 드릴께요."
		attribute.name = "recommendation";
		attribute.value = recommendedType;
	} else {
		//첫 인사
		recommendedType = getRecommendation(3);
		result = "안녕하세요. 모두의 요리사 요리왕입니다.\n\r만들고 싶은 음식을 말씀해 주세요.\n\r잘 모르시겠다면 요리왕이 " + recommendedTypeList[recommendedType] + " 요리를 추천해 드릴께요."
		attribute.name = "recommendation";
		attribute.value = recommendedType;
	}


	let response = convertJSON(result, attribute);
	response.sessionAttributes["formerIntent"] = intent;
  return response;
}

function getRecommendation(range) {
	return Math.floor(Math.random() * range);
}

function AskRecipe(food) {
	return food + "를 만들어 볼까요?"
}

function convertJSON(text, attribute) {
	let result = {
		"version": "0.1.0",
		"sessionAttributes": {},
		"response": {
			"outputSpeech": {
				"type": "SimpleSpeech",
				"values": {
					"type": "PlainText",
					"lang": "ko",
					"value": text
				}
			},
			"card": {},
			"directives": [],
			"shouldEndSession": false
		}
	};

	if(attribute.name != "") {
		result.sessionAttributes[attribute.name] = attribute.value;
	}

	return result;
}