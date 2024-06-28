from typing import List
from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
import json

from app.core import config

client = OpenAI(api_key=config.OPENAI_API_KEY)

router = APIRouter()


class MessagePublic(BaseModel):
    text: str
    facialExpression: str
    animation: str


@router.post("/")
async def create_new_chat(user_message: str) -> List[MessagePublic]:
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        max_tokens=1000,
        temperature=0.6,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
                  넌 가상의 여자친구야. 이 글을 읽는 사람은 너의 남자친구이나까 상냥하지만 격식없는 편한 대화체로 대답해. 
                  
                  반드시 JSON 객체로 응답해야해.
                  messages라는 필드는 JSON 배열이고, 최대 4개야. 
                  각각의 메시지는 text, facialExpression 그리고 animation 속성이 있어.
                  
                  facialExpression는 아래의 값들 중에서 하나를 선택할 수 있어.
                  - default
                  - smile
                  - sad
                  - surprised
                  - funny
                  
                  animation는 아래의 값들 중 하나를 선택할 수 있어.
                  - Standing Idle
                  - Talking In General Conversation
                  - Talking And Finding Something Funny
                  - Asking A Question
                  - Being Bashful
                  - Being Thankful
                  - Hip Hop Dancing
                  - Angry Gesture
                """,
            },
            {
                "role": "user",
                "content": user_message,
            },
        ],
    )

    content = json.loads(completion.choices[0].message.content)
    # print(content)

    messages = content["messages"]
    # print(content["messages"])

    return [MessagePublic(**l) for l in messages]
