from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")
OPENAI_API_KEY = config("OPENAI_API_KEY", cast=Secret)

PROJECT_NAME = "AI 가상여친"
VERSION = "1.0.0"
API_PREFIX = "/api"