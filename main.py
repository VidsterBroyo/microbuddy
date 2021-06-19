# Resources function
def resources():
    basic.show_string(" Some mental health resources include 'dcontario.org', 'kidshelpphone.ca', and 'mindyourmind.ca'. You can also try researching other mental health resources on the Internet as there are countless others!",
        70)
    basic.show_string("Press B to go home", 70)
    # Wait for user input
    while not (input.button_is_pressed(Button.B)):
        pass
# Function that tells jokes
def jokesF():
    basic.show_string("" + jokes[randint(0, 12)], 80)
    soundExpression.giggle.play()
    basic.show_string("Haha! Press A to hear another one, B to go home", 70)
    # Wait for user input
    while not (input.button_is_pressed(Button.A) or input.button_is_pressed(Button.B)):
        # Button A = Another joke
        # Button B = Menu
        if input.button_is_pressed(Button.A):
            jokesF()
        elif input.button_is_pressed(Button.B):
            menuF()
# Bop-It type game
def bopIt():
    global bopItRand
    basic.show_string(" Guide: West=Button A, East=Button B, S=Tilt down, N=Tilt up, SE=Tilt Right, Shake to end game",
        70)
    # Shaking the Micro:bit will end the game, while it's not being shaken, keep playing the game
    while not (input.is_gesture(Gesture.SHAKE)):
        # Pick a random number that will represent the arrow
        bopItRand = randint(0, 4)
        # Based on the randomly generated number, display the correct arrow and wait for the user to do the correct gesture
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
            basic.show_arrow(ArrowNames.SOUTH_EAST)
            while not (input.is_gesture(Gesture.TILT_RIGHT)):
                if input.is_gesture(Gesture.SHAKE):
                    break
    basic.show_string("Game Ended. Sending you home...", 70)
# Toothbrush timer function
def btTimer():
    global startTimer, timePassed
    basic.show_string(" Press B when ready!", 70)
    # Wait for button B to be pressed
    while not (input.button_is_pressed(Button.B)):
        pass
    basic.show_string("3 2 1")
    basic.show_string("Brush!", 70)
    # Logs what time the timer started
    startTimer = input.running_time()
    timePassed = 0
    # Keep displaying time until the timer is done
    while timePassed < 120000:
        # Get difference between time started and current time to get time passed
        timePassed = input.running_time() - startTimer
        # If less than a minute has passed, display time using minutes instead of seconds. Ex. instead of displaying 110, the Micro:bit displays 1:50
        if timePassed < 60000:
            basic.show_string("1:" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + str((120 - Math.round(timePassed / 1000) - 60))))))))))))))))))),
                70)
        else:
            basic.show_number(120 - Math.round(timePassed / 1000), 70)
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    basic.show_string("Done! Good job!", 70)
# Dodge game function
def dodge():
    global player, enemy1, enemy2, enemy3, enemy4, enemies, enemyMoveTimer, delay, gameOver, buttonADebounce, buttonBDebounce
    # Create the 5 sprites. 4 enemies, 1 player
    player = game.create_sprite(2, 4)
    enemy1 = game.create_sprite(0, 0)
    enemy2 = game.create_sprite(2, 0)
    enemy3 = game.create_sprite(4, 0)
    enemy4 = game.create_sprite(1, 0)
    # Set first enemy's brightness to 150 so there's a difference between the enemy and the player
    enemy1.set(LedSpriteProperty.BRIGHTNESS, 150)
    # Make three of the enemies invisible at the start since they're not supposed to be there at the beginning
    enemy2.set(LedSpriteProperty.BRIGHTNESS, 0)
    enemy3.set(LedSpriteProperty.BRIGHTNESS, 0)
    enemy4.set(LedSpriteProperty.BRIGHTNESS, 0)
    # Array of enemies
    enemies = [enemy1]
    # Start timer for enemies to move
    enemyMoveTimer = input.running_time()
    # This variable is used to delay when the rest of the enemies spawn to make it trickier
    delay = 0
    # Variable to tell if the game is over or not
    gameOver = 0
    basic.show_string(" Use A & B to move the player", 70)
    # Resume the game after it's been paused once it's finished
    game.resume()
    # While the game isn't over
    while gameOver == 0:
        # Check every enemy in the list
        for value in enemies:
            # Check if the enemy isn't at the bottom of the screen, if it's touching the player, or at the bottom but not touching the player
            if not (value.get(LedSpriteProperty.Y) > 3):
                continue
            elif value.is_touching(player):
                # End the game if an enemy is touching the player
                gameOver += 1
            else:
                basic.pause(100)
                # Reset the enemy to a new location at the top of the screen if it reaches the bottom
                value.set(LedSpriteProperty.X, randint(0, 4))
                value.set(LedSpriteProperty.Y, 0)
        # Move the player right or left based on which button is pressed. There is a debounce timer for the buttons to ensure the player doesn't move too fast.
        if input.button_is_pressed(Button.A) and control.millis() - buttonADebounce > 250:
            player.move(-1)
            buttonADebounce = control.millis()
        elif input.button_is_pressed(Button.B) and control.millis() - buttonBDebounce > 250:
            player.move(1)
            buttonBDebounce = control.millis()
        # Every 750 milliseconds, the enemies move down. The variable "delay" is also increased by 1. When delay gets to 3, the 2nd enemy spawns. When it gets to 5,the 3rd one is spawned. When it gets to 7, the 4th and last one spawns. 
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
            elif delay > 5 and delay < 7:
                enemy3.change(LedSpriteProperty.Y, 1)
                enemy2.change(LedSpriteProperty.Y, 1)
            elif delay == 7:
                enemy4.set(LedSpriteProperty.BRIGHTNESS, 150)
                enemies.append(enemy4)
            elif delay > 7:
                enemy2.change(LedSpriteProperty.Y, 1)
                enemy3.change(LedSpriteProperty.Y, 1)
                enemy4.change(LedSpriteProperty.Y, 1)
            enemyMoveTimer = input.running_time()
            delay += 1
    # Delete all sprites
    enemy1.delete()
    enemy2.delete()
    enemy3.delete()
    enemy4.delete()
    player.delete()
    # Pause the game. If I don't do this, the game will continue trying to render the game despite no sprites being present. 
    game.pause()
