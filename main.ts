function resources() {
    basic.showString("Resources")
    basic.showString("Press B to go home")
    while (!input.buttonIsPressed(Button.B)) {
        
    }
}

function jokesF() {
    basic.showString("" + jokes[randint(0, 12)], 80)
    soundExpression.giggle.play()
    basic.showString("Haha! Press A to hear another one, B to go home", 70)
    while (!(input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B))) {
        if (input.buttonIsPressed(Button.A)) {
            jokesF()
        } else if (input.buttonIsPressed(Button.B)) {
            menuF()
        }
        
    }
}

function bopIt() {
    
    while (!input.isGesture(Gesture.Shake)) {
        bopItRand = randint(0, 5)
        if (bopItRand == 0) {
            basic.showArrow(ArrowNames.West)
            while (!input.buttonIsPressed(Button.A)) {
                if (input.isGesture(Gesture.Shake)) {
                    break
                }
                
            }
        } else if (bopItRand == 1) {
            basic.showArrow(ArrowNames.East)
            while (!input.buttonIsPressed(Button.B)) {
                if (input.isGesture(Gesture.Shake)) {
                    break
                }
                
            }
        } else if (bopItRand == 2) {
            basic.showArrow(ArrowNames.South)
            while (!input.isGesture(Gesture.LogoUp)) {
                if (input.isGesture(Gesture.Shake)) {
                    break
                }
                
            }
        } else if (bopItRand == 3) {
            basic.showArrow(ArrowNames.North)
            while (!input.isGesture(Gesture.LogoDown)) {
                if (input.isGesture(Gesture.Shake)) {
                    break
                }
                
            }
        } else if (bopItRand == 4) {
            basic.showArrow(ArrowNames.NorthWest)
            while (!input.isGesture(Gesture.TiltLeft)) {
                if (input.isGesture(Gesture.Shake)) {
                    break
                }
                
            }
        } else if (bopItRand == 5) {
            basic.showArrow(ArrowNames.SouthEast)
            while (!input.isGesture(Gesture.TiltRight)) {
                if (input.isGesture(Gesture.Shake)) {
                    break
                }
                
            }
        }
        
    }
    basic.showIcon(IconNames.Angry)
    serial.writeLine("WHATTTT")
}

function btTimer() {
    
    basic.showString("Press B when ready!", 70)
    while (!input.buttonIsPressed(Button.B)) {
        
    }
    basic.showString("3 2 1")
    basic.showString("Brush!", 70)
    startTimer = input.runningTime()
    timePassed = 0
    while (timePassed < 120000) {
        timePassed = input.runningTime() - startTimer
        if (timePassed < 60000) {
            basic.showString("1:" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + ("" + (120 - Math.round(timePassed / 1000) - 60)))))))))), 70)
        } else {
            basic.showNumber(120 - Math.round(timePassed / 1000), 70)
        }
        
    }
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showString("Done! Good job!", 70)
}

function dodge() {
    
    player = game.createSprite(2, 4)
    enemy1 = game.createSprite(0, 0)
    enemies = [enemy1]
    enemyMoveTimer = input.runningTime()
    delay = 0
    gameOver = 0
    game.resume()
    while (gameOver == 0) {
        for (let value of enemies) {
            if (!(value.get(LedSpriteProperty.Y) > 3)) {
                continue
            } else if (value.isTouching(player)) {
                gameOver += 1
            } else {
                basic.pause(100)
                value.set(LedSpriteProperty.X, randint(0, 4))
                value.set(LedSpriteProperty.Y, 0)
            }
            
        }
        if (input.buttonIsPressed(Button.A) && control.millis() - buttonADebounce > 250) {
            serial.writeLine("button a")
            player.move(-1)
            buttonADebounce = control.millis()
        } else if (input.buttonIsPressed(Button.B) && control.millis() - buttonBDebounce > 250) {
            serial.writeLine("button b")
            player.move(1)
            buttonBDebounce = control.millis()
        }
        
        if (control.millis() - enemyMoveTimer > 750) {
            enemy1.change(LedSpriteProperty.Y, 1)
            if (delay == 3) {
                enemy2 = game.createSprite(2, 0)
                enemies.push(enemy2)
            } else if (delay > 3 && delay < 5) {
                enemy2.change(LedSpriteProperty.Y, 1)
            } else if (delay == 5) {
                enemy3 = game.createSprite(4, 0)
                enemies.push(enemy3)
            } else if (delay > 5) {
                enemy3.change(LedSpriteProperty.Y, 1)
                enemy2.change(LedSpriteProperty.Y, 1)
            }
            
            enemyMoveTimer = input.runningTime()
            delay += 1
        }
        
    }
    enemy1.delete()
    player.delete()
    game.pause()
}

