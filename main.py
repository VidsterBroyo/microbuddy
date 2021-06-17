def resources():
    basic.show_string("Resources")
    basic.show_string("Press B to go home")
    while not (input.button_is_pressed(Button.B)):
        pass
def jokesF():
    basic.show_string("" + jokes[randint(0, 12)], 80)
    soundExpression.giggle.play()
    basic.show_string("Haha! Press A to hear another one, B to go home", 70)
    while not (input.button_is_pressed(Button.A) or input.button_is_pressed(Button.B)):
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
    serial.write_line("WHATTTT")
def btTimer():
    global startTimer, timePassed
    basic.show_string("Press B when ready!", 70)
    while not (input.button_is_pressed(Button.B)):
        pass
    basic.show_string("3 2 1")
    basic.show_string("Brush!", 70)
    startTimer = input.running_time()
    timePassed = 0
    while timePassed < 120000:
        timePassed = input.running_time() - startTimer
        if timePassed < 60000:
            basic.show_string("1:" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + str((120 - Math.round(timePassed / 1000) - 60)))))))))),
                70)
        else:
            basic.show_number(120 - Math.round(timePassed / 1000), 70)
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    basic.show_string("Done! Good job!", 70)
def dodge():
    global player, enemy1, enemy2, enemy3, enemies, enemyMoveTimer, delay, gameOver, buttonADebounce, buttonBDebounce
    player = game.create_sprite(2, 4)
    enemy1 = game.create_sprite(0, 0)
    enemy2 = game.create_sprite(2, 0)
    enemy3 = game.create_sprite(4, 0)
    enemy2.set(LedSpriteProperty.BRIGHTNESS, 0)
    enemy3.set(LedSpriteProperty.BRIGHTNESS, 0)
    enemies = [enemy1]
    enemyMoveTimer = input.running_time()
    delay = 0
    gameOver = 0
    game.resume()
    enemy1.set(LedSpriteProperty.BRIGHTNESS, 150)
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
        if control.millis() - enemyMoveTimer > 750:
            enemy1.change(LedSpriteProperty.Y, 1)
            if delay == 3:
                enemy2.set(LedSpriteProperty.BRIGHTNESS, 150)
                enemies.append(enemy2)
            elif delay > 3 and delay < 5:
                enemy2.change(LedSpriteProperty.Y, 1)
            elif delay == 5:
                enemy3.set(LedSpriteProperty.BRIGHTNESS, 150)
                enemies.append(enemy3)
            elif delay > 5:
                enemy3.change(LedSpriteProperty.Y, 1)
                enemy2.change(LedSpriteProperty.Y, 1)
            enemyMoveTimer = input.running_time()
            delay += 1
    enemy1.delete()
    player.delete()
    game.pause()
def meditate():
    global medTime, timePassed, startTimer
    basic.show_string("How many minutes?", 70)
    medTime = 0
    while not (input.logo_is_pressed()):
        if input.button_is_pressed(Button.B):
            medTime += 1
        elif input.button_is_pressed(Button.A):
            medTime += -1
        basic.show_number(medTime)
    timePassed = 0
    medTime = medTime * 60000
    basic.show_string("Focus on taking deep breaths in and out... ", 70)
    startTimer = input.running_time()
    serial.write_line("Meditating...")
    while timePassed < medTime:
        timePassed = input.running_time() - startTimer
        basic.show_number(Math.round((medTime - timePassed) / 1000), 70)
    music.play_tone(262, music.beat(BeatFraction.DOUBLE))
    basic.show_string("Hope you feel calmer. Sending you home...", 70)
def menuF():
    global menuSelect
    menuSelect = 0
    while not (input.logo_is_pressed()):
        if input.button_is_pressed(Button.B) and menuSelect < 6:
            menuSelect += 1
        elif input.button_is_pressed(Button.B):
            menuSelect = 0
        elif input.button_is_pressed(Button.A) and menuSelect > 0:
            menuSelect += -1
        elif input.button_is_pressed(Button.A):
            menuSelect = 6
        if menuSelect == 0:
            basic.show_icon(IconNames.HEART)
        elif menuSelect == 1:
            basic.show_leds("""
                # # . . #
                # . # . .
                # # . . #
                # . # . #
                # # . . #
                """)
        elif menuSelect == 2:
            basic.show_leds("""
                . # # . .
                . # # . .
                . . # . .
                . . # . .
                . . # . .
                """)
        elif menuSelect == 3:
            basic.show_leds("""
                . # # # .
                . . . # .
                . . # # .
                . . . . .
                . . # . .
                """)
        elif menuSelect == 4:
            basic.show_leds("""
                # . . . #
                # # . # #
                # . # . #
                # . . . #
                # . . . #
                """)
        elif menuSelect == 5:
            basic.show_leds("""
                . . . . .
                . # . # .
                . . . . .
                # # # # #
                . # # # .
                """)
        elif menuSelect == 6:
            basic.show_leds("""
                . . . . #
                . # . . .
                . . . # .
                . . . . .
                . . # . .
                """)
    if menuSelect == 0:
        checkIn()
    elif menuSelect == 1:
        bopIt()
    elif menuSelect == 2:
        btTimer()
    elif menuSelect == 3:
        resources()
    elif menuSelect == 4:
        meditate()
    elif menuSelect == 5:
        jokesF()
    elif menuSelect == 6:
        dodge()
def checkIn():
    global checkInDone
    checkInDone = 0
    basic.show_string("How are you?", 70)
    while not (checkInDone):
        if input.button_is_pressed(Button.A):
            basic.show_string("Great! Take a minute to reflect on why or what made you feel good! Click B to go home when you're done!",
                70)
            checkInDone = 1
        elif input.button_is_pressed(Button.B):
            basic.show_string("Aww. It's 100% OK to feel bad during these times. Click the logo to see some mental health resources, click B to go home",
                70)
            checkInDone = 1
            while not (input.button_is_pressed(Button.B)):
                if input.logo_is_pressed():
                    resources()
        elif input.logo_is_pressed():
            basic.show_string("Well try to make your day better by doing something that makes you happy. Like spending time with your family or playing a game with me! Click B to go home.",
                70)
            checkInDone = 1
    while not (input.button_is_pressed(Button.B)):
        pass
    checkInDone = 0
def startAnimation():
    soundExpression.twinkle.play()
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
checkInDone = 0
menuSelect = 0
gameOver = 0
delay = 0
enemyMoveTimer = 0
enemies: List[game.LedSprite] = []
enemy3: game.LedSprite = None
enemy2: game.LedSprite = None
enemy1: game.LedSprite = None
player: game.LedSprite = None
startTimer = 0
bopItRand = 0
buttonBDebounce = 0
buttonADebounce = 0
startAnimation()
jokes: List[str] = []
medTime = 0
timePassed = 0
buttonADebounce = control.millis()
buttonBDebounce = control.millis()
menuF()

def on_forever():
    menuF()
basic.forever(on_forever)
