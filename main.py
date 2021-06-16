def resources():
    basic.show_string("Resources")
    if not (checkInDone == 1):
        pass
    else:
        basic.show_string("b press")
def jokesF():
    basic.show_string("" + jokes[randint(0, 7)], 70)
    soundExpression.giggle.play()
    basic.show_string("Haha! Press A to hear another one, B to go home")
    if input.button_is_pressed(Button.A):
        jokesF()
    elif input.button_is_pressed(Button.B):
        menuF()
def bopIt():
    global bopItRand
    while not (input.is_gesture(Gesture.SHAKE)):
        bopItRand = randint(0, 5)
        if bopItRand == 0:
            basic.show_arrow(ArrowNames.WEST)
            while not (input.button_is_pressed(Button.A)):
                if input.is_gesture(Gesture.SHAKE):
                    break
        elif bopItRand == 1:
            basic.show_arrow(ArrowNames.EAST)
            while not (input.button_is_pressed(Button.B)):
                if input.is_gesture(Gesture.SHAKE):
                    break
        elif bopItRand == 2:
            basic.show_arrow(ArrowNames.SOUTH)
            while not (input.is_gesture(Gesture.LOGO_UP)):
                if input.is_gesture(Gesture.SHAKE):
                    break
        elif bopItRand == 3:
            basic.show_arrow(ArrowNames.NORTH)
            while not (input.is_gesture(Gesture.LOGO_DOWN)):
                if input.is_gesture(Gesture.SHAKE):
                    break
        elif bopItRand == 4:
            basic.show_arrow(ArrowNames.NORTH_WEST)
            while not (input.is_gesture(Gesture.TILT_LEFT)):
                if input.is_gesture(Gesture.SHAKE):
                    break
        elif bopItRand == 5:
            basic.show_arrow(ArrowNames.SOUTH_EAST)
            while not (input.is_gesture(Gesture.TILT_RIGHT)):
                if input.is_gesture(Gesture.SHAKE):
                    break
    basic.show_icon(IconNames.ANGRY)
def btTimer():
    global startTimer, timePassed
    basic.show_string("Press B when you're ready!", 70)
    while not (input.button_is_pressed(Button.B)):
        pass
    basic.show_string("3 2 1")
    basic.show_string("Brush!", 70)
    startTimer = input.running_time()
    timePassed = 0
    while timePassed < 120000:
        timePassed = input.running_time() - startTimer
        if timePassed < 60000:
            basic.show_string("1:" + ("" + str((120 - Math.round(timePassed / 1000) - 60))))
        else:
            basic.show_number(120 - Math.round(timePassed / 1000))
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    basic.show_string("Done! Good job!", 70)
def dodge():
    global player, enemy1, enemyMoveTimer, delay, enemies, gameOver, buttonADebounce, buttonBDebounce, enemy3, enemy2
    player = game.create_sprite(2, 4)
    enemy1 = game.create_sprite(0, 0)
    enemyMoveTimer = input.running_time()
    delay = 0
    enemies = [enemy1]
    gameOver = 0
    game.resume()
    while gameOver == 0:
        for value in enemies:
            if not (value.get(LedSpriteProperty.Y) > 3):
                continue
            elif value.is_touching(player):
                gameOver += 1
            else:
                basic.pause(100)
                value.set(LedSpriteProperty.X, randint(0, 4))
                value.set(LedSpriteProperty.Y, 0)
        if input.button_is_pressed(Button.A) and control.millis() - buttonADebounce > 250:
            serial.write_line("button a")
            player.move(-1)
            buttonADebounce = control.millis()
        elif input.button_is_pressed(Button.B) and control.millis() - buttonBDebounce > 250:
            serial.write_line("button b")
            player.move(1)
            buttonBDebounce = control.millis()
        if control.millis() - enemyMoveTimer > 1000:
            enemy1.change(LedSpriteProperty.Y, 1)
            enemyMoveTimer = input.running_time()
        if delay > 6:
            enemy2.change(LedSpriteProperty.Y, 1)
            enemy3.change(LedSpriteProperty.Y, 1)
            delay += 1
        elif delay == 6:
            enemy3 = game.create_sprite(4, 0)
            enemies.append(enemy3)
            enemy2.change(LedSpriteProperty.Y, 1)
            delay += 1
        elif delay > 3:
            enemy2.change(LedSpriteProperty.Y, 1)
            delay += 1
        elif delay == 3:
            enemy2 = game.create_sprite(2, 0)
            enemies.append(enemy2)
            delay += 1
        else:
            delay += 1
    enemy1.delete()
    enemy2.delete()
    player.delete()
    game.pause()
    serial.write_line("saas")
    serial.write_string("whattt")
