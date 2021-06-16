function resources () {
    basic.showString("Resources")
    if (!(checkInDone == 1)) {
    	
    } else {
        basic.showString("b press")
    }
}
function jokesF () {
    basic.showString("" + jokes[randint(0, 7)], 70)
soundExpression.giggle.play()
    basic.showString("Haha! Press A to hear another one, B to go home")
    if (input.buttonIsPressed(Button.A)) {
        jokesF()
    } else if (input.buttonIsPressed(Button.B)) {
        menuF()
    }
}
function bopIt () {
    while (!(input.isGesture(Gesture.Shake))) {
        bopItRand = randint(0, 5)
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
            basic.showArrow(ArrowNames.NorthWest)
            while (!(input.isGesture(Gesture.TiltLeft))) {
                if (input.isGesture(Gesture.Shake)) {
                    break;
                }
            }
        } else if (bopItRand == 5) {
            basic.showArrow(ArrowNames.SouthEast)
            while (!(input.isGesture(Gesture.TiltRight))) {
                if (input.isGesture(Gesture.Shake)) {
                    break;
                }
            }
        }
    }
    basic.showIcon(IconNames.Angry)
}
function btTimer () {
    basic.showString("Press B when you're ready!", 70)
while (!(input.buttonIsPressed(Button.B))) {
    	
    }
    basic.showString("3 2 1")
    basic.showString("Brush!", 70)
startTimer = input.runningTime()
    timePassed = 0
    while (timePassed < 120000) {
        timePassed = input.runningTime() - startTimer
        if (timePassed < 60000) {
            basic.showString("1:" + ("" + (120 - Math.round(timePassed / 1000) - 60)))
        } else {
            basic.showNumber(120 - Math.round(timePassed / 1000))
        }
    }
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showString("Done! Good job!", 70)
}
function dodge () {
    player = game.createSprite(2, 4)
    enemy1 = game.createSprite(0, 0)
    enemyMoveTimer = input.runningTime()
    delay = 0
    enemies = [enemy1]
    gameOver = 0
    game.resume()
    while (gameOver == 0) {
        for (let value of enemies) {
            if (!(value.get(LedSpriteProperty.Y) > 3)) {
                continue;
            } else if (!(value.isTouching(player))) {
                gameOver += 1
                serial.writeLine("button a")
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
        if (control.millis() - enemyMoveTimer > 3000) {
            enemy1.change(LedSpriteProperty.Y, 1)
            enemyMoveTimer = input.runningTime()
        }
        delay += 1
        if (delay == 3) {
            enemy2 = game.createSprite(2, 0)
            enemies.push(enemy2)
        } else if (delay > 3) {
            enemy2.change(LedSpriteProperty.Y, 1)
        }
    }
    enemy1.delete()
    enemy2.delete()
    player.delete()
    game.pause()
    serial.writeLine("saas")
    serial.writeString("whattt")
}
function meditate () {
    basic.showString("How many minutes?", 70)
medMinutes = 0
    basic.showNumber(timePassed)
    while (!(input.logoIsPressed())) {
        if (input.buttonIsPressed(Button.B)) {
            medMinutes += 1
        } else if (input.buttonIsPressed(Button.A)) {
            medMinutes += -1
        }
        basic.showNumber(medMinutes)
    }
    timePassed = 0
    medTime = medMinutes * 60000
    basic.showString("Focus on taking deep breaths in and out... ", 70)
startTimer = input.runningTime()
    serial.writeLine("Meditating...")
    while (timePassed < medTime) {
        timePassed = input.runningTime() - startTimer
        basic.showNumber(Math.round((medTime - timePassed) / 1000))
    }
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showString("Hope you feel calmer. Sending you to the menu...")
}
function menuF () {
    menuSel = 0
    while (!(input.logoIsPressed())) {
        if (input.buttonIsPressed(Button.B) && menuSel < 5) {
            menuSel += 1
        } else if (input.buttonIsPressed(Button.B)) {
            menuSel = 0
        } else if (input.buttonIsPressed(Button.A) && menuSel > 0) {
            menuSel += -1
        } else if (input.buttonIsPressed(Button.A)) {
            menuSel = 5
        }
        if (menuSel == 0) {
            basic.showIcon(IconNames.Heart)
        } else if (menuSel == 1) {
            basic.showLeds(`
                # # # # #
                # . . . .
                # . . # #
                # . . . #
                # # # # #
                `)
        } else if (menuSel == 2) {
            basic.showLeds(`
                . # # . .
                . # # . .
                . . # . .
                . . # . .
                . . # . .
                `)
        } else if (menuSel == 3) {
            basic.showLeds(`
                . # # # .
                . . . # .
                . . # # .
                . . . . .
                . . # . .
                `)
        } else if (menuSel == 4) {
            basic.showLeds(`
                # . . . #
                # # . # #
                # . # . #
                # . . . #
                # . . . #
                `)
        } else if (menuSel == 5) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # # # # #
                . # # # .
                `)
        }
    }
    if (menuSel == 0) {
        checkIn()
    } else if (menuSel == 1) {
        bopIt()
    } else if (menuSel == 2) {
        btTimer()
    } else if (menuSel == 3) {
        resources()
    } else if (menuSel == 4) {
        meditate()
    } else if (menuSel == 5) {
        dodge()
    }
}
function checkIn () {
    checkInDone = 0
    basic.showString("HRU")
    while (!(checkInDone)) {
        if (input.buttonIsPressed(Button.A)) {
            basic.showString("grr")
            checkInDone = 1
        } else if (input.buttonIsPressed(Button.B)) {
            basic.showString("bro")
            checkInDone = 1
            while (!(input.buttonIsPressed(Button.B))) {
                if (input.logoIsPressed()) {
                    resources()
                }
            }
        } else if (input.logoIsPressed()) {
            basic.showString("bom")
            checkInDone = 1
        }
    }
    while (!(input.buttonIsPressed(Button.B))) {
    	
    }
}
function startAnimation () {
    jokes = ["What did the grape say when he was pinched?    Nothing, he gave a little wine.", "Where do fruits go on vacation?    Pearis", "What did the man say when he walked into a bar?     Ouch!", "What do you call a pig that does karate?    A pork chop.", "Why can't you hear a pterodactyl in the bathroom?    Because it has a silent pee.", "What did the baby corn say to the mama corn?    Where is pop corn?", "I was looking for the lightning when it struck me.", "If you have 13 apples in one hand and 10 oranges in the other, what do you have?    Big hands."]
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
let menuSel = 0
let medTime = 0
let medMinutes = 0
let enemy2: game.LedSprite = null
let gameOver = 0
let enemies: game.LedSprite[] = []
let delay = 0
let enemyMoveTimer = 0
let enemy1: game.LedSprite = null
let player: game.LedSprite = null
let timePassed = 0
let startTimer = 0
let bopItRand = 0
let checkInDone = 0
let buttonBDebounce = 0
let buttonADebounce = 0
let jokes : string[] = []
buttonADebounce = control.millis()
buttonBDebounce = control.millis()
menuF()
basic.forever(function () {
    menuF()
})
