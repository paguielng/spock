#!/usr/bin/env python3
# -*- coding: utf-8 -*-
 
import random
import sys
import os
 
CLEAR = "cls" if sys.platform == 'win32' else 'clear'
 
ROCK = 0b001
PAPER = 0b010
SCISSORS = 0b100
 
winner = {
    ROCK | PAPER: PAPER,
    PAPER | SCISSORS: SCISSORS,
    SCISSORS | ROCK: ROCK,
    ROCK | ROCK: None,
    PAPER | PAPER: None,
    SCISSORS | SCISSORS: None
}
 
score = {'player': 0, 'ai': 0}
 
def int_input(message, predicate, stderr=''):
    val = None
    while not val:
        try:
            val = int(input(message))
            if not predicate(val):
                val = None
                raise ValueError
        except ValueError:
            print(stderr + '\n' if stderr else '', end='')
    return val
 
turns = int_input("En combien de tours se déroulera votre partie ?\n> ", lambda x: x > 0,
                  stderr="Ce n'est pas un nombre !")
 
for turn in range(turns):
    os.system(CLEAR)
    print("Que voulez-vous jouer ?\n1.Pierre\n2.Feuille\n3.Ciseau")
    player_game = int_input("> ", lambda x: x in (1, 2, 3))
    player_game = [ROCK, PAPER, SCISSORS][player_game-1]
    ai_game = random.choice([ROCK, PAPER, SCISSORS])
    print("L'ordinateur joue {}!".format({ROCK: "'pierre'", PAPER: "'papier'", SCISSORS: "'ciseaux'"}[ai_game]))
    if player_game == winner[player_game | ai_game]:
        print("Vous avez gagné !")
        score['player'] += 1
    elif ai_game == winner[player_game | ai_game]:
        print("Vous avez perdu !")
        score['ai'] += 1
    else:
        print("Egalité...")
    input()
 
print("{:^20}".format("--- SCORES ---"))
print("{:<10}:{:>10}".format("Joueur", score['player']))
print("{:<10}:{:>10}".format("Ordinateur", score['ai']))
input()