def meditate():
    global medTime, timePassed, startTimer
    basic.show_string(" How many minutes? A to -1, B to +1, Logo to continue", 70)
    medTime = 0
    while not (input.logo_is_pressed()):
        if input.button_is_pressed(Button.B):
            medTime += 1
        elif input.button_is_pressed(Button.A):
            medTime += -1
        basic.show_number(medTime)
    timePassed = 0
    medTime = medTime * 60000
    basic.show_string(" Focus on taking deep breaths in and out... ", 70)
    startTimer = input.running_time()
    while timePassed < medTime:
        timePassed = input.running_time() - startTimer
        basic.show_number(Math.round((medTime - timePassed) / 1000), 70)
    music.play_tone(262, music.beat(BeatFraction.DOUBLE))
    basic.show_string(" Hope you feel calmer. Sending you home...", 70)
# The menu function
def menuF():
    global menuSelect
    # This variable that keeps track of what option is currently selected
    menuSelect = 0
    # Continuously updates menuSelect and display until the logo is selected
    while not (input.logo_is_pressed()):
        # If button B is pressed, it goes to the next option. Unless menuSelect is already at the highest, in which case it goes back to 0. The same goes for the button A but goes to the last option instead..
        if input.button_is_pressed(Button.B) and menuSelect < 6:
            menuSelect += 1
        elif input.button_is_pressed(Button.B):
            menuSelect = 0
        elif input.button_is_pressed(Button.A) and menuSelect > 0:
            menuSelect += -1
        elif input.button_is_pressed(Button.A):
            menuSelect = 6
        # Display updates as the option selected changes
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
    # Once Logo is pressed, get the option selected and run the corresponding function
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
# check-in function
def checkIn():
    global checkInDone
    # variable that keeps track of whether or not the check-in is done
    checkInDone = 0
    basic.show_string(" How are you? A=Good, Logo=Meh, B=Bad", 70)
    # While the check-in isn't done...
    while not (checkInDone):
        # Display different text depending on how they feel
        if input.button_is_pressed(Button.A):
            basic.show_string("Great! Take a minute to reflect on why or what made you feel good! Click B to go home when you're done!",
                70)
            checkInDone = 1
        elif input.button_is_pressed(Button.B):
            basic.show_string("Aww. It's 100% OK to feel bad during these times. Click the logo to see some mental health resources, click B to go home",
                70)
            checkInDone = 1
            # If they feel bad, they can press the logo to see mental health resources. They can also press B to go straight home
            while not (input.button_is_pressed(Button.B)):
                if input.logo_is_pressed():
                    resources()
        elif input.logo_is_pressed():
            basic.show_string("Well try to make your day better by doing something that makes you happy. Like spending time with your family or playing a game with me! Click B to go home.",
                70)
            checkInDone = 1
    # Wait for user input to go home
    while not (input.button_is_pressed(Button.B)):
        pass
    checkInDone = 0
# A little animation that plays when the Micro:bit starts
def startAnimation():
    global jokes
    jokes = ["What did the grape say when he was pinched?    Nothing, he gave a little wine!",
        "Where do fruits go on vacation?    Pearis",
        "What did the man say when he walked into a bar?     Ouch!",
        "What do you call a pig that does karate?    A pork chop!",
        "Why can't you hear a pterodactyl in the bathroom?    Because it has a silent pee!",
        "What did the baby corn say to the mama corn?    Where is pop corn?",
        "I was looking for the lightning when it struck me.",
        "If you have 13 apples in one hand and 10 oranges in the other, what do you have?    Big hands!",
        "What did the duck say when he bought lipstick?    Put it on my bill!",
        "What do you call a boomerang that won't come back?    A stick!",
        "What do computers eat for a snack?    Microchips",
        "What happens to a frog's car when it breaks down?    It gets toad away.",
        "What' the difference between ignorance and apathy?    I don't know, and I don't care"]
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
enemy4: game.LedSprite = None
enemy3: game.LedSprite = None
enemy2: game.LedSprite = None
enemy1: game.LedSprite = None
player: game.LedSprite = None
startTimer = 0
bopItRand = 0
buttonBDebounce = 0
buttonADebounce = 0
timePassed = 0
medTime = 0
jokes: List[str] = []
startAnimation()
basic.show_string("Use A & B to go through the menu, hold the logo to select",
    70)
buttonADebounce = control.millis()
buttonBDebounce = control.millis()
menuF()

def on_forever():
    menuF()
basic.forever(on_forever)