def meditate():
    global medMinutes, timePassed, medTime, startTimer
    basic.show_string("How many minutes?", 70)
    medMinutes = 0
    basic.show_number(timePassed)
    while not (input.logo_is_pressed()):
        if input.button_is_pressed(Button.B):
            medMinutes += 1
        elif input.button_is_pressed(Button.A):
            medMinutes += -1
        basic.show_number(medMinutes)
    timePassed = 0
    medTime = medMinutes * 60000
    basic.show_string("Focus on taking deep breaths in and out... ", 70)
    startTimer = input.running_time()
    serial.write_line("Meditating...")
    while timePassed < medTime:
        timePassed = input.running_time() - startTimer
        basic.show_number(Math.round((medTime - timePassed) / 1000))
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    basic.show_string("Hope you feel calmer. Sending you to the menu...")
def menuF():
    global menuSel
    menuSel = 0
    while not (input.logo_is_pressed()):
        if input.button_is_pressed(Button.B) and menuSel < 5:
            menuSel += 1
        elif input.button_is_pressed(Button.B):
            menuSel = 0
        elif input.button_is_pressed(Button.A) and menuSel > 0:
            menuSel += -1
        elif input.button_is_pressed(Button.A):
            menuSel = 5
        if menuSel == 0:
            basic.show_icon(IconNames.HEART)
        elif menuSel == 1:
            basic.show_leds("""
                # # # # #
                # . . . .
                # . . # #
                # . . . #
                # # # # #
                """)
        elif menuSel == 2:
            basic.show_leds("""
                . # # . .
                . # # . .
                . . # . .
                . . # . .
                . . # . .
                """)
        elif menuSel == 3:
            basic.show_leds("""
                . # # # .
                . . . # .
                . . # # .
                . . . . .
                . . # . .
                """)
        elif menuSel == 4:
            basic.show_leds("""
                # . . . #
                # # . # #
                # . # . #
                # . . . #
                # . . . #
                """)
        elif menuSel == 5:
            basic.show_leds("""
                . . . . .
                . # . # .
                . . . . .
                # # # # #
                . # # # .
                """)
    if menuSel == 0:
        checkIn()
    elif menuSel == 1:
        bopIt()
    elif menuSel == 2:
        btTimer()
    elif menuSel == 3:
        resources()
    elif menuSel == 4:
        meditate()
    elif menuSel == 5:
        dodge()
def checkIn():
    global checkInDone
    checkInDone = 0
    basic.show_string("HRU")
    while not (checkInDone):
        if input.button_is_pressed(Button.A):
            basic.show_string("grr")
            checkInDone = 1
        elif input.button_is_pressed(Button.B):
            basic.show_string("bro")
            checkInDone = 1
            while not (input.button_is_pressed(Button.B)):
                if input.logo_is_pressed():
                    resources()
        elif input.logo_is_pressed():
            basic.show_string("bom")
            checkInDone = 1
    while not (input.button_is_pressed(Button.B)):
        pass
def startAnimation():
    global jokes
    jokes = ["What did the grape say when he was pinched?    Nothing, he gave a little wine.",
        "Where do fruits go on vacation?    Pearis",
        "What did the man say when he walked into a bar?     Ouch!",
        "What do you call a pig that does karate?    A pork chop.",
        "Why can't you hear a pterodactyl in the bathroom?    Because it has a silent pee.",
        "What did the baby corn say to the mama corn?    Where is pop corn?",
        "I was looking for the lightning when it struck me.",
        "If you have 13 apples in one hand and 10 oranges in the other, what do you have?    Big hands."]
    game.set_score(0)
    game.add_score(1)
    basic.pause(1000)
    game.add_score(1)
    basic.pause(1000)
    game.remove_life(1)
    basic.pause(1000)
    basic.show_leds("""
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        """)
    basic.pause(500)
    basic.show_leds("""
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        """)
    basic.pause(750)
    basic.show_leds("""
        # . # . #
        # . # . .
        # # # . #
        # . # . #
        . . . . .
        """)
    basic.pause(700)
    basic.show_leds("""
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        """)
    basic.pause(900)
menuSel = 0
medTime = 0
medMinutes = 0
enemy3: game.LedSprite = None
enemy2: game.LedSprite = None
gameOver = 0
enemies: List[game.LedSprite] = []
delay = 0
enemyMoveTimer = 0
enemy1: game.LedSprite = None
player: game.LedSprite = None
timePassed = 0
startTimer = 0
bopItRand = 0
checkInDone = 0
buttonBDebounce = 0
buttonADebounce = 0
jokes: List[str] = []
startAnimation()
buttonADebounce = control.millis()
buttonBDebounce = control.millis()
menuF()

def on_forever():
    menuF()
basic.forever(on_forever)
