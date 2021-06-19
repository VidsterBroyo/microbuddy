// Resources function
function resources () {
    basic.showString(" Some mental health resources include 'dcontario.org', 'kidshelpphone.ca', and 'mindyourmind.ca'. You can also try researching other mental health resources on the Internet as there are countless others!", 70)
basic.showString("Press B to go home", 70)
// Wait for user input
    while (!(input.buttonIsPressed(Button.B))) {
    	
    }
}
// Function that tells jokes
function jokesF () {
    basic.showString("" + jokes[randint(0, 12)], 80)
soundExpression.giggle.play()
    basic.showString("Haha! Press A to hear another one, B to go home", 70)
// Wait for user input
    while (!(input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B))) {
        // Button A = Another joke
        // Button B = Menu
        if (input.buttonIsPressed(Button.A)) {
            jokesF()
        } else if (input.buttonIsPressed(Button.B)) {
            menuF()
        }
    }
}
// Bop-It type game
function bopIt () {
    basic.showString(" Guide: West=Button A, East=Button B, S=Tilt down, N=Tilt up, SE=Tilt Right, Shake to end game", 70)
// Shaking the Micro:bit will end the game, while it's not being shaken, keep playing the game
    while (!(input.isGesture(Gesture.Shake))) {
        // Pick a random number that will represent the arrow
        bopItRand = randint(0, 4)
        // Based on the randomly generated number, display the correct arrow and wait for the user to do the correct gesture
        if (bopItRand == 0) {
            basic.showArrow(ArrowNames.West)
            while (!(input.buttonIsPressed(Button.A))) {
                if (input.isGesture(Gesture.Shake)) {
                    break;
                }
            }
        } else if (bopItRand == 1) {
            basic.showArrow(ArrowNames.East)
            while (!(input.buttonIsPressed(Button.B))) {
                if (input.isGesture(Gesture.Shake)) {
                    break;
                }
            }
        } else if (bopItRand == 2) {
            basic.showArrow(ArrowNames.South)
            while (!(input.isGesture(Gesture.LogoUp))) {
                if (input.isGesture(Gesture.Shake)) {
                    break;
                }
            }
        } else if (bopItRand == 3) {
            basic.showArrow(ArrowNames.North)
            while (!(input.isGesture(Gesture.LogoDown))) {
                if (input.isGesture(Gesture.Shake)) {
                    break;
                }
            }
        } else if (bopItRand == 4) {
            basic.showArrow(ArrowNames.SouthEast)
            while (!(input.isGesture(Gesture.TiltRight))) {
                if (input.isGesture(Gesture.Shake)) {
                    break;
                }
            }
        }
    }
    basic.showString("Game Ended. Sending you home...", 70)
}
// Toothbrush timer function
function btTimer () {
    basic.showString(" Press B when ready!", 70)
// Wait for button B to be pressed
    while (!(input.buttonIsPressed(Button.B))) {
    	
    }
    basic.showString("3 2 1")
    basic.showString("Brush!", 70)
// Logs what time the timer started
    startTimer = input.runningTime()
    timePassed = 0
    // Keep displaying time until the timer is done
    while (timePassed < 120000) {
        // Get difference between time started and current time to get time passed
        timePassed = input.runningTime() - startTimer
        // If less than a minute has passed, display time using minutes instead of seconds. Ex. instead of displaying 110, the Micro:bit displays 1:50
        if (timePassed < 60000) {
            basic.showString("1:" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + (120 - Math.round(timePassed / 1000) - 60))))))))))))))))))), 70)
        } else {
            basic.showNumber(120 - Math.round(timePassed / 1000), 70)
        }
    }
    music.playTone(262, music.beat(BeatFraction.Double))
    basic.showString("Done! Good job!", 70)
}
// Dodge game function
function dodge () {
    // Create the 5 sprites. 4 enemies, 1 player
    player = game.createSprite(2, 4)
    enemy1 = game.createSprite(0, 0)
    enemy2 = game.createSprite(2, 0)
    enemy3 = game.createSprite(4, 0)
    enemy4 = game.createSprite(1, 0)
    // Set first enemy's brightness to 150 so there's a difference between the enemy and the player
    enemy1.set(LedSpriteProperty.Brightness, 150)
    // Make three of the enemies invisible at the start since they're not supposed to be there at the beginning
    enemy2.set(LedSpriteProperty.Brightness, 0)
    enemy3.set(LedSpriteProperty.Brightness, 0)
    enemy4.set(LedSpriteProperty.Brightness, 0)
    // Array of enemies
    enemies = [enemy1]
    // Start timer for enemies to move
    enemyMoveTimer = input.runningTime()
    // This variable is used to delay when the rest of the enemies spawn to make it trickier
    delay = 0
    // Variable to tell if the game is over or not
    gameOver = 0
    basic.showString(" Use A & B to move the player", 70)
// Resume the game after it's been paused once it's finished
    game.resume()
    // While the game isn't over
    while (gameOver == 0) {
        // Check every enemy in the list
        for (let value of enemies) {
            // Check if the enemy isn't at the bottom of the screen, if it's touching the player, or at the bottom but not touching the player
            if (!(value.get(LedSpriteProperty.Y) > 3)) {
                continue;
            } else if (value.isTouching(player)) {
                // End the game if an enemy is touching the player
                gameOver += 1
            } else {
                basic.pause(100)
                // Reset the enemy to a new location at the top of the screen if it reaches the bottom
                value.set(LedSpriteProperty.X, randint(0, 4))
                value.set(LedSpriteProperty.Y, 0)
            }
        }
        // Move the player right or left based on which button is pressed. There is a debounce timer for the buttons to ensure the player doesn't move too fast.
        if (input.buttonIsPressed(Button.A) && control.millis() - buttonADebounce > 250) {
            player.move(-1)
            buttonADebounce = control.millis()
        } else if (input.buttonIsPressed(Button.B) && control.millis() - buttonBDebounce > 250) {
            player.move(1)
            buttonBDebounce = control.millis()
        }
        // Every 750 milliseconds, the enemies move down. The variable "delay" is also increased by 1. When delay gets to 3, the 2nd enemy spawns. When it gets to 5,the 3rd one is spawned. When it gets to 7, the 4th and last one spawns.
        if (control.millis() - enemyMoveTimer > 750) {
            enemy1.change(LedSpriteProperty.Y, 1)
            if (delay == 3) {
                enemy2.set(LedSpriteProperty.Brightness, 150)
                enemies.push(enemy2)
            } else if (delay > 3 && delay < 5) {
                enemy2.change(LedSpriteProperty.Y, 1)
            } else if (delay == 5) {
                enemy3.set(LedSpriteProperty.Brightness, 150)
                enemies.push(enemy3)
            } else if (delay > 5 && delay < 7) {
                enemy3.change(LedSpriteProperty.Y, 1)
                enemy2.change(LedSpriteProperty.Y, 1)
            } else if (delay == 7) {
                enemy4.set(LedSpriteProperty.Brightness, 150)
                enemies.push(enemy4)
            } else if (delay > 7) {
                enemy2.change(LedSpriteProperty.Y, 1)
                enemy3.change(LedSpriteProperty.Y, 1)
                enemy4.change(LedSpriteProperty.Y, 1)
            }
            enemyMoveTimer = input.runningTime()
            delay += 1
        }
    }
    // Delete all sprites
    enemy1.delete()
    enemy2.delete()
    enemy3.delete()
    enemy4.delete()
    player.delete()
    // Pause the game. If I don't do this, the game will continue trying to render the game despite no sprites being present.
    game.pause()
}
function meditate () {
    basic.showString(" How many minutes? A to -1, B to +1, Logo to continue", 70)
medTime = 0
    while (!(input.logoIsPressed())) {
        if (input.buttonIsPressed(Button.B)) {
            medTime += 1
        } else if (input.buttonIsPressed(Button.A)) {
            medTime += -1
        }
        basic.showNumber(medTime)
    }
    timePassed = 0
    medTime = medTime * 60000
    basic.showString(" Focus on taking deep breaths in and out... ", 70)
startTimer = input.runningTime()
    while (timePassed < medTime) {
        timePassed = input.runningTime() - startTimer
        basic.showNumber(Math.round((medTime - timePassed) / 1000), 70)
    }
    music.playTone(262, music.beat(BeatFraction.Double))
    basic.showString(" Hope you feel calmer. Sending you home...", 70)
}
// The menu function
function menuF () {
    // This variable that keeps track of what option is currently selected
    menuSelect = 0
    // Continuously updates menuSelect and display until the logo is selected
    while (!(input.logoIsPressed())) {
        // If button B is pressed, it goes to the next option. Unless menuSelect is already at the highest, in which case it goes back to 0. The same goes for the button A but goes to the last option instead..
        if (input.buttonIsPressed(Button.B) && menuSelect < 6) {
            menuSelect += 1
        } else if (input.buttonIsPressed(Button.B)) {
            menuSelect = 0
        } else if (input.buttonIsPressed(Button.A) && menuSelect > 0) {
            menuSelect += -1
        } else if (input.buttonIsPressed(Button.A)) {
            menuSelect = 6
        }
        // Display updates as the option selected changes
        if (menuSelect == 0) {
            basic.showIcon(IconNames.Heart)
        } else if (menuSelect == 1) {
            basic.showLeds(`
                # # . . #
                # . # . .
                # # . . #
                # . # . #
                # # . . #
                `)
        } else if (menuSelect == 2) {
            basic.showLeds(`
                . # # . .
                . # # . .
                . . # . .
                . . # . .
                . . # . .
                `)
        } else if (menuSelect == 3) {
            basic.showLeds(`
                . # # # .
                . . . # .
                . . # # .
                . . . . .
                . . # . .
                `)
        } else if (menuSelect == 4) {
            basic.showLeds(`
                # . . . #
                # # . # #
                # . # . #
                # . . . #
                # . . . #
                `)
        } else if (menuSelect == 5) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # # # # #
                . # # # .
                `)
        } else if (menuSelect == 6) {
            basic.showLeds(`
                . . . . #
                . # . . .
                . . . # .
                . . . . .
                . . # . .
                `)
        }
    }
    // Once Logo is pressed, get the option selected and run the corresponding function
    if (menuSelect == 0) {
        checkIn()
    } else if (menuSelect == 1) {
        bopIt()
    } else if (menuSelect == 2) {
        btTimer()
    } else if (menuSelect == 3) {
        resources()
    } else if (menuSelect == 4) {
        meditate()
    } else if (menuSelect == 5) {
        jokesF()
    } else if (menuSelect == 6) {
        dodge()
    }
}
// check-in function
function checkIn () {
    // variable that keeps track of whether or not the check-in is done
    checkInDone = 0
    basic.showString(" How are you? A=Good, Logo=Meh, B=Bad", 70)
// While the check-in isn't done...
    while (!(checkInDone)) {
        // Display different text depending on how they feel
        if (input.buttonIsPressed(Button.A)) {
            basic.showString("Great! Take a minute to reflect on why or what made you feel good! Click B to go home when you're done!", 70)
checkInDone = 1
        } else if (input.buttonIsPressed(Button.B)) {
            basic.showString("Aww. It's 100% OK to feel bad during these times. Click the logo to see some mental health resources, click B to go home", 70)
checkInDone = 1
            // If they feel bad, they can press the logo to see mental health resources. They can also press B to go straight home
            while (!(input.buttonIsPressed(Button.B))) {
                if (input.logoIsPressed()) {
                    resources()
                }
            }
        } else if (input.logoIsPressed()) {
            basic.showString("Well try to make your day better by doing something that makes you happy. Like spending time with your family or playing a game with me! Click B to go home.", 70)
checkInDone = 1
        }
    }
    // Wait for user input to go home
    while (!(input.buttonIsPressed(Button.B))) {
    	
    }
    checkInDone = 0
}
// A little animation that plays when the Micro:bit starts
function startAnimation () {
    jokes = ["What did the grape say when he was pinched?    Nothing, he gave a little wine!", "Where do fruits go on vacation?    Pearis", "What did the man say when he walked into a bar?     Ouch!", "What do you call a pig that does karate?    A pork chop!", "Why can't you hear a pterodactyl in the bathroom?    Because it has a silent pee!", "What did the baby corn say to the mama corn?    Where is pop corn?", "I was looking for the lightning when it struck me.", "If you have 13 apples in one hand and 10 oranges in the other, what do you have?    Big hands!", "What did the duck say when he bought lipstick?    Put it on my bill!", "What do you call a boomerang that won't come back?    A stick!", "What do computers eat for a snack?    Microchips", "What happens to a frog's car when it breaks down?    It gets toad away.", "What' the difference between ignorance and apathy?    I don't know, and I don't care"]
    soundExpression.twinkle.play()
    game.setScore(0)
    game.addScore(1)
    basic.pause(1000)
    game.addScore(1)
    basic.pause(1000)
    game.removeLife(1)
    basic.pause(1000)
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
    basic.pause(500)
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(750)
    basic.showLeds(`
        # . # . #
        # . # . .
        # # # . #
        # . # . #
        . . . . .
        `)
    basic.pause(700)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(900)
}
let checkInDone = 0
let menuSelect = 0
let gameOver = 0
let delay = 0
let enemyMoveTimer = 0
let enemies: game.LedSprite[] = []
let enemy4: game.LedSprite = null
let enemy3: game.LedSprite = null
let enemy2: game.LedSprite = null
let enemy1: game.LedSprite = null
let player: game.LedSprite = null
let startTimer = 0
let bopItRand = 0
let buttonBDebounce = 0
let buttonADebounce = 0
let jokes : string[] = []
let medTime = 0
let timePassed = 0
startAnimation()
basic.showString("Use A & B to go through the menu, hold the logo to select", 70)
buttonADebounce = control.millis()
buttonBDebounce = control.millis()
menuF()
// The menu function is always called so, when a function ends, it's automatically called
basic.forever(function () {
    menuF()
})
