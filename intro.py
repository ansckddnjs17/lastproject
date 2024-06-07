from fastapi import APIRouter, Path
from model import Intro
from datetime import datetime

intro_router = APIRouter()

intro_list = []
intro_counter = 0

@intro_router.post("/intro")
async def add_intro(intro: Intro) -> dict:
    global intro_counter
    intro.id = intro_counter = intro_counter + 1
    intro.timestamp = datetime.now()
    intro_list.append(intro)
    return {"msg": "intro success"}

@intro_router.get("/intro")
async def retrieve_intro() -> dict:
    return {"intro": intro_list}

@intro_router.get("/intro/{intro_id}")
async def get_single_intro(intro_id: int = Path(..., title="ID")) -> dict:
    for intro in intro_list:
        if intro.id == intro_id:
            return {"intro": intro}

@intro_router.delete("/intro/{intro_id}")
async def delete_intro(intro_id: int = Path(..., title="the ID of intro to delete")) -> dict:
    for index, intro in enumerate(intro_list):
        if intro.id == intro_id:
            del intro_list[index]
            return {"msg": f"Intro with ID {intro_id} deleted successfully"}
    return {"msg": "Intro with supplied ID"}