function meditate() {
    
    basic.showString("How many minutes?", 70)
    medTime = 0
    while (!input.logoIsPressed()) {
        if (input.buttonIsPressed(Button.B)) {
            medTime += 1
        } else if (input.buttonIsPressed(Button.A)) {
            medTime += -1
        }
        
        basic.showNumber(medTime)
    }
    timePassed = 0
    medTime = medTime * 60000
    basic.showString("Focus on taking deep breaths in and out... ", 70)
    startTimer = input.runningTime()
    serial.writeLine("Meditating...")
    while (timePassed < medTime) {
        timePassed = input.runningTime() - startTimer
        basic.showNumber(Math.round((medTime - timePassed) / 1000), 70)
    }
    music.playTone(262, music.beat(BeatFraction.Double))
    basic.showString("Hope you feel calmer. Sending you home...", 70)
}

function menuF() {
    
    menuSelect = 0
    while (!input.logoIsPressed()) {
        if (input.buttonIsPressed(Button.B) && menuSelect < 6) {
            menuSelect += 1
        } else if (input.buttonIsPressed(Button.B)) {
            menuSelect = 0
        } else if (input.buttonIsPressed(Button.A) && menuSelect > 0) {
            menuSelect += -1
        } else if (input.buttonIsPressed(Button.A)) {
            menuSelect = 6
        }
        
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

function checkIn() {
    
    checkInDone = 0
    basic.showString("How are you?", 70)
    while (!checkInDone) {
        if (input.buttonIsPressed(Button.A)) {
            basic.showString("Great! Take a minute to reflect on why or what made you feel good! Click B to go home when you're done!", 70)
            checkInDone = 1
        } else if (input.buttonIsPressed(Button.B)) {
            basic.showString("Aww. It's 100% OK to feel bad during these times. Click the logo to see some mental health resources, click B to go home", 70)
            checkInDone = 1
            while (!input.buttonIsPressed(Button.B)) {
                if (input.logoIsPressed()) {
                    resources()
                }
                
            }
        } else if (input.logoIsPressed()) {
            basic.showString("Well try to make your day better by doing something that makes you happy. Like spending time with your family or playing a game with me! Click B to go home.", 70)
            checkInDone = 1
        }
        
    }
    while (!input.buttonIsPressed(Button.B)) {
        
    }
    checkInDone = 0
}

function startAnimation() {
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
let enemy3 : game.LedSprite = null
let enemy2 : game.LedSprite = null
let gameOver = 0
let delay = 0
let enemyMoveTimer = 0
let enemies : game.LedSprite[] = []
let enemy1 : game.LedSprite = null
let player : game.LedSprite = null
let startTimer = 0
let bopItRand = 0
let buttonBDebounce = 0
let buttonADebounce = 0
let jokes : string[] = []
let medTime = 0
let timePassed = 0
buttonADebounce = control.millis()
buttonBDebounce = control.millis()
jokes = ["What did the grape say when he was pinched?    Nothing, he gave a little wine!", "Where do fruits go on vacation?    Pearis", "What did the man say when he walked into a bar?     Ouch!", "What do you call a pig that does karate?    A pork chop!", "Why can't you hear a pterodactyl in the bathroom?    Because it has a silent pee!", "What did the baby corn say to the mama corn?    Where is pop corn?", "I was looking for the lightning when it struck me.", "If you have 13 apples in one hand and 10 oranges in the other, what do you have?    Big hands!", "What did the duck say when he bought lipstick?    Put it on my bill!", "What do you call a boomerang that won't come back?    A stick!", "What do computers eat for a snack?    Microchips", "What happens to a frog's car when it breaks down?    It gets toad away.", "What' the difference between ignorance and apathy?    I don't know, and I don't care"]
menuF()
basic.forever(function on_forever() {
    menuF()
})
